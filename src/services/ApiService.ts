import { StorageService } from './StorageService';

export class ApiService {
  private static instance: ApiService;
  private storageService: StorageService;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;

  private BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    //private BACKEND_URL: string = '/api/proxy';

  private constructor() {
    this.storageService = StorageService.getInstance();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const token = this.storageService.getItem('accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async refreshToken(): Promise<void> {
    if (this.isRefreshing) {
      return this.refreshPromise!;
    }
 
    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refreshToken = this.storageService.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await fetch(`${this.BACKEND_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }
 
        const data = await response.json();
        this.storageService.setItem('accessToken', data.accessToken);
        this.storageService.setItem('refreshToken', data.refreshToken);
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async handleRequest<T>(url: string, options: RequestInit, retryCount: number = 0): Promise<T> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (e: unknown) {
        console.log(e)
        data = null;
      }

      if (!response.ok) {
        if (data?.message === "Token Expired" && retryCount === 0) {
            await this.refreshToken();
            return this.handleRequest(url, options, retryCount + 1);
          }
        return new Error(response.status.toString()) as T;
      }

      
 
      return data as T;
    } catch (error: unknown) {
        console.error(error)
      return new Error("Erreur interne du serveur") as T;
    }
  }

  public async get<T>(url: string): Promise<T> {
    return this.handleRequest<T>(`${this.BACKEND_URL}${url}`, { method: 'GET' });
  }

  public async post<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest<T>(`${this.BACKEND_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async put<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest<T>(`${this.BACKEND_URL}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(url: string): Promise<T> {
    return this.handleRequest<T>(`${this.BACKEND_URL}${url}`, { method: 'DELETE' });
  }
}
 
import { StorageService } from './StorageService';
import { ToastService } from './ToastService';


export class ApiService {
  private static instance: ApiService;
  private storageService: StorageService;
  private toastService: ToastService;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;
  private BACKEND_URL: string = `/api`;


  private constructor() {
    this.storageService = StorageService.getInstance();
    this.toastService = ToastService.getInstance();
    
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
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
          this.storageService.removeItem('accessToken' );
          this.storageService.removeItem('refreshToken' );
          this.toastService.error("Votre session a expiré, veuillez vous reconnecter");
          throw new Error('Expired session');
        }

        const response = await fetch(`${this.BACKEND_URL}/v1/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          this.storageService.removeItem('accessToken' );
          this.storageService.removeItem('refreshToken' );
          this.toastService.error("Votre session a expiré, veuillez vous reconnecter");
          throw new Error('Expired session');
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
      const response = await fetch(`${this.BACKEND_URL}${url}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });


      if (!response.ok) {
        return new Error("Internal Server Error") as T;
      }

      const data = await response.json();

      if (data?.message === "Token Expired" && retryCount === 0) {
        await this.refreshToken();
        return this.handleRequest(url, options, retryCount + 1);
      }
      
 
      return data as T;
    } catch (error: unknown) {
        console.error(error)
      return new Error("Erreur interne du serveur") as T;
    }
  }

  public async get<T>(url: string): Promise<T> {
    return this.handleRequest<T>(url, { method: 'GET' });
  }

  public async post<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async put<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(url: string): Promise<T> {
    return this.handleRequest<T>(url, { method: 'DELETE' });
  }
}
 
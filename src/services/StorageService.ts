import Cookies from 'js-cookie';

export class StorageService {
  private static instance: StorageService;
  
  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
   
  
  public isItemInLocalStorage(key: string): boolean {
    return Cookies.get(key) !== undefined;
  }

  getItem(key: string): string | null {
    return Cookies.get(key) || null;
  }

  setItem(key: string, value: string): void {
    Cookies.set(key, value, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
  }

  removeItem(key: string): void {
    Cookies.remove(key, { path: '/' });
  }

  clear(): void {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookie => {
      Cookies.remove(cookie, { path: '/' });
    });
  }
 
} 
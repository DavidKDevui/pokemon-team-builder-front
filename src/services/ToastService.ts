import { ToastContextType } from '@/context/ToastContext';

export class ToastService {
  private static instance: ToastService;
  private toastContext: ToastContextType | null = null;

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  public setContext(context: ToastContextType) {
    this.toastContext = context;
  }

  public success(message: string) {
    this.toastContext?.showToast(message, 'success');
  }

  public error(message: string) {
    this.toastContext?.showToast(message, 'error');
  }

  public info(message: string) {
    this.toastContext?.showToast(message, 'info');
  }
}
 
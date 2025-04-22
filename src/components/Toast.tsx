'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { ToastService } from '@/services/ToastService';

export default function Toast() {
  const { toast, hideToast, showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toastService = ToastService.getInstance();
    toastService.setContext({ showToast, hideToast, toast });
  }, [showToast, hideToast, toast]);

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          hideToast();
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[toast.type];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="font-press-start-2p text-sm">{toast.message}</span>
      </div>
    </div>
  );
} 
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Trainer } from '@/types/TrainerType';
 import { StorageService } from '@/services/StorageService';
 import { TrainerService } from '@/services/TrainerService';
 
 
interface AuthContextType {
  trainer: Trainer | undefined;
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setTrainer: (trainer: Trainer) => void;
}

const AuthContext = createContext<AuthContextType>({
  trainer: undefined,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setTrainer: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {

 

  const [trainer, setTrainer] = useState<Trainer | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);



  useEffect(() => {
    const storageService = StorageService.getInstance();
    const trainerService = TrainerService.getInstance();
    
     const initializeAuth = async () => {
       const isAccessToken = await storageService.isItemInLocalStorage("accessToken");
       if (isAccessToken) {
         const response = await trainerService.getTrainer();
         if (response instanceof Error) {
          storageService.removeItem("accessToken");
          storageService.removeItem("refreshToken");
          setTrainer(undefined);
          setIsAuthenticated(false);
         } else {
          setTrainer(response.trainer);
          setIsAuthenticated(true);
         }
       } else {
        setIsAuthenticated(false);
       }
     }
     initializeAuth();
  }, []);



  return (
    <AuthContext.Provider value={{ trainer, isAuthenticated, setIsAuthenticated, setTrainer }}>
      {children}
    </AuthContext.Provider>
  );
} 
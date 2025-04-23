'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthService } from '@/services/AuthService';
import { ToastService } from '@/services/ToastService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { StorageService } from '@/services/StorageService';
import Loader from '@/components/Loader';

export default function RegisterPage() {
  const router = useRouter();
  const storageService = StorageService.getInstance();
  const authService = AuthService.getInstance();
  const toastService = ToastService.getInstance();
  const { setIsAuthenticated, setTrainer, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; 

  const isSubmitDisabled = isSubmitting || 
    !emailRegex.test(email) || 
    !passwordRegex.test(password) || 
    firstName.length < 2;



    useEffect(() => {
        if (isAuthenticated) {
        router.push('/team');
        }
    }, [isAuthenticated, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authService.register(email, password, firstName, "");
      if (response instanceof Error) {
        const statusCode = parseInt(response.message);
        if (statusCode === 409) {
          toastService.error("L'email est déjà utilisé");
        } else if (statusCode === 400 || statusCode === 500) {
          toastService.error("Erreur interne du serveur");
        } else {
          toastService.error("Erreur interne du serveur");
        }
      } else {
        toastService.success(`Inscription réussie ! Bienvenue ${firstName} !`);
        setIsAuthenticated(true);
        storageService.setItem("accessToken", response.accessToken);
        storageService.setItem("refreshToken", response.refreshToken);
        setTrainer(response.trainer);
        router.push('/team');
      }
    } catch (error) {
      console.error(error)
      toastService.error("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        {isAuthenticated === undefined && isAuthenticated && (
            <Loader text="Chargement de la page..." />
        )}


        {!isAuthenticated  && isAuthenticated !== undefined && (
      <div className="max-w-lg w-full space-y-8   border border-white/5 rounded-[16px] px-8 py-12 bg-white/5 ">
                    <button
              onClick={() => router.back()}
              className="text-white/70 hover:text-white/75 active:text-white/50 active:scale-95 font-press-start-2p text-xs transition-colors duration-20 flex items-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
               
            </button>
        <div className="text-center">
            <div className="relative w-28 h-28 sm:w-28 sm:h-28 mx-auto mb-4">
            <Image
                src="/images/team/dresser.png"
                alt="Dresseur"
                fill
                sizes="100vw"
                className="object-contain"
            />
            </div>
          <h2 className="text-[#f1c40f] text-2xl sm:text-3xl font-press-start-2p">
            Créer un compte
          </h2>
          <p className="mt-2 text-white/70 font-press-start-2p text-sm">
            Rejoignez la communauté Pokémon
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                Prénom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-[8px] relative block w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/50 font-press-start-2p text-sm focus:outline-none focus:ring-2 focus:ring-[#f1c40f] focus:border-transparent"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-[8px] relative block w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/50 font-press-start-2p text-sm focus:outline-none focus:ring-2 focus:ring-[#f1c40f] focus:border-transparent"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-[8px] relative block w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder-white/50 font-press-start-2p text-sm focus:outline-none focus:ring-2 focus:ring-[#f1c40f] focus:border-transparent"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className={`text-white/50 font-press-start-2p text-xs transition-all duration-300 ease-in-out  transform ${password.length > 0 && isSubmitDisabled && !isSubmitting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                {password.length > 0 && isSubmitDisabled && !isSubmitting && "Le mot de passe doit contenir au moins 8 caractères, des chiffres et une lettre majuscule"}
            </p>
           
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-press-start-2p rounded-[8px] text-black bg-[#f1c40f] hover:bg-[#f1c40f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1c40f] transition-colors duration-300 ${isSubmitDisabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer active:scale-95 '}`}
            >
              {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-[#f1c40f] hover:text-[#f1c40f]/80 active:text-[#f1c40f]/50 font-press-start-2p text-xs transition-colors duration-150"
            >
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </form>
      </div>
      )}
    </div>
  );
} 
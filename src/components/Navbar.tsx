'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { StorageService } from '@/services/StorageService';
import { Trainer } from '@/types/TrainerType';
import { AuthService } from '@/services/AuthService';
import { ToastService } from '@/services/ToastService';
import Image from 'next/image';

export default function Navbar() {

    const router = useRouter();
    const pathname = usePathname();
    
    const authService = AuthService.getInstance();
    const toastService = ToastService.getInstance();
    const storageService = StorageService.getInstance();

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { isAuthenticated, setIsAuthenticated, setTrainer } = useAuth();
 



   const getActiveLink = (path: string) => {
    return pathname === path ? 'text-shadow-[2px_2px_0_grey]' : 'text-white';
   }


  const handleLogout = async () => {

    const response = await authService.logout();
    if (response instanceof Error) {
      const statusCode = parseInt(response.message);
      if (statusCode === 500 || statusCode === 400) {
        toastService.error("Erreur interne du serveur");
      } 
    } else {
      storageService.removeItem("accessToken");
      storageService.removeItem("refreshToken");
      setIsAuthenticated(false);
      setTrainer(undefined as unknown as Trainer);
      router.push("/login");
       toastService.success("Déconnexion réussie ! Vous allez nous manquer !")
    }
  };


  return (
    <nav className="backdrop-blur-xl p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto">

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#f1c40f]  font-bold  font-press-start-2p ">
            <Image src="/images/home/pikachu.gif" unoptimized alt="Pokeball" width={32} height={32} />
            </Link>
          </div>
          
          {isAuthenticated !== undefined && (
            <div className="flex items-center space-x-6">

                <Link  href={`/`} className={` ${getActiveLink('/')} text-[0.75rem] text-white hover:text-white/95 active:scale-97 transition-colors font-press-start-2p uppercase`}>
                    Accueil
                </Link>

                {isAuthenticated && (
                    <Link href={`/team`} className={` ${getActiveLink('/team')} text-[0.75rem] text-white hover:text-white/95 active:scale-97 transition-colors font-press-start-2p uppercase`}>
                        Mon équipe
                    </Link>
                )}

                <Link  href={`/pokedex`} className={` ${getActiveLink('/pokedex')} text-[0.75rem] text-white hover:text-white/95 active:scale-97 transition-colors font-press-start-2p uppercase`}>
                    Pokédex
                </Link>
                
                {isAuthenticated && (
                <button onClick={handleLogout } className=" bg-[red]  hover:bg-[red]/85 text-[0.8rem] text-white rounded-[8px] border-2 border-[red] px-6 py-1 text-sm font-press-start-2p transition-all duration-20 cursor-pointer   active:scale-98 active:border-[white]/50">
                    Déconnexion
                </button>
                )}

                {!isAuthenticated && (
                <button onClick={() => {router.push('/login'); setIsMenuOpen(false);}} className=" bg-[#f1c40f]  hover:bg-[#f1c40f]/85 text-[0.8rem] text-black rounded-[8px] border-2 border-[#f1c40f] px-6 py-1 text-sm font-press-start-2p transition-all duration-20 cursor-pointer   active:scale-98 active:border-[white]/50">
                    Connexion
                </button>
                )}

          </div>
        )}
      </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-[#f1c40f] text-shadow-[2px_2px_0_#e74c3c] font-bold text-xl font-press-start-2p ">
            <Image src="/images/home/pikachu.gif" unoptimized alt="Pokeball" width={32} height={32} />
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 transition-transform duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-4 space-y-4">

                {isAuthenticated !== undefined && (
                    <div className="flex flex-col space-y-4">
                        <Link
                        href="/"
                        className={`${getActiveLink('/')} cursor-pointer text-white text-[1rem] hover:text-blue-200 transition-colors text-sm font-press-start-2p uppercase`}
                        onClick={() => setIsMenuOpen(false)}
                        >
                        Accueil
                        </Link>
                        {isAuthenticated && (
                            <Link href={`/team`} className={` ${getActiveLink('/team')} text-[1rem] text-white hover:text-white/95 active:scale-97 transition-colors font-press-start-2p uppercase`}>
                            Mon équipe
                        </Link>
                        )}
                        <Link  href={`/pokedex`} className={` ${getActiveLink('/pokedex')} text-[1rem] text-white hover:text-white/95 active:scale-97 transition-colors font-press-start-2p uppercase`}>
                            Pokédex
                        </Link>
                        {isAuthenticated && (
                            <button onClick={handleLogout} className=" bg-[red]  hover:bg-[red]/85 text-[1rem] text-white rounded-[8px] border-2 border-[red] px-6 py-1 text-sm font-press-start-2p transition-all duration-20 cursor-pointer   active:scale-98 active:border-[white]/50">
                                Déconnexion
                            </button>
                            )}

                            {!isAuthenticated && (
                            <button onClick={() => {router.push('/login'); setIsMenuOpen(false);}} className=" bg-[#f1c40f]  hover:bg-[#f1c40f]/85 text-[1rem] text-black rounded-[8px] border-2 border-[#f1c40f] px-6 py-1 text-sm font-press-start-2p transition-all duration-20 cursor-pointer   active:scale-98 active:border-[white]/50">
                                Connexion
                            </button>
                            )}
                                </div>
                            )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Hero() {

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-12 md:py-12 pt-23 md:pt-23">
      {/* Left side - 60% width */}
      <div className="w-full md:w-[60%] flex flex-col items-center md:items-start justify-center space-y-6 md:space-y-8 text-center md:text-left">
        <h1 
        
          className="text-[#f1c40f] text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-press-start-2p leading-tight  font-bold"
        >
          Pokémon Team Builder
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl  font-press-start-2p  leading-relaxed max-w-xl font-normal">
          Construisez votre équipe Pokémon parfaite
        </p>
        <button 
          onClick={() => isAuthenticated ? router.push('/team') : router.push('/login')}
          style={{ 
            boxShadow: isHovered ?  `0 ${isPressed ? '7px' : '10px'} 0 #f39c12` : '0 7px 0 #c0392b',
            transform: isPressed ? 'translateY(4px)' : isHovered ? 'translateY(-1px)' : 'translateY(0)'
          }}
          className="bg-[#e74c3c] hover:bg-[#f1c40f] text-white text-base sm:text-lg md:text-lg rounded-[8px] px-8 sm:px-12 py-3 sm:py-5 uppercase cursor-pointer transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseOut={() => setIsPressed(false)}
        >
          {"Commencer l'aventure"}
        </button>
      </div>

      {/* Right side - 40% width */}
      <div className="w-full md:w-[40%] flex justify-center items-center mt-8 md:mt-0 px-20 ">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[450px]">
          <Image
            src="/images/home/pikachu.gif"
            alt="magmar"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
} 
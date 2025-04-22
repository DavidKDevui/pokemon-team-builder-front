'use client';

import { useRouter } from 'next/navigation';

interface EmptyTeamSlotProps {
  index: number;
}

export default function EmptyTeamSlot({ index }: EmptyTeamSlotProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push('/pokedex')}
      className="bg-white/5 rounded-[8px] p-6 flex flex-col items-center justify-center min-h-[200px] border-3 border-dashed border-white/20 hover:border-[#f1c40f]/50 transition-colors duration-300 cursor-pointer group"
    >
      <div className="w-24 h-24 relative mb-4 flex items-center justify-center">
        
        <div className="absolute text-white/75 text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
          +
        </div>
      </div>
      <p className="text-white/50 font-press-start-2p text-sm group-hover:text-white/70 transition-colors duration-300">
        Emplacement {index + 1}
      </p>
    </div>
  );
} 
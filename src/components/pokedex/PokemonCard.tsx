'use client';

 
import Image from 'next/image';
import { useRouter } from 'next/navigation';



interface PokemonCardProps {
  pokedexId: number;
  name: string;
  sprite: string;
  apiTypes: { name: string; image: string; }[];
}
 
export default function PokemonCard({ pokedexId, name, sprite, apiTypes }: PokemonCardProps) {
 
  const router = useRouter();
  const getPokemonTypeColor = (type: string) => {

    switch (type) {
      case 'feu':
        return 'bg-red-500';
      case 'eau':
        return 'bg-blue-500';
      case 'plante':
        return 'bg-green-500';
      case 'électrik':
        return 'bg-yellow-500';
      case 'psy':
        return 'bg-purple-500';
      case 'combat':
        return 'bg-red-500';
      case 'ténèbres':
        return 'bg-black';
      case 'acier':
        return 'bg-gray-500';
      case 'fée':
        return 'bg-pink-500';
      case 'dragon':
        return 'bg-blue-500';
      case 'spectre':
        return 'bg-gray-800';
      case 'roche':
        return 'bg-gray-600';
      case 'sol':
        return 'bg-[#f1c40f]';
      case 'poison':
        return 'bg-purple-500';
      case 'vol':
        return 'bg-indigo-500';
      case 'insecte':
        return 'bg-green-500';
      case 'glace':
        return 'bg-cyan-500';
      case 'normal':
        return 'bg-gray-300';
      default:
        return 'bg-gray-500';
    }
  }

 
  return (
    <button onClick={() => router.push(`/pokedex/${pokedexId}`)}>
      <div 
        className="bg-white/5 hover:bg-white/10 rounded-[8px] p-4 cursor-pointer transition-all duration-300"
 
      >
        <div className="relative w-full h-32 mb-4">
          <Image
            src={sprite}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-[#f1c40f] font-press-start-2p text-[0.7rem] ">#{pokedexId.toString().padStart(3, '0')}</p>
          <h3 className="text-white font-press-start-2p text-lg mb-2 capitalize">{name}</h3>
          <div className="flex justify-center gap-2">
            {apiTypes.map((type, index) => (
              <span 
                key={index}
                className={`text-white text-[0.6rem] font-press-start-2p px-2 py-1 rounded uppercase ${getPokemonTypeColor(type.name.toLowerCase())}`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
} 
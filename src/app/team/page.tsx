'use client';

import Image from 'next/image';
import EmptyTeamSlot from '@/components/team/EmptyTeamSlot';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import PokemonCard from '@/components/pokedex/PokemonCard';
import { usePokemon } from '@/context/PokedexContext';
import { Pokemon } from '@/types/PokemonType';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TeamPage() {
  const router = useRouter();
  const { trainer, isAuthenticated } = useAuth();
  const { pokemons } = usePokemon();


  useEffect(() => {
    if (!isAuthenticated) {
    router.push('/login');
    }
}, [isAuthenticated, router]);


  const getPokemon = (pokedexId: number): Pokemon | undefined => {
    return pokemons?.find((pokemon) => pokemon.pokedexId === pokedexId);
  }

  const calculateTeamStats = () => {
    if (!trainer?.team || !pokemons) return null;

    const stats = {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
      total: 0
    };

    trainer.team.forEach(pokemonId => {
      const pokemon = getPokemon(parseInt(pokemonId));
      if (pokemon) {
        stats.hp += pokemon.stats.HP;
        stats.attack += pokemon.stats.attack;
        stats.defense += pokemon.stats.defense;
        stats.special_attack += pokemon.stats.special_attack;
        stats.special_defense += pokemon.stats.special_defense;
        stats.speed += pokemon.stats.speed;
      }
    });

    stats.total = stats.hp + stats.attack + stats.defense + stats.special_attack + stats.special_defense + stats.speed;

    return stats;
  };

  const teamStats = calculateTeamStats();

  const statsTraduction = {
    hp: 'PV',
    attack: 'Attaque',
    defense: 'Défense',
    special_attack: 'Attaque Spéciale',
    special_defense: 'Défense Spéciale',
    speed: 'Vitesse',
    total: 'Total'
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 pt-23 md:pt-23">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="text-white/70 hover:text-white/75 active:text-white/50 active:scale-95 font-press-start-2p text-sm transition-colors duration-20 flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
             
          </button>
          <h1 className="text-[#f1c40f] text-3xl md:text-4xl font-press-start-2p text-center">
            Mon Équipe
          </h1>
          <div className="w-20"></div>
        </div>

        {isAuthenticated && pokemons && trainer && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Grille des Pokémon */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainer?.team.map((pokemonId) => (
                  <PokemonCard key={pokemonId} pokedexId={parseInt(pokemonId)} name={getPokemon(parseInt(pokemonId))?.name || ""} sprite={getPokemon(parseInt(pokemonId))?.sprite || ""} apiTypes={getPokemon(parseInt(pokemonId))?.apiTypes || []} />
                ))}
                {[...Array(6 - (trainer?.team.length || 0))].map((_, index) => (
                  <EmptyTeamSlot key={index} index={index + (trainer?.team.length || 0)} />
                ))}
              </div>
            </div>

            {/* Image du dresseur et statistiques */}
            <div className="w-full md:w-1/4 flex flex-col items-center gap-6">
              <div className="bg-white/5 rounded-[8px] p-6  w-full">
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src="/images/team/dresser.png"
                    alt="Dresseur"
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-white text-xl font-press-start-2p text-center">
                  {trainer?.firstName}
                </h2>
              </div>

              {/* Statistiques de l'équipe */}
              {teamStats && (
                <div className="bg-white/5 rounded-[8px] p-6 w-full">
                  <h3 className="text-[#f1c40f] text-lg font-press-start-2p text-center mb-4">
                    {"Points d'Équipe"}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(teamStats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between items-center">
                        <span className="text-white/70 font-press-start-2p text-sm">
                          {statsTraduction[stat as keyof typeof statsTraduction]}
                        </span>
                        <span className="text-white font-press-start-2p text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(isAuthenticated === undefined || pokemons === undefined )&& (
          <Loader text="Chargement de la page..." />
        )}

        {!isAuthenticated && isAuthenticated !== undefined && pokemons !== undefined && (
          <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="text-white/75 text-sm font-press-start-2p text-center">
              Veuillez vous connecter pour accéder à votre équipe
            </h1>
          </div>
        )}
      </div>
    </div>
  );
} 
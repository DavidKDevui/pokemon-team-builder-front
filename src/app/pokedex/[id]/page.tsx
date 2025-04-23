'use client';

import { useParams } from 'next/navigation';
import { usePokemon } from '@/context/PokedexContext';
import { Pokemon } from '@/types/PokemonType';
import Image from 'next/image';
import Loader from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
import { TrainerService } from '@/services/TrainerService';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/services/ToastService';

export default function PokemonDetail() {

  const router = useRouter();

  const { id } = useParams();
  const { pokemons, loading, error } = usePokemon();
  const { isAuthenticated, trainer, setTrainer } = useAuth();

   const toastService = ToastService.getInstance();
  const trainerService = TrainerService.getInstance();
  const pokemon: Pokemon | undefined = pokemons && pokemons?.find((pokemon) => pokemon.pokedexId === parseInt(id as string));

  const isPokemonInTeam: boolean =  trainer?.team.includes(pokemon?.pokedexId.toString() || "") || false;
  const isTeamFull: boolean = trainer?.team.length === 6 || false;




  const handleAddPokemonToTeam = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isTeamFull) {
      toastService.error("Votre équipe est déjà pleine");
      return;
    }

    const response = await trainerService.addPokemonToTeam(pokemon!.pokedexId);
    if (response instanceof Error) {
      const statusCode = parseInt(response.message);
      if (statusCode === 400 || statusCode === 500 || statusCode === 404) {
        toastService.error("Erreur interne du serveur");
      } else if (statusCode === 409) {
        toastService.error(`${pokemon!.name} est déjà dans votre équipe`);
      }
    } else {
      toastService.success(`${pokemon!.name} a été ajouté à votre équipe`);
      if (trainer) {
        setTrainer({
          ...trainer,
          team: response.team
        });
      }
    }
  }



  const handleRemovePokemonFromTeam = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const response = await trainerService.removePokemonFromTeam(pokemon!.pokedexId);
    if (response instanceof Error) {
      const statusCode = parseInt(response.message);
      if (statusCode === 400 || statusCode === 500 || statusCode === 404) {
        toastService.error("Erreur interne du serveur");
      } else if (statusCode === 409) {
        toastService.error(`${pokemon!.name} n'est pas dans votre équipe`);
      }
    } else {
      toastService.success(`${pokemon!.name} a été retiré de votre équipe`);
      if (trainer) {
        if (trainer){
            setTrainer({
                ...trainer,
                team: trainer.team.filter((pokemonId) => pokemonId !== pokemon!.pokedexId.toString())
            });
        }
      }
    }
  }




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
        return 'bg-brown-500';
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

  const statsTraduction = {
    HP: 'PV',
    attack: 'Attaque',
    defense: 'Défense',
    special_attack: 'Attaque Spéciale',
    special_defense: 'Défense Spéciale',
    speed: 'Vitesse',
    total: 'Total',
  }

  const getStatTraduction = (stat: string) => {
    return statsTraduction[stat as keyof typeof statsTraduction] || stat;
  }

  if (!pokemon && !error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-press-start-2p">Pokémon non trouvé</div>
      </div>
    );
  }

  if (loading && !error && !pokemon) {
    return <Loader text="Chargement de la page..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-press-start-2p">Une erreur est survenue</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 pt-23 md:pt-23">
      <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
            onClick={() => router.back()}
            className="w-10 text-white/70 hover:text-white/75 active:text-white/50 active:scale-95 font-press-start-2p text-sm transition-colors duration-20 flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
             
          </button>
          <h1 className="text-[#f1c40f] text-3xl md:text-4xl font-press-start-2p text-center">
           #{pokemon!.pokedexId.toString().padStart(3, '0')}
          </h1>
          <div className="w-10"></div> {/* Pour équilibrer le layout */}
        </div>
        <div className="bg-white/5 rounded-[8px] p-6">
        
          {/* Section supérieure avec image et informations de base */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Image du Pokémon */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="relative w-56 h-56 mb-4">
                <Image
                  src={pokemon!.sprite}
                  alt={pokemon!.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
              <h1 className="text-white  text-3xl font-press-start-2p capitalize">
                {pokemon!.name}
              </h1>
              <p className="text-[#f1c40f]  font-press-start-2p text-sm">
                #{pokemon!.pokedexId.toString().padStart(3, '0')}
              </p>

              <div className="flex gap-2 mt-4">
                  {pokemon!.apiTypes.map((type, index) => (
                    <span 
                      key={index}
                      className={`text-white text-xs font-press-start-2p px-2 py-1 rounded uppercase ${getPokemonTypeColor(type.name.toLowerCase())}`}	
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
            </div>

            {/* Types et Statistiques */}
            <div className="w-full md:w-1/2">
        
 
                <div className="space-y-6  content-center">
                  {Object.entries(pokemon!.stats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center gap-6 ">
                      <span className="text-white font-press-start-2p text-sm w-24 capitalize">
                        {getStatTraduction(stat)}
                      </span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full">
                        <div 
                          className="h-full bg-[#f1c40f] rounded-full"
                          style={{ width: `${(value / 255) * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-press-start-2p text-sm w-8">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
             
            </div>
          </div>

          {/* Section des résistances */}
          <div className="border-t border-white/10 pt-6">
            <h2 className="text-[#f1c40f] text-xl font-press-start-2p mb-4">Résistances</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pokemon!.apiResistances.map((resistance, index) => (
                <div 
                  key={index}
                  className={`rounded p-3 bg-white/5`}
                >
                  <span className="text-white font-press-start-2p text-xs">
                    {resistance.name}: {resistance.damage_multiplier}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isAuthenticated && (
            <div className="flex justify-center">
                
                {isPokemonInTeam ? (
                    <button 
                    className=" cursor-pointer bg-red-500 text-white font-press-start-2p text-sm px-4 py-2 rounded-md hover:bg-[red-500]/80 transition-colors duration-300 mt-4 active:scale-97"
                    onClick={handleRemovePokemonFromTeam}
                    disabled={!isPokemonInTeam}
                    >
                    Retirer de mon équipe
                    </button>
                ) : (
                    <div className="flex flex-col items-center">
                    
                    {isTeamFull && (
                        <p className="text-white/85 font-press-start-2p text-xs px-4 py-2 rounded-md hover:bg-[red-500]/80 transition-colors duration-300 mt-4 active:scale-97">
                            Vous ne pouvez pas ajouter plus de 6 Pokémon dans votre équipe
                        </p>
                    )}
                    
                    <button 
                        disabled={isTeamFull}
                        className={`bg-[#f1c40f] text-black font-press-start-2p text-sm px-4 py-2 rounded-md  transition-colors duration-300 mt-4 ${isTeamFull ? 'opacity-50 cursor-not-allowed ' : ' hover:bg-[#f1c40f]/80 cursor-pointer  active:scale-97 '}`}
                        onClick={handleAddPokemonToTeam}
                        >
                        Ajouter à mon équipe
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
} 
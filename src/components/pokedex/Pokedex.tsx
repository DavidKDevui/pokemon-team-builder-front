'use client';

import { useState } from 'react';
import PokemonCard from './PokemonCard';
import { usePokemon } from '@/context/PokedexContext';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
export default function Pokedex() {


  const router = useRouter();
  const { pokemons, loading, error } = usePokemon();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');


  const filteredPokemons = pokemons && pokemons
    .filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(inputValue.toLowerCase());
    })
    .filter((pokemon) => {
      return selectedType === '' || pokemon.apiTypes.some((type) => type.name.toLowerCase().includes(selectedType.toLowerCase()));
    })
    .filter((pokemon) => {
      return selectedGeneration === '' || pokemon.apiGeneration.toString() === selectedGeneration;
    });


    const typeList = [
      { value: '', label: 'Tous les types' },
      { value: 'feu', label: 'Feu' },
      { value: 'eau', label: 'Eau' },
      { value: 'plante', label: 'Plante' },
      { value: 'électrik', label: 'Electrique' },
      { value: 'psy', label: 'Psy' },
      { value: 'combat', label: 'Combat' },
      { value: 'ténèbres', label: 'Ténèbres' },
      { value: 'acier', label: 'Acier' },
      { value: 'fée', label: 'Fée' },
      { value: 'dragon', label: 'Dragon' },
      { value: 'spectre', label: 'Spectre' },
      { value: 'roche', label: 'Roche' },
      { value: 'sol', label: 'Sol' },
      { value: 'poison', label: 'Poison' },
      { value: 'vol', label: 'Vol' },
      { value: 'insecte', label: 'Insecte' },
      { value: 'glace', label: 'Glace' },
      { value: 'normal', label: 'Normal' },
    ];
    
    const generationList = [
      { value: '', label: 'Toutes les générations' },
      { value: '1', label: 'Génération 1 (Kanto)' },
      { value: '2', label: 'Génération 2 (Johto)' },
      { value: '3', label: 'Génération 3 (Hoenn)' },
      { value: '4', label: 'Génération 4 (Sinnoh)' },
      { value: '5', label: 'Génération 5 (Unys)' },
      { value: '6', label: 'Génération 6 (Kalos)' },
      { value: '7', label: 'Génération 7 (Alola)' },
      { value: '8', label: 'Génération 8 (Galar)' },
    ];
    
 

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 py-12 md:py-12 pt-23 md:pt-23">
      <div className="max-w-7xl mx-auto">
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
            Pokédex
          </h1>
          <div className="w-10"></div> {/* Pour équilibrer le layout */}
        </div>
        
        {/* Filtres et recherche */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Rechercher un Pokémon..."
            className="bg-white/5 text-white rounded-[8px] px-4 py-2 font-press-start-2p text-sm w-full md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
          />
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white/5 text-white rounded-[8px] px-4 py-2 font-press-start-2p text-xs w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
          >
               {typeList.map((type) => (
                <option key={type.value} value={type.value} className="p-0 m-0 bg-[#6891a8]">
                  {type.label}
                </option>
               ))}
          </select>

          <select 
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            className="bg-white/5 text-white rounded-[8px] px-4 py-2 font-press-start-2p text-xs w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]"
          >
            {generationList.map((generation) => (
              <option key={generation.value} value={generation.value} className="p-0 m-0 bg-[#6891a8]">
                {generation.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grille de Pokémon */}
        { filteredPokemons && !loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.pokedexId}
                pokedexId={pokemon.pokedexId}
                name={pokemon.name}
                sprite={pokemon.sprite}
                apiTypes={pokemon.apiTypes}
              />
            ))}
            </div>
        )}

        {loading && !error && (
          <Loader text="Chargement des Pokémon..." />
        )}

        {error && !loading && (
          <div className="flex justify-center items-center h-full flex-col gap-4 mx-auto py-12">
            <h2 className="text-white text-2xl font-press-start-2p">Une erreur est survenue lors du chargement des Pokémon</h2>
          </div>
        )}
        
        


      </div>
    </div>
  );
} 
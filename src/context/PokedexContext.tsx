'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { PokedexService } from '@/services/PokedexService';
import { Pokemon } from '@/types/PokemonType';

interface PokedexContextType {
  pokemons: Pokemon[] | undefined;
  loading: boolean;
  error: string | null;
}

const PokedexContext = createContext<PokedexContextType>({
  pokemons: [],
  loading: true,
  error: null,
});

export const usePokemon = () => useContext(PokedexContext);

export function PokemonProvider({ children }: { children: ReactNode }) {

  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
        const data = await PokedexService.fetchPokemons();
        if (data instanceof Error) {
            setError(data.message);
            setLoading(false);
        } else {
          setPokemons(data);
          setLoading(false);
        }
    };

    fetchPokemons();
  }, []);

  return (
    <PokedexContext.Provider value={{ pokemons, loading, error }}>
      {children}
    </PokedexContext.Provider>
  );
} 
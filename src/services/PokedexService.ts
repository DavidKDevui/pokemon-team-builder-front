import { Pokemon } from "@/types/PokemonType";

export class PokedexService {
  private static instance: PokedexService;
 
  private constructor() {}

  public static getInstance(): PokedexService {
    if (!PokedexService.instance) {
      PokedexService.instance = new PokedexService();
    }
    return PokedexService.instance;
  }
 
  public static async fetchPokemons(): Promise<Pokemon[] | Error> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      return new Error('Error fetching pokemons');
    }
  }
} 
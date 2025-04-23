import { Trainer } from "@/types/TrainerType";
import { ApiService } from "./ApiService";

export class TrainerService {
  private static instance: TrainerService;
  
  private constructor(
    private apiService = ApiService.getInstance()

  ) {}

  

  public static getInstance(): TrainerService {
    if (!TrainerService.instance) {
        TrainerService.instance = new TrainerService();
    }
    return TrainerService.instance;
  }


  public async getTrainer(): Promise<Trainer | Error> {
    try {
      const response: Trainer | Error = await this.apiService.get<Trainer | Error>(`/v1/trainers/me`);
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }


  public async addPokemonToTeam(pokemonId: number): Promise<{ team : string[] } | Error> {
    try {
      const response = await this.apiService.post<{ team : string[] } | Error>(`/v1/trainers/team/pokemon`, { pokemonId });
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }

  public async removePokemonFromTeam(pokemonId: number): Promise<{ team : string[] } | Error> {
    try {
      const response = await this.apiService.delete<{ team : string[] } | Error>(`/v1/trainers/team/pokemon/${pokemonId}`);
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }
} 
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
      const response: Trainer | Error = await this.apiService.get<Trainer | Error>(`/trainers/me`);
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }
} 
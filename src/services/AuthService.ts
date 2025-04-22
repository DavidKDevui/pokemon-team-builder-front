import { Trainer } from "@/types/TrainerType";
import { StorageService } from "./StorageService";
import { ToastService } from "./ToastService";
import { ApiService } from "./ApiService";

export class AuthService {
  private static instance: AuthService;
  private storageService: StorageService;
  private toastService: ToastService;
  private apiService: ApiService;

  private constructor() {
    this.storageService = StorageService.getInstance();
    this.toastService = ToastService.getInstance();
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(email: string, password: string, firstName: string, lastName: string): Promise<{ accessToken: string, refreshToken: string, trainer: Trainer } | Error> {
    try {
      const data = await this.apiService.post<{ accessToken: string, refreshToken: string, trainer: Trainer }>(
        `/auth/register`,
        { email, password, firstName, lastName }
      );

      return data;
 
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }

  public async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string, trainer: Trainer } | Error> {
    try {
      const data = await this.apiService.post<{ accessToken: string, refreshToken: string, trainer: Trainer }>(
        `/auth/login`,
        { email, password }
      );

      if (data instanceof Error) {
        return data;
      } else {
        this.storageService.setItem('accessToken', data.accessToken);
        this.storageService.setItem('refreshToken', data.refreshToken);
        return data;
      }
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }

  public async logout(): Promise<true | Error> {
    try {
      const response = await this.apiService.post<true | Error>(`/auth/logout`, {});
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }


  public async addPokemonToTeam(pokemonId: number): Promise<{ team : string[] } | Error> {
    try {
      const response = await this.apiService.post<{ team : string[] } | Error>(`/trainers/team/pokemon`, { pokemonId });
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }

  public async removePokemonFromTeam(pokemonId: number): Promise<{ team : string[] } | Error> {
    try {
      const response = await this.apiService.delete<{ team : string[] } | Error>(`/trainers/team/pokemon/${pokemonId}`);
      return response;
    } catch (error) {
      console.error(error);
      return new Error("Erreur interne du serveur");
    }
  }

} 
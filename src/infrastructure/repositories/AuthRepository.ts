import { httpClient } from "../api/httpClient";
import { BaseRepository } from "./BaseRepository";

import { LoginRequest } from "@/application/dto/authors/LoginRequest";
import { LoginResponse } from "@/application/dto/authors/LoginResponse";

// Interfaz para el modelo o DTO del Autor
export interface Author {
    id: string | number;
    name: string;
    [key: string]: any; // Permite propiedades adicionales devueltas por la API
}

export class AuthRepository extends BaseRepository {

    async login(request: LoginRequest): Promise<LoginResponse> {
        return this.execute(async () => {
            const response = await httpClient.post<LoginResponse>(
                "api/Auth/sso-login",
                request
            );

            return response.data;
        });
    }

    // Nuevo método para obtener los autores
    async getAuthors(): Promise<Author[]> {
        return this.execute(async () => {
            const response = await httpClient.get<Author[]>("api/Authors");

            return response.data;
        });
    }

}
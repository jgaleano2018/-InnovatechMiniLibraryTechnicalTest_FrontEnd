import { httpClient } from "../api/httpClient";
import { BaseRepository } from "./BaseRepository";

import { LoginRequest } from "@/application/dto/authors/LoginRequest";
import { LoginResponse } from "@/application/dto/authors/LoginResponse";

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

}
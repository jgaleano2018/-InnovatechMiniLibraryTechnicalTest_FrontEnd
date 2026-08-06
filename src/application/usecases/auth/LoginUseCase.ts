import { LoginRequest } from "../../dto/auth/LoginRequest";
import { LoginResponse } from "../../dto/auth/LoginResponse";

import { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class LoginUseCase {

    constructor(

        private repository: IAuthRepository

    ) {}

    execute(request: LoginRequest): Promise<LoginResponse> {

        return this.repository.login(request);

    }

}
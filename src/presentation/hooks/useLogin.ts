"use client";

import { useRouter } from "next/navigation";

import { AuthRepository } from "@/infrastructure/repositories/AuthRepository";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { useAuthStore } from "../store/authStore";

export function useLogin() {

    const router = useRouter();

    const authStore = useAuthStore();

    async function login(request: any) {

        const repository = new AuthRepository();

        const useCase = new LoginUseCase(repository);

        const response = await useCase.execute(request);

        authStore.login(response);

        router.push("/dashboard");

    }

    return {

        login

    };

}
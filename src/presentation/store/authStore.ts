import { create } from "zustand";

import { CurrentUser } from "@/domain/entities/CurrentUser";

import { StorageKeys } from "@/shared/constants/storage";

import {
    setTokenCookie,
    deleteTokenCookie
} from "@/shared/utils/cookies";

interface AuthState {

    currentUser: CurrentUser | null;

    login(user: CurrentUser): void;

    logout(): void;

    loadUser(): void;

}

export const useAuthStore = create<AuthState>((set) => ({

    currentUser: null,

    login(user) {

        // Cookie utilizada por el middleware
        setTokenCookie(user.token);

        // Persistencia en el navegador
        localStorage.setItem(

            StorageKeys.TOKEN,

            user.token

        );

        localStorage.setItem(

            StorageKeys.USER,

            JSON.stringify(user)

        );

        localStorage.setItem(

            StorageKeys.EXPIRES_AT,

            user.expiration

        );

        set({

            currentUser: user

        });

    },

    logout() {

        // Eliminar cookie
        deleteTokenCookie();

        // Eliminar únicamente los datos de autenticación
        localStorage.removeItem(StorageKeys.TOKEN);

        localStorage.removeItem(StorageKeys.USER);

        localStorage.removeItem(StorageKeys.EXPIRES_AT);

        set({

            currentUser: null

        });

    },

    loadUser() {

        const user = localStorage.getItem(

            StorageKeys.USER

        );

        if (!user) {

            return;

        }

        set({

            currentUser: JSON.parse(user)

        });

    }

}));
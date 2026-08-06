"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/authStore";

export function useLogout() {

    const router = useRouter();

    const logout = useAuthStore(state => state.logout);

    return () => {

        logout();

        router.replace("/login");

    };

}
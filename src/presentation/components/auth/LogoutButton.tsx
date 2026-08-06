"use client";

import { useLogout } from "@/presentation/hooks/useLogout";

export default function LogoutButton() {

    const logout = useLogout();

    return (

        <button

            onClick={logout}

            className="text-red-600"

        >

            Logout

        </button>

    );

}
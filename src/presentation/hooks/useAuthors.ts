"use client";

import { useQuery } from "@tanstack/react-query";
// Cambiamos AuthorRepository por AuthRepository en la ruta y en la importación:
import { AuthRepository } from "@/infrastructure/repositories/AuthRepository";

export function useAuthors() {
    return useQuery({
        queryKey: ["authors"],
        // Asegúrate de llamar al método que obtiene los autores desde tu AuthRepository
        queryFn: () => AuthRepository.prototype.getAuthors(), 
    });
}
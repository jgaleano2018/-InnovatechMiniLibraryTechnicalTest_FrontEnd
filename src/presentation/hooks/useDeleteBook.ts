"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteBookUseCase } from "@/application/usecases/books/DeleteBookUseCase";

import { BookRepository } from "@/infrastructure/repositories/BookRepository";

export function useDeleteBook() {

    const repository = new BookRepository();

    const useCase = new DeleteBookUseCase(repository);

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: useCase.execute.bind(useCase),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["books"]

            });

        }

    });

}
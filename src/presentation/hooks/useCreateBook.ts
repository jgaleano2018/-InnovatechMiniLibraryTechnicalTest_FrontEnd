"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {

    useMutation,

    useQueryClient

} from "@tanstack/react-query";

import {

    CreateBookUseCase

} from "@/application/usecases/books/CreateBookUseCase";

import {

    BookRepository

} from "@/infrastructure/repositories/BookRepository";

export function useCreateBook() {

    const queryClient = useQueryClient();

    const router = useRouter();

    const repository = new BookRepository();

    const useCase = new CreateBookUseCase(repository);

    return useMutation({

        mutationFn: useCase.execute.bind(useCase),

        onSuccess: () => {

            toast.success(

                "Book created successfully"

            );

            queryClient.invalidateQueries({

                queryKey: ["books"]

            });

            router.push("/books");

        },

        onError: () => {

            toast.error(

                "Error creating book"

            );

        }

    });

}
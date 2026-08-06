"use client";

import { useQuery } from "@tanstack/react-query";

import { BookRepository } from "@/infrastructure/repositories/BookRepository";
import { GetBooksUseCase } from "@/application/usecases/books/GetBooksUseCase";


export function useBooks(search: string) {

    const repository = new BookRepository();

    const useCase = new GetBooksUseCase(repository);

    return useQuery({

        queryKey: ["books"],

        queryFn: () => useCase.execute()

    });

}
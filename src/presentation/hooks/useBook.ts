"use client";

import { useQuery } from "@tanstack/react-query";
import { BookRepository } from "@/infrastructure/repositories/BookRepository";
import { GetBookByIdUseCase } from "@/application/usecases/books/GetBookByIdUseCase";

export function useBook(id: number) {

    const repository = new BookRepository();

    const useCase = new GetBookByIdUseCase(repository);

    return useQuery({

        queryKey: ["book", id],

        queryFn: () => useCase.execute(id),

        enabled: id > 0

    });

}
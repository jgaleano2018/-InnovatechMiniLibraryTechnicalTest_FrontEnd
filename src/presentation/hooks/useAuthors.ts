"use client";

import { useQuery }

from "@tanstack/react-query";

import {

AuthorRepository

}

from "@/infrastructure/repositories/AuthorRepository";

export function useAuthors(){

    const repository=

    new AuthorRepository();

    return useQuery({

        queryKey:["authors"],

        queryFn:()=>repository.getAll()

    });

}
"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {

useMutation,

useQueryClient

}

from "@tanstack/react-query";

import {

BookRepository

}

from "@/infrastructure/repositories/BookRepository";

import {

UpdateBookUseCase

}

from "@/application/usecases/books/UpdateBookUseCase";

export function useUpdateBook(){

const repository=

new BookRepository();

const useCase=

new UpdateBookUseCase(repository);

const router=useRouter();

const queryClient=useQueryClient();

return useMutation({

mutationFn:({

id,

request

}:{

id:number;

request:any;

})=>

useCase.execute(

id,

request

),

onSuccess(){

toast.success(

"Book updated"

);

queryClient.invalidateQueries({

queryKey:["books"]

});

router.push("/books");

}

});

}
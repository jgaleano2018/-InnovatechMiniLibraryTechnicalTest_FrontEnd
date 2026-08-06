"use client";

import { toast } from "sonner";

import {

useMutation,

useQueryClient

}

from "@tanstack/react-query";

import { BorrowRepository }

from "@/infrastructure/repositories/BorrowRepository";

import { CheckOutUseCase }

from "@/application/usecases/borrow/CheckOutUseCase";

export function useCheckOut(){

const repository=

new BorrowRepository();

const useCase=

new CheckOutUseCase(repository);

const queryClient=

useQueryClient();

return useMutation({

mutationFn:

useCase.execute.bind(useCase),

onSuccess(){

toast.success(

"Book borrowed successfully"

);

queryClient.invalidateQueries({

queryKey:["books"]

});

queryClient.invalidateQueries({

queryKey:["borrow"]

});

},

onError(){

toast.error(

"Borrow failed"

);

}

});

}
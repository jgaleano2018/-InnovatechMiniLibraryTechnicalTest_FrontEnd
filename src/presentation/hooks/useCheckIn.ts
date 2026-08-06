"use client";

import { toast } from "sonner";

import {

useMutation,

useQueryClient

}

from "@tanstack/react-query";

import {

BorrowRepository

}

from "@/infrastructure/repositories/BorrowRepository";

import {

CheckInUseCase

}

from "@/application/usecases/borrow/CheckInUseCase";

export function useCheckIn(){

const repository=

new BorrowRepository();

const useCase=

new CheckInUseCase(repository);

const queryClient=

useQueryClient();

return useMutation({

mutationFn:

useCase.execute.bind(useCase),

onSuccess(){

toast.success(

"Book returned successfully"

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

"Return failed"

);

}

});

}
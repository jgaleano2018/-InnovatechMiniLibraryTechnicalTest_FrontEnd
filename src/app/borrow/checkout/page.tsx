"use client";

import CheckOutForm

from "@/presentation/components/borrow/CheckOutForm";

import {

useCheckOut

}

from "@/presentation/hooks/useCheckOut";

export default function BorrowPage(){

const mutation=

useCheckOut();

return(

<main className="max-w-2xl mx-auto mt-10">

<h1 className="text-3xl font-bold mb-8">

Borrow Book

</h1>

<CheckOutForm

loading={mutation.isPending}

onSubmit={

async(values)=>{

await mutation.mutateAsync(values);

}

}

/>

</main>

);

}
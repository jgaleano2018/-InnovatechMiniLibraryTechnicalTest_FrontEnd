"use client";

import CheckInForm

from "@/presentation/components/borrow/CheckInForm";

import {

useCheckIn

}

from "@/presentation/hooks/useCheckIn";

export default function CheckInPage(){

const mutation=

useCheckIn();

return(

<main className="max-w-xl mx-auto mt-10">

<h1 className="text-3xl font-bold mb-8">

Return Book

</h1>

<CheckInForm

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
"use client";

import {

useForm

}

from "react-hook-form";

import {

zodResolver

}

from "@hookform/resolvers/zod";

import {

checkOutSchema,

CheckOutFormData

}

from "@/shared/validations/checkOutSchema";

interface Props{

    onSubmit(

        values:CheckOutFormData

    ):Promise<void>;

    loading:boolean;

}

export default function CheckOutForm({

loading,

onSubmit

}:Props){

const{

register,

handleSubmit,

formState:{errors}

}=useForm<CheckOutFormData>({

resolver:

zodResolver(checkOutSchema)

});

return(

<form

onSubmit={handleSubmit(onSubmit)}

className="space-y-6 bg-white p-8 rounded-xl shadow"

>

<div>

<label>

Book Id

</label>

<input

type="number"

className="border rounded p-3 w-full"

{

...register(

"bookId",

{

valueAsNumber:true

}

)

}

/>

<p className="text-red-500">

{errors.bookId?.message}

</p>

</div>

<div>

<label>

Borrower Name

</label>

<input

className="border rounded p-3 w-full"

{

...register(

"borrowerName"

)

}

/>

<p className="text-red-500">

{errors.borrowerName?.message}

</p>

</div>

<button

className="bg-blue-700 text-white rounded p-3 w-full"

disabled={loading}

>

{

loading

?

"Borrowing..."

:

"Borrow Book"

}

</button>

</form>

);

}
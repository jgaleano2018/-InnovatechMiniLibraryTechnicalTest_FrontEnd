"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {

checkInSchema,

CheckInFormData

}

from "@/shared/validations/checkInSchema";

interface Props{

loading:boolean;

onSubmit(

values:CheckInFormData

):Promise<void>;

}

export default function CheckInForm({

loading,

onSubmit

}:Props){

const{

register,

handleSubmit,

formState:{errors}

}=useForm<CheckInFormData>({

resolver:

zodResolver(checkInSchema)

});

return(

<form

onSubmit={handleSubmit(onSubmit)}

className="space-y-6 bg-white p-8 rounded-xl shadow"

>

<div>

<label>

Borrow Id

</label>

<input

type="number"

className="w-full border rounded p-3"

{

...register(

"borrowId",

{

valueAsNumber:true

}

)

}

/>

<p className="text-red-500">

{errors.borrowId?.message}

</p>

</div>

<button

disabled={loading}

className="bg-green-700 text-white rounded p-3 w-full"

>

{

loading

?

"Returning..."

:

"Return Book"

}

</button>

</form>

);

}
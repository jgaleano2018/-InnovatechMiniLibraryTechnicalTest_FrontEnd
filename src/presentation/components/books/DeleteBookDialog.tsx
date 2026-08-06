"use client";

interface Props{

open:boolean;

onCancel():void;

onConfirm():void;

}

export default function DeleteDialog({

open,

onCancel,

onConfirm

}:Props){

if(!open){

return null;

}

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white rounded-lg p-8">

<h2 className="text-xl">

Delete Book

</h2>

<p className="mt-3">

Are you sure?

</p>

<div className="flex gap-3 mt-6">

<button

onClick={onCancel}

className="border px-5 py-2 rounded"

>

Cancel

</button>

<button

onClick={onConfirm}

className="bg-red-600 text-white px-5 py-2 rounded"

>

Delete

</button>

</div>

</div>

</div>

);

}
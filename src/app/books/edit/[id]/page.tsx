"use client";

import { useParams } from "next/navigation";

import BookForm from "@/presentation/components/books/BookForm";

import { useBook } from "@/presentation/hooks/useBook";

import { useUpdateBook } from "@/presentation/hooks/useUpdateBook";

export default function EditBookPage(){

const params=useParams();

const id=Number(params.id);

const{

data,

isLoading

}=useBook(id);

const updateBook=

useUpdateBook();

if(isLoading){

return <p>Loading...</p>;

}

if(!data){

return <p>Book not found</p>;

}

return(

<BookForm

defaultValues={{

title:data.title,

authorId:data.authorId,

isbn:data.isbn,

publisher:data.publisher,

category:data.category,

publishYear:data.publishYear,

totalCopies:data.totalCopies

}}

loading={updateBook.isPending}

onSubmit={async(values)=>{

await updateBook.mutateAsync({

id,

request:{

bookId:id,

...values

}

});

}}

/>

);

}
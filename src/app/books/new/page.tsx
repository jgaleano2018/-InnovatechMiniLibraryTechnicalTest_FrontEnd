"use client";

import BookForm from "@/presentation/components/books/BookForm";

import {

    useCreateBook

} from "@/presentation/hooks/useCreateBook";

export default function NewBookPage() {

    const mutation = useCreateBook();

    return (

        <main className="max-w-4xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-8">

                New Book

            </h1>

            <BookForm

                loading={mutation.isPending}

                onSubmit={async values => {

                    await mutation.mutateAsync(values);

                }}

            />

        </main>

    );

}
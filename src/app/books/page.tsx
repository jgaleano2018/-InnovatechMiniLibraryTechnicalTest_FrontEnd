"use client";

import { useState } from "react";

import BookSearch from "@/presentation/components/books/BookSearch";

import BookTable from "@/presentation/components/books/BookTable";

import { useBook } from "@/presentation/hooks/useBook";

import { useDeleteBook } from "@/presentation/hooks/useDeleteBook";
import { useBooks } from "@/presentation/hooks/useBooks";

export default function BooksPage() {

    const [search, setSearch] = useState("");

    const {

        data = [],

        isLoading

    } = useBooks(search);

    const deleteBook = useDeleteBook();

    if (isLoading)

        return <p>Loading...</p>;

    return (

        <main className="p-10">

            <h1 className="text-3xl font-bold">

                Books

            </h1>

            <div className="mt-6">

                <BookSearch

                    value={search}

                    onChange={setSearch}

                />

            </div>

            <div className="mt-8">

                <BookTable

                    books={data}

                    onDelete={(id) =>

                        deleteBook.mutate(id)

                    }

                />

            </div>

        </main>

    );

}
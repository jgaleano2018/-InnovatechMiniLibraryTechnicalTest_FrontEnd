"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importamos useRouter para la navegación

import BookSearch from "@/presentation/components/books/BookSearch";
import BookTable from "@/presentation/components/books/BookTable";
import { useBook } from "@/presentation/hooks/useBook";
import { useDeleteBook } from "@/presentation/hooks/useDeleteBook";
import { useBooks } from "@/presentation/hooks/useBooks";

export default function BooksPage() {
    const [search, setSearch] = useState("");
    const router = useRouter(); // Hook para navegar dinámicamente

    const {
        data = [],
        isLoading
    } = useBooks(search);

    const deleteBook = useDeleteBook();

    // Handler para redirigir a la edición del libro
    const handleEdit = (id: string | number) => {
        router.push(`/books/edit/${id}`); // Ajusta esta ruta si tu carpeta de edición se llama /books/[id]
    };

    // Handler para eliminar el libro
    const handleDelete = (id: string | number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
            deleteBook.mutate(id);
        }
    };

    if (isLoading)
        return <p>Loading...</p>;

    return (
        <main className="p-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Books
                </h1>

                <Link
                    href="/books/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <span>+</span> New
                </Link>
            </div>

            <div className="mt-6">
                <BookSearch
                    value={search}
                    onChange={setSearch}
                />
            </div>

            <div className="mt-8">
                <BookTable
                    books={data}
                    onEdit={handleEdit} // Pass de la función onEdit
                    onDelete={handleDelete} // Pass de la función onDelete
                    isDeleting={deleteBook.isPending} // Opcional: para desactivar mientras elimina
                />
            </div>
        </main>
    );
}
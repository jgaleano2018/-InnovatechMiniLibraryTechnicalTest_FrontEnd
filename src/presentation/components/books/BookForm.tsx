"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    bookSchema,
    BookFormData
} from "@/shared/validations/bookSchema";

import { useAuthors } from "@/presentation/hooks/useAuthors";

// Datos por defecto requeridos en caso de mock/fallback
const MOCK_AUTHORS = [
    { authorId: 1, firstName: "George", lastName: "Orwell" },
    { authorId: 2, firstName: "J.K.", lastName: "Rowling" },
    { authorId: 3, firstName: "Stephen", lastName: "King" }
];

interface Props {
    defaultValues?: BookFormData;
    onSubmit(values: BookFormData): Promise<void>;
    loading?: boolean;
}

export default function BookForm({
    defaultValues,
    onSubmit,
    loading = false
}: Props) {
    const { data: fetchedAuthors } = useAuthors();
    
    // Si la API aún no devuelve datos o no está conectada, usa el listado base
    const authors = fetchedAuthors && fetchedAuthors.length > 0 
        ? fetchedAuthors 
        : MOCK_AUTHORS;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        defaultValues
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-8 rounded-xl shadow"
        >
            <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                    {...register("title")}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.title?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">Author</label>
                <select
                    {...register("authorId", {
                        valueAsNumber: true
                    })}
                    className="w-full border rounded p-3 bg-white"
                >
                    <option value="">Select Author</option>
                    {authors.map((author) => (
                        <option
                            key={author.authorId}
                            value={author.authorId}
                        >
                            {author.firstName} {author.lastName}
                        </option>
                    ))}
                </select>
                {/* Visualización de error si no se selecciona ningún autor */}
                <span className="text-red-500 text-sm">
                    {errors.authorId?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">ISBN</label>
                <input
                    {...register("isbn")}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.isbn?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">Publisher</label>
                <input
                    {...register("publisher")}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.publisher?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">Category</label>
                <input
                    {...register("category")}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.category?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">Publish Year</label>
                <input
                    type="number"
                    {...register("publishYear", {
                        valueAsNumber: true
                    })}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.publishYear?.message}
                </span>
            </div>

            <div>
                <label className="block mb-2 font-medium">Total Copies</label>
                <input
                    type="number"
                    {...register("totalCopies", {
                        valueAsNumber: true
                    })}
                    className="w-full border rounded p-3"
                />
                <span className="text-red-500 text-sm">
                    {errors.totalCopies?.message}
                </span>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded p-3 w-full transition-colors disabled:bg-blue-300"
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
}
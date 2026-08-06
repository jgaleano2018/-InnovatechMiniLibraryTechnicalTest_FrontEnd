"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    bookSchema,
    BookFormData
} from "@/shared/validations/bookSchema";

import { useAuthors } from "@/presentation/hooks/useAuthors";

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

    const { data: authors = [] } = useAuthors();

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

                <label className="block mb-2">

                    Title

                </label>

                <input
                    {...register("title")}
                    className="w-full border rounded p-3"
                />

                <span className="text-red-500 text-sm">

                    {errors.title?.message}

                </span>

            </div>

            <div>

                <label className="block mb-2">

                    Author

                </label>

                <select
                    {...register("authorId", {

                        valueAsNumber: true

                    })}
                    className="w-full border rounded p-3"
                >

                    <option value="">

                        Select Author

                    </option>

                    {

                        authors.map(author => (

                            <option
                                key={author.authorId}
                                value={author.authorId}
                            >

                                {author.firstName} {author.lastName}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div>

                <label className="block mb-2">

                    ISBN

                </label>

                <input
                    {...register("isbn")}
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label className="block mb-2">

                    Publisher

                </label>

                <input
                    {...register("publisher")}
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label className="block mb-2">

                    Category

                </label>

                <input
                    {...register("category")}
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label className="block mb-2">

                    Publish Year

                </label>

                <input
                    type="number"
                    {...register("publishYear", {

                        valueAsNumber: true

                    })}
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label className="block mb-2">

                    Total Copies

                </label>

                <input
                    type="number"
                    {...register("totalCopies", {

                        valueAsNumber: true

                    })}
                    className="w-full border rounded p-3"
                />

            </div>

            <button
                disabled={loading}
                className="bg-blue-600 text-white rounded p-3 w-full"
            >

                {

                    loading

                        ? "Saving..."

                        : "Save"

                }

            </button>

        </form>

    );

}
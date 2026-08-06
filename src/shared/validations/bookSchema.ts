import { z } from "zod";

export const bookSchema = z.object({

    title: z
        .string()
        .min(3, "Title is required")
        .max(200),

    authorId: z
        .number({
            required_error: "Author is required"
        })
        .positive(),

    isbn: z
        .string()
        .min(10)
        .max(20),

    publisher: z
        .string()
        .min(2)
        .max(150),

    category: z
        .string()
        .min(2)
        .max(100),

    publishYear: z
        .number()
        .min(1000)
        .max(new Date().getFullYear()),

    totalCopies: z
        .number()
        .positive()

});

export type BookFormData =

z.infer<typeof bookSchema>;
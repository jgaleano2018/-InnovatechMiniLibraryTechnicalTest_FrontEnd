import { z } from "zod";

export const checkOutSchema = z.object({

    bookId: z

        .number({

            required_error: "Book is required"

        })

        .positive(),

    borrowerName: z

        .string()

        .min(3)

        .max(150)

});

export type CheckOutFormData =

z.infer<typeof checkOutSchema>;
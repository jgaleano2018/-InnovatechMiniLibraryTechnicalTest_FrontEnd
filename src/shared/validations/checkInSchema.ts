import { z } from "zod";

export const checkInSchema = z.object({

    borrowId: z

        .number({

            required_error: "Borrow Id is required"

        })

        .positive()

});

export type CheckInFormData =

z.infer<typeof checkInSchema>;
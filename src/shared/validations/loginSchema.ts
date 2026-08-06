import { z } from "zod";

export const loginSchema = z.object({

    email: z.string().email(),

    firstName: z.string().min(2),

    lastName: z.string().min(2),

    providerName: z.string().min(2),

    ssoUserIdentifier: z.string().min(2)

});

export type LoginFormData = z.infer<typeof loginSchema>;
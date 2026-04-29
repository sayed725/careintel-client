import { z } from "zod";

export const loginZodSchema = z.object({
    email : z.string().email("Invalid email address"),
    password : z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export const registerZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long"),
    contactNumber: z.string().min(1, "Contact number is required"),
    address: z.string().min(1, "Address is required"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IRegisterPayload = z.infer<typeof registerZodSchema>;
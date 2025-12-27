import { z } from "zod"


export const UserNameValidation = z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be less then 20 characters").regex(/^[a-z][a-z0-9_]*$/, "Username can only contain lowercase letters, numbers and _ and must start with a letter")

export const SignUpSchema = z.object({
    username: UserNameValidation,
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    fullName: z.string().min(1, "Full name is required").max(50, "Name can be maximum of 50 characters."),
})

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const VerifySchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.number(),
})


export type SignUpInput = z.infer<typeof SignUpSchema>
export type LoginInput = z.infer<typeof LoginSchema>
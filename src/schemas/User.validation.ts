import { z } from "zod"

export const SignUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
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
    otp: z.number().min(6, "OTP must be 6 digits long"),
})


export type SignUpInput = z.infer<typeof SignUpSchema>
export type LoginInput = z.infer<typeof LoginSchema>
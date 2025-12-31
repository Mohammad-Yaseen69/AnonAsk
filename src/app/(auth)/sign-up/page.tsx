'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounceValue } from "usehooks-ts"
import { checkUserName, signupQuery } from "@/queries/Signup"
import { SignUpInput, SignUpSchema } from "@/schemas/User.validation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, Eye, EyeOff, User } from "lucide-react"
import Link from "next/link"

const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [debouncedUsername] = useDebounceValue(userName, 500)

    const form = useForm<SignUpInput>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: "",
            fullName: ''
        }
    })

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['UsernameSuggestion', debouncedUsername],
        queryFn: () => checkUserName(debouncedUsername),
        enabled: !!debouncedUsername && debouncedUsername.length >= 3,
    })

    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: SignUpInput) => signupQuery(payload),
        onSuccess: (data) => {
            form.reset()
            setUserName('')
            toast.success("Signup Successful", {
                description: "An OTP has been sent to your email.",
                position: "bottom-right"
            })

            setTimeout(() => {
                router.push(`/verify/${(data.data as SignUpInput)?.email}`)
            }, 1000)
        },
        onError: (error) => {
            toast.error(error.message || "Signup Failed", {
                description: "Please try again later.",
                position: "bottom-right",
            })
        },
    })

    const onSubmit = (data: SignUpInput) => {
        mutateAsync(data)
    }

    const isUsernameAvailable = data && !isError
    const isUsernameTaken = isError

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-lg bg-slate-900/50 border-violet-500/20 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-3 text-center pb-3">
                    <div className="mx-auto w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                            <User />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight gradientText mb-0">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-base text-slate-400">
                        Join AnonAsk to start receiving anonymous feedback
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                                className="h-11 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Username */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Username</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="johndoe"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        setUserName(e.target.value)
                                                    }}
                                                    className="h-11 pr-10 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                                />
                                                {isLoading && (
                                                    <Loader2 className="absolute right-3 top-3 h-5 w-5 animate-spin text-violet-400" />
                                                )}
                                                {!isLoading && isUsernameAvailable && userName.length >= 3 && (
                                                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                                                )}
                                                {!isLoading && isUsernameTaken && userName.length >= 3 && (
                                                    <XCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                        </FormControl>
                                        {isLoading && (
                                            <FormDescription className="text-xs text-slate-400">
                                                Checking availability...
                                            </FormDescription>
                                        )}
                                        {!isLoading && isUsernameAvailable && userName.length >= 3 && (
                                            <FormDescription className="text-xs text-green-500">
                                                ✓ Username is available!
                                            </FormDescription>
                                        )}
                                        {!isLoading && isUsernameTaken && userName.length >= 3 && (
                                            <FormDescription className="text-xs text-red-400">
                                                {error?.message || "Username is already taken"}
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...field}
                                                className="h-11 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-200">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-11 pr-10 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-slate-400 hover:text-violet-400 transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormDescription className="text-xs text-slate-400">
                                            Must be at least 6 characters long
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isPending || isLoading || isUsernameTaken}
                                className="w-full h-11 gradientBtn"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-400">Already have an account? </span>
                        <Link
                            href="/sign-in"
                            className="font-semibold text-violet-400 hover:text-violet-300 hover:underline transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp
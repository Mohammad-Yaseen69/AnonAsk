'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LoginInput, LoginSchema } from "@/schemas/User.validation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Eye, EyeOff, User } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"

const SignUp = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: "",
    }
  })

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)



  const onSubmit = async (data: LoginInput) => {
    setIsPending(true)
    const result = await signIn('credentials', {
      ...data,
      redirect: false
    })

    console.log(result)
    if (!result?.ok) {
      toast.error(result?.error || "Login Failed", {
        description: result?.status === 401 ? "Please provide valid credentials." : "Please try again later!",
        position: "bottom-right",
      })
    } else {
      toast.success("Login Successful", {
        description: "You login is successfull.",
        position: "bottom-right"
      })

      setTimeout(() => {
        router.push(`/dashboard`)
      }, 1000)
    }
    setIsPending(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg cardBg">
        <CardHeader className="space-y-3 text-center pb-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
              <User />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight gradientText mb-0">
            Login Account
          </CardTitle>
          <CardDescription className="text-base text-slate-400">
            Welcome back enter your credentials to use AnonAsk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Email / Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email or username"
                        {...field}
                        className="h-11 bg-slate-800/50 border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 text-white placeholder:text-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 gradientBtn"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Don&apos;t have an account? </span>
            <Link
              href="/sign-up"
              className="font-semibold text-violet-400 hover:text-violet-300 hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
'use client'
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User } from "lucide-react"
import { useState, useEffect } from "react"
import { OTPInput } from "@/components/OTPInput"
import { verifyQuery, resendEmailQuery } from "@/queries/Verify"

const Verify = () => {
    const router = useRouter()
    const params = useParams()
    const paramEmail = params.email as string
    const email = decodeURIComponent(paramEmail)
    const [otp, setOtp] = useState('')
    const [timer, setTimer] = useState(120)
    const [isTimerActive, setIsTimerActive] = useState(true)

    useEffect(() => {
        if (!isTimerActive || timer <= 0) {
            return
        }

        const interval = setInterval(() => {
            setTimer((prev) => {
                const newValue = prev - 1
                if (newValue <= 0) {
                    setIsTimerActive(false)
                    return 0
                }
                return newValue
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timer, isTimerActive])

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const { mutateAsync: verifyMutation, isPending: isVerifying } = useMutation({
        mutationFn: (payload: { email: string; otp: number }) => verifyQuery(payload),
        onSuccess: () => {
            toast.success("Verification Successful", {
                description: "Your account has been verified successfully.",
                position: "bottom-right"
            })
            setTimeout(() => {
                router.push("/sign-in")
            }, 1000)
        },
        onError: (error) => {
            toast.error(error.message || "Verification Failed", {
                description: "Please check your OTP and try again.",
                position: "bottom-right",
            })
        },
    })

    const { mutateAsync: resendMutation, isPending: isResending } = useMutation({
        mutationFn: (payload: { email: string }) => resendEmailQuery(payload),
        onSuccess: () => {
            setTimer(120)
            setIsTimerActive(true)
            toast.success("Email Resent", {
                description: "A new OTP has been sent to your email.",
                position: "bottom-right"
            })
        },
        onError: (error) => {
            toast.error(error.message || "Failed to Resend Email", {
                description: "Please try again later.",
                position: "bottom-right",
            })
        },
    })

    const handleVerify = () => {
        if (otp.length !== 6) {
            toast.error("Invalid OTP", {
                description: "Please enter a 6-digit OTP.",
                position: "bottom-right",
            })
            return
        }
        verifyMutation({ email, otp: parseInt(otp) })
    }

    const handleResend = () => {
        resendMutation({ email })
    }

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
                        Verify Account
                    </CardTitle>
                    <CardDescription className="text-base text-slate-400">
                        Enter the OTP sent to your email to verify your account
                    </CardDescription>
                    {email && (
                        <CardDescription className="text-sm text-violet-400 mt-2">
                            {email}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="w-full flex justify-center">
                        <OTPInput otp={otp} setOtp={setOtp} />
                    </div>

                    <Button
                        onClick={handleVerify}
                        disabled={!otp || otp.length !== 6 || isVerifying}
                        className="w-full mt-10 h-11 gradientBtn"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify"
                        )}
                    </Button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400 mb-3">
                            Didn&apos;t receive the code?
                        </p>
                        <Button
                            onClick={handleResend}
                            disabled={isTimerActive || isResending}
                            variant="ghost"
                            className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 disabled:text-slate-500 disabled:cursor-not-allowed"
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : isTimerActive ? (
                                `Resend in ${formatTimer(timer)}`
                            ) : (
                                "Resend OTP"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Verify
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-14 w-14 items-center justify-center text-lg font-semibold text-white transition-all outline-none",
        "bg-slate-800/50 border border-slate-700 rounded-lg",
        "data-[active=true]:border-violet-500 data-[active=true]:ring-2 data-[active=true]:ring-violet-500/20 data-[active=true]:bg-slate-800/70",
        "data-[active=true]:shadow-[0_0_20px_rgba(139,92,246,0.3)] data-[active=true]:scale-105",
        "hover:border-violet-500/50 hover:bg-slate-800/60",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        "data-[active=true]:aria-invalid:border-red-500 data-[active=true]:aria-invalid:ring-red-500/30",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-violet-400 h-6 w-0.5 duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="mx-1 text-violet-500/40"
      {...props}
    >
      <MinusIcon className="h-5 w-5" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

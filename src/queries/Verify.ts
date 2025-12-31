import { ResendEmailInput } from "@/schemas/User.validation"
import { IResponse } from "@/types/Responses"
import axios, { AxiosError } from "axios"

export interface VerifyInput {
    email: string
    otp: number
}

export const verifyQuery = async (payload: VerifyInput) => {
    try {
        const res = await axios.post<IResponse>(`/api/auth/verify`, payload)
        return res.data
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to verify')
    }
}

export const resendEmailQuery = async (payload: ResendEmailInput) => {
    try {
        const res = await axios.post<IResponse>(`/api/auth/resend-email`, payload)
        return res.data
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to resend email')
    }
}


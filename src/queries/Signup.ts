import { SignUpInput } from "@/schemas/User.validation"
import { IResponse } from "@/types/Responses"
import axios, { AxiosError } from "axios"


export const checkUserName = async (username: string) => {
    if (!username) return null

    try {
        const res = await axios.get<IResponse>(`/api/auth/check-username?username=${username}`)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to check username')
    }
}

export const signupQuery = async (payload: SignUpInput) => {
    try {
        const res = await axios.post<IResponse>(`/api/auth/signup`, payload)
        return res.data
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to signup')
    }
}

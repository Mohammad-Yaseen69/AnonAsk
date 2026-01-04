import { UserType } from "@/models/User.model"
import { CreateReplyInput } from "@/schemas/Replies.validation"
import { IResponse } from "@/types/Responses"
import axios, { AxiosError } from "axios"

export const getUserInformation = async (username?: string) => {
    try {
        const res = await axios.get<IResponse>(`/api/auth/get-public-info/${username}`)
        return res.data?.data as UserType
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to get user')
    }
}

export const createReply = async (payload: CreateReplyInput) => {
    try {
        const res = await axios.post<IResponse>(`/api/reply`, payload)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to create question')
    }
}
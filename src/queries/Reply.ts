import { QuestionType } from "@/models/Questions.model"
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

export const getQuestionInformation = async (id?: string) => {
    try {
        const res = await axios.get<IResponse>(`/api/questions/get-public-info/${id}`)
        return res.data?.data as QuestionType
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

const generateSuggestionToken = async () => {
    type Response = {
        token: string
    }
    try {
        const res = await axios.get<IResponse>(`/api/reply/generate-suggest-token`)
        return (res.data?.data as Response).token as string
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message)
    }
}

export const getAISuggestion = async (questionText: string) => {
    type Payload = {
        question: string
        token?: string
    }

    try {
        const payload: Payload = {
            question: questionText
        }

        const token = await generateSuggestionToken()

        payload.token = token

        const res = await axios.post(`/api/reply/suggest`, payload, {
            responseType: 'text'
        })
        return res.data?.split(" | ")
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to create question')
    }
}
import { QuestionType } from "@/models/Questions.model"
import { Repliestype } from "@/models/Replies.model"
import { QuestionInput, UpdateQuestionInput } from "@/schemas/Questions.validation"
import { IResponse } from "@/types/Responses"
import axios, { AxiosError } from "axios"

export const getQuestionsList = async () => {
    try {
        const res = await axios.get<IResponse>(`/api/questions`)
        return res.data.success ? res.data.data as QuestionType[] : []
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to get questions list')
    }
}

export const createQuestion = async (payload: QuestionInput) => {
    try {
        const res = await axios.post<IResponse>(`/api/questions`, payload)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to create question')
    }
}

export const deleteQuestion = async (questionId: string) => {
    try {
        const res = await axios.delete<IResponse>(`/api/questions/${questionId}`)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to delete question')
    }
}

export const updateQuestion = async (questionId: string, payload: UpdateQuestionInput) => {
    try {
        const res = await axios.put<IResponse>(`/api/questions/${questionId}`, payload)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to update question')
    }
}

export const getQuestionReplies = async (questionId: string) => {
    try {
        const res = await axios.get<IResponse>(`/api/questions/${questionId}`)
        return res.data?.success ? res.data.data as QuestionType : null
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to get question replies')
    }
}

export const toggleFeedbackCheck = async () => {
    try {
        const res = await axios.put<IResponse>(`/api/reply/feedback-toggle-check`)
        return res.data.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to toggle')
    }
}

export const getDirectReplies = async () => {
    try {
        const res = await axios.get<IResponse>(`/api/reply`)
        return res.data.success ? res.data.data as Repliestype[] : []
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to get direct replies')
    }
}

export const deleteReply = async (replyId: string) => {
    try {
        const res = await axios.delete<IResponse>(`/api/reply/${replyId}`)
        return res.data?.message
    } catch (err) {
        const error = err as AxiosError<IResponse>
        throw new Error(error?.response?.data?.message || 'Failed to delete reply')
    }
}
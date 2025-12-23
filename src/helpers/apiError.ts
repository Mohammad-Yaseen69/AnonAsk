import { IResponse } from "@/types/Responses";

export const ApiError = (status: number, message: string, data?: unknown): IResponse => {
    return {
        status,
        message,
        data,
        success: false
    }
}
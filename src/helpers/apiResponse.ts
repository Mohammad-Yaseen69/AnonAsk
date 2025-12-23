import { IResponse } from "@/types/Responses";

export const ApiResponse = (status: number, message: string, data?: unknown): IResponse => {
    return {
        status,
        message,
        data,
        success: true
    }
}
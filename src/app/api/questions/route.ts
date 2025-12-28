import { ApiResponse } from "@/helpers/apiResponse";
import { checkAuth } from "@/helpers/checkAuth";
import { validate } from "@/helpers/validatePayload";
import dbConnect from "@/lib/dbConnect";
import Questions from "@/models/Questions.model";
import { Error } from "../auth/check-username/route";
import { QuestionInput, QuestionSchema } from "@/schemas/Questions.validation";

export async function POST(req: Request) {
    dbConnect()
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user

        const body = await req.json()

        const data = await validate(QuestionSchema, body)

        if (!data.success) {
            const errors: Error[] = data.error?.data as Error[]
            return Response.json(ApiResponse(400, errors[0]?.message as string), { status: 400 });
        }
        const safeData = data.data as QuestionInput

        const newlyCreatedQuestion = new Questions({
            questionText: safeData?.questionText,
            userId: user?._id,
        })

        if (!newlyCreatedQuestion) {
            return Response.json(ApiResponse(500, "Failed to create question"), { status: 500 })
        }

        await newlyCreatedQuestion.save()

        return Response.json(ApiResponse(200, "Question created successfully", newlyCreatedQuestion), { status: 200 })
    } catch (error) {
        console.log("Error in questions route", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function GET() {
    await dbConnect()
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user

        const questions = await Questions.find({ userId: user?._id }).sort({ createdAt: -1 })

        return Response.json(ApiResponse(200, "Questions fetched successfully", questions), { status: 200 })
    } catch (error) {
        console.log("Error while fetching questions", error)
        return Response.json(ApiResponse(500, "Internal Server Error"), { status: 500 })
    }
}
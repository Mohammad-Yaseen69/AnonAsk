import { ApiResponse } from "@/helpers/apiResponse";
import { checkAuth } from "@/helpers/checkAuth";
import { validate } from "@/helpers/validatePayload";
import dbConnect from "@/lib/dbConnect";
import Questions from "@/models/Questions.model";
import Replies from "@/models/Replies.model";
import { UpdateQuestionInput, UpdateQuestionSchema } from "@/schemas/Questions.validation";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user
        const param = await params
        const id = param.id

        const body = await req.json()

        const data = await validate(UpdateQuestionSchema, body)

        if (!data.success) {
            const errors: Error[] = data.error?.data as Error[]
            return Response.json(ApiResponse(400, errors[0]?.message as string), { status: 400 });
        }

        const safeData = data.data as UpdateQuestionInput

        const question = await Questions.findOne({ userId: user?._id, _id: id })

        if (!question) {
            return Response.json(ApiResponse(404, "Question not found"), { status: 404 })
        }

        if (typeof safeData.isActive === "boolean") {
            question.isActive = safeData.isActive
        }
        question.questionText = safeData.questionText

        await question.save()

        return Response.json(ApiResponse(200, "Question status updated successfully", question), { status: 200 })
    } catch (error) {
        console.log("Error in updating question", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user
        const param = await params
        const id = param.id

        const deletedQuestion = await Questions.findOneAndDelete({
            userId: user?._id,
            _id: id
        })

        await Replies.deleteMany({
            questionId: id,
            userId: user?._id
        })

        if (!deletedQuestion) {
            return Response.json(ApiResponse(404, "Question not found"), { status: 404 })
        }

        return Response.json(ApiResponse(200, "Question deleted successfully"), { status: 200 })
    } catch (error) {
        console.log("Error in deleting question", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {

    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user
        const param = await params
        const id = param.id

        const question = await Questions.findOne({
            userId: user?._id,
            _id: id
        }).populate("feedbackAnswers")

        if (!question) {
            return Response.json(ApiResponse(404, "Question not found"), { status: 404 })
        }

        return Response.json(ApiResponse(200, "Question fetch successfully", question), { status: 200 })
    } catch (error) {
        console.log("Error while getting question", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
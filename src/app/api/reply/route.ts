import { ApiResponse } from "@/helpers/apiResponse";
import { checkAuth } from "@/helpers/checkAuth";
import { validate } from "@/helpers/validatePayload";
import dbConnect from "@/lib/dbConnect";
import Replies from "@/models/Replies.model";
import { CreateReplyInput, CreateReplySchema } from "@/schemas/Replies.validation";
import { Error } from "../auth/check-username/route";
import User from "@/models/User.model";
import Questions from "@/models/Questions.model";

export async function GET() {
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user

        const directReplies = await Replies.find({
            userId: user?._id,
            isDirectReply: true
        })

        return Response.json(ApiResponse(200, "Questions fetched successfully", directReplies), { status: 200 })
    } catch (error) {
        console.log("Error while fetching questions", error)
        return Response.json(ApiResponse(500, "Internal Server Error"), { status: 500 })
    }
}

export async function POST(req: Request) {
    await dbConnect()
    try {
        const body = await req.json()
        const data = await validate(CreateReplySchema, body)

        if (!data.success) {
            const errors: Error[] = data.error?.data as Error[]
            return Response.json(ApiResponse(400, errors[0]?.message as string), { status: 400 });
        }

        const safeData = data.data as CreateReplyInput

        const user = await User.findById(safeData.userId)

        if (!user?.isReceivingFeedback) {
            return Response.json(ApiResponse(400, "User is not accepting feedback replies"), { status: 400 });
        }

        if (safeData.isDirectReply) {
            const newDirectReply = new Replies({
                userId: safeData.userId,
                content: safeData.content,
                isDirectReply: true
            })

            await newDirectReply.save()
        } else {
            if (!safeData.questionId) {
                return Response.json(ApiResponse(400, "Question ID is required for non-direct feedback"), { status: 400 });
            }

            const question = await Questions.findById(safeData.questionId)

            if (!question?.isActive) {
                return Response.json(ApiResponse(400, "Cannot send feedback to an inactive question"), { status: 400 });
            }

            const newReply = new Replies({
                userId: safeData.userId,
                questionId: safeData.questionId,
                content: safeData.content,
                isDirectReply: false
            })

            await newReply.save()

            question.feedbackAnswers.push(newReply._id)

            await question.save()
        }

        return Response.json(ApiResponse(200, "Feedback send successfully"), { status: 200 })
    } catch (error) {
        console.log("Error in reply route", error)
        return Response.json(ApiResponse(500, "Internal Server Error"), { status: 500 })
    }
}
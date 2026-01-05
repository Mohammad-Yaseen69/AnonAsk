import { ApiResponse } from "@/helpers/apiResponse"
import { checkAuth } from "@/helpers/checkAuth"
import Questions from "@/models/Questions.model"
import Replies from "@/models/Replies.model"

export async function DELETE(
    _req: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user
        const param = await params
        const replyId = param.id

        const deletedReply = await Replies.findOneAndDelete({
            userId: user?._id,
            _id: replyId
        })

        if (!deletedReply) {
            return Response.json(ApiResponse(404, "Reply not found"), { status: 404 })
        }

        await Questions.findByIdAndUpdate(
            deletedReply.questionId,
            { $pull: { feedbackAnswers: replyId } }
        )

        return Response.json(ApiResponse(200, "Reply deleted successfully"), { status: 200 })
    } catch (error) {
        console.log("Error in deleting reply", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
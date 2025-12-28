import { ApiResponse } from "@/helpers/apiResponse"
import { checkAuth } from "@/helpers/checkAuth"
import Replies from "@/models/Replies.model"

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    try {
        const authcheck = await checkAuth(true)

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user

        const deletedQuestion = await Replies.findOneAndDelete({
            userId: user?._id,
            _id: params.id
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
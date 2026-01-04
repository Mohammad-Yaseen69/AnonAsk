import { ApiResponse } from "@/helpers/apiResponse"
import Questions from "@/models/Questions.model"

export async function GET(_req: Request, { params }: { params: { id: string } }) {

    try {
        const param = await params
        const id = param.id

        const question = await Questions.findOne({
            _id: id
        }).populate("userId")

        if (!question) {
            return Response.json(ApiResponse(404, "Question not found"), { status: 404 })
        }

        return Response.json(ApiResponse(200, "Question fetch successfully", question), { status: 200 })
    } catch (error) {
        console.log("Error while getting question", error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
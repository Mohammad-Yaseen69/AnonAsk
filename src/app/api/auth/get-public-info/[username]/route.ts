import { ApiResponse } from "@/helpers/apiResponse"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User.model"

export const GET = async (
    _req: Request, 
    { params }: { params: Promise<{ username: string }> }
) => {
    await dbConnect()
    try {
        const param = await params
        const { username } = param

        const foundUser = await User.findOne({
            username
        }).select("fullName isReceivingFeedback username isVerified")

        if (!foundUser) {
            return Response.json(ApiResponse(404, "User not found."), { status: 404 })
        }

        if (!foundUser.isVerified) {
            return Response.json(ApiResponse(404, "User is not verified."), { status: 404 })
        }

        return Response.json(ApiResponse(200, "User fetched successfully", foundUser), { status: 200 })
    } catch (error) {
        console.log("Error in get user", error)
        return Response.json(ApiResponse(500, "Internal Server Error"), { status: 500 })
    }
}
import { ApiResponse } from "@/helpers/apiResponse";
import { checkAuth } from "@/helpers/checkAuth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function PUT() {
    await dbConnect()
    try {
        const authcheck = await checkAuth()

        if (!authcheck.success) {
            return Response.json(ApiResponse(authcheck.status || 401, authcheck.message || ""), { status: authcheck.status })
        }

        const user = authcheck.user

        const updatedUser = await User.findByIdAndUpdate(user?._id, {
            $set: {
                isReceivingFeedback: !user?.isReceivingFeedback
            }
        }, { new: true })


        return Response.json(ApiResponse(200, "Check toggle successfully", updatedUser), { status: 200 })
    } catch (error) {
        console.log("Error while toggling feedback check", error)
        return Response.json(ApiResponse(500, "Internal Server Error"), { status: 500 })
    }
}
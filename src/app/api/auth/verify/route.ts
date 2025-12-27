import User from "@/models/User.model";
import VerifyToken from "@/models/VerifyToken.model";
import dbConnect from "@/lib/dbConnect";
import { ApiError } from "@/helpers/apiError";
import { ApiResponse } from "@/helpers/apiResponse";
import { validate } from "@/helpers/validatePayload";
import { VerifySchema } from "@/schemas/User.validation";

export async function POST(req: Request) {
    await dbConnect()
    try {
        const body = await req.json()
        const data = await validate(VerifySchema, body)

        if (!data.success) {
            return Response.json(data.error, { status: 400 });
        }
        const { email, otp } = body

        if (!email || !otp) {
            return Response.json(ApiError(400, "Email and OTP are required"), { status: 400 });
        }
        const isTokenExist = await VerifyToken.findOne({
            email
        })

        if (!isTokenExist) {
            return Response.json(ApiError(400, "Invalid or expired OTP"), { status: 400 });
        }

        const user = await User.findOne({
            email
        })

        if (!user) {
            return Response.json(ApiError(400, "User not found"), { status: 400 });
        }

        const isOtpCorrect = otp === isTokenExist.otp

        if (!isOtpCorrect) {
            return Response.json(ApiError(400, "Invalid OTP"), { status: 400 });
        }

        user.isVerified = true
        await user.save()
        await VerifyToken.deleteOne()


        return Response.json(ApiResponse(200, "User Verified Succcesfully"), { status: 200 });
    } catch (error) {
        console.log("Error while verifying user", error)
        return Response.json(ApiError(500, "Internal Server Error"), { status: 500 });
    }
}
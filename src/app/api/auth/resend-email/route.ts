import User from "@/models/User.model";
import VerifyToken from "@/models/VerifyToken.model";
import { sendEmail } from "@/helpers/sendEmail";
import { ResendEmailSchema, ResendEmailInput } from "@/schemas/User.validation";
import { validate } from "@/helpers/validatePayload";
import dbConnect from "@/lib/dbConnect";
import { ApiError } from "@/helpers/apiError";
import { ApiResponse } from "@/helpers/apiResponse";


export async function POST(req: Request) {
    await dbConnect()
    try {
        const body = await req.json()
        const data = await validate(ResendEmailSchema, body)

        if (!data.success) {
            return Response.json(data.error, { status: 400 });
        }

        const safeData = data.data as ResendEmailInput
        const { email } = safeData 

        const user = await User.findOne({ email })

        if (!user) {
            return Response.json(ApiError(400, "User not found"), { status: 400 });
        }

        if (user.isVerified) {
            return Response.json(ApiError(400, "User is already verified"), { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const emailRes = await sendEmail(email, otp, user.username)

        if (!emailRes.success) {
            return Response.json(ApiResponse(emailRes.status, emailRes.message), { status: 500 })
        }

        const tokenExist = await VerifyToken.findOne({ email })

        if (tokenExist) {
            tokenExist.otp = otp;
            await tokenExist.save()
        } else {
            const verifyToken = new VerifyToken({
                email: email,
                otp: otp,
            })
            await verifyToken.save()
        }

        return Response.json(ApiResponse(200, "Verification email resent successfully", {
            email: email,
            username: user.username
        }), { status: 200 });
    } catch (error) {
        console.log("Error while resending verification email", error)
        return Response.json(ApiError(500, "Internal Server Error"), { status: 500 });
    }
}


import User from "@/models/User.model";
import VerifyToken from "@/models/VerifyToken.model";
import { sendEmail } from "@/helpers/sendEmail";
import { SignUpInput, SignUpSchema } from "@/schemas/User.validation";
import { validate } from "@/helpers/validatePayload";
import { hashPassword } from "@/lib/bcrypt";
import dbConnect from "@/lib/dbConnect";
import { ApiError } from "@/helpers/apiError";
import { ApiResponse } from "@/helpers/apiResponse";


export async function POST(req: Request) {
    await dbConnect()
    try {
        const body = await req.json()
        const data = await validate(SignUpSchema, body)

        if (!data.success) {
            return Response.json(data.error, { status: 400 });
        }

        const safeData = data.data as SignUpInput
        const verifiedUserByUser = await User.findOne({ username: safeData.username, isVerified: true })

        if (verifiedUserByUser) {
            return Response.json(ApiError(400, "Username already taken"), { status: 400 });
        }

        const existingUserByEmail = await User.findOne({ email: safeData.email })

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(ApiError(400, "Email already in use"), { status: 400 });
            }

            const hashedPassword = await hashPassword(safeData.password)
            existingUserByEmail.username = safeData.username
            existingUserByEmail.password = hashedPassword
            existingUserByEmail.fullName = safeData.fullName
            await existingUserByEmail.save()

        } else {
            const hashedPassword = await hashPassword(safeData.password)

            const newlyCreatedUser = new User({
                username: safeData.username,
                email: safeData.email,
                password: hashedPassword,
                fullName: safeData.fullName,
                isVerified: false,
                isReceivingFeedback: true,
            })

            await newlyCreatedUser.save()
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const emailRes = await sendEmail(safeData.email, otp, safeData.username)

        if (!emailRes.success) {
            return Response.json(ApiResponse(emailRes.status, emailRes.message), { status: 500 })
        }

        const tokenExist = await VerifyToken.findOne({ email: safeData.email })

        if (tokenExist) {
            tokenExist.otp = otp;
            await tokenExist.save()
        } else {
            const verifyToken = new VerifyToken({
                email: safeData.email,
                otp: otp,
            })
            await verifyToken.save()
        }

        return Response.json(ApiResponse(200, "Signup successful, verification email sent"), { status: 200 });
    } catch (error) {
        console.log("Error while logging user", error)
        return Response.json(ApiError(500, "Internal Server Error"), { status: 500 });
    }
}
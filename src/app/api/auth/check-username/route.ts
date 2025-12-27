import User from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { ApiError } from "@/helpers/apiError";
import { ApiResponse } from "@/helpers/apiResponse";
import { validate } from "@/helpers/validatePayload";
import { UserNameValidation } from "@/schemas/User.validation";

interface Error {
    field: string,
    message: string
}
export async function GET(req: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get("username")
        const data = await validate(UserNameValidation, username)


        if (!data.success) {
            const errors: Error[] = data.error?.data as Error[]
            return Response.json(ApiResponse(400, errors[0]?.message as string), { status: 400 });
        }

        const safeUsername = data.data

        const isUsernameExists = await User.findOne({
            username: safeUsername || "",
            isVerified: true
        })


        if (isUsernameExists) {
            return Response.json(ApiError(400, "Username is already taken"), { status: 400 });
        }

        return Response.json(ApiResponse(200, "Username is Valid"), { status: 200 });
    } catch (error) {
        console.log("Error while verifying username", error)
        return Response.json(ApiError(500, "Internal Server Error"), { status: 500 });
    }
}
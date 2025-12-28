import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User.model"
import { getServerSession, User as UserType } from "next-auth"

export const checkAuth = async (dbCheck: boolean = false) => {
    if (dbCheck) {
        await dbConnect()
    }
    const session = await getServerSession(authOptions)
    const user: UserType = session?.user as UserType

    if (!user || !session) {
        return {
            status: 401,
            message: "Unauthorized",
            success: false
        }
    }

    if (dbCheck) {
        const doesUserExist = await User.findById(user._id)

        if (!doesUserExist) {
            return {
                status: 401,
                message: "Unauthorized",
                success: false
            }
        }
    }

    return {
        success: true,
        user
    }
}
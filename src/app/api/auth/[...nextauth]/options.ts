import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import { comparePassword } from "@/lib/bcrypt"
import User from "@/models/User.model"



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials): Promise<any | null> {
                await dbConnect()
                const user = await User.findOne({
                    $or: [
                        { email: credentials?.email },
                        { username: credentials?.email }
                    ]
                })

                if (!user) {
                    throw new Error("User not Found")
                }

                if (!user.isVerified) {
                    throw new Error("Please verify your email.")
                }

                const isPasswordCorrect = await comparePassword(credentials?.password || "", user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid Password.")
                }

                return user
            },
        })
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id
                token.username = user.username
                token.email = user.email
                token.isReceivingFeedback = user.isReceivingFeedback
                token.isVerified = user.isVerified
                token.fullName = user.fullName
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string
                session.user.username = token.username as string
                session.user.email = token.email as string
                session.user.isReceivingFeedback = token.isReceivingFeedback as boolean
                session.user.isVerified = token.isVerified as boolean
                session.user.fullName = token.fullName as string
            }
            return session
        }
    }
}
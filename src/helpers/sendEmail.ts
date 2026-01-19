import { resend } from "@/lib/resend";
import VerifyEmail from "../../emails/email";
import { IResponse } from "@/types/Responses";

export const sendEmail = async (email: string, otp: number, username: string): Promise<IResponse> => {
    try {
        await resend.emails.send({
            from: 'Anon Ask <no-reply@anon-ask.site>',
            to: email,
            subject: 'AnonAsk Account Verification',
            react: VerifyEmail({ otp }),
        });
        console.log(`Email sent to ${email}`)
        return {
            success: true,
            status: 200,
            message: 'Verification email sent successfully'
        }
    } catch (error) {
        console.log(`Error sending email to ${username} with ${email} email. `, error)
        return {
            success: false,
            status: 500,
            message: 'Error sending verification email'
        }
    }
}
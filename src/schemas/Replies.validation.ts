import z from "zod";

export const CreateReplySchema = z.object({
    content: z.string().max(200, "Content must be less then 200 character."),
    isDirectReply: z.boolean(),
    userId: z.string().min(1, "User id is required"),
    questionId: z.string().optional(),
})

export type CreateReplyInput = z.infer<typeof CreateReplySchema>;
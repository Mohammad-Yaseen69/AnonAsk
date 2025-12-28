import z from "zod"

export const QuestionSchema = z.object({
    questionText: z.string().min(3, "Question must be atleast 3 characters long").max(200, "Question must be less then 200 character.")
})

export const UpdateQuestionSchema = z.object({
    questionText: z.string().min(3, "Question must be atleast 3 characters long").max(200, "Question must be less then 200 character."),
    isActive: z.boolean().optional()
})

export type QuestionInput = z.infer<typeof QuestionSchema>
export type UpdateQuestionInput = z.infer<typeof UpdateQuestionSchema>
import { ZodError, ZodSchema } from "zod";
import { ApiError } from "./apiError";

export async function validate(schema: ZodSchema, payload: unknown) {
    try {
        const data = await schema.parseAsync(payload);
        return { success: true, data };
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const errors = error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return {
                success: false,
                error: ApiError(400, "Validation Failed", errors),
            };
        }
        throw error;
    }
}
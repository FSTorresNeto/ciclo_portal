import { z } from "zod";

export const refreshJwtInputSchema = z.object({
	id: z.number().int(),
	cpf: z.string(),
});
export type RefreshJwtInput = z.infer<typeof refreshJwtInputSchema>;

export const refreshJwtOutputSchema = z.object({
	token: z.string(),
});
export type RefreshJwtOutput = z.infer<typeof refreshJwtOutputSchema>;

export const refreshJwtResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	data: refreshJwtOutputSchema,
});
export type RefreshJwtResponse = z.infer<typeof refreshJwtResponseSchema>;

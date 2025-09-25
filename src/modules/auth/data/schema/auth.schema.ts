import { z } from "zod";
import { userEntitySchema } from "~/modules/shared/entity/user";

export const authInputSchema = z.object({
	login: z.string(),
	password: z.string(),
});
export type AuthInput = z.infer<typeof authInputSchema>;

export const refreshJwtInputSchema = z.object({
	userId: z.number().int(),
	login: z.string(),
});
export type RefreshJwtInput = z.infer<typeof refreshJwtInputSchema>;

export const authOutputSchema = z.object({
	token: z.string(),
	user: userEntitySchema,
});
export type AuthOutput = z.infer<typeof authOutputSchema>;

export const authResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	data: authOutputSchema,
});
export type AuthResponse = z.infer<typeof authResponseSchema>;

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

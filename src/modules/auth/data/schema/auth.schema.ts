import { z } from "zod";
import { userEntitySchema } from "~/modules/shared/entity/user";

export const userInformationSchema = z.object({
	userId: z.number().int(),
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	number: z.string(),
	street: z.string(),
	neighborhood: z.string(),
	city: z.string(),
	country: z.string(),
	user: z.any().nullable(),
	id: z.number().int(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});
export type UserInformation = z.infer<typeof userInformationSchema>;

export const authInputSchema = z.object({
	login: z.string(),
	password: z.string(),
});
export type AuthInput = z.infer<typeof authInputSchema>;

export const authOutputSchema = z.object({
	token: z.string(),
	user: userEntitySchema,
	userInformation: userInformationSchema,
});
export type AuthOutput = z.infer<typeof authOutputSchema>;

export const authResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	data: authOutputSchema,
});
export type AuthResponse = z.infer<typeof authResponseSchema>;

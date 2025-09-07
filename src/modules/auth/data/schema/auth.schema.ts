import { z } from "zod";
import { baseEntitySchema } from "~/modules/shared/data/base-entity";
import { AuthStatus } from "~/modules/shared/data/base-status";

// Inputs

export type AuthInput = {
	login: string;
	password: string;
};

export type RefreshJwtInput = {
	userId: number;
	login: string;
};

// Entity

export const userSchema = baseEntitySchema.extend({
	userId: z.number().int(),
	profileId: z.number().int(),
	companyId: z.number().int(),
	login: z.string(),
	status: z.nativeEnum(AuthStatus),
	loginAttempts: z.number().int(),
	isFirstAccess: z.boolean(),
	passwordAttempts: z.number().int(),
	weeklyLimit: z.coerce.date(),
	email: z.string().email(),
});

// Output

export const authOutput = z.object({
	token: z.string(),
	user: userSchema,
});

export const refreshJwtOutput = z.object({
	token: z.string(),
});

export const refreshJwtOutputShema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	data: refreshJwtOutput,
});

export const authOutputSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	data: authOutput,
});

export type AuthOutput = z.infer<typeof authOutputSchema>;
export type RefreshJwtOutput = z.infer<typeof refreshJwtOutputShema>;
export type User = z.infer<typeof userSchema>;

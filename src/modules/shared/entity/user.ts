import { z } from "zod";
import { baseEntitySchema } from "./base-entity";
import { UserStatus } from "../enums/user-status";
import { AccessLevel } from "../enums/access-level";

export const userEntitySchema = baseEntitySchema.extend({
	userId: z.number().int(),
	login: z.string(),
	name: z.string(),
	email: z.string().email(),
	passwordHash: z.string(),
	status: z.nativeEnum(UserStatus),
	accessLevel: z.nativeEnum(AccessLevel),
	loginAttempts: z.number().int(),
	passwordAttempts: z.number().int(),
	isFirstAccess: z.boolean(),
	profileId: z.number().int(),
	profileName: z.string(),
	companyId: z.number().int(),
	companyName: z.string(),
	position: z.string(),
	firebaseAuth: z.string(),
	weeklyLimit: z.number().int(),
});

export type User = z.infer<typeof userEntitySchema>;

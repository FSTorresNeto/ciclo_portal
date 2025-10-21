import { z } from "zod";
import { baseEntitySchema } from "./base-entity";
import { UserStatus } from "../enums/user-status";
import { AccessLevel } from "../enums/access-level";

export const userEntitySchema = baseEntitySchema.extend({
	userId: z.number().int(),
	login: z.string(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	passwordHash: z.string().optional(),
	status: z.nativeEnum(UserStatus),
	accessLevel: z.nativeEnum(AccessLevel),
	loginAttempts: z.number().int().optional(),
	passwordAttempts: z.number().int().optional(),
	isFirstAccess: z.boolean().optional(),
	profileId: z.number().int().optional(),
	profileName: z.string().optional(),
	companyId: z.number().int(),
	companyName: z.string().optional(),
	position: z.string().optional(),
	firebaseAuth: z.string().optional(),
	weeklyLimit: z.number().int().optional(),
});

export type User = z.infer<typeof userEntitySchema>;

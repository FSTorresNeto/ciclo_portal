import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const profileSchema = baseEntitySchema.extend({
	id: z.number().int(),
	userId: z.number().int(),
	role: z.enum(["admin", "user", "guest"]),
});

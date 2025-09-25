import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const beneficiarySchema = baseEntitySchema.extend({
	id: z.number().int(),
	name: z.string(),
	email: z.string().email().nullable(),
	phone: z.string().nullable(),
	companyId: z.number().int(),
});

import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const programSchema = baseEntitySchema.extend({
	id: z.number().int(),
	name: z.string(),
	description: z.string().nullable(),
	active: z.boolean(),
});

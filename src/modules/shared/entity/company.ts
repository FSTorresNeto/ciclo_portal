import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const companySchema = baseEntitySchema.extend({
	id: z.number().int(),
	name: z.string(),
	cnpj: z.string().nullable(),
	address: z.string().nullable(),
});

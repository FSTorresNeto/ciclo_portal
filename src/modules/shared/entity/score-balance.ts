import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const scoreBalanceSchema = baseEntitySchema.extend({
	id: z.number().int(),
	userId: z.number().int(),
	points: z.number(),
});

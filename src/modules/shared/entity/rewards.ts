import { z } from "zod";
import { baseEntitySchema } from "./base-entity";

export const rewardSchema = baseEntitySchema.extend({
	id: z.number().int(),
	name: z.string(),
	points: z.number().int(),
	active: z.boolean(),
});

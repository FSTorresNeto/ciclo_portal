import { z } from "zod";

export const baseEntitySchema = z.object({
	creationDate: z
		.string()
		.transform((val) => new Date(val))
		.optional(),
	updateDate: z
		.string()
		.transform((val) => new Date(val))
		.optional(),
	deletionDate: z
		.string()
		.nullable()
		.transform((val) => (val ? new Date(val) : null))
		.optional(),
	creationUserId: z.number().optional(),
	updateUserId: z.number().optional(),
});

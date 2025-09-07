import { z } from "zod";

export const baseEntitySchema = z.object({
	creationDate: z.coerce.date(),
	updateDate: z.coerce.date(),
	deletionDate: z.coerce.date().nullable(),
	creationUserId: z.number().int(),
	updateUserId: z.number().int(),
});

import { z } from "zod";

export const errorResponseSchema = z.object({
	status: z.number(),
	message: z.string().nullable(),
	error: z.string().nullable(),
	details: z.any().optional(),
});
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const errorValidator = (response: any) => {
	try {
		return errorResponseSchema.parse(response);
	} catch (e) {
		return {
			status: response?.status ?? 500,
			message: response?.message ?? "Erro desconhecido.",
			error: response?.error ?? null,
			details: response?.details ?? null,
		};
	}
};

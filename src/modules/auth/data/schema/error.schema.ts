import { z } from "zod";

export const errorResponseSchema = z.object({
	status: z.number(), // HTTP status code
	message: z.string().nullable(), // Error message
	error: z.string().nullable(), // Optional error type or code
	details: z.any().optional(), // Optional details for debugging
});
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const errorValidator = (response: any) => {
	// Try to parse the error response
	try {
		return errorResponseSchema.parse(response);
	} catch (e) {
		// Fallback for unexpected error formats
		return {
			status: response?.status ?? 500,
			message: response?.message ?? "Erro desconhecido.",
			error: response?.error ?? null,
			details: response?.details ?? null,
		};
	}
};

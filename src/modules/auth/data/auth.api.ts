import { BaseApi } from "~/modules/shared/api/base.api";
import { type AuthInput, type AuthResponse, authResponseSchema } from "./schema/auth.schema";
import { type RefreshJwtInput, type RefreshJwtResponse, refreshJwtResponseSchema } from "./schema/refresh-jwt.schema";
import { errorValidator } from "./schema/error.schema";
import { env } from "~/env";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}

	async auth(input: AuthInput) {
		try {
			const response = await this.httpClient.post<AuthResponse>("/Auth/Login", input);
			return authResponseSchema.parse(response.data);
		} catch (error: any) {
			throw errorValidator(
				error?.response?.data || {
					status: error?.response?.status || 500,
					message: error?.message || "Erro desconhecido.",
					error: error?.code || null,
					details: error?.response || null,
				},
			);
		}
	}

	async refreshJwt(input: RefreshJwtInput, token: string) {
		try {
			const response = await this.httpClient.post<RefreshJwtResponse>("/Auth/RefreshJwt", input, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return refreshJwtResponseSchema.parse(response.data);
		} catch (error: any) {
			throw errorValidator(
				error?.response?.data || {
					status: error?.response?.status || 500,
					message: error?.message || "Erro desconhecido.",
					error: error?.code || null,
					details: error?.response || null,
				},
			);
		}
	}
}

import { BaseApi } from "~/modules/shared/api/base.api";
import {
	type AuthInput,
	type AuthResponse,
	type RefreshJwtInput,
	type RefreshJwtResponse,
	refreshJwtResponseSchema,
	authResponseSchema,
} from "./schema/auth.schema";
import { env } from "~/env";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}

	async auth(input: AuthInput) {
		const response = await this.httpClient.post<AuthResponse>("/Auth/Login", input);
		return authResponseSchema.parse(response.data);
	}

	async refreshJwt(input: RefreshJwtInput, token: string) {
		const response = await this.httpClient.post<RefreshJwtResponse>("/Auth/RefreshJwt", input, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return refreshJwtResponseSchema.parse(response.data);
	}
}

import { BaseApi } from "~/modules/shared/api/base.api";
import { env } from "~/env";
import {
	type AuthInput,
	type AuthOutput,
	type RefreshJwtInput,
	type RefreshJwtOutput,
	authResponseSchema,
	refreshJwtResponseSchema,
} from "./schema/auth.schema";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}

	async login(input: AuthInput): Promise<AuthOutput> {
		const response = await this.httpClient.post<AuthOutput>("/Auth/Login", input);
		const parsed = authResponseSchema.parse(response.data);
		return parsed.data;
	}

	async refreshJwt(input: RefreshJwtInput, token: string): Promise<RefreshJwtOutput> {
		const response = await this.httpClient.post<RefreshJwtOutput>("/Auth/RefreshJwt", input, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const parsed = refreshJwtResponseSchema.parse(response.data);
		return parsed.data;
	}
}

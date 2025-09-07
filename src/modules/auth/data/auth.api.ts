import { BaseApi } from "~/modules/shared/data/base.api";
import {
	type AuthInput,
	type AuthOutput,
	authOutputSchema,
	type RefreshJwtInput,
	type RefreshJwtOutput,
	refreshJwtOutputShema,
} from "./schema/auth.schema";
import { env } from "~/env";

export class AuthApi extends BaseApi {
	constructor() {
		super(env.NEXT_PUBLIC_API_URL);
	}
	async auth(input: AuthInput) {
		const response = await this.httpClient.post<AuthOutput>("/Auth/Login", input);
		const parsed = authOutputSchema.parse(response.data);
		return parsed.data;
	}

	async refreshJwt(input: RefreshJwtInput, token: string) {
		const response = await this.httpClient.post<RefreshJwtOutput>("/Auth/RefreshJwt", input, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return refreshJwtOutputShema.parse(response.data);
	}
}

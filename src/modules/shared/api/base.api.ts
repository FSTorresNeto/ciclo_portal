import axios, { type AxiosInstance } from "axios";
import { env } from "~/env";

export class BaseApi {
	protected readonly httpClient: AxiosInstance;

	constructor(baseURL?: string, token?: string) {
		this.httpClient = axios.create({
			baseURL: baseURL ?? env.NEXT_PUBLIC_API_URL, // usa env se não passar
			validateStatus: () => true,
			withCredentials: true,
		});

		if (token) {
			this.httpClient.interceptors.request.use((config) => {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			});
		}
	}
}

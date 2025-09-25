import axios, { type AxiosInstance } from "axios";

export class BaseApi {
	protected readonly httpClient: AxiosInstance;

	constructor(baseURL?: string, token?: string) {
		this.httpClient = axios.create({
			baseURL: "http://localhost:5000/admincore/api/AdminCore",
			validateStatus: () => true,
		});

		if (token) {
			this.httpClient.interceptors.request.use((config) => {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			});
		}
	}
}

export type ApiResponse = {
	success: boolean;
	data?: any;
	message?: string;
	status: number;
};

export type AxiosDataResponse = {
	data?: any;
	message?: string;
	success: boolean;
};

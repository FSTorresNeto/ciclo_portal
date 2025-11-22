import { useCallback } from "react";

export function useGenericApiErrorMessage() {
	return useCallback((error: any) => {
		const status = error?.status ?? error?.response?.status;
		const message = error?.message ?? "Erro desconhecido.";
		if (status === 404) return "Recurso não encontrado.";
		if (status === 401) return "Não autorizado. Verifique suas credenciais.";
		if (status === 403) return "Acesso negado.";
		if (status === 500) return "Erro interno do servidor. Tente novamente mais tarde.";
		return typeof message === "string" ? message : "Ocorreu um erro inesperado.";
	}, []);
}

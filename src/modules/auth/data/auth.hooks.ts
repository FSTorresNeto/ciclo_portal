import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AuthApi } from "~/modules/auth/data/auth.api";
import type { RefreshJwtInput, RefreshJwtResponse } from "~/modules/auth/data/schema/auth.schema";

export function useRefreshJwt() {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	return useMutation<RefreshJwtResponse, Error, RefreshJwtInput>({
		mutationFn: async (input) => {
			if (!session?.accessToken) throw new Error("Usuário não autenticado");
			return new AuthApi().refreshJwt(input, session.accessToken);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["refreshJwt"], data);
		},
	});
}

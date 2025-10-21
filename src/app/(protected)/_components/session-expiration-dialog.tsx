"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { Clock, ClockAlert } from "lucide-react";
import type { RefreshJwtInput } from "~/modules/auth/data/schema/auth.schema";
import { Button } from "../../../modules/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useRefreshJwt } from "~/modules/auth/data/auth.hooks";

export function SessionExpirationDialog() {
	const router = useRouter();
	const { data: session, update } = useSession();

	const refreshJwtMutation = useRefreshJwt();
	const [isExpiring, setIsExpiring] = useState(false);
	const [isExpired, setIsExpired] = useState(false);
	const [timeLeft, setTimeLeft] = useState<number>(-1);
	const [visible, setVisible] = useState(false);
	const [renewing, setRenewing] = useState(false);

	useEffect(() => {
		if (!session?.expires) {
			console.log("[Timer] Nenhum session.expires disponível");
			return;
		}

		console.log("[Timer] Iniciando contagem regressiva. Expira em:", session.expires);

		const interval = setInterval(() => {
			const now = new Date();
			const expiry = new Date(session.expires);
			const secondsLeft = differenceInSeconds(expiry, now);

			setTimeLeft(Math.max(0, secondsLeft));
			setIsExpiring(secondsLeft > 0 && secondsLeft <= 30);
			setIsExpired(secondsLeft <= 0);

			if (secondsLeft <= 30 && secondsLeft > 0) {
				if (!visible) setVisible(true);
			} else {
				if (visible) setVisible(false);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [session?.expires]);

	useEffect(() => {
		if (!isExpired) return;

		const timeout = setTimeout(() => {
			router.replace("/");
			setVisible(false);
		}, 10000);

		return () => clearTimeout(timeout);
	}, [isExpired]);

	useEffect(() => {
		const handleUnauthorized = () => {
			setVisible(true);
			setIsExpiring(false);
			setIsExpired(true);
			setTimeLeft(0);
		};

		window.addEventListener("session-expired", handleUnauthorized);
		return () => {
			window.removeEventListener("session-expired", handleUnauthorized);
		};
	}, []);

	async function handleRenewSession() {
		console.log(session);
		const userId = Number(session?.user.id);
		if (!session?.accessToken || !userId) {
			return;
		}

		const input: RefreshJwtInput = {
			userId: userId,
			login: session.user.login,
		};

		try {
			setRenewing(true);

			const refreshed = await refreshJwtMutation.mutateAsync(input);

			await update({
				accessToken: refreshed.data.token,
				authResult: {
					token: refreshed.data.token,
				},
				user: {
					...session.user,
				},
			});

			setVisible(false);
			setIsExpiring(false);
			setIsExpired(false);
			setTimeLeft(-1);
		} catch (error) {
			console.error(error);
		} finally {
			setRenewing(false);
		}
	}

	async function handleLogout() {
		await signOut({ callbackUrl: "/" });
		setVisible(false);
	}

	if ((!isExpiring && !isExpired) || !visible) return null;

	const Icon = isExpired ? <ClockAlert className="h-20 w-20 text-red-600" /> : <Clock className="h-20 w-20 text-yellow-500" />;
	const title = isExpired ? "Sessão Expirada" : "Sua sessão está prestes a expirar";
	const content = isExpired
		? "Você foi desconectado por inatividade."
		: `Faltam ${timeLeft} segundos para o fim da sua sessão. Deseja renová-la?`;

	return (
		<div className="absolute top-4 right-4 w-full max-w-md rounded-xl border border-white bg-[#000000] p-6 text-white shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
			<div className="flex items-start gap-4">
				<div className="text-4xl text-gray-800">{Icon}</div>
				<div className="flex-1">
					<h2 className="text-left text-xl font-semibold text-gray-800">{title}</h2>
					<p className="mt-1 text-left text-sm text-gray-600">{content}</p>
				</div>
			</div>

			<div className="mt-6 flex w-full justify-center gap-3">
				{!isExpired && (
					<div className="w-full">
						<Button
							hierarchy="primary"
							size="default"
							variant="positive"
							className="w-full"
							onClick={handleRenewSession}
							disabled={renewing || refreshJwtMutation.isPending}
						>
							{renewing || refreshJwtMutation.isPending ? "Renovando..." : "Manter sessão"}
						</Button>
					</div>
				)}

				<div className="w-full">
					<Button
						hierarchy="primary"
						size="default"
						variant="negative"
						className="w-full"
						onClick={handleLogout}
						disabled={renewing || refreshJwtMutation.isPending}
					>
						Sair
					</Button>
				</div>
			</div>
		</div>
	);
}

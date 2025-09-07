"use client";

import { AlertTriangle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type BannerProps = {
	message: string;
	type?: "alert" | "error";
	duration?: number; // ms
	onClose: () => void;
};

export function Banner({ message, type = "error", duration = 4000, onClose }: BannerProps) {
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const interval = 50; // update a cada 50ms
		const step = (interval / duration) * 100;

		const timer = setInterval(() => {
			setProgress((p) => {
				if (p <= 0) {
					clearInterval(timer);
					onClose();
					return 0;
				}
				return p - step;
			});
		}, interval);

		return () => clearInterval(timer);
	}, [duration, onClose]);

	const isError = type === "error";

	return (
		<div
			className={`bg-background dark:bg-neutral-80 animate-in fade-in slide-in-from-top-5 fixed top-4 left-1/2 z-50 flex max-w-[400px] min-w-[280px] -translate-x-1/2 flex-col overflow-hidden rounded-lg border border-white shadow-lg`}
		>
			<div className={`flex items-center gap-2 px-4 py-2 text-white ${isError ? "bg-red-500" : "bg-yellow-500 text-black"}`}>
				{isError ? <XCircle className="text-red-60 h-5 w-5" /> : <AlertTriangle className="h-5 w-5 text-yellow-50" />}
				<span className="text-sm font-medium">{message}</span>
			</div>
			{/* Linha de progresso */}
			<div className="bg-alert-foreground h-1 w-full">
				<div className="h-1 bg-white transition-all ease-linear" style={{ width: `${progress}%` }} />
			</div>
		</div>
	);
}

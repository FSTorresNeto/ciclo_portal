"use client";

import Image from "next/image";
import React from "react";
import { LoginForm } from "~/modules/auth/components/login-form";
import { ResetPasswordForm } from "~/modules/auth/components/reset-password-form";

type Step = "login" | "resetPassword";

export default function Page() {
	const [step, setStep] = React.useState<Step>("login");

	const renderForm = () => {
		if (step === "resetPassword") {
			return <ResetPasswordForm onBack={() => setStep("login")} />;
		}
		return <LoginForm onForgotPassword={() => setStep("resetPassword")} />;
	};

	return (
		<div className="bg-background dark:bg-neutral-80 min-h-screen">
			<div className="grid h-dvh w-dvw xl:grid-cols-[2fr_1fr]">
				<aside className="relative hidden xl:block">
					<div className="relative h-full w-full">
						<Image
							src="/homepage-background.webp"
							alt="Image"
							fill
							className="object-cover"
							sizes="(max-width: 1220px) 50vw, 33vw"
						/>
					</div>
				</aside>
				<main className="bg-card text-card-foreground flex flex-col justify-center gap-8 rounded-2xl px-6 py-4 md:px-10 lg:px-16">
					<div className="relative mb-20 h-[180px] w-full">
						<Image src="/logo-ciclo.webp" alt="Image-Logo" className="object-contain" fill />
					</div>
					<h1 className="typography-display-sm">{step === "login" ? "Ciclo" : ""}</h1>
					{renderForm()}
				</main>
			</div>
		</div>
	);
}

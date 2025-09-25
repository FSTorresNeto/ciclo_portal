"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/modules/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/modules/shared/components/ui/form";
import { Input } from "~/modules/shared/components/ui/input";
import { PasswordInput } from "~/modules/shared/components/ui/password-input";
import { taxIdFormater } from "~/modules/shared/utils/formatter/taxId-formater";

export function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [loginError, setLoginError] = React.useState<string | null>(null);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: "",
			password: "",
		},
	});

	const { watch } = form;
	const { cpf, password } = watch();

	const onSubmit = async (data: FormSchema) => {
		setIsLoading(true);
		setLoginError(null);

		if (!data.cpf || !data.password) {
			return router.replace("/dashboard");
		}

		const result = await signIn("credentials", {
			login: data.cpf,
			password: data.password,
			redirect: false,
		});

		if (!result || result.error) {
			setIsLoading(false);
			setLoginError("CPF ou senha inválidos ou erro de rede, tente novamente");
		} else {
			router.replace("/dashboard");
		}
	};

	React.useEffect(() => {
		router.prefetch("/dashboard");
	}, [router]);

	return (
		<Form {...form}>
			<form className="space-y-6 py-8" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="cpf"
					required
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF</FormLabel>
							<FormControl>
								<Input
									placeholder="exemplo: 000.000.000-00"
									type="text"
									inputMode="numeric"
									maxLength={14}
									{...field}
									value={taxIdFormater(field.value)}
									onChange={(e) => {
										const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 11);
										field.onChange(onlyDigits);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					required
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<PasswordInput placeholder="Digite sua senha" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{loginError && <div className="text-red-70 rounded p-2 text-center text-sm font-medium">{loginError}</div>}

				<div className="flex flex-col gap-8">
					<Button size="lg" type="submit" disabled={isLoading || cpf.length < 11 || password.length < 8}>
						{isLoading ? "Entrando..." : "Entrar"}
					</Button>
					<Button type="button" onClick={onForgotPassword} variant="neutral" hierarchy="tertiary">
						Recuperar senha
					</Button>
				</div>
			</form>
		</Form>
	);
}

const formSchema = z.object({
	cpf: z
		.string({ required_error: "CPF é obrigatório" })
		.transform((val) => val.replace(/\D/g, ""))
		.refine((val) => val.length === 11, {
			message: "CPF deve conter 11 números",
		}),
	password: z.string({ required_error: "Senha é obrigatória" }).min(1, { message: "Senha é obrigatória" }),
});
type FormSchema = z.infer<typeof formSchema>;

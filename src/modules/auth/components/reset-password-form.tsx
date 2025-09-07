"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/modules/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/modules/shared/components/ui/form";
import { Input } from "~/modules/shared/components/ui/input";
import { OTPInput } from "~/modules/shared/components/ui/input-otp";

export function ResetPasswordForm({ onBack }: { onBack: () => void }) {
	const [hasUser, setHasUser] = React.useState<boolean>(false);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: "",
			code: "",
		},
	});

	const router = useRouter();

	const handleComplete = (value: string) => {
		alert("valores " + value);
	};

	const onSubmit = (_: FormSchema) => {
		router.push("/");
	};

	return (
		<Form {...form}>
			<form className="space-y-6 py-8" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name={hasUser ? "code" : "cpf"}
					required
					render={({ field }) => (
						<FormItem>
							<FormLabel>{hasUser ? "Código de autenticação" : "CPF"}</FormLabel>
							<FormControl>
								{hasUser ? (
									<OTPInput
										numberOfDigits={4}
										value={field.value}
										onChange={field.onChange}
										onComplete={handleComplete}
										autoFocus
									/>
								) : (
									<Input placeholder="exemplo: 000.000.000-00" type="cpf" {...field} />
								)}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-8">
					{hasUser ? (
						<Button
							size="lg"
							type="submit"
							onClick={() => {
								setHasUser(true);
							}}
						>
							Enviar Solicitação
						</Button>
					) : (
						<Button
							size="lg"
							type="submit"
							onClick={() => {
								setHasUser(true);
							}}
						>
							Solicitar recuperação de senha
						</Button>
					)}

					{hasUser ? (
						<Button
							asChild
							variant="neutral"
							hierarchy="tertiary"
							onClick={() => {
								setHasUser(false);
								form.setValue("code", "");
							}}
						>
							<Link href="#">Voltar</Link>
						</Button>
					) : (
						<Button
							asChild
							variant="neutral"
							hierarchy="tertiary"
							onClick={() => {
								onBack();
							}}
						>
							<Link href="#">Voltar</Link>
						</Button>
					)}
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
	code: z.string({ required_error: "Token é obrigatório" }).min(1, { message: "Token é obrigatório" }).optional(),
});
type FormSchema = z.infer<typeof formSchema>;

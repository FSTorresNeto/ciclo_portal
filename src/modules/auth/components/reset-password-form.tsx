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
		mode: "onChange", // Validar ao digitar
	});

	const router = useRouter();

	// Monitorar os valores do formulário
	const cpfValue = form.watch("cpf");
	const codeValue = form.watch("code");

	// Verificar se o CPF é válido (tem 11 dígitos após remover não-numéricos)
	const isCpfValid = cpfValue.replace(/\D/g, "").length === 11;

	// Verificar se o código OTP está completo (4 dígitos)
	const isCodeValid = codeValue?.length === 4;

	const handleComplete = (value: string) => {
		form.setValue("code", value);
	};

	const onSubmit = (data: FormSchema) => {
		if (!hasUser) {
			// Se estamos na etapa do CPF, mude para a etapa do código
			if (isCpfValid) {
				setHasUser(true);
			}
		} else {
			// Se estamos na etapa do código, continue com a navegação
			if (isCodeValid) {
				router.push("/");
			}
		}
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
										onChange={(value) => {
											field.onChange(value);
											// Não precisamos chamar handleComplete aqui, pois a função onComplete faz isso
										}}
										onComplete={handleComplete}
										autoFocus
									/>
								) : (
									<Input
										placeholder="exemplo: 000.000.000-00"
										type="text"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											form.trigger("cpf"); // Força revalidação do campo após alteração
										}}
									/>
								)}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-8">
					{hasUser ? (
						<Button size="lg" type="submit" disabled={!isCodeValid || form.formState.isSubmitting}>
							Enviar Solicitação
						</Button>
					) : (
						<Button size="lg" type="submit" disabled={!isCpfValid || form.formState.isSubmitting}>
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
		.min(1, { message: "CPF é obrigatório" })
		.transform((val) => val.replace(/\D/g, ""))
		.refine((val) => val.length === 11, {
			message: "CPF deve conter 11 números",
		}),
	code: z.string({ required_error: "Código é obrigatório" }).min(4, { message: "Código deve conter 4 dígitos" }).optional(),
});
type FormSchema = z.infer<typeof formSchema>;

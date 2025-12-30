"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/modules/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "~/modules/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/modules/shared/components/ui/form";
import { Input } from "~/modules/shared/components/ui/input";
import { PasswordInput } from "~/modules/shared/components/ui/password-input";
import { useGenericApiErrorMessage } from "~/modules/shared/hooks/use-generic-api-error-message";

export function PDVForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [loginError, setLoginError] = React.useState<string | null>(null);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const { watch } = form;
	const getApiErrorMessage = useGenericApiErrorMessage();

	const onSubmit = async (data: FormSchema) => {};

	React.useEffect(() => {
		router.prefetch("/dashboard");
	}, [router]);

	React.useEffect(() => {
		if (loginError) {
			const timer = setTimeout(() => setLoginError(null), 4000);
			return () => clearTimeout(timer);
		}
	}, [loginError]);

	return (
		<Card className="flex w-full justify-start bg-[#242323]">
			<CardContent className="w-full items-start">
				<div className="mb-2 flex flex-row items-center justify-center gap-2">
					<Search />
					<CardTitle className="text-2xl">Buscar Cliente</CardTitle>
				</div>
				<CardDescription>Digite nome, email, telefone ou documento do cliente</CardDescription>

				<Form {...form}>
					<form className="w-full py-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							required
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mb-1 text-xs">Buscar cliente</FormLabel>
									<FormControl>
										<Input
											className="focus:border-bg-primary-50 focus:bg-primary-50 hover:bg-primary-50 bg-bg-primary-50 w-full border-0 text-xs placeholder:text-xs focus:border-2 focus:outline-none"
											placeholder="Buscar cliente..."
											style={{ backgroundColor: "#242323" }}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{loginError && <div className="rounded p-2 text-center text-sm font-medium text-red-500">{loginError}</div>}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

const formSchema = z.object({
	name: z.string({ required_error: "Senha é obrigatória" }).min(1, { message: "Senha é obrigatória" }),
});
type FormSchema = z.infer<typeof formSchema>;

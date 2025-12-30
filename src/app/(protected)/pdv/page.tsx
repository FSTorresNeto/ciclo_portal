"use client";

import { Card, CardContent, CardDescription, CardTitle } from "~/modules/shared/components/ui/card";
import { AppPage, AppPageContent, AppPageHeader } from "../_components/app-page";
import { PDVForm } from "~/modules/pdv/components/pdv-form";

export default function PDVPage() {
	return (
		<AppPage className="gap-6">
			<AppPageHeader className="flex justify-between">
				<Card className="bg-primary-50 flex w-full justify-center">
					<CardContent className="items-center gap-5">
						<CardTitle className="text-2xl">PDV Fidelidade</CardTitle>
						<CardDescription className="text-xl">Sistema de Pontos de Venda</CardDescription>
					</CardContent>
				</Card>
			</AppPageHeader>
			<AppPageContent>
				<PDVForm />
			</AppPageContent>
		</AppPage>
	);
}

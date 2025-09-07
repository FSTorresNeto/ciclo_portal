"use client";

import { Suspense } from "react";
import { ThemeModeToggle } from "~/modules/shared/components/theme-toggle";
import { AppPage, AppPageHeader, AppPageHeaderTitleContainer, AppPageTitle } from "../_components/app-page";

export default function DashboardPage() {
	return (
		<AppPage>
			<AppPageHeader className="flex justify-between gap-6">
				<AppPageHeaderTitleContainer>
					<AppPageTitle>Página principal</AppPageTitle>
				</AppPageHeaderTitleContainer>
				<Suspense>
					<ThemeModeToggle />
				</Suspense>
			</AppPageHeader>
		</AppPage>
	);
}

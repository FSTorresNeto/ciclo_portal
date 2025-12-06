"use client";

import { Suspense } from "react";
import { ThemeModeToggle } from "~/modules/shared/components/theme-toggle";
import { AppPage, AppPageHeader, AppPageHeaderTitleContainer, AppPageTitle } from "../_components/app-page";

export default function ProgramsOfPointsPage() {
	return (
		<AppPage>
			<AppPageHeader className="flex justify-between">
				<AppPageHeaderTitleContainer>
					<AppPageTitle>Programa de Pontos</AppPageTitle>
				</AppPageHeaderTitleContainer>
			</AppPageHeader>
		</AppPage>
	);
}

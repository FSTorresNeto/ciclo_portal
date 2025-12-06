"use client";

import { Suspense } from "react";
import { ThemeModeToggle } from "~/modules/shared/components/theme-toggle";
import { AppPage, AppPageHeader, AppPageHeaderTitleContainer, AppPageTitle } from "../_components/app-page";

export default function PointsPage() {
	return (
		<AppPage>
			<AppPageHeader className="flex justify-between">
				<AppPageHeaderTitleContainer>
					<AppPageTitle>Pontuação</AppPageTitle>
				</AppPageHeaderTitleContainer>
			</AppPageHeader>
		</AppPage>
	);
}

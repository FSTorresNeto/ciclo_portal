"use client";

import { Suspense } from "react";
import { ThemeModeToggle } from "~/modules/shared/components/theme-toggle";
import { AppPage, AppPageHeader, AppPageHeaderTitleContainer, AppPageTitle } from "../_components/app-page";

export default function RewardsPage() {
	return (
		<AppPage>
			<AppPageHeader className="flex justify-between">
				<AppPageHeaderTitleContainer>
					<AppPageTitle>Recompensas</AppPageTitle>
				</AppPageHeaderTitleContainer>
			</AppPageHeader>
		</AppPage>
	);
}

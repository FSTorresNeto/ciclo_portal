"use client";

import { AppPage, AppPageHeader, AppPageHeaderTitleContainer, AppPageTitle, AppPageContent } from "../_components/app-page";

export default function SettingsPage() {
	return (
		<AppPage>
			<AppPageHeader className="flex items-center justify-between">
				<AppPageHeaderTitleContainer>
					<AppPageTitle>Settings - Teste de Componentes</AppPageTitle>
				</AppPageHeaderTitleContainer>
			</AppPageHeader>

			<AppPageContent className="px-4 pb-8"></AppPageContent>
		</AppPage>
	);
}

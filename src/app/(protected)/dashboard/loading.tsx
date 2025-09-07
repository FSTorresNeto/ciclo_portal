import { AppPage, AppPageDescription, AppPageHeader, AppPageTitle } from "../_components/app-page";

export default function DashboardLoading() {
	return (
		<AppPage>
			<AppPageHeader>
				<AppPageTitle>Página pincipal</AppPageTitle>
				<AppPageDescription>Um momento, estamos carregando seus dados :)</AppPageDescription>
			</AppPageHeader>
		</AppPage>
	);
}

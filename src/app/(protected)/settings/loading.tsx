import { AppPage, AppPageDescription, AppPageHeader, AppPageTitle } from "../_components/app-page";

export default function SettingsLoading() {
	return (
		<AppPage>
			<AppPageHeader>
				<AppPageTitle>Settings</AppPageTitle>
				<AppPageDescription>Um momento, estamos carregando :)</AppPageDescription>
			</AppPageHeader>
		</AppPage>
	);
}

"use client";

import { Menu } from "lucide-react";
import { Topbar, TopbarStart, TopbarEnd } from "~/modules/shared/components/ui/topbar";
import { SidebarTrigger, useSidebar } from "~/modules/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "~/modules/shared/components/theme-toggle";

// Objeto que mapeia rotas para títulos
const routeTitles: Record<string, { title: string; subtitle: string }> = {
	"/pdv": {
		title: "PDV Fidelidade",
		subtitle: "Sistema de operações para acúmulo e resgate de pontos",
	},
	"/dashboard": {
		title: "Dashboard",
		subtitle: "Visão geral do seu programa de fidelidade",
	},
	"/programa-de-pontos": {
		title: "Programas de Pontos",
		subtitle: "Gerencie seu programa de fidelidade",
	},
	"/beneficiarios": {
		title: "Beneficiários",
		subtitle: "Gerencie seu programa de fidelidade",
	},
	"/pontuação": {
		title: "Pontuação",
		subtitle: "Gerencie seu programa de fidelidade",
	},
	"/recompensas": {
		title: "Recompensas",
		subtitle: "Gerencie seu programa de fidelidade",
	},
	"/extrato": {
		title: "Extrato de Pontos",
		subtitle: "Gerencie seu programa de fidelidade",
	},
	"/arquivados": {
		title: "Programas Arquivados",
		subtitle: "Gerencie seu programa de fidelidade",
	},
};

export function AppTopbar() {
	const pathname = usePathname();
	const { state } = useSidebar();

	const getPageInfo = (): { title: string; subtitle: string } => {
		if (pathname && routeTitles[pathname]) {
			return routeTitles[pathname];
		}

		return { title: "Ciclo", subtitle: "Programa de Fidelidade" };
	};

	const pageInfo = getPageInfo();

	return (
		<div
			className="fixed inset-x-0 top-0 z-30 transition-all duration-100 lg:p-0"
			style={{
				left: state === "collapsed" ? "0" : "var(--sidebar-width)",
			}}
			data-state={state}
		>
			<Topbar className="h-full w-full bg-[#262626]">
				<TopbarStart>
					<SidebarTrigger>
						<Menu className="h-20 w-20" />
					</SidebarTrigger>

					<div className="ml-3 flex flex-col">
						<h1 className="text-lg font-bold">{pageInfo.title}</h1>
						<p className="text-muted-foreground text-xs">{pageInfo.subtitle}</p>
					</div>
				</TopbarStart>

				<TopbarEnd>
					<ThemeToggle />
				</TopbarEnd>
			</Topbar>
		</div>
	);
}

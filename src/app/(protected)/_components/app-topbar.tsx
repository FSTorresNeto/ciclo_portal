"use client";

import { Menu } from "lucide-react";
import { Topbar, TopbarStart, TopbarEnd } from "~/modules/shared/components/ui/topbar";
import { SidebarTrigger } from "~/modules/shared/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "~/modules/shared/components/theme-toggle";

// Objeto que mapeia rotas para títulos
const routeTitles: Record<string, { title: string; subtitle: string }> = {
	"/pdv": {
		title: "PDV Fidelidade",
		subtitle: "Gerencie transações do ponto de venda",
	},
	"/dashboard": {
		title: "Painel de Controle",
		subtitle: "Visão geral do programa de fidelidade",
	},
	"/beneficiarios": {
		title: "Beneficiários",
		subtitle: "Gerencie usuários do programa",
	},
	"/pontuacao": {
		title: "Pontuação",
		subtitle: "Regras e atribuição de pontos",
	},
	"/recompensas": {
		title: "Recompensas",
		subtitle: "Gerenciamento de prêmios e resgate",
	},
	"/extrato": {
		title: "Extrato de Pontos",
		subtitle: "Histórico de transações de pontos",
	},
	"/arquivados": {
		title: "Programas Arquivados",
		subtitle: "Programas de fidelidade inativos",
	},
};

export function AppTopbar() {
	const pathname = usePathname();

	// Determina o título baseado na rota atual
	const getPageInfo = (): { title: string; subtitle: string } => {
		// Tentar encontrar uma correspondência exata
		if (pathname && routeTitles[pathname]) {
			return routeTitles[pathname];
		}

		// Se não encontrar exata, procura por correspondência parcial
		/* 		if (pathname) {
			for (const route in routeTitles) {
				if (pathname.startsWith(route) && route !== '/') {
					return routeTitles[route];
				}
			}
		} */

		// Fallback para um título genérico
		return { title: "Ciclo", subtitle: "Programa de Fidelidade" };
	};

	const pageInfo = getPageInfo();

	return (
		// fixed across the top; on large screens leave space for the sidebar by using left offset
		<div className="fixed inset-x-0 top-0 z-30 lg:right-0 lg:left-[var(--sidebar-width)]">
			<Topbar className="w-full">
				<TopbarStart>
					{/* Botão para abrir/fechar sidebar, visível em todas as telas */}
					<SidebarTrigger>
						<Menu className="h-5 w-5" />
					</SidebarTrigger>

					{/* Título e subtítulo da página atual */}
					<div className="ml-3 flex flex-col">
						<h1 className="text-lg font-bold">{"pageInfo.title"}</h1>
						<p className="text-muted-foreground text-xs">{"pageInfo.subtitle"}</p>
					</div>
				</TopbarStart>

				<TopbarEnd>
					{/* Botão para alternar entre tema claro/escuro */}
					<ThemeToggle />
				</TopbarEnd>
			</Topbar>
		</div>
	);
}

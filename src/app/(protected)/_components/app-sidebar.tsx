"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/modules/shared/components/ui/sidebar";
import { Button } from "~/modules/shared/components/ui/button";
import { Label } from "~/modules/shared/components/ui/label";
import { Award, Settings, Sparkles, ShoppingCart, ChartColumn, Users, Archive, CreditCard, FileText, Gift } from "lucide-react";

const items = [
	{
		title: "PDV Fidelidade",
		url: "/pdv",
		icon: ShoppingCart,
	},
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: ChartColumn,
	},
	{
		title: "Programa de Pontos",
		url: "/programs-of-points",
		icon: Award,
	},
	{
		title: "Beneficiários",
		url: "/beneficiaries",
		icon: Users,
	},
	{
		title: "Pontuação",
		url: "/points",
		icon: CreditCard,
	},
	{
		title: "Recompensas",
		url: "/rewards",
		icon: Gift,
	},
	{
		title: "Extrato de pontos",
		url: "/points-statement",
		icon: FileText,
	},
	{
		title: "Programas Arquivados",
		url: "/archived-programs",
		icon: Archive,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	const onConfigureApplication = () => {
		alert("não implementado");
	};
	const onUpgradeVersion = () => {
		alert("não implementado");
	};

	return (
		<Sidebar className="bg-card border-none shadow-sm">
			<SidebarHeader className="w-full">
				<div className="flex items-center gap-3 px-6 py-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
						<Sparkles className="h-6 w-6 text-white" />
					</div>
					<div>
						<h1 className="text-lg font-bold text-white">Ciclo</h1>
						<p className="text-xs text-white/80">Programa de Fidelidade</p>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton isActive={pathname.startsWith(item.url)} asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-5">
				<div className="flex min-h-[120px] min-w-[250px] flex-col gap-4 rounded-lg border border-white bg-[#242323] p-5">
					<div className="flex flex-row items-center gap-3">
						<div className="bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full border border-white">
							<Award className="h-4 w-4" />
						</div>

						<div className="flex flex-col items-start gap-1">
							<Label className="font-bold">Upgrade</Label>
							<div className="text-sm">Versão Pro</div>
						</div>
					</div>

					<div>
						<Button
							variant="positive"
							size="sm"
							onClick={onUpgradeVersion}
							className="bg-primary-50 hover:bg-primary-50 active:bg-primary-50 flex h-10 w-full justify-center rounded-xl border text-center text-sm"
						>
							Fazer Upgrade
						</Button>
					</div>
				</div>
				<div className="space-y-2 p-2">
					<SidebarMenuButton onClick={() => {}}>
						<Settings className="mr-2 h-4 w-4" />
						Configurações
					</SidebarMenuButton>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

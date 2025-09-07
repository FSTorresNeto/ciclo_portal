"use client";

import { Dock, IdCard, LayoutDashboard, LogOut, WalletMinimal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserGroup } from "~/modules/shared/components/icons";
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
	SidebarTrigger,
} from "~/modules/shared/components/ui/sidebar";
import { AppSidebarLogo } from "./app-sidebar-logo";
import { Button } from "~/modules/shared/components/ui/button";
import { signOut } from "next-auth/react";

const items = [
	{
		title: "Página principal",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	const handleLogout = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="gap-4">
				<SidebarTrigger />
				<AppSidebarLogo />
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
			<SidebarFooter>
				<div className="space-y-2 p-2">
					<Button variant="negative" size="sm" onClick={handleLogout} className="w-full bg-transparent">
						<LogOut className="mr-2 h-4 w-4" />
						Sair
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

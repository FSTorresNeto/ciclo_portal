"use client";

import { SidebarInset, SidebarProvider } from "~/modules/shared/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { AppTopbar } from "./_components/app-topbar";
import React from "react";
import { SessionExpirationDialog } from "~/app/(protected)/_components/session-expiration-dialog";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppTopbar />
				<div className="p-6">
					{children}
					{/* <SessionExpirationDialog /> */}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

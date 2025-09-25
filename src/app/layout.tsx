import "~/styles/globals.css";

import { type Metadata } from "next";
import { Funnel_Display, Inter } from "next/font/google";
import { ThemeProvider } from "~/modules/shared/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
	title: "Ciclo",
	description: "Plataforma ciclo",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const display = Funnel_Display({
	subsets: ["latin"],
	variable: "--display-font",
});

const bodySans = Inter({
	subsets: ["latin"],
	variable: "--body-font",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-BR" className={`${display.variable} ${bodySans.variable} antialiased`} suppressHydrationWarning>
			<body>
				<SessionProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<TRPCReactProvider>{children}</TRPCReactProvider>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}

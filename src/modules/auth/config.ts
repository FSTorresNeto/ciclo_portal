import type { NextAuthConfig, DefaultSession, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApi } from "~/modules/auth/data/auth.api";
import { jwtDecode } from "jwt-decode";
import util from "util";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: number;
			userId: number;
			companyId: number;
			login: string;
		} & DefaultSession["user"];
		accessToken?: string;
	}

	interface User {
		accessToken?: string;
	}
}

export const authConfig = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				login: { label: "Login", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.login || !credentials?.password) return null;

					const response = await new AuthApi().auth({
						login: credentials.login as string,
						password: credentials.password as string,
					});

					if (!response?.data.user || !response?.data.token) return null;
					return {
						email: response.data.userInformation.email,
						id: response.data.user.id.toString(),
						companyId: response.data.user.companyId,
						login: response.data.user.cpf,
						image: null,
						name: response.data.userInformation.name,
						accessToken: response.data.token,
						userId: response.data.user.id,
						status: response.data.user.userStatus,
					};
				} catch (err) {
					throw new Error("CONNECTION_ERROR");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.companyId = (user as any).companyId;
				token.userId = (user as any).userId;
				token.login = (user as any).login;
			}
			if (trigger === "update" && session?.accessToken) {
				token.accessToken = session.accessToken;
				token.companyId = session.user?.companyId ?? token.companyId;
				token.userId = session.user?.userId ?? token.userId;
				token.login = session.user?.login ?? token.login;
			}

			return token;
		},

		async session({ session, token }: { session: NextAuthSession; token: any }) {
			session.accessToken = token.accessToken as string | undefined;
			session.user.companyId = token.companyId as number;
			session.user.userId = token.userId as number;
			session.user.login = token.login as string;

			if (token.accessToken) {
				try {
					const decoded = jwtDecode<{ exp?: number }>(token.accessToken);
					if (decoded.exp) {
						session.expires = new Date(decoded.exp * 1000).toISOString();
					}
				} catch (err) {
					console.warn("Não foi possível decodificar JWT:", err);
					session.expires = new Date(Date.now() + 60 * 1000).toISOString();
				}
			} else {
				session.expires = new Date(Date.now() + 60 * 1000).toISOString();
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

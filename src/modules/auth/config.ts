/* eslint-disable */
import type { NextAuthConfig, DefaultSession, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApi } from "~/modules/auth/data/auth.api";
import { jwtDecode } from "jwt-decode";
import type { AccessLevel } from "../shared/enums/access-level";

/**
 
Module augmentation for next-auth types. Allows us to add custom properties to the session
object and keep type safety.*
@see https://next-auth.js.org/getting-started/typescript#module-augmentation*/
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			login: string;
			companyId: number;
			acessLevel: AccessLevel;
			position: string;
			firebaseauth: string;
		} & DefaultSession["user"];
		accessToken?: string;
	}

	interface User {
		accessToken?: string;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
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

					const response = await new AuthApi().login({
						login: credentials.login as string,
						password: credentials.password as string,
					});

					if (!response?.user || !response?.token) return null;
					return {
						id: response.user.userId.toString(),
						login: response.user.login,
						image: null,
						name: response.user.email,
						accessToken: response.token,
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
				token.userId = (user as any).userId;
				token.login = (user as any).login;
				token.companyId = (user as any).companyId;
				token.acessLevel = (user as any).acessLevel;
				token.position = (user as any).position;
				token.firebaseauth = (user as any).firebaseauth;
			}
			if (trigger === "update" && session?.accessToken) {
				token.accessToken = session.accessToken;
				token.userId = session.user?.userId ?? token.userId;
				token.login = session.user?.login ?? token.login;
				token.companyId = session.user?.companyId ?? token.companyId;
				token.acessLevel = session.user?.acessLevel ?? token.acessLevel;
				token.position = session.user?.position ?? token.position;
				token.firebaseauth = session.user?.firebaseauth ?? token.firebaseauth;
			}

			return token;
		},

		async session({ session, token }: { session: NextAuthSession; token: any }) {
			session.accessToken = token.accessToken as string | undefined;
			session.user.login = token.login as string;
			session.user.companyId = token.companyId as number;
			session.user.firebaseauth = token.firebaseauth as string;

			if (token.accessToken) {
				try {
					const decoded = jwtDecode<{ exp?: number }>(token.accessToken);
					if (decoded.exp) {
						session.expires = new Date(decoded.exp * 1000).toISOString();
					}
				} catch (err) {
					session.expires = new Date(Date.now() + 60 * 1000).toISOString();
				}
			} else {
				session.expires = new Date(Date.now() + 60 * 1000).toISOString();
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

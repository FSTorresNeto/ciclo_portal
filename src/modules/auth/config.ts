/* eslint-disable */
import type { NextAuthConfig, DefaultSession, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApi } from "~/modules/auth/data/auth.api";
import { jwtDecode } from "jwt-decode";
import util from "util";

/**
 
Module augmentation for next-auth types. Allows us to add custom properties to the session
object and keep type safety.*
@see https://next-auth.js.org/getting-started/typescript#module-augmentation*/
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: number;
			userCompanyId: number;
			login: string;
			// ...other properties
			// role: UserRole;
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
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
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
				token.userCompanyId = (user as any).userCompanyId;
				token.userId = (user as any).userId;
				token.login = (user as any).login;
			}
			if (trigger === "update" && session?.accessToken) {
				token.accessToken = session.accessToken;
				token.userCompanyId = session.user?.userCompanyId ?? token.userCompanyId;
				token.userId = session.user?.userId ?? token.userId;
				token.login = session.user?.login ?? token.login;
			}

			return token;
		},

		async session({ session, token }: { session: NextAuthSession; token: any }) {
			// Atualiza accessToken e userCompanyId
			session.accessToken = token.accessToken as string | undefined;
			session.user.userCompanyId = token.userCompanyId as number;
			session.user.login = token.login as string;

			// Decodifica expiração do JWT para controlar SessionExpirationDialog
			if (token.accessToken) {
				try {
					const decoded = jwtDecode<{ exp?: number }>(token.accessToken);
					if (decoded.exp) {
						// Define session.expires como string ISO compatível com NextAuth
						session.expires = new Date(decoded.exp * 1000).toISOString();
					}
				} catch (err) {
					console.warn("Não foi possível decodificar JWT:", err);
					// Fallback: expira em 1 min
					session.expires = new Date(Date.now() + 60 * 1000).toISOString();
				}
			} else {
				// Fallback: expira em 1 min
				session.expires = new Date(Date.now() + 60 * 1000).toISOString();
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

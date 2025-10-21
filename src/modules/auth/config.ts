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
			id: string;
			login: string;
			companyId: number;
			accessLevel?: string;
			position?: string;
			firebaseAuth?: string;
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

					const response = await new AuthApi().auth({
						login: credentials.login as string,
						password: credentials.password as string,
					});

					if (!response?.data.user || !response?.data.token) return null;
					return {
						email: response.data.user.email,
						id: response.data.user.userId.toString(),
						companyId: response.data.user.companyId,
						userId: response.data.user.userId,
						login: response.data.user.login,
						image: null,
						name: response.data.user.email,
						accessToken: response.data.token,
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
				token.userId = (user as any).userId; // UserId do backend
				token.companyId = (user as any).companyId; // CompanyId
				token.login = (user as any).login;
				token.accessLevel = (user as any).accessLevel; // AccessLevel
				token.position = (user as any).position; // Cargo
				token.firebaseAuth = (user as any).firebaseAuth; // FirebaseAuth
			}

			if (trigger === "update" && session?.accessToken) {
				token.accessToken = session.accessToken;
				token.userId = session.user?.id ?? token.userId;
				token.companyId = session.user?.companyId ?? token.companyId;
				token.login = session.user?.login ?? token.login;
				token.accessLevel = session.user?.accessLevel ?? token.accessLevel;
				token.position = session.user?.position ?? token.position;
				token.firebaseAuth = session.user?.firebaseAuth ?? token.firebaseAuth;
			}

			return token;
		},

		async session({ session, token }: { session: NextAuthSession; token: any }) {
			session.accessToken = token.accessToken;
			session.user.id = token.userId;
			session.user.companyId = token.companyId;
			session.user.login = token.login;
			session.user.accessLevel = token.accessLevel;
			session.user.position = token.position;
			session.user.firebaseAuth = token.firebaseAuth;

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

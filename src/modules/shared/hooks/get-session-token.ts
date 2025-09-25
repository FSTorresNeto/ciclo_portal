import { auth } from "~/modules/auth";

/**
 * Get the access token from the current session
 * @returns The access token or undefined if not authenticated
 */
export async function getSessionToken(): Promise<string | undefined> {
	const session = await auth();
	return session?.accessToken;
}

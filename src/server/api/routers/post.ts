import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

// Mock data store (em produção você usaria um banco de dados real)
const posts: Array<{ id: string; name: string; createdById: string; createdAt: Date }> = [];

export const postRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		};
	}),

	create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
		const newPost = {
			id: Math.random().toString(36),
			name: input.name,
			createdById: ctx.session.user.id,
			createdAt: new Date(),
		};
		posts.push(newPost);
		return newPost;
	}),

	getLatest: protectedProcedure.query(async () => {
		const sortedPosts = posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		return sortedPosts[0] ?? null;
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});

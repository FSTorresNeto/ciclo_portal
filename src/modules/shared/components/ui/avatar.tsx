"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const avatarVariants = cva("aspect-square shrink-0 grow-0 relative flex", {
	variants: {
		size: {
			xl: "size-20",
			lg: "size-[--spacing(30)]",
			default: "size-16",
			sm: "size-12",
			xs: "size-9",
		},
		shape: {
			circle: "[&>img]:rounded-full [&>span]:rounded-full",
			rounded: "[&>img]:rounded-2xl [&>span]:rounded-2xl",
		},
	},
	defaultVariants: {
		size: "default",
		shape: "circle",
	},
});
type AvatarVariants = VariantProps<typeof avatarVariants>;

function Avatar({
	className,
	size = "default",
	shape = "circle",
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & AvatarVariants) {
	return <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size, shape }), className)} {...props} />;
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"dark:outline-neutral-60 aspect-square size-full object-cover object-center outline-2 outline-neutral-50",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-primary-0 text-primary-foreground outline-primary-foreground flex size-full items-center justify-center outline-2",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarFallback, AvatarImage };

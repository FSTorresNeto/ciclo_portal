"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
	[
		"inline-flex text-accent-foreground shrink-0 cursor-pointer items-center text-center justify-center gap-2 whitespace-nowrap rounded-full outline-none transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:ring-2 active:ring-foreground disabled:bg-neutral-10 disabled:text-muted-foreground",
		"data-[state=on]:bg-accent-foreground data-[state=on]:text-accent",
	],
	{
		variants: {
			size: {
				lg: "h-12 px-4 py-2 typography-label-md",
				default: "h-9 px-4 py-2 typography-label-sm",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

function Toggle({ className, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ size, className }))} {...props} />;
}

export { Toggle, toggleVariants };

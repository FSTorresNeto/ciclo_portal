"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "../../lib/utils";

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer disabled:bg-muted flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"bg-background border-input hover:bg-foreground/20 hover:border-foreground data-[state=checked]:bg-primary-10 data-[state=checked]:border-neutral-70 hover:data-[state=checked]:bg-primary/80 hover:data-[state=checked]:border-neutral-70",
				"focus-visible:ring-secondary focus-visible:ring-2 focus-visible:ring-offset-1",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-neutral-70 pointer-events-none block size-2.5 translate-x-0.5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(--spacing(7)_-_--spacing(2.5)_-_4px)]",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

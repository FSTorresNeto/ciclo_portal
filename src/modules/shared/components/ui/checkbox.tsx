"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { cn } from "../../lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer border-neutral-70 hover:bg-foreground/10 relative size-4 shrink-0 rounded-md border bg-transparent outline-none",
				"focus-visible:ring-secondary focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-offset-1",
				"data-[state=checked]:bg-primary-10 hover:data-[state=checked]:bg-primary/80",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="bg-primary-foreground data-[state=checked]:animate-in data-[state=checked]:fade-in-0 data-[state=unchecked]:animate-out data-[state=unchecked]:fade-out-0 absolute inset-0 top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[3px] text-current transition-[color,opacity]"
			/>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };

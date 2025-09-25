"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils/cn";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
	size: "default",
});

function ToggleGroup({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return (
		<ToggleGroupPrimitive.Root
			data-slot="toggle-group"
			data-size={size}
			className={cn(
				"group/toggle-group bg-card flex h-fit w-fit items-center rounded-full",
				size === "default" ? "gap-1 p-1" : "gap-2 p-2",
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ size }}>{children}</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
}

function ToggleGroupItem({
	className,
	children,
	size,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
	const context = React.useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			data-slot="toggle-group-item"
			data-size={context.size ?? size}
			className={cn(
				toggleVariants({ size: context.size ?? size }),
				"min-w-0 flex-1 shrink-0 focus:z-10 focus-visible:z-10",
				"text-card-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
}

export { ToggleGroup, ToggleGroupItem };

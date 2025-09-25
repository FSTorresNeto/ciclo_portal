"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "../../utils/cn";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn("bg-neutral-70 flex h-fit w-fit items-center gap-1 rounded-full p-1", className)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"text-accent-foreground dark:text-neutral-10! focus-visible:ring-primary active:ring-foreground disabled:bg-neutral-10 disabled:text-muted-foreground typography-label-sm inline-flex h-9 min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-center whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 active:ring-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
				"data-[state=active]:bg-accent-foreground data-[state=active]:text-accent",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };

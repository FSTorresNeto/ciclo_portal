import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer border border-transparent min-w-12 items-center text-center justify-center gap-2 whitespace-nowrap rounded-full outline-none transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:ring-2 active:ring-foreground disabled:bg-neutral-10 disabled:text-muted-foreground",
	{
		variants: {
			variant: {
				primary: "",
				neutral: "",
				positive: "",
				negative: "",
			},
			hierarchy: {
				primary: "",
				secondary: "",
				tertiary: "",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3 typography-label-sm",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 typography-label-xs",
				lg: "h-12 px-6 has-[>svg]:px-4 typography-label-md",
				icon: "size-9 min-w-0",
				iconSm: "size-8 min-w-0",
				iconLg: "size-12 min-w-0",
			},
		},
		defaultVariants: {
			variant: "primary",
			hierarchy: "primary",
			size: "default",
		},
		compoundVariants: [
			{
				variant: "primary",
				hierarchy: "primary",
				className:
					"bg-primary text-primary-foreground hover:brightness-80 focus-visible:ring-secondary active:ring-primary-foreground",
			},
			{
				variant: "primary",
				hierarchy: "secondary",
				className:
					"bg-primary-0 border-primary-20 text-primary-foreground hover:bg-primary-50/20 hover:border-transparent focus-visible:border-transparent active:border-transparent active:ring-primary-foreground disabled:border-transparent",
			},
			{
				variant: "primary",
				hierarchy: "tertiary",
				className:
					"bg-transparent text-primary-foreground hover:bg-primary-50/20 focus-visible:bg-primary-0 active:ring-primary-foreground",
			},
			{
				variant: "neutral",
				hierarchy: "primary",
				className:
					"bg-accent text-accent-foreground hover:bg-accent/80 focus-visible:ring-primary active:bg-neutral-50 active:text-foreground dark:bg-neutral-0 dark:text-neutral-90",
			},
			{
				variant: "neutral",
				hierarchy: "secondary",
				className:
					"bg-transparent dark:bg-neutral-90 border-neutral-70 text-foreground hover:bg-foreground/20 hover:border-transparent focus-visible:border-neutral-70 active:border-transparent active:bg-neutral-50 active:text-foreground disabled:border-transparent",
			},
			{
				variant: "neutral",
				hierarchy: "tertiary",
				className: "bg-transparent text-foreground hover:bg-foreground/20 focus-visible:border-neutral-70 active:bg-neutral-50",
			},
			{
				variant: "positive",
				hierarchy: "primary",
				className: "bg-positive text-positive-foreground hover:bg-positive/70 active:bg-positive",
			},
			{
				variant: "positive",
				hierarchy: "secondary",
				className: "bg-transparent text-positive hover:bg-positive/10 focus-visible:border-positive focus-visible:ring-primary ",
			},
			{
				variant: "negative",
				hierarchy: "primary",
				className: "bg-negative text-negative-foreground hover:bg-negative/70 focus-visible:ring-primary active:bg-negative ",
			},
			{
				variant: "negative",
				hierarchy: "secondary",
				className: "bg-transparent text-negative hover:bg-negative/10 focus-visible:border-negative focus-visible:ring-primary",
			},
		],
	},
);

function Button({
	className,
	hierarchy = "primary",
	variant = "primary",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, hierarchy, className }))} {...props} />;
}

export { Button, buttonVariants };

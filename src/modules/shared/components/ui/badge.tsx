import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
	"flex items-center justify-center cursor-default h-7 px-3 typography-label-xs w-fit whitespace-nowrap shrink-0 gap-2 transition-all overflow-hidden [&>svg]:size-3.5 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				primary: "bg-primary-0 text-primary-foreground",
				positive: "bg-green-50/20 text-green-80 dark:text-green-50",
				alert: "bg-yellow-50/20 text-yellow-80 dark:text-alert",
				negative: "bg-red-50/20 text-red-70 dark:text-negative",
				info: "bg-neutral-90/15 text-foreground dark:bg-neutral-10/15",
				infoBrand: "",
			},
			solid: {
				true: null,
				false: null,
			},
			shape: {
				rounded: "rounded-lg",
				pill: "rounded-full",
				icon: "rounded-lg px-1.5 py-1.5",
			},
		},
		defaultVariants: {
			variant: "primary",
			shape: "rounded",
		},
		compoundVariants: [
			{
				variant: "infoBrand",
				solid: false,
				className: "border dark:text-foreground dark:border-primary-90 dark:bg-primary-100",
			},
		],
	},
);

function Badge({
	className,
	variant,
	shape,
	asChild = false,
	solid = false,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant, shape, solid }), className)} {...props} />;
}

export { Badge, badgeVariants };

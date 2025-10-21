"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import React from "react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
	[
		"inline-flex shrink-0 cursor-pointer border border-transparent min-w-12 items-center text-center justify-center gap-2 whitespace-nowrap rounded-full outline-none transition-all aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:ring-2 active:ring-foreground aria-disabled:pointer-events-none aria-disabled:text-muted-foreground aria-disabled:bg-muted-foreground/10 duration-100 overflow-hidden text-white",
		"data-[loading=true]:pointer-events-none data-[loading=true]:opacity-50",
	],
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
				default: "h-9 px-4 py-2 [>svg]:size-4 has-[>svg]:px-3 typography-label-sm",
				sm: "h-8 gap-1.5 px-3 [>svg]:size-3 has-[>svg]:px-2.5 typography-label-xs",
				lg: "h-12 px-6 [>svg]:size-5 has-[>svg]:px-4 typography-label-md",
				icon: "size-9 min-w-0 [>svg]:size-4",
				iconSm: "size-8 min-w-0 [>svg]:size-4",
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
				className: "bg-primary text-white hover:brightness-80 focus-visible:ring-secondary active:ring-primary-foreground",
			},
			{
				variant: "primary",
				hierarchy: "secondary",
				className:
					"bg-primary-0 border-primary-20 text-primary-foreground hover:bg-primary-50/20 hover:border-transparent focus-visible:border-transparent active:border-transparent active:ring-primary-foreground aria-disabled:border-transparent",
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
					"bg-transparent dark:bg-neutral-90 border-neutral-70 text-foreground hover:bg-foreground/20 dark:hover:bg-foreground/20 hover:border-transparent focus-visible:border-neutral-70 active:border-transparent active:bg-neutral-50 active:text-foreground aria-disabled:border-transparent",
			},
			{
				variant: "neutral",
				hierarchy: "tertiary",
				className:
					"bg-transparent text-foreground hover:bg-foreground/20 focus-visible:border-neutral-70 active:bg-neutral-50 dark:text-foreground dark:hover:bg-neutral-70/90",
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
				variant: "positive",
				hierarchy: "tertiary",
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

type ButtonVariants = VariantProps<typeof buttonVariants>;
type ButtonProps = ButtonVariants & { asChild?: boolean; isLoading?: boolean };

function Button({
	className,
	hierarchy = "primary",
	variant = "primary",
	size = "default",
	asChild = false,
	isLoading,
	children,
	disabled,
	...props
}: React.ComponentProps<"button"> & ButtonProps) {
	const Comp = asChild ? Slot : "button";
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const [fixedWidth, setFixedWidth] = React.useState<number | null>(null);

	React.useLayoutEffect(() => {
		if (isLoading && buttonRef.current) {
			setFixedWidth(buttonRef.current.offsetWidth);
		} else if (!isLoading) {
			setFixedWidth(null);
		}
	}, [isLoading]);

	const content = (
		<>
			<span
				className={cn(
					"inline-flex shrink-0 items-center justify-center gap-[inherit] transition-all duration-100 ease-in-out",
					isLoading ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
				)}
			>
				{children}
			</span>
			<span
				className={cn(
					"absolute inset-0 flex items-center justify-center transition-all duration-100 ease-in-out",
					isLoading ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
				)}
			>
				<Loader className="size-4 animate-spin text-current" />
			</span>
		</>
	);

	if (asChild) {
		// When asChild is true, we need to get the child's children and inject in our content
		// For example: <Button asChild><Link href="#">Link</Link></Button>
		// "Link", the child's children, needs to be injected in our content
		const child = React.Children.only(children) as React.ReactElement;
		const childChildren = (child.props as { children?: React.ReactNode }).children;

		const modifiedContent = (
			<>
				<span
					className={cn(
						"inline-flex shrink-0 items-center justify-center gap-[inherit] transition-all duration-200",
						isLoading ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100",
					)}
				>
					{childChildren}
				</span>
				<span
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-all duration-200",
						isLoading ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
					)}
				>
					<Loader className="size-4 animate-spin text-current" />
				</span>
			</>
		);

		return (
			<Slot
				aria-disabled={disabled}
				data-loading={isLoading}
				className={cn(buttonVariants({ variant, size, hierarchy, className }), "relative")}
				data-slot="button"
				ref={buttonRef}
				style={fixedWidth ? { width: fixedWidth } : undefined}
				{...props}
			>
				{React.cloneElement(child, {}, modifiedContent)}
			</Slot>
		);
	}

	return (
		<Comp
			aria-disabled={disabled}
			data-loading={isLoading}
			className={cn(buttonVariants({ variant, size, hierarchy, className }), "relative")}
			data-slot="button"
			ref={buttonRef}
			style={fixedWidth ? { width: fixedWidth } : undefined}
			{...props}
		>
			{content}
		</Comp>
	);
}

export { Button, buttonVariants };

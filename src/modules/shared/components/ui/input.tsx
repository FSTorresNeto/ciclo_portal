import React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
};

export function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
	const inputComponent = (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"typography-body-md bg-background text-foreground flex h-12 w-full min-w-0 flex-1 rounded-lg border border-neutral-50 px-4 py-2.5 outline-none placeholder:text-neutral-50",
				"focus-visible:border-neutral-70 focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1",
				"aria-invalid:border-negative dark:aria-invalid:border-negative",
				"aria-disabled:bg-muted aria-disabled:text-muted-foreground aria-disabled:cursor-not-allowed",
				"dark:placeholder:text-neutral-10/30 dark:border-neutral-60 dark:bg-neutral-80",
				startIcon && "pl-12",
				endIcon && "pr-12",
				startIcon || endIcon ? "h-full w-full" : className,
			)}
			{...props}
		/>
	);

	if (!startIcon && !endIcon) {
		return inputComponent;
	}

	return (
		<div className={cn("relative h-12 min-w-0", className)}>
			{startIcon && (
				<span className="absolute top-1/2 left-0 flex aspect-square h-full -translate-y-1/2 items-center justify-center [&>svg]:size-5">
					{startIcon}
				</span>
			)}
			{inputComponent}
			{endIcon && (
				<span className="absolute top-1/2 right-0 flex aspect-square h-full -translate-y-1/2 items-center justify-center [&>svg]:size-5">
					{endIcon}
				</span>
			)}
		</div>
	);
}

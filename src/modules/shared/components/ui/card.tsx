import * as React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<article data-slot="card" className={cn("bg-card text-card-foreground flex gap-4 rounded-xl border p-4", className)} {...props} />
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <header data-slot="card-header" className={className} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h4">) {
	return <h4 data-slot="card-title" className={cn("typography-header-sm", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <h5 data-slot="card-description" className={cn("typography-body-xs", className)} {...props} />;
}

function CardText({ className, ...props }: React.ComponentProps<"p">) {
	return <p data-slot="card-text" className={cn("typography-body-sm", className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-content" className={cn("flex flex-col gap-1", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-footer" className={cn("flex items-center py-2", className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardText, CardTitle };

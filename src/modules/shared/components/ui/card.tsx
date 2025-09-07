import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<article
			data-slot="card"
			className={cn("bg-card text-card-foreground border-border flex gap-4 rounded-xl border p-4", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-content" className={cn("space-y-2", className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <header data-slot="card-header" className={cn("flex gap-4", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h4">) {
	return <h4 data-slot="card-title" className={cn("typography-header-sm", className)} {...props} />;
}

function CardSubtitle({ className, ...props }: React.ComponentProps<"p">) {
	return <h5 data-slot="card-subtitle" className={cn("typography-body-xs text-muted-foreground", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p data-slot="card-description" className={cn("typography-body-sm", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-footer" className={cn("flex items-center justify-between py-2", className)} {...props} />;
}

function CardAction(props: React.ComponentProps<typeof Button>) {
	return <Button data-slot="card-action" size="sm" {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardSubtitle, CardTitle };

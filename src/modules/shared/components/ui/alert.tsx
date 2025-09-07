import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function Alert({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<article
			data-slot="alert"
			className={cn("bg-alert text-alert-foreground border-border flex gap-4 rounded-xl border p-4", className)}
			{...props}
		/>
	);
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-content" className={cn("space-y-2", className)} {...props} />;
}

function AlertHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <header data-slot="alert-header" className={cn("flex gap-4", className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h4">) {
	return <h4 data-slot="alert-title" className={cn("typography-header-sm", className)} {...props} />;
}

function AlertSubtitle({ className, ...props }: React.ComponentProps<"p">) {
	return <h5 data-slot="alert-subtitle" className={cn("typography-body-xs text-muted-foreground", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p data-slot="alert-description" className={cn("typography-body-sm", className)} {...props} />;
}

function AlertFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-footer" className={cn("flex items-center justify-between py-2", className)} {...props} />;
}

function AlertAction(props: React.ComponentProps<typeof Button>) {
	return <Button data-slot="alert-action" size="sm" {...props} />;
}

export { Alert, AlertAction, AlertContent, AlertDescription, AlertFooter, AlertHeader, AlertSubtitle, AlertTitle };

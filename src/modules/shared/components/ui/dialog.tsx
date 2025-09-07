import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function Dialog({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<article
			data-slot="dialog"
			className={cn("bg-dialog text-dialog-foreground border-border flex gap-4 rounded-xl border p-4", className)}
			{...props}
		/>
	);
}

function DialogContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-content" className={cn("space-y-2", className)} {...props} />;
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <header data-slot="dialog-header" className={cn("flex gap-4", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h4">) {
	return <h4 data-slot="dialog-title" className={cn("typography-header-sm", className)} {...props} />;
}

function DialogSubtitle({ className, ...props }: React.ComponentProps<"p">) {
	return <h5 data-slot="dialog-subtitle" className={cn("typography-body-xs text-muted-foreground", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p data-slot="dialog-description" className={cn("typography-body-sm", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-footer" className={cn("flex items-center justify-between py-2", className)} {...props} />;
}

function DialogAction(props: React.ComponentProps<typeof Button>) {
	return <Button data-slot="dialog-action" size="sm" {...props} />;
}

export { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogSubtitle, DialogTitle };

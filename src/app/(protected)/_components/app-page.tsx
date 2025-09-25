import { cn } from "~/modules/shared/utils/cn";

export function AppPage({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex h-full flex-col gap-8", className)} {...props} />;
}

export function AppPageHeader({ className, ...props }: React.ComponentProps<"head">) {
	return <header className={cn("px-4 py-2", className)} {...props} />;
}

export function AppPageHeaderTitleContainer({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function AppPageTitle({ className, ...props }: React.ComponentProps<"h1">) {
	return <h1 className={cn("typography-display-md", className)} {...props} />;
}

export function AppPageDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("typography-label-lg", className)} {...props} />;
}

export function AppPageContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex flex-1 flex-col gap-8", className)} {...props} />;
}

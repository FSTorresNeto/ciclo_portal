"use client";

import * as React from "react";
import { cn } from "../../utils/cn";
import { Button } from "./button";
import { Bell, User, Search } from "lucide-react";
import Link from "next/link";

interface TopbarProps {
	className?: string;
	children?: React.ReactNode;
}

function Topbar({ className, children, ...props }: TopbarProps & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<header
			className={cn("bg-card border-border flex h-20 w-full items-center justify-between border-b px-6 py-5", className)}
			{...props}
		>
			{children}
		</header>
	);
}

function TopbarStart({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex items-center gap-4", className)} {...props}>
			{children}
		</div>
	);
}

function TopbarCenter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-1 items-center justify-center", className)} {...props}>
			{children}
		</div>
	);
}

function TopbarEnd({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex items-center gap-2", className)} {...props}>
			{children}
		</div>
	);
}

function TopbarSearch({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="relative w-full max-w-md">
			<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
			<input
				type="search"
				placeholder="Buscar..."
				className={cn(
					"bg-background focus-visible:ring-primary h-9 w-full rounded-full pr-4 pl-10 text-sm focus-visible:ring-1 focus-visible:outline-none",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function TopbarNotifications({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<Button size="icon" variant="neutral" hierarchy="tertiary" className={cn("relative", className)} {...props}>
			<Bell className="h-5 w-5" />
			<span className="bg-primary absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full" />
		</Button>
	);
}

function TopbarAvatar({
	imageSrc,
	name,
	role,
	className,
	...props
}: {
	imageSrc?: string;
	name?: string;
	role?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<Button variant="neutral" hierarchy="tertiary" className={cn("flex items-center gap-2 px-2", className)} {...props}>
			<div className="bg-primary/10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
				{imageSrc ? (
					<img src={imageSrc} alt={name || "Avatar"} className="h-full w-full object-cover" />
				) : (
					<User className="h-5 w-5" />
				)}
			</div>
			{name && (
				<div className="hidden flex-col items-start sm:flex">
					<span className="text-sm font-medium">{name}</span>
					{role && <span className="text-muted-foreground text-xs">{role}</span>}
				</div>
			)}
		</Button>
	);
}

export { Topbar, TopbarStart, TopbarCenter, TopbarEnd, TopbarSearch, TopbarNotifications, TopbarAvatar };

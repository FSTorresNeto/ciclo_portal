"use client";

import React from "react";

import { cn } from "../../lib/utils";
import { Invisible1, Visible } from "../icons";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

export function PasswordInput({ className, ...props }: Omit<InputProps, "type" | "endIcon">) {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<>
			<Input
				type={showPassword ? "text" : "password"}
				className={cn("pr-12", className)}
				endIcon={
					<Button
						variant="neutral"
						hierarchy="tertiary"
						size="iconSm"
						className="absolute top-1/2 right-1 size-10 -translate-y-1/2 [&>svg]:size-6"
						type="button"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <Visible /> : <Invisible1 />}
					</Button>
				}
				{...props}
			/>
		</>
	);
}

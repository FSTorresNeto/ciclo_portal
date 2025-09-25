import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"typography">({
	extend: {
		classGroups: {
			typography: [
				"typography-display-xs",
				"typography-display-sm",
				"typography-display-md",
				"typography-display-lg",
				"typography-header-xs",
				"typography-header-sm",
				"typography-header-md",
				"typography-header-lg",
				"typography-header-xl",
				"typography-header-2xl",
				"typography-body-2xs",
				"typography-body-xs",
				"typography-body-sm",
				"typography-body-md",
				"typography-body-lg",
				"typography-label-xs",
				"typography-label-sm",
				"typography-label-md",
				"typography-label-lg",
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isDefined<T>(value: T): value is NonNullable<T> {
	return value !== undefined && value !== null;
}

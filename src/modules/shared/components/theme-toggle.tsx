"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function ThemeModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	const handleThemeChange = (value: string) => {
		if (!value) return;
		setTheme(value);
	};

	if (!mounted) {
		return (
			<ToggleGroup type="single" onValueChange={setTheme}>
				<ToggleGroupItem value="dark">
					<Moon className="size-4" />
				</ToggleGroupItem>
				<ToggleGroupItem value="light">
					<Sun className="size-4" />
				</ToggleGroupItem>
			</ToggleGroup>
		);
	}

	return (
		<ToggleGroup value={resolvedTheme} type="single" onValueChange={handleThemeChange}>
			<ToggleGroupItem value="dark">
				<Moon className="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="light">
				<Sun className="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";

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

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// Necessário porque o tema é carregado do client side
	React.useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<Button size="icon" variant="neutral" hierarchy="tertiary">
				<Sun className="h-5 w-5" />
				<span className="sr-only">Alternar tema</span>
			</Button>
		);
	}

	return (
		<Button size="icon" variant="neutral" hierarchy="tertiary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
			<span className="sr-only">Alternar tema</span>
		</Button>
	);
}

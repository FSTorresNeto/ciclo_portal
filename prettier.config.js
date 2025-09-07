/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	arrowParens: "always",
	bracketSpacing: true,
	endOfLine: "crlf",
	printWidth: 140,
	plugins: ["prettier-plugin-tailwindcss"],
	semi: true,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "all",
	useTabs: true,
	// Tailwind plugin specific options
	tailwindConfig: "./tailwind.config.js", // This will be created if needed
	tailwindFunctions: ["cn", "clsx", "twMerge"],
};

export default config;

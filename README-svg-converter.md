# SVG to React Component Converter

This TypeScript script automatically converts SVG files to React components following specific conventions.

## Features

- **Kebab-case filenames**: Ensures output filenames follow kebab-case convention (e.g., `My Icon.svg` → `my-icon.tsx`)
- **PascalCase component names**: Converts kebab-case filenames to PascalCase for component names
- **currentColor fills**: Replaces all fill colors with `currentColor` for themeable icons
- **TypeScript support**: Generates TypeScript components with proper typing
- **JSX conversion**: Converts HTML attributes to JSX (e.g., `fill-rule` → `fillRule`)
- **Props spreading**: Includes `{...props}` for maximum flexibility

## Usage

### Basic Usage

```bash
# Using tsx (recommended)
tsx convert-svg-to-components.ts

# Using bun
bun run convert-svg-to-components.ts

# Using node with tsx
npx tsx convert-svg-to-components.ts
```

### Configuration

The script uses these default directories:

- **Source**: `./icons` (SVG files)
- **Output**: `./src/modules/shared/components/icons` (React components)

You can modify these paths by editing the constants at the top of the script:

```typescript
const SVG_SOURCE_DIR = "./icons";
const COMPONENT_OUTPUT_DIR = "./src/modules/shared/components/icons";
```

### Example

Given an SVG file `Check Circle.svg`:

```xml
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="..." fill="#000000"/>
</svg>
```

The script generates `check-circle.tsx`:

```tsx
export default function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path fillRule="evenodd" clipRule="evenodd" d="..." fill="currentColor" />
		</svg>
	);
}
```

## Conversion Rules

1. **Filename**: Any format → `kebab-case.tsx`
    - `My Icon.svg` → `my-icon.tsx`
    - `check_circle.svg` → `check-circle.tsx`
    - `Check-Circle.svg` → `check-circle.tsx`
2. **Component name**: `kebab-case` → `PascalCase`
    - `my-icon` → `MyIcon`
    - `check-circle` → `CheckCircle`
3. **Fill colors**: Any fill value → `currentColor`
4. **HTML to JSX**: Converts attributes like:
    - `fill-rule` → `fillRule`
    - `clip-rule` → `clipRule`
    - `stroke-width` → `strokeWidth`
    - And many more...

## Output

The script provides detailed feedback:

```
🚀 Starting SVG to React Component conversion...

📂 Found 5 SVG files to convert:

✅ Converted Check Circle.svg → check-circle.tsx
✅ Converted Arrow Left.svg → arrow-left.tsx
✅ Converted user_profile.svg → user-profile.tsx

📊 Conversion Summary:
✅ Successful: 3
❌ Failed: 0
📁 Output directory: ./src/modules/shared/components/icons

🎉 Conversion complete!
```

## Requirements

- **Node.js** with **tsx** or **bun**
- No additional dependencies required (uses built-in `fs` and `path` modules)

### Installation

```bash
# Install tsx globally
npm install -g tsx

# Or use bun (which includes TypeScript support)
npm install -g bun
```

## Error Handling

The script handles common issues:

- Missing source directory
- Invalid SVG format
- File system permissions
- Detailed error reporting for failed conversions
- Type-safe error handling with TypeScript

## Component Usage

Generated components can be used like any React component:

```tsx
import CheckCircle from "./icons/check-circle";

function MyComponent() {
	return (
		<div>
			<CheckCircle className="text-green-500" width={24} height={24} />
		</div>
	);
}
```

The `currentColor` fill allows the icon to inherit the text color from CSS.

## TypeScript Benefits

- **Type safety**: All functions are properly typed
- **Better error handling**: Type-safe error messages
- **IDE support**: Full IntelliSense and autocomplete
- **Compile-time checks**: Catches errors before runtime

## Filename Normalization

The script automatically normalizes filenames to follow kebab-case convention:

- **Spaces and underscores** → **hyphens**
- **Multiple hyphens** → **single hyphen**
- **Leading/trailing hyphens** → **removed**
- **All lowercase**

Examples:

- `My Icon.svg` → `my-icon.tsx`
- `check_circle.svg` → `check-circle.tsx`
- `Check-Circle.svg` → `check-circle.tsx`
- `my--icon.svg` → `my-icon.tsx`
- `_My_Icon_.svg` → `my-icon.tsx`

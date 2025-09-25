import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const featureIconVariants = cva("aspect-square shrink-0 grow-0 relative flex items-center justify-center outline-none overflow-hidden", {
	variants: {
		shape: {
			circle: "rounded-full",
			rounded: "",
		},
		size: {
			xl: "size-40 [&>svg]:size-24",
			lg: "size-[--spacing(30)] [&>svg]:size-16",
			default: "size-16 [&>svg]:size-9",
			sm: "size-12 [&>svg]:size-6",
			xs: "size-9 [&>svg]:size-5",
		},
		variant: {
			neutral: "bg-neutral-20 text-foreground dark:bg-neutral-70",
			primary: "bg-primary text-primary-foreground",
			positive: "bg-positive text-positive-foreground",
			alert: "bg-alert text-alert-foreground",
			negative: "bg-negative text-negative-foreground",
		},
		solid: {
			true: "",
			false: null,
		},
	},
	compoundVariants: [
		{
			variant: "neutral",
			solid: false,
			className: "bg-background text-foreground",
		},
		{
			variant: "primary",
			solid: false,
			className: "bg-primary-10 text-foreground",
		},
		{
			variant: "positive",
			solid: false,
			className:
				"bg-positive/10 text-green-80 border-2 border-positive/10 ring-2 ring-positive/10 data-[size=default]:border-3 data-[size=default]:ring-3 data-[size=lg]:border-4 data-[size=lg]:ring-4 data-[size=xl]:border-4 data-[size=xl]:ring-4",
		},
		{
			variant: "alert",
			solid: false,
			className:
				"bg-alert/10 text-yellow-70 border-2 border-alert/10 ring-2 ring-alert/10 data-[size=default]:border-3 data-[size=default]:ring-3 data-[size=lg]:border-4 data-[size=lg]:ring-4 data-[size=xl]:border-4 data-[size=xl]:ring-4",
		},
		{
			variant: "negative",
			solid: false,
			className:
				"bg-negative/10 text-red-70 border-2 border-negative/10 ring-2 ring-negative/10 ata-[size=default]:border-3 data-[size=default]:ring-3 data-[size=lg]:border-4 data-[size=lg]:ring-4 data-[size=xl]:border-4 data-[size=xl]:ring-4",
		},
		{
			shape: "rounded",
			size: "xl",
			className: "rounded-4xl",
		},
		{
			shape: "rounded",
			size: "lg",
			className: "rounded-3xl",
		},
		{
			shape: "rounded",
			size: "default",
			className: "rounded-2xl",
		},
		{
			shape: "rounded",
			size: ["sm", "xs"],
			className: "rounded-lg",
		},
	],
});
type FeatureIconVariants = VariantProps<typeof featureIconVariants>;

export function FeatureIcon({
	className,
	shape = "circle",
	size = "default",
	solid = true,
	variant = "primary",
	...props
}: React.ComponentProps<"span"> & FeatureIconVariants) {
	return (
		<span
			data-shape={shape}
			data-size={size}
			data-variant={variant}
			data-solid={solid}
			className={cn(featureIconVariants({ shape, size, variant, solid }), className)}
			{...props}
		/>
	);
}

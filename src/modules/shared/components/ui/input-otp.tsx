"use client";

import { useRef, useState, useEffect, type KeyboardEvent, type ClipboardEvent } from "react";
import { cn } from "../../lib/utils";

export interface OTPInputProps {
	numberOfDigits?: number;
	value?: string;
	onChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	digitClassName?: string;
	autoFocus?: boolean;
}

export function OTPInput({
	numberOfDigits = 6,
	value = "",
	onChange,
	onComplete,
	placeholder = "0",
	disabled = false,
	className,
	digitClassName,
	autoFocus = false,
}: OTPInputProps) {
	const [digits, setDigits] = useState<string[]>(Array(numberOfDigits).fill(""));
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		const newDigits = Array(numberOfDigits).fill("");
		for (let i = 0; i < Math.min(value.length, numberOfDigits); i++) {
			newDigits[i] = value[i] ?? "";
		}
		setDigits(newDigits);
	}, [value, numberOfDigits]);

	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [autoFocus]);

	const handleChange = (index: number, newValue: string) => {
		if (newValue && !/^\d$/.test(newValue)) return;

		const newDigits = [...digits];
		newDigits[index] = newValue;

		setDigits(newDigits);

		const otpValue = newDigits.join("");
		onChange?.(otpValue);

		if (newValue && index < numberOfDigits - 1) {
			inputRefs.current[index + 1]?.focus();
		}

		if (otpValue.length === numberOfDigits && !otpValue.includes("")) {
			onComplete?.(otpValue);
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			if (!digits[index] && index > 0) {
				inputRefs.current[index - 1]?.focus();
			} else {
				handleChange(index, "");
			}
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");

		if (pastedData) {
			const newDigits = Array(numberOfDigits).fill("");
			for (let i = 0; i < Math.min(pastedData.length, numberOfDigits); i++) {
				newDigits[i] = pastedData[i];
			}

			setDigits(newDigits);
			onChange?.(newDigits.join(""));

			const nextEmptyIndex = newDigits.findIndex((digit) => !digit);
			const focusIndex = nextEmptyIndex === -1 ? numberOfDigits - 1 : nextEmptyIndex;
			inputRefs.current[focusIndex]?.focus();

			const otpValue = newDigits.join("");
			if (otpValue.length === numberOfDigits && !otpValue.includes("")) {
				onComplete?.(otpValue);
			}
		}
	};

	const handleFocus = (index: number) => {
		inputRefs.current[index]?.select();
	};

	return (
		<div className={cn("flex gap-2", className)}>
			{digits.map((digit, index) => (
				<input
					key={index}
					ref={(el) => void (inputRefs.current[index] = el)}
					type="code"
					inputMode="numeric"
					maxLength={1}
					value={digit}
					onChange={(e) => handleChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					onPaste={handlePaste}
					onFocus={() => handleFocus(index)}
					placeholder={placeholder}
					disabled={disabled}
					className={cn(
						// Base styles
						"h-12 w-12 rounded-lg border-2 text-center text-lg font-semibold transition-all duration-200",
						"bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100",

						// Border states
						"border-slate-200 dark:border-slate-600",
						"focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",

						// Filled state
						digit && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",

						// Disabled state
						"disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",
						"disabled:border-slate-200 dark:disabled:border-slate-600 dark:disabled:bg-slate-700",

						// Hover state
						"hover:border-slate-300 dark:hover:border-slate-500",

						digitClassName,
					)}
				/>
			))}
		</div>
	);
}

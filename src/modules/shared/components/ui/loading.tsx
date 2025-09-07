import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface LoaderWithDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
	message?: string;
}

export function LoaderWithDescription({ message }: LoaderWithDescriptionProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const LoaderIcon = <LoaderCircle className="h-14 w-14 animate-spin text-blue-900" strokeWidth={2.5} />;

	return isMobile ? (
		<div className="inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white">
			{LoaderIcon}
			{message && <p className="px-4 text-center text-lg font-semibold text-gray-900">{message}</p>}
		</div>
	) : (
		<div className="inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="flex w-[418px] max-w-full flex-col items-center justify-center gap-8 rounded-xl bg-white px-20 py-36">
				{LoaderIcon}
				{message && <p className="text-center text-lg font-semibold text-gray-900">{message}</p>}
			</div>
		</div>
	);
}

"use client";

import { Spotlight } from "@/components/core/spotlight";
import { cn } from "@/utils";

interface SpotlightWrapperProps {
	children: React.ReactNode;
	className?: string;
	spotlightClassName?: string;
	size?: number;
	showGrid?: boolean;
}

export function SpotlightWrapper({
	children,
	className,
	spotlightClassName = "from-blue-800 via-blue-600 to-blue-400 blur-xl dark:from-blue-900 dark:via-blue-500 dark:to-blue-900",
	size = 64,
	showGrid = false,
}: SpotlightWrapperProps) {
	return (
		<div className={cn("relative", className)}>
			<Spotlight className={spotlightClassName} size={size} />

			{showGrid && (
				<div className="absolute inset-0">
					<svg className="h-full w-full">
						<defs>
							<pattern
								id="grid-pattern"
								width="8"
								height="8"
								patternUnits="userSpaceOnUse"
							>
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M0 4H4M4 4V0M4 4H8M4 4V8"
									stroke="currentColor"
									strokeOpacity="0.3"
									className="stroke-white dark:stroke-black"
								/>
								<rect
									x="3"
									y="3"
									width="2"
									height="2"
									fill="currentColor"
									fillOpacity="0.25"
									className="fill-white dark:fill-black"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-pattern)" />
					</svg>
				</div>
			)}

			<div className="relative z-10">{children}</div>
		</div>
	);
}

/**
 * Linkify AI Brand Logo Component
 * Provides consistent logo usage across the application
 */

import { cn } from "@/utils";
import { LINKIFY_BRAND, getBrandAsset } from "@/utils/constants/brand";
import Image from "next/image";

interface BrandLogoProps {
	variant?: "primary" | "wordmark" | "favicon";
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	showText?: boolean;
	textClassName?: string;
}

const sizeClasses = {
	sm: "h-6 w-6",
	md: "h-8 w-8",
	lg: "h-12 w-12",
	xl: "h-16 w-16",
};

const textSizeClasses = {
	sm: "text-lg font-semibold",
	md: "text-xl font-semibold",
	lg: "text-2xl font-bold",
	xl: "text-3xl font-bold",
};

export function BrandLogo({
	variant = "primary",
	size = "md",
	className,
	showText = false,
	textClassName,
}: BrandLogoProps) {
	const logoSrc = getBrandAsset("logo", variant);
	const sizeClass = sizeClasses[size];
	const textSizeClass = textSizeClasses[size];

	if (variant === "wordmark") {
		return (
			<div className={cn("flex items-center", className)}>
				<Image
					src={logoSrc}
					alt={`${LINKIFY_BRAND.name} Logo`}
					width={120}
					height={32}
					className="h-8 w-auto"
					priority
				/>
			</div>
		);
	}

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Image
				src={logoSrc}
				alt={`${LINKIFY_BRAND.name} Logo`}
				width={32}
				height={32}
				className={cn(sizeClass, "flex-shrink-0")}
				priority
			/>
			{showText && (
				<span
					className={cn(
						textSizeClass,
						"linkify-gradient-text font-heading",
						textClassName,
					)}
				>
					{LINKIFY_BRAND.name}
				</span>
			)}
		</div>
	);
}

export default BrandLogo;

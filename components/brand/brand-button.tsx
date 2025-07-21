/**
 * Linkify AI Brand Button Component
 * Consistent button styling with Linkify AI branding
 */

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils";
import { componentThemes } from "@/utils/constants/brand";
import { forwardRef } from "react";

interface BrandButtonProps extends ButtonProps {
	brandVariant?: "primary" | "secondary" | "ghost" | "gradient";
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
	({ className, brandVariant = "primary", variant, ...props }, ref) => {
		// Use brand variant if specified, otherwise fall back to regular variant
		const brandClass = brandVariant ? componentThemes.button[brandVariant] : "";

		return (
			<Button
				ref={ref}
				variant={brandVariant ? undefined : variant}
				className={cn(brandClass, className)}
				{...props}
			/>
		);
	},
);

BrandButton.displayName = "BrandButton";

export default BrandButton;

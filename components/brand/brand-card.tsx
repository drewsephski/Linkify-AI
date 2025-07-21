/**
 * Linkify AI Brand Card Component
 * Consistent card styling with Linkify AI branding
 */

import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import { componentThemes } from "@/utils/constants/brand";
import { forwardRef } from "react";
import * as React from "react";

interface BrandCardProps extends React.HTMLAttributes<HTMLDivElement> {
	brandVariant?: "default" | "elevated" | "branded";
}

export const BrandCard = forwardRef<HTMLDivElement, BrandCardProps>(
	({ className, brandVariant = "default", ...props }, ref) => {
		const brandClass = componentThemes.card[brandVariant];

		return <Card ref={ref} className={cn(brandClass, className)} {...props} />;
	},
);

BrandCard.displayName = "BrandCard";

export default BrandCard;

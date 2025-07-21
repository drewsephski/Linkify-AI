/**
 * Linkify AI Brand Components
 * Centralized export for all brand-related components
 */

export { BrandLogo, default as BrandLogoDefault } from "./brand-logo";
export { BrandButton, default as BrandButtonDefault } from "./brand-button";
export { BrandCard, default as BrandCardDefault } from "./brand-card";

// Re-export brand utilities for convenience
export {
	LINKIFY_BRAND,
	getBrandAsset,
	getBrandColor,
	getBrandFont,
	brandClasses,
	componentThemes,
} from "@/utils/constants/brand";

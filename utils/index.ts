// constants
import {
	CHILD_VARIANTS,
	FADE_IN_VARIANTS,
	LIST_ITEM_VARIANTS,
	MODAL_VARIANTS,
} from "./constants/animation";
import {
	brandClasses,
	componentThemes,
	getBrandAsset,
	getBrandColor,
	getBrandFont,
} from "./constants/brand";
import {
	BRAND_GUIDELINES,
	DESIGN_TOKENS,
	LINKIFY_COLORS,
	TYPOGRAPHY,
} from "./constants/design-tokens";
import { aeonik, inter } from "./constants/fonts";
import {
	COMPANIES,
	DEFAULT_AVATAR_URL,
	PAGINATION_LIMIT,
	PROCESS,
} from "./constants/misc";
import { NAV_LINKS } from "./constants/nav-links";
import { PLANS, PRICING_FEATURES, WORKSPACE_LIMIT } from "./constants/pricing";
import {
	APP_DOMAIN,
	APP_HOSTNAMES,
	APP_NAME,
	LINKIFY_BRAND,
} from "./constants/site";
import {
	ANIMATION_PRESETS,
	BRAND_CLASSES,
	COMPONENT_THEMES,
	LINKIFY_THEME,
} from "./constants/theme";

// functions
import { cn } from "@/utils/functions/cn";
import { generateMetadata } from "./functions/metadata";
import { isValidUrl } from "./functions/urls";

export {
	// constants
	LIST_ITEM_VARIANTS,
	CHILD_VARIANTS,
	APP_DOMAIN,
	APP_HOSTNAMES,
	APP_NAME,
	DEFAULT_AVATAR_URL,
	FADE_IN_VARIANTS,
	MODAL_VARIANTS,
	PAGINATION_LIMIT,
	PLANS,
	PRICING_FEATURES,
	WORKSPACE_LIMIT,
	NAV_LINKS,
	COMPANIES,
	PROCESS,
	aeonik,
	inter,
	// design tokens
	DESIGN_TOKENS,
	LINKIFY_COLORS,
	TYPOGRAPHY,
	BRAND_GUIDELINES,
	// theme
	LINKIFY_THEME,
	COMPONENT_THEMES,
	ANIMATION_PRESETS,
	BRAND_CLASSES,
	// brand
	LINKIFY_BRAND,
	brandClasses,
	componentThemes,
	getBrandAsset,
	getBrandColor,
	getBrandFont,
	// functions
	cn,
	isValidUrl,
	generateMetadata,
};

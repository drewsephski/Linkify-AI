/**
 * Linkify AI Theme Configuration
 * Centralized theme settings for consistent application styling
 */

import { DESIGN_TOKENS } from "./design-tokens";

// Theme variants
export type ThemeVariant = "light" | "dark";

// Component theme configurations
export const COMPONENT_THEMES = {
	button: {
		primary: {
			light:
				"bg-linkify-500 hover:bg-linkify-600 text-white border-linkify-500",
			dark: "bg-linkify-500 hover:bg-linkify-400 text-white border-linkify-500",
		},
		secondary: {
			light: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			dark: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		},
		outline: {
			light: "border-linkify-500 text-linkify-600 hover:bg-linkify-50",
			dark: "border-linkify-400 text-linkify-400 hover:bg-linkify-950",
		},
		ghost: {
			light: "text-linkify-600 hover:bg-linkify-50",
			dark: "text-linkify-400 hover:bg-linkify-950",
		},
	},

	card: {
		default: {
			light: "bg-card text-card-foreground border-border",
			dark: "bg-card text-card-foreground border-border",
		},
		elevated: {
			light: "bg-white shadow-lg border-border",
			dark: "bg-card shadow-lg border-border",
		},
	},

	input: {
		default: {
			light: "bg-background border-input text-foreground",
			dark: "bg-background border-input text-foreground",
		},
		focused: {
			light: "ring-linkify-500 border-linkify-500",
			dark: "ring-linkify-400 border-linkify-400",
		},
	},

	badge: {
		primary: {
			light: "bg-linkify-100 text-linkify-800 border-linkify-200",
			dark: "bg-linkify-900 text-linkify-100 border-linkify-800",
		},
		secondary: {
			light: "bg-secondary text-secondary-foreground",
			dark: "bg-secondary text-secondary-foreground",
		},
		success: {
			light: "bg-green-100 text-green-800 border-green-200",
			dark: "bg-green-900 text-green-100 border-green-800",
		},
		warning: {
			light: "bg-yellow-100 text-yellow-800 border-yellow-200",
			dark: "bg-yellow-900 text-yellow-100 border-yellow-800",
		},
		error: {
			light: "bg-red-100 text-red-800 border-red-200",
			dark: "bg-red-900 text-red-100 border-red-800",
		},
	},
} as const;

// Animation presets
export const ANIMATION_PRESETS = {
	fadeIn: "animate-in fade-in duration-300",
	slideIn: "animate-in slide-in-from-bottom-4 duration-300",
	scaleIn: "animate-in zoom-in-95 duration-200",
	slideUp: "animate-in slide-in-from-bottom-2 duration-200",

	fadeOut: "animate-out fade-out duration-200",
	slideOut: "animate-out slide-out-to-bottom-4 duration-200",
	scaleOut: "animate-out zoom-out-95 duration-150",
	slideDown: "animate-out slide-out-to-bottom-2 duration-150",
} as const;

// Layout configurations
export const LAYOUT_CONFIG = {
	container: {
		sm: "max-w-screen-sm",
		md: "max-w-screen-md",
		lg: "max-w-screen-lg",
		xl: "max-w-screen-xl",
		"2xl": "max-w-screen-2xl",
		full: "max-w-full",
	},

	spacing: {
		section: "py-16 md:py-24",
		component: "py-8 md:py-12",
		element: "py-4 md:py-6",
	},

	grid: {
		cols1: "grid-cols-1",
		cols2: "grid-cols-1 md:grid-cols-2",
		cols3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		cols4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	},
} as const;

// Utility functions for theme application
export const getThemeClass = (
	component: keyof typeof COMPONENT_THEMES,
	variant: string,
	theme: ThemeVariant = "dark",
): string => {
	const componentTheme = COMPONENT_THEMES[component];
	if (
		!componentTheme ||
		!componentTheme[variant as keyof typeof componentTheme]
	) {
		return "";
	}

	const variantTheme = componentTheme[variant as keyof typeof componentTheme];
	return variantTheme[theme] || "";
};

export const applyAnimation = (
	preset: keyof typeof ANIMATION_PRESETS,
): string => {
	return ANIMATION_PRESETS[preset];
};

export const getLayoutClass = (
	type: keyof typeof LAYOUT_CONFIG,
	variant: string,
): string => {
	const layoutConfig = LAYOUT_CONFIG[type];
	if (!layoutConfig || !layoutConfig[variant as keyof typeof layoutConfig]) {
		return "";
	}

	return layoutConfig[variant as keyof typeof layoutConfig];
};

// Brand-specific utility classes
export const BRAND_CLASSES = {
	gradient: {
		primary: "bg-gradient-to-r from-linkify-500 to-linkify-600",
		secondary: "bg-gradient-to-r from-linkify-400 to-linkify-500",
		accent: "bg-gradient-to-r from-linkify-500 via-blue-500 to-linkify-600",
		text: "bg-gradient-to-r from-linkify-500 to-linkify-600 bg-clip-text text-transparent",
	},

	shadow: {
		primary: "shadow-linkify-500/25",
		glow: "shadow-lg shadow-linkify-500/25",
		colored: "drop-shadow-lg drop-shadow-linkify-500/25",
	},

	border: {
		primary: "border-linkify-500",
		accent: "border-linkify-400",
		subtle: "border-linkify-200 dark:border-linkify-800",
	},

	text: {
		primary: "text-linkify-600 dark:text-linkify-400",
		accent: "text-linkify-500",
		muted: "text-linkify-500/70",
	},
} as const;

// Export theme configuration
export const LINKIFY_THEME = {
	components: COMPONENT_THEMES,
	animations: ANIMATION_PRESETS,
	layout: LAYOUT_CONFIG,
	brand: BRAND_CLASSES,
	tokens: DESIGN_TOKENS,
} as const;

export default LINKIFY_THEME;

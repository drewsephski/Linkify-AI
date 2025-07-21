/**
 * Linkify AI Design Tokens
 * Centralized design system configuration for consistent branding
 */

// Brand Colors - Linkify AI Color Palette
export const LINKIFY_COLORS = {
	// Primary Brand Colors
	primary: {
		50: "#f0f9ff",
		100: "#e0f2fe",
		200: "#bae6fd",
		300: "#7dd3fc",
		400: "#38bdf8",
		500: "#0ea5e9", // Main Linkify Blue
		600: "#0284c7",
		700: "#0369a1",
		800: "#075985",
		900: "#0c4a6e",
		950: "#082f49",
	},

	// Secondary Brand Colors
	secondary: {
		50: "#f8fafc",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a",
		950: "#020617",
	},

	// Accent Colors
	accent: {
		purple: "#8b5cf6",
		green: "#10b981",
		orange: "#f59e0b",
		red: "#ef4444",
	},

	// Semantic Colors
	success: "#10b981",
	warning: "#f59e0b",
	error: "#ef4444",
	info: "#0ea5e9",
} as const;

// Typography Scale
export const TYPOGRAPHY = {
	fontFamily: {
		heading: ["Aeonik Pro", "Inter", "system-ui", "sans-serif"],
		body: ["Inter", "system-ui", "sans-serif"],
		mono: ["JetBrains Mono", "Menlo", "Monaco", "monospace"],
	},

	fontSize: {
		xs: "0.75rem", // 12px
		sm: "0.875rem", // 14px
		base: "1rem", // 16px
		lg: "1.125rem", // 18px
		xl: "1.25rem", // 20px
		"2xl": "1.5rem", // 24px
		"3xl": "1.875rem", // 30px
		"4xl": "2.25rem", // 36px
		"5xl": "3rem", // 48px
		"6xl": "3.75rem", // 60px
		"7xl": "4.5rem", // 72px
	},

	fontWeight: {
		thin: "100",
		light: "300",
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
		extrabold: "800",
		black: "900",
	},

	lineHeight: {
		tight: "1.25",
		snug: "1.375",
		normal: "1.5",
		relaxed: "1.625",
		loose: "2",
	},
} as const;

// Spacing Scale
export const SPACING = {
	0: "0",
	1: "0.25rem", // 4px
	2: "0.5rem", // 8px
	3: "0.75rem", // 12px
	4: "1rem", // 16px
	5: "1.25rem", // 20px
	6: "1.5rem", // 24px
	8: "2rem", // 32px
	10: "2.5rem", // 40px
	12: "3rem", // 48px
	16: "4rem", // 64px
	20: "5rem", // 80px
	24: "6rem", // 96px
	32: "8rem", // 128px
	40: "10rem", // 160px
	48: "12rem", // 192px
	56: "14rem", // 224px
	64: "16rem", // 256px
} as const;

// Border Radius
export const BORDER_RADIUS = {
	none: "0",
	sm: "0.125rem", // 2px
	base: "0.25rem", // 4px
	md: "0.375rem", // 6px
	lg: "0.5rem", // 8px
	xl: "0.75rem", // 12px
	"2xl": "1rem", // 16px
	"3xl": "1.5rem", // 24px
	full: "9999px",
} as const;

// Shadows
export const SHADOWS = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
	"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
	inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// Animation Durations
export const ANIMATION = {
	duration: {
		fast: "150ms",
		normal: "300ms",
		slow: "500ms",
	},

	easing: {
		linear: "linear",
		in: "cubic-bezier(0.4, 0, 1, 1)",
		out: "cubic-bezier(0, 0, 0.2, 1)",
		inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	},
} as const;

// Breakpoints
export const BREAKPOINTS = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px",
} as const;

// Z-Index Scale
export const Z_INDEX = {
	hide: -1,
	auto: "auto",
	base: 0,
	docked: 10,
	dropdown: 1000,
	sticky: 1100,
	banner: 1200,
	overlay: 1300,
	modal: 1400,
	popover: 1500,
	skipLink: 1600,
	toast: 1700,
	tooltip: 1800,
} as const;

// Component Variants
export const COMPONENT_VARIANTS = {
	button: {
		size: {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-base",
			lg: "px-6 py-3 text-lg",
		},
		variant: {
			primary: "bg-primary-500 text-white hover:bg-primary-600",
			secondary: "bg-secondary-200 text-secondary-900 hover:bg-secondary-300",
			outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
			ghost: "text-primary-500 hover:bg-primary-50",
		},
	},

	input: {
		size: {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-base",
			lg: "px-6 py-3 text-lg",
		},
	},
} as const;

// Brand Guidelines
export const BRAND_GUIDELINES = {
	name: "Linkify AI",
	tagline: "Transform your content with AI-powered blog generation",

	logo: {
		primary: "/icons/linkify-logo.svg",
		wordmark: "/icons/linkify-wordmark.svg",
		favicon: "/favicon.svg",
		fallback: "/icons/logo.svg", // Keep existing as fallback
	},

	colors: {
		primary: LINKIFY_COLORS.primary[500],
		secondary: LINKIFY_COLORS.secondary[600],
	},

	typography: {
		heading: TYPOGRAPHY.fontFamily.heading,
		body: TYPOGRAPHY.fontFamily.body,
	},
} as const;

// Export all tokens as a single object for easy access
export const DESIGN_TOKENS = {
	colors: LINKIFY_COLORS,
	typography: TYPOGRAPHY,
	spacing: SPACING,
	borderRadius: BORDER_RADIUS,
	shadows: SHADOWS,
	animation: ANIMATION,
	breakpoints: BREAKPOINTS,
	zIndex: Z_INDEX,
	components: COMPONENT_VARIANTS,
	brand: BRAND_GUIDELINES,
} as const;

export default DESIGN_TOKENS;

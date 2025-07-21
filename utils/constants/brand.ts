/**
 * Linkify AI Brand Configuration
 * Centralized branding system for consistent application styling
 */

// Brand Identity
export const LINKIFY_BRAND = {
	name: "Linkify AI",
	tagline: "Transform your content with AI-powered blog generation",
	description:
		"Convert your video or audio into a Blog Post in seconds with the power of AI!",

	// URLs and Domains
	domain: process.env.NEXT_PUBLIC_APP_DOMAIN || "linkify.ai",
	url: `https://${process.env.NEXT_PUBLIC_APP_DOMAIN || "linkify.ai"}`,

	// Brand Assets
	assets: {
		logo: {
			primary: "/icons/linkify-logo.svg",
			wordmark: "/icons/linkify-wordmark.svg",
			favicon: "/favicon.svg",
			fallback: "/icons/logo.svg",
		},
		images: {
			og: "/linkify.png",
			thumbnail: "/public/assets/thumbnails.png",
		},
	},

	// Social Media
	social: {
		twitter: "@linkifyai",
		github: "https://github.com/drewsephski/linkify-ai",
		linkedin: "https://linkedin.com/company/linkify-ai",
	},

	// Brand Colors (HSL format for CSS variables)
	colors: {
		primary: {
			hsl: "221 83% 53%", // #1e40af (Dark Blue)
			hex: "#1e40af",
			rgb: "rgb(30, 64, 175)",
		},
		secondary: {
			hsl: "217 91% 60%", // #3b82f6 (Medium Blue)
			hex: "#3b82f6",
			rgb: "rgb(59, 130, 246)",
		},
		accent: {
			hsl: "217 92% 75%", // #60a5fa (Light Blue)
			hex: "#60a5fa",
			rgb: "rgb(96, 165, 250)",
		},
	},

	// Typography
	typography: {
		heading: {
			fontFamily: ["Aeonik Pro", "Inter", "system-ui", "sans-serif"],
			className: "font-heading",
		},
		body: {
			fontFamily: ["Inter", "system-ui", "sans-serif"],
			className: "font-default",
		},
		mono: {
			fontFamily: ["JetBrains Mono", "Menlo", "Monaco", "monospace"],
			className: "font-mono",
		},
	},

	// Brand Guidelines
	guidelines: {
		// Logo usage
		logo: {
			minSize: "24px",
			clearSpace: "16px",
			formats: ["SVG", "PNG"],
			usage: [
				"Use the primary logo on light backgrounds",
				"Use the wordmark for horizontal layouts",
				"Maintain minimum clear space around logo",
				"Do not modify logo colors or proportions",
			],
		},

		// Color usage
		colors: {
			primary: {
				usage: "Primary actions, links, and brand elements",
				accessibility: "WCAG AA compliant on white backgrounds",
			},
			secondary: {
				usage: "Text, borders, and subtle elements",
				accessibility: "WCAG AAA compliant for body text",
			},
		},

		// Typography guidelines
		typography: {
			hierarchy: [
				"Use Aeonik Pro for headings and brand elements",
				"Use Inter for body text and UI elements",
				"Maintain consistent line heights and spacing",
				"Ensure proper contrast ratios",
			],
		},
	},
} as const;

// Brand Utility Functions
export const getBrandAsset = (
	type: keyof typeof LINKIFY_BRAND.assets,
	variant?: string,
) => {
	const assetGroup = LINKIFY_BRAND.assets[type];
	if (typeof assetGroup === "string") return assetGroup;
	if (variant && variant in assetGroup) {
		return assetGroup[variant as keyof typeof assetGroup];
	}
	return (
		"primary" in assetGroup ? assetGroup.primary : Object.values(assetGroup)[0]
	) as string;
};

export const getBrandColor = (
	color: keyof typeof LINKIFY_BRAND.colors,
	format: "hsl" | "hex" | "rgb" = "hex",
) => {
	return LINKIFY_BRAND.colors[color][format];
};

export const getBrandFont = (type: keyof typeof LINKIFY_BRAND.typography) => {
	return LINKIFY_BRAND.typography[type];
};

// CSS Class Generators
export const brandClasses = {
	// Gradient utilities
	gradient: {
		primary: "bg-gradient-to-r from-linkify-500 to-linkify-600",
		secondary: "bg-gradient-to-r from-linkify-400 to-linkify-500",
		accent: "bg-gradient-to-r from-linkify-500 via-purple-500 to-linkify-600",
		text: "linkify-gradient-text",
	},

	// Shadow utilities
	shadow: {
		primary: "linkify-shadow",
		glow: "linkify-glow",
		colored: "drop-shadow-lg drop-shadow-linkify-500/25",
	},

	// Border utilities
	border: {
		primary: "border-linkify-500",
		accent: "border-linkify-400",
		subtle: "border-linkify-200 dark:border-linkify-800",
		gradient: "linkify-border-gradient",
	},

	// Text utilities
	text: {
		primary: "text-linkify-600 dark:text-linkify-400",
		accent: "text-linkify-500",
		muted: "text-linkify-500/70",
		gradient: "linkify-gradient-text",
	},

	// Background utilities
	background: {
		primary: "bg-linkify-500",
		secondary: "bg-linkify-600",
		subtle: "bg-linkify-50 dark:bg-linkify-950",
		gradient: "linkify-gradient",
	},
} as const;

// Component Theme Presets
export const componentThemes = {
	button: {
		primary: `${brandClasses.background.primary} hover:${brandClasses.background.secondary} text-white`,
		secondary: `border ${brandClasses.border.primary} ${brandClasses.text.primary} hover:${brandClasses.background.subtle}`,
		ghost: `${brandClasses.text.primary} hover:${brandClasses.background.subtle}`,
		gradient: `${brandClasses.gradient.primary} text-white hover:opacity-90`,
	},

	card: {
		default: "bg-card border-border",
		elevated: `bg-card ${brandClasses.shadow.primary} border-border`,
		branded: `${brandClasses.gradient.primary} text-white`,
	},

	input: {
		default: "border-input focus:border-linkify-500 focus:ring-linkify-500",
		branded: `${brandClasses.border.primary} focus:ring-linkify-500`,
	},

	badge: {
		primary: `${brandClasses.background.subtle} ${brandClasses.text.primary} ${brandClasses.border.subtle}`,
		gradient: `${brandClasses.gradient.primary} text-white`,
	},
} as const;

export default LINKIFY_BRAND;

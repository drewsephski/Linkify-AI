// Enhanced blog generation request interface
export interface BlogGenerationRequest {
	topic: string;
	keywords: string[];
	tone?:
		| "professional"
		| "casual"
		| "technical"
		| "conversational"
		| "informative"
		| "humorous"
		| "authoritative"
		| "inspirational";
	targetAudience?: string;
	wordCount?: number;
	contentStructure?:
		| "standard"
		| "listicle"
		| "howto"
		| "comparison"
		| "case-study"
		| "interview";
	seoFocus?: "high" | "medium" | "low";
	includeImages?: boolean;
	brandVoice?: boolean;
	customInstructions?: string;
	apiKey?: string;
}

// SEO metadata structure
export interface SEOMetadata {
	metaDescription: string;
	keywords: string[];
	readingTime: number;
	slug: string;
	canonicalUrl?: string;
}

// Image generation prompt structure
export interface ImagePrompt {
	altText: string;
	prompt: string;
	placement: "hero" | "section" | "conclusion";
	sectionIndex?: number;
}

// Internal linking suggestion
export interface InternalLink {
	anchorText: string;
	url: string;
	relevance: string;
}

// Individual blog section with enhanced structure
export interface BlogSection {
	heading: string;
	content: string;
	subsections?: BlogSection[];
	imagePrompt?: ImagePrompt;
	internalLinks?: InternalLink[];
}

// Complete blog post structure
export interface EnhancedBlogPost {
	title: string;
	meta: SEOMetadata;
	introduction: string;
	sections: BlogSection[];
	conclusion: string;
	callToAction?: string;
	imagePrompts: ImagePrompt[];
	internalLinks: InternalLink[];
	tags: string[];
}

// Error response schema
export interface ErrorResponse {
	error: string;
	details?: string;
	retryAfter?: number;
}

// Success response schema
export interface SuccessResponse<T> {
	success: true;
	data: T;
	metadata: {
		requestId: string;
		processingTime: number;
		cached: boolean;
	};
}

// Schema definitions for Gemini AI (as plain objects)
export const blogPostSchema = {
	type: "object",
	properties: {
		title: {
			type: "string",
			description: "SEO-optimized blog post title with target keywords",
		},
		meta: {
			type: "object",
			properties: {
				metaDescription: {
					type: "string",
					description:
						"Compelling meta description for SEO (150-160 characters)",
				},
				keywords: {
					type: "array",
					items: { type: "string" },
					description: "Primary and secondary keywords for SEO",
				},
				readingTime: {
					type: "number",
					description: "Estimated reading time in minutes",
				},
				slug: {
					type: "string",
					description: "URL-friendly slug based on the title",
				},
				canonicalUrl: {
					type: "string",
					description: "Canonical URL for SEO purposes",
				},
			},
			required: ["metaDescription", "keywords", "readingTime", "slug"],
		},
		introduction: {
			type: "string",
			description:
				"Engaging introduction that hooks the reader and includes primary keywords",
		},
		sections: {
			type: "array",
			items: {
				type: "object",
				properties: {
					heading: {
						type: "string",
						description: "H2 or H3 heading with relevant keywords",
					},
					content: {
						type: "string",
						description:
							"Comprehensive content for the section with proper formatting",
					},
					subsections: {
						type: "array",
						items: { type: "object" },
						description: "Optional nested subsections",
					},
					imagePrompt: {
						type: "object",
						properties: {
							altText: { type: "string" },
							prompt: { type: "string" },
							placement: {
								type: "string",
								enum: ["hero", "section", "conclusion"],
							},
							sectionIndex: { type: "number" },
						},
					},
					internalLinks: {
						type: "array",
						items: {
							type: "object",
							properties: {
								anchorText: { type: "string" },
								url: { type: "string" },
								relevance: { type: "string" },
							},
						},
					},
				},
				required: ["heading", "content"],
			},
		},
		conclusion: {
			type: "string",
			description:
				"Strong conclusion that summarizes key points and includes call-to-action",
		},
		callToAction: {
			type: "string",
			description: "Compelling call-to-action for Linkify AI",
		},
		imagePrompts: {
			type: "array",
			items: {
				type: "object",
				properties: {
					altText: { type: "string" },
					prompt: { type: "string" },
					placement: {
						type: "string",
						enum: ["hero", "section", "conclusion"],
					},
					sectionIndex: { type: "number" },
				},
			},
		},
		internalLinks: {
			type: "array",
			items: {
				type: "object",
				properties: {
					anchorText: { type: "string" },
					url: { type: "string" },
					relevance: { type: "string" },
				},
			},
		},
		tags: {
			type: "array",
			items: { type: "string" },
			description: "Relevant tags for categorization",
		},
	},
	required: [
		"title",
		"meta",
		"introduction",
		"sections",
		"conclusion",
		"imagePrompts",
		"internalLinks",
		"tags",
	],
};

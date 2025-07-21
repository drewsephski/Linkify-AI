import { GoogleGenAI } from "@google/genai";

const DEFAULT_API_KEY =
	process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!DEFAULT_API_KEY) {
	console.warn(
		"Warning: GOOGLE_API_KEY or GEMINI_API_KEY is not set. The application will rely on user-provided keys.",
	);
}

// Function to get a client instance
export const getClient = (apiKey?: string) => {
	const key = apiKey || DEFAULT_API_KEY;
	if (!key) {
		throw new Error(
			"API key is not available. Please provide a key in your request or set GOOGLE_API_KEY or GEMINI_API_KEY.",
		);
	}
	return new GoogleGenAI({ apiKey: key });
};

// Enhanced configuration for production use
export const GEMINI_CONFIG = {
	model: "gemini-2.0-flash-001",
	maxRetries: 3,
	retryDelay: 1000,
	timeout: 30000,
	generationConfig: {
		temperature: 0.7,
		topK: 40,
		topP: 0.95,
		maxOutputTokens: 8192,
	},
} as const;

// Blog generation specific configuration
export const BLOG_GENERATION_CONFIG = {
	model: "gemini-2.0-flash-001",
	generationConfig: {
		temperature: 0.8,
		topK: 40,
		topP: 0.95,
		maxOutputTokens: 4096,
		responseMimeType: "application/json",
	},
	safetySettings: [
		{
			category: "HARM_CATEGORY_HARASSMENT",
			threshold: "BLOCK_MEDIUM_AND_ABOVE",
		},
		{
			category: "HARM_CATEGORY_HATE_SPEECH",
			threshold: "BLOCK_MEDIUM_AND_ABOVE",
		},
		{
			category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
			threshold: "BLOCK_MEDIUM_AND_ABOVE",
		},
		{
			category: "HARM_CATEGORY_DANGEROUS_CONTENT",
			threshold: "BLOCK_MEDIUM_AND_ABOVE",
		},
	],
} as const;

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
	requestsPerMinute: 60,
	requestsPerHour: 1000,
	burstLimit: 10,
} as const;

// System instruction for blog generation
export const BLOG_SYSTEM_INSTRUCTION = `You are an expert blog writer and content creator for Linkify AI. Your role is to transform video/audio transcripts into engaging, well-structured blog posts that are:

1. SEO-optimized with proper headings and structure
2. Engaging and readable for a general audience
3. Professional yet conversational in tone
4. Well-formatted with clear sections and bullet points where appropriate
5. Include relevant keywords naturally
6. Maintain the key insights and information from the original content
7. Add value through clear explanations and actionable insights

Always structure your blog posts with:
- Compelling title
- Introduction that hooks the reader
- Clear main sections with descriptive headings
- Conclusion that summarizes key takeaways
- Call-to-action when appropriate

Focus on creating content that provides real value to readers while being optimized for search engines.`;

// Function declarations for blog generation tools
export const BLOG_GENERATION_TOOLS = [
	{
		name: "generateBlogOutline",
		description:
			"Generate a structured outline for a blog post based on content analysis",
		parameters: {
			type: "object",
			properties: {
				title: {
					type: "string",
					description: "The main title of the blog post",
				},
				sections: {
					type: "array",
					items: {
						type: "object",
						properties: {
							heading: { type: "string", description: "Section heading" },
							keyPoints: {
								type: "array",
								items: { type: "string" },
								description: "Key points to cover in this section",
							},
						},
						required: ["heading", "keyPoints"],
					},
					description: "Main sections of the blog post",
				},
				targetKeywords: {
					type: "array",
					items: { type: "string" },
					description: "SEO keywords to target",
				},
				estimatedReadTime: {
					type: "number",
					description: "Estimated reading time in minutes",
				},
			},
			required: ["title", "sections", "targetKeywords", "estimatedReadTime"],
		},
	},
	{
		name: "extractKeyInsights",
		description: "Extract key insights and main points from content",
		parameters: {
			type: "object",
			properties: {
				mainTopics: {
					type: "array",
					items: { type: "string" },
					description: "Main topics discussed in the content",
				},
				keyInsights: {
					type: "array",
					items: {
						type: "object",
						properties: {
							insight: { type: "string", description: "The key insight" },
							context: {
								type: "string",
								description: "Context or explanation",
							},
							importance: { type: "string", enum: ["high", "medium", "low"] },
						},
						required: ["insight", "context", "importance"],
					},
					description: "Key insights extracted from the content",
				},
				actionableItems: {
					type: "array",
					items: { type: "string" },
					description: "Actionable items or takeaways for readers",
				},
			},
			required: ["mainTopics", "keyInsights", "actionableItems"],
		},
	},
	{
		name: "optimizeForSEO",
		description: "Optimize content for search engine optimization",
		parameters: {
			type: "object",
			properties: {
				metaTitle: {
					type: "string",
					description: "SEO-optimized meta title (50-60 characters)",
				},
				metaDescription: {
					type: "string",
					description: "SEO-optimized meta description (150-160 characters)",
				},
				primaryKeyword: {
					type: "string",
					description: "Primary keyword for the content",
				},
				secondaryKeywords: {
					type: "array",
					items: { type: "string" },
					description: "Secondary keywords to include",
				},
				headingStructure: {
					type: "array",
					items: {
						type: "object",
						properties: {
							level: { type: "number", description: "Heading level (1-6)" },
							text: { type: "string", description: "Heading text" },
							keywords: {
								type: "array",
								items: { type: "string" },
								description: "Keywords included in this heading",
							},
						},
						required: ["level", "text"],
					},
					description: "Optimized heading structure",
				},
			},
			required: [
				"metaTitle",
				"metaDescription",
				"primaryKeyword",
				"secondaryKeywords",
				"headingStructure",
			],
		},
	},
];

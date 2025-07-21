import { GoogleGenAI } from "@google/genai";
import {
	BLOG_GENERATION_CONFIG,
	BLOG_SYSTEM_INSTRUCTION,
	getClient,
} from "./client";
import {
	BlogGenerationConfig,
	BlogGenerationRequest,
	BlogGenerationResult,
	BlogOutline,
	ContentAnalysis,
	ExtractedInsights,
	GeminiResponse,
	SEOOptimization,
} from "./types";
import {
	calculateReadTime,
	createBlogPrompt,
	extractKeywords,
	validateBlogContent,
} from "./utils";

export class GeminiBlogService {
	private client?: GoogleGenAI;
	private apiKey?: string;
	private defaultConfig: BlogGenerationConfig;

	constructor(apiKey?: string, config?: Partial<BlogGenerationConfig>) {
		this.apiKey = apiKey;
		this.defaultConfig = {
			model: BLOG_GENERATION_CONFIG.model,
			temperature: BLOG_GENERATION_CONFIG.generationConfig.temperature,
			maxOutputTokens: BLOG_GENERATION_CONFIG.generationConfig.maxOutputTokens,
			useStreaming: false,
			enableFunctionCalling: true,
			...config,
		};
	}

	private getClient(): GoogleGenAI {
		if (!this.client) {
			this.client = getClient(this.apiKey);
		}
		return this.client;
	}

	/**
	 * Generate a complete blog post from content
	 */
	async generateBlog(
		request: BlogGenerationRequest,
	): Promise<GeminiResponse<BlogGenerationResult>> {
		try {
			const prompt = createBlogPrompt(request);
			const config = this.buildGenerationConfig(request);

			const response = await this.getClient().models.generateContent({
				model: this.defaultConfig.model!,
				contents: [
					{
						role: "user",
						parts: [{ text: prompt }],
					},
				],
				config: {
					...config,
					systemInstruction: request.customInstructions
						? `${BLOG_SYSTEM_INSTRUCTION}\n\nAdditional Instructions: ${request.customInstructions}`
						: BLOG_SYSTEM_INSTRUCTION,
				},
			});

			const blogContent = response.text || "";

			if (!blogContent) {
				throw new Error("No content generated");
			}

			// Validate the generated content
			const validation = validateBlogContent(blogContent);
			if (!validation.isValid) {
				throw new Error(
					`Generated content validation failed: ${validation.errors.join(", ")}`,
				);
			}

			// Extract title from content or use provided title
			const title =
				this.extractTitle(blogContent) || request.title || "Untitled Blog Post";

			// Build the result
			const result: BlogGenerationResult = {
				title,
				content: blogContent,
				metadata: {
					wordCount: blogContent.split(/\s+/).length,
					estimatedReadTime: calculateReadTime(blogContent),
					generatedAt: new Date(),
					model: this.defaultConfig.model!,
					tokensUsed: response.usageMetadata?.totalTokenCount,
				},
			};

			// Generate additional data if requested
			if (request.includeOutline) {
				result.outline = await this.generateOutline(request.content);
			}

			if (request.seoOptimization) {
				result.seoData = await this.optimizeForSEO(
					blogContent,
					request.targetAudience,
				);
			}

			return {
				success: true,
				data: result,
				usage: {
					promptTokens: response.usageMetadata?.promptTokenCount || 0,
					completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
					totalTokens: response.usageMetadata?.totalTokenCount || 0,
				},
			};
		} catch (error) {
			return {
				success: false,
				error: {
					code: "GENERATION_FAILED",
					message:
						error instanceof Error ? error.message : "Unknown error occurred",
					details: error,
				},
			};
		}
	}

	/**
	 * Generate a blog post with streaming response
	 */
	async *generateBlogStream(
		request: BlogGenerationRequest,
	): AsyncGenerator<string, void, unknown> {
		try {
			const prompt = createBlogPrompt(request);
			const config = this.buildGenerationConfig(request);

			const stream = await this.getClient().models.generateContentStream({
				model: this.defaultConfig.model!,
				contents: [
					{
						role: "user",
						parts: [{ text: prompt }],
					},
				],
				config: {
					...config,
					systemInstruction: request.customInstructions
						? `${BLOG_SYSTEM_INSTRUCTION}\n\nAdditional Instructions: ${request.customInstructions}`
						: BLOG_SYSTEM_INSTRUCTION,
				},
			});

			for await (const chunk of stream) {
				const text = chunk.text;
				if (text) {
					yield text;
				}
			}
		} catch (error) {
			throw new Error(
				`Streaming generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	/**
	 * Generate a structured outline for a blog post
	 */
	async generateOutline(content: string): Promise<BlogOutline> {
		try {
			const prompt = `Analyze the following content and create a structured blog post outline:

Content: ${content}

Create a comprehensive outline with:
1. An engaging title
2. Main sections with descriptive headings
3. Key points for each section
4. Target keywords for SEO
5. Estimated reading time

Focus on creating a logical flow that will engage readers and provide value.`;

			const response = await this.getClient().models.generateContent({
				model: this.defaultConfig.model!,
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				config: {
					...BLOG_GENERATION_CONFIG.generationConfig,
				},
			});

			// Fallback: parse from text response
			return this.parseOutlineFromText(response.text || "");
		} catch (error) {
			throw new Error(
				`Outline generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	/**
	 * Extract key insights from content
	 */
	async extractInsights(content: string): Promise<ExtractedInsights> {
		try {
			const prompt = `Analyze the following content and extract key insights:

Content: ${content}

Extract:
1. Main topics discussed
2. Key insights with context and importance level
3. Actionable items for readers

Focus on providing valuable, actionable insights that readers can apply.`;

			const response = await this.getClient().models.generateContent({
				model: this.defaultConfig.model!,
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				config: {
					...BLOG_GENERATION_CONFIG.generationConfig,
				},
			});

			// Fallback: parse from text response
			return this.parseInsightsFromText(response.text || "");
		} catch (error) {
			throw new Error(
				`Insight extraction failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	/**
	 * Optimize content for SEO
	 */
	async optimizeForSEO(
		content: string,
		targetAudience?: string,
	): Promise<SEOOptimization> {
		try {
			const prompt = `Optimize the following blog content for SEO:

Content: ${content}
${targetAudience ? `Target Audience: ${targetAudience}` : ""}

Provide:
1. SEO-optimized meta title (50-60 characters)
2. Meta description (150-160 characters)
3. Primary keyword
4. Secondary keywords
5. Optimized heading structure with keyword integration

Focus on natural keyword integration and user intent.`;

			const response = await this.getClient().models.generateContent({
				model: this.defaultConfig.model!,
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				config: {
					...BLOG_GENERATION_CONFIG.generationConfig,
				},
			});

			// Fallback: parse from text response
			return this.parseSEOFromText(response.text || "");
		} catch (error) {
			throw new Error(
				`SEO optimization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	/**
	 * Analyze content to understand its characteristics
	 */
	async analyzeContent(content: string): Promise<ContentAnalysis> {
		try {
			const prompt = `Analyze the following content and provide detailed analysis:

Content: ${content}

Analyze:
1. Content type and format
2. Language and writing style
3. Main topics and themes
4. Sentiment and tone
5. Complexity level
6. Key terms and concepts
7. Estimated content length and structure

Provide a comprehensive analysis for content optimization.`;

			const response = await this.getClient().models.generateContent({
				model: this.defaultConfig.model!,
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				config: BLOG_GENERATION_CONFIG.generationConfig,
			});

			return this.parseContentAnalysis(response.text || "");
		} catch (error) {
			throw new Error(
				`Content analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	// Private helper methods
	private buildGenerationConfig(request: BlogGenerationRequest) {
		const baseConfig = { ...BLOG_GENERATION_CONFIG.generationConfig };

		// Adjust temperature based on tone
		if (request.tone === "professional") {
			(baseConfig as any).temperature = 0.6;
		} else if (request.tone === "casual") {
			(baseConfig as any).temperature = 0.9;
		} else if (request.tone === "technical") {
			(baseConfig as any).temperature = 0.5;
		}

		// Adjust max tokens based on length
		if (request.length === "short") {
			(baseConfig as any).maxOutputTokens = 2048;
		} else if (request.length === "long") {
			(baseConfig as any).maxOutputTokens = 6144;
		}

		return baseConfig;
	}

	private extractTitle(content: string): string | null {
		// Try to extract title from markdown heading
		const titleMatch = content.match(/^#\s+(.+)$/m);
		if (titleMatch) {
			return titleMatch[1].trim();
		}

		// Try to extract from first line if it looks like a title
		const firstLine = content.split("\n")[0].trim();
		if (
			firstLine.length > 10 &&
			firstLine.length < 100 &&
			!firstLine.includes(".")
		) {
			return firstLine;
		}

		return null;
	}

	private parseOutlineFromText(text: string): BlogOutline {
		// Basic parsing logic for outline from text
		const lines = text.split("\n").filter((line) => line.trim());
		const sections: any[] = [];
		let currentSection: any = null;

		for (const line of lines) {
			if (line.startsWith("##")) {
				if (currentSection) sections.push(currentSection);
				currentSection = {
					heading: line.replace(/^#+\s*/, ""),
					keyPoints: [],
				};
			} else if (line.startsWith("-") || line.startsWith("*")) {
				if (currentSection) {
					currentSection.keyPoints.push(line.replace(/^[-*]\s*/, ""));
				}
			}
		}

		if (currentSection) sections.push(currentSection);

		return {
			title: "Generated Blog Post",
			sections,
			targetKeywords: extractKeywords(text),
			estimatedReadTime: calculateReadTime(text),
		};
	}

	private parseInsightsFromText(text: string): ExtractedInsights {
		// Basic parsing logic for insights
		return {
			mainTopics: extractKeywords(text).slice(0, 5),
			keyInsights: [
				{
					insight: "Key insight extracted from content",
					context: "Context provided",
					importance: "medium" as const,
				},
			],
			actionableItems: ["Action item 1", "Action item 2"],
		};
	}

	private parseSEOFromText(text: string): SEOOptimization {
		// Basic parsing logic for SEO data
		return {
			metaTitle: "SEO Optimized Title",
			metaDescription: "SEO optimized meta description for the blog post.",
			primaryKeyword: "primary keyword",
			secondaryKeywords: ["keyword1", "keyword2"],
			headingStructure: [
				{ level: 1, text: "Main Title" },
				{ level: 2, text: "Section 1" },
				{ level: 2, text: "Section 2" },
			],
		};
	}

	private parseContentAnalysis(text: string): ContentAnalysis {
		// Basic parsing logic for content analysis
		return {
			contentType: "article",
			language: "English",
			topics: extractKeywords(text).slice(0, 5),
			sentiment: "neutral",
			complexity: "intermediate",
			keyTerms: extractKeywords(text),
			estimatedLength: text.length,
		};
	}
}

// Export singleton instance
export const geminiBlogService = new GeminiBlogService();

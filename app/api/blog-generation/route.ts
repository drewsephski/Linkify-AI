import {
	AuthUtil,
	ErrorHandler,
	IPUtil,
	RequestValidator,
	RetryUtil,
	cache,
	rateLimiter,
} from "@/lib/gemini/api-utils";
import { GEMINI_CONFIG, getClient } from "@/lib/gemini/client";
import {
	createFallbackBlogPost,
	repairJSON,
	validateBlogPostStructure,
} from "@/lib/gemini/json-repair";
import { blogPostSchema } from "@/lib/gemini/schemas";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Import types
import {
	BlogGenerationRequest,
	EnhancedBlogPost,
	SuccessResponse,
} from "@/lib/gemini/schemas";

// Enhanced prompt template with brand voice and SEO optimization
function generateEnhancedPrompt(request: BlogGenerationRequest): string {
	const {
		topic,
		keywords,
		tone = "professional",
		targetAudience,
		wordCount = 1500,
		contentStructure = "standard",
		seoFocus = "medium",
		includeImages = true,
		brandVoice = true,
		customInstructions,
	} = request;

	const brandContext = brandVoice
		? `
BRAND VOICE GUIDELINES:
- Use a friendly, approachable tone that makes complex topics easy to understand.
- Focus on practical value and actionable insights.
- Include subtle mentions of Linkify AI's capabilities where relevant.
- Use "we" and "our" to create connection with readers.
- End with a compelling call-to-action for Linkify AI.
`
		: "";

	const audienceContext = targetAudience
		? `
TARGET AUDIENCE: ${targetAudience}
Tailor the content complexity and examples to this specific audience.
`
		: "";

	const structureContext = getStructureInstructions(contentStructure);
	const seoContext = getSEOInstructions(seoFocus);
	const imageContext = includeImages
		? `
- Generate 2-4 detailed image prompts with descriptive alt text.
- Place images strategically throughout the content.
`
		: "- Do not include image prompts.";

	const customContext = customInstructions
		? `
CUSTOM INSTRUCTIONS:
${customInstructions}
`
		: "";

	return `Generate a comprehensive, SEO-optimized blog post about "${topic}".

REQUIREMENTS:
- Primary keywords: ${keywords.slice(0, 3).join(", ") || "none"}
- Secondary keywords: ${keywords.slice(3).join(", ") || "none"}
- Target word count: ${wordCount} words
- Tone: ${tone}
- Content structure: ${contentStructure}
${structureContext}
${seoContext}
${imageContext}
- Include engaging introduction with hook.
- Add compelling conclusion with key takeaways.
- Include 3-5 relevant internal linking suggestions.
- Generate SEO meta description (150-160 characters).
- Create URL-friendly slug.
- Estimate reading time.
- Add relevant tags for categorization.

${brandContext}
${audienceContext}
${customContext}

OUTPUT FORMAT:
Return ONLY a valid JSON object matching the EnhancedBlogPost schema. Do not include any markdown formatting, code blocks, or additional text. The response must be pure JSON that can be parsed directly. Ensure all content is original, engaging, and provides real value to readers.

IMPORTANT: Your response must start with { and end with } with no additional formatting or text.`;
}

function getStructureInstructions(structure: string): string {
	switch (structure) {
		case "listicle":
			return `
STRUCTURE: Listicle Format
- Use numbered or bulleted main points
- Each point should be substantial and actionable
- Include brief introductions to each point
- Use clear, scannable formatting`;
		case "howto":
			return `
STRUCTURE: How-To Guide Format
- Break down into clear, sequential steps
- Use action-oriented headings
- Include prerequisites and materials needed
- Add tips and troubleshooting sections`;
		case "comparison":
			return `
STRUCTURE: Comparison Format
- Present options side-by-side
- Use consistent criteria for evaluation
- Include pros and cons for each option
- Provide clear recommendations`;
		case "case-study":
			return `
STRUCTURE: Case Study Format
- Present the challenge/problem
- Describe the solution/approach
- Show results and metrics
- Extract key lessons learned`;
		case "interview":
			return `
STRUCTURE: Interview Style Format
- Use Q&A format with expert insights
- Include compelling questions
- Provide detailed, informative answers
- Add context and background information`;
		default:
			return `
STRUCTURE: Standard Article Format
- Clear introduction with hook
- Well-organized main sections with H2/H3 headings
- Logical flow between sections
- Strong conclusion with key takeaways`;
	}
}

function getSEOInstructions(focus: string): string {
	switch (focus) {
		case "high":
			return `
SEO FOCUS: High Optimization
- Include primary keyword in title, first paragraph, and conclusion
- Use keywords naturally throughout (1-2% density)
- Optimize headings with relevant keywords
- Include semantic keywords and related terms
- Focus on search intent and user queries`;
		case "low":
			return `
SEO FOCUS: Content-First Approach
- Prioritize readability and user value
- Use keywords naturally without forcing
- Focus on comprehensive topic coverage
- Emphasize engaging, shareable content`;
		default:
			return `
SEO FOCUS: Balanced Optimization
- Include keywords naturally in key positions
- Balance optimization with readability
- Use variations and related terms
- Focus on user intent and value`;
	}
}

// Main POST handler
export async function POST(request: NextRequest) {
	const startTime = Date.now();
	const requestId = uuidv4();

	try {
		const clientIP = IPUtil.getClientIP(request);

		const { allowed, remaining, reset } = rateLimiter.checkLimit(clientIP);
		if (!allowed) {
			return NextResponse.json(
				ErrorHandler.createErrorResponse({
					name: "RateLimitError",
					message: "Rate limit exceeded",
					retryAfter: Math.ceil((reset - Date.now()) / 1000),
				}),
				{
					status: 429,
					headers: {
						"X-RateLimit-Limit": "60",
						"X-RateLimit-Remaining": "0",
						"X-RateLimit-Reset": reset.toString(),
						"Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
					},
				},
			);
		}

		const userId = await AuthUtil.getUserId(request);
		if (!userId) {
			return NextResponse.json(
				ErrorHandler.createErrorResponse({
					name: "AuthError",
					message: "Authentication required",
				}),
				{ status: 401 },
			);
		}

		const subscription = await AuthUtil.checkSubscription(userId);
		if (!subscription.hasAccess) {
			return NextResponse.json(
				ErrorHandler.createErrorResponse({
					name: "SubscriptionError",
					message: "Subscription required",
				}),
				{ status: 403 },
			);
		}

		let body: BlogGenerationRequest;
		try {
			body = await request.json();
		} catch (error) {
			return NextResponse.json(
				ErrorHandler.createErrorResponse({
					name: "ValidationError",
					message: "Invalid JSON in request body",
				}),
				{ status: 400 },
			);
		}

		const validation = RequestValidator.validateBlogRequest(body);
		if (!validation.valid) {
			return NextResponse.json(
				ErrorHandler.createErrorResponse({
					name: "ValidationError",
					message: "Validation failed",
					details: validation.errors,
				}),
				{ status: 400 },
			);
		}

		const sanitizedRequest: BlogGenerationRequest = {
			...body,
			topic: RequestValidator.sanitizeInput(body.topic),
			keywords:
				body.keywords?.map((k) => RequestValidator.sanitizeInput(k)) || [],
			customInstructions: body.customInstructions
				? RequestValidator.sanitizeInput(body.customInstructions)
				: undefined,
		};

		const cacheKey = cache.generateKey(sanitizedRequest);
		const cached = cache.get<EnhancedBlogPost>(cacheKey);
		if (cached) {
			const response: SuccessResponse<EnhancedBlogPost> = {
				success: true,
				data: cached,
				metadata: {
					requestId,
					processingTime: Date.now() - startTime,
					cached: true,
				},
			};

			return NextResponse.json(response, {
				headers: {
					"X-Cache": "HIT",
					"X-RateLimit-Remaining": remaining.toString(),
				},
			});
		}

		const prompt = generateEnhancedPrompt(sanitizedRequest);

		const client = getClient(sanitizedRequest.apiKey);

		const result = await RetryUtil.withExponentialBackoff(
			async () => {
				const generationResult = await client.models.generateContent({
					model: GEMINI_CONFIG.model,
					contents: [
						{
							role: "user",
							parts: [{ text: prompt }],
						},
					],
					config: {
						...GEMINI_CONFIG.generationConfig,
						responseMimeType: "application/json",
						responseJsonSchema: blogPostSchema,
					},
				});

				const responseText = generationResult.text;
				if (!responseText) {
					console.error(
						"Gemini API Error Response:",
						JSON.stringify(generationResult, null, 2),
					);
					throw new Error("No content generated by AI service");
				}

				return responseText;
			},
			GEMINI_CONFIG.maxRetries,
			GEMINI_CONFIG.retryDelay,
		);

		let blogPost: EnhancedBlogPost;
		try {
			// Attempt to repair and parse the JSON
			const repairedJSON = repairJSON(result);
			blogPost = JSON.parse(repairedJSON);

			// Validate the structure
			if (!validateBlogPostStructure(blogPost)) {
				throw new Error("Generated blog post structure is invalid");
			}

			console.log("✅ Successfully parsed and validated AI response");
		} catch (error) {
			console.error(
				"Failed to parse AI response:",
				result.substring(0, 500) + "...",
			);
			console.error("Parse error:", error);

			// Create a fallback response
			console.log("🔄 Creating fallback blog post");
			blogPost = createFallbackBlogPost(
				sanitizedRequest.topic,
				sanitizedRequest.keywords,
			) as EnhancedBlogPost;
		}

		cache.set(cacheKey, blogPost);

		const response: SuccessResponse<EnhancedBlogPost> = {
			success: true,
			data: blogPost,
			metadata: {
				requestId,
				processingTime: Date.now() - startTime,
				cached: false,
			},
		};

		return NextResponse.json(response, {
			headers: {
				"X-Cache": "MISS",
				"X-RateLimit-Remaining": remaining.toString(),
				"X-Request-ID": requestId,
			},
		});
	} catch (error) {
		await ErrorHandler.logError(error, { requestId, url: request.url });
		return NextResponse.json(ErrorHandler.createErrorResponse(error), {
			status: 500,
		});
	}
}

export async function GET() {
	return NextResponse.json({
		status: "healthy",
		service: "blog-generation",
		version: "1.0.0",
		timestamp: new Date().toISOString(),
	});
}

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}

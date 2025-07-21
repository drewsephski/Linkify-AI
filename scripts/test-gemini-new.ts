import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
import { blogPostSchema } from "../lib/gemini/schemas";

// Load environment variables
dotenv.config();

async function testGeminiNew() {
	console.log("Testing new Gemini SDK...");

	const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error(
			"No API key found. Please set GOOGLE_API_KEY or GEMINI_API_KEY environment variable.",
		);
		return;
	}

	try {
		const ai = new GoogleGenAI({ apiKey });

		const prompt = `Generate a comprehensive, SEO-optimized blog post about "The Future of AI in Web Development".

REQUIREMENTS:
- Primary keywords: AI, web development, future technology
- Target word count: 1500 words
- Tone: professional
- Include engaging introduction with hook.
- Structure with clear H2 and H3 headings.
- Add compelling conclusion with key takeaways.
- Include 3-5 relevant internal linking suggestions.
- Suggest 2-3 image generation prompts with alt text.
- Generate SEO meta description (150-160 characters).
- Create URL-friendly slug.
- Estimate reading time.
- Add relevant tags for categorization.

OUTPUT FORMAT:
Return a valid JSON object matching the EnhancedBlogPost schema. Ensure all content is original, engaging, and provides real value to readers.`;

		console.log("Making request to Gemini API...");

		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash-001",
			contents: [
				{
					role: "user",
					parts: [{ text: prompt }],
				},
			],
			config: {
				temperature: 0.8,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 4096,
				responseMimeType: "application/json",
				responseJsonSchema: blogPostSchema,
			},
		});

		console.log("Response received!");
		console.log("Response text length:", response.text?.length || 0);

		if (response.text) {
			try {
				const blogPost = JSON.parse(response.text);
				console.log("Successfully parsed JSON response!");
				console.log("Blog post title:", blogPost.title);
				console.log("Number of sections:", blogPost.sections?.length || 0);
				console.log("Meta description:", blogPost.meta?.metaDescription);
			} catch (parseError) {
				console.error("Failed to parse JSON response:", parseError);
				console.log("Raw response:", response.text.substring(0, 500) + "...");
			}
		} else {
			console.error("No text in response");
			console.log("Full response:", JSON.stringify(response, null, 2));
		}
	} catch (error) {
		console.error("Error testing Gemini:", error);
	}
}

testGeminiNew().catch(console.error);

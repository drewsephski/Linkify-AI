/**
 * Utility functions to repair and validate JSON responses from AI
 */

export function repairJSON(jsonString: string): string {
	try {
		// First, try to parse as-is
		JSON.parse(jsonString);
		return jsonString;
	} catch (error) {
		console.log("JSON repair needed, attempting fixes...");

		let repaired = jsonString.trim();

		// Remove markdown code blocks
		if (repaired.startsWith("```json")) {
			repaired = repaired.replace(/^```json\s*/, "").replace(/\s*```$/, "");
		} else if (repaired.startsWith("```")) {
			repaired = repaired.replace(/^```\s*/, "").replace(/\s*```$/, "");
		}

		// Fix common JSON issues
		repaired = repaired
			// Fix trailing commas
			.replace(/,(\s*[}\]])/g, "$1");

		try {
			JSON.parse(repaired);
			console.log("✅ JSON repair successful");
			return repaired;
		} catch (repairError) {
			const errorMessage =
				repairError instanceof Error ? repairError.message : "Unknown error";
			console.log("❌ JSON repair failed:", errorMessage);
			throw new Error(`Unable to repair malformed JSON: ${errorMessage}`);
		}
	}
}

export function validateBlogPostStructure(obj: any): boolean {
	if (!obj || typeof obj !== "object") {
		return false;
	}

	// Check required fields
	const requiredFields = ["title", "sections"];
	for (const field of requiredFields) {
		if (!obj[field]) {
			console.log(`Missing required field: ${field}`);
			return false;
		}
	}

	// Validate sections array
	if (!Array.isArray(obj.sections)) {
		console.log("Sections is not an array");
		return false;
	}

	// Validate each section
	for (let i = 0; i < obj.sections.length; i++) {
		const section = obj.sections[i];
		if (!section || typeof section !== "object") {
			console.log(`Section ${i} is invalid`);
			return false;
		}
		if (!section.heading || !section.content) {
			console.log(`Section ${i} missing heading or content`);
			return false;
		}
	}

	return true;
}

export function createFallbackBlogPost(
	topic: string,
	keywords: string[] = [],
): any {
	return {
		title: topic || "Generated Blog Post",
		meta: {
			metaDescription: `A comprehensive blog post about ${topic}`,
			keywords: keywords,
			readingTime: 5,
			slug: (topic || "blog-post")
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, ""),
		},
		introduction: `Welcome to this comprehensive guide about ${topic}. In this post, we'll explore the key aspects and provide valuable insights.`,
		sections: [
			{
				heading: "Overview",
				content: `Let's start by understanding the fundamentals of ${topic}. This section provides a solid foundation for the concepts we'll discuss.`,
			},
			{
				heading: "Key Benefits",
				content: `There are several important advantages to consider when it comes to ${topic}. These benefits make it a valuable topic to explore.`,
			},
			{
				heading: "Best Practices",
				content: `To get the most out of ${topic}, it's important to follow established best practices and proven methodologies.`,
			},
			{
				heading: "Implementation Tips",
				content: `Here are some practical tips for implementing ${topic} effectively in your projects or workflow.`,
			},
		],
		conclusion: `In conclusion, ${topic} offers significant value when properly understood and implemented. We hope this guide has provided you with useful insights and actionable information.`,
		callToAction:
			"Ready to learn more? Contact us for personalized guidance and support.",
		imagePrompts: [
			{
				altText: `Illustration representing ${topic}`,
				prompt: `Create a professional illustration that represents the concept of ${topic}`,
				placement: "hero",
			},
		],
		internalLinks: [],
		tags: keywords.length > 0 ? keywords : [topic.toLowerCase()],
	};
}

import { BlogGenerationRequest } from "./types";

/**
 * Create a comprehensive prompt for blog generation
 */
export function createBlogPrompt(request: BlogGenerationRequest): string {
	const {
		content,
		contentType,
		title,
		targetAudience,
		tone = "conversational",
		length = "medium",
	} = request;

	let prompt = `Transform the following ${contentType} content into a well-structured, engaging blog post:\n\n`;

	// Add content
	prompt += `Content to transform:\n${content}\n\n`;

	// Add specific instructions
	prompt += `Instructions:\n`;

	if (title) {
		prompt += `- Use "${title}" as the blog post title, or create a better one if needed\n`;
	} else {
		prompt += `- Create an engaging, SEO-friendly title\n`;
	}

	prompt += `- Write in a ${tone} tone\n`;

	if (targetAudience) {
		prompt += `- Target audience: ${targetAudience}\n`;
	}

	// Length specifications
	const lengthSpecs = {
		short: "800-1200 words",
		medium: "1200-2000 words",
		long: "2000-3000 words",
	};
	prompt += `- Target length: ${lengthSpecs[length]}\n`;

	// Structure requirements
	prompt += `
Structure Requirements:
- Start with an engaging introduction that hooks the reader
- Use clear, descriptive headings (H2, H3) to organize content
- Include bullet points or numbered lists where appropriate
- Add a compelling conclusion with key takeaways
- Include a call-to-action if relevant

Content Requirements:
- Maintain all key information and insights from the original content
- Make the content accessible to your target audience
- Add value through clear explanations and context
- Use natural keyword integration for SEO
- Ensure the content flows logically and is easy to read

Format the output as clean markdown with proper heading hierarchy.`;

	return prompt;
}

/**
 * Parse markdown content and extract structure
 */
export function parseMarkdownContent(content: string) {
	const lines = content.split("\n");
	const structure = {
		title: "",
		headings: [] as Array<{ level: number; text: string; line: number }>,
		sections: [] as Array<{ heading: string; content: string }>,
		wordCount: 0,
		paragraphs: 0,
	};

	let currentSection = { heading: "", content: "" };
	const sections: Array<{ heading: string; content: string }> = [];

	lines.forEach((line, index) => {
		const trimmedLine = line.trim();

		// Extract headings
		const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
		if (headingMatch) {
			const level = headingMatch[1].length;
			const text = headingMatch[2];

			structure.headings.push({ level, text, line: index });

			// Save previous section
			if (currentSection.heading && currentSection.content.trim()) {
				sections.push({ ...currentSection });
			}

			// Start new section
			currentSection = { heading: text, content: "" };

			// Set title if it's H1
			if (level === 1 && !structure.title) {
				structure.title = text;
			}
		} else if (trimmedLine) {
			currentSection.content += line + "\n";
		}

		// Count paragraphs
		if (trimmedLine && !headingMatch) {
			structure.paragraphs++;
		}
	});

	// Add last section
	if (currentSection.heading && currentSection.content.trim()) {
		sections.push(currentSection);
	}

	structure.sections = sections;
	structure.wordCount = content
		.split(/\s+/)
		.filter((word) => word.length > 0).length;

	return structure;
}

/**
 * Calculate estimated reading time
 */
export function calculateReadTime(content: string): number {
	const wordsPerMinute = 200; // Average reading speed
	const wordCount = content
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
	return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string): string[] {
	// Remove markdown formatting and common words
	const cleanContent = content.replace(/[#*_`\[\]()]/g, "").toLowerCase();

	// Common stop words to filter out
	const stopWords = new Set([
		"the",
		"a",
		"an",
		"and",
		"or",
		"but",
		"in",
		"on",
		"at",
		"to",
		"for",
		"of",
		"with",
		"by",
		"from",
		"up",
		"about",
		"into",
		"through",
		"during",
		"before",
		"after",
		"above",
		"below",
		"between",
		"among",
		"is",
		"are",
		"was",
		"were",
		"be",
		"been",
		"being",
		"have",
		"has",
		"had",
		"do",
		"does",
		"did",
		"will",
		"would",
		"could",
		"should",
		"may",
		"might",
		"must",
		"can",
		"this",
		"that",
		"these",
		"those",
	]);

	// Extract words and count frequency
	const words = cleanContent.match(/\b[a-z]{3,}\b/g) || [];
	const wordCount = new Map<string, number>();

	words.forEach((word) => {
		if (!stopWords.has(word)) {
			wordCount.set(word, (wordCount.get(word) || 0) + 1);
		}
	});

	// Sort by frequency and return top keywords
	return Array.from(wordCount.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10)
		.map(([word]) => word);
}

/**
 * Validate blog content quality
 */
export function validateBlogContent(content: string): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	const structure = parseMarkdownContent(content);

	// Check minimum length
	if (structure.wordCount < 300) {
		errors.push("Content is too short (minimum 300 words)");
	}

	// Check for title
	if (!structure.title) {
		errors.push("No title found");
	}

	// Check for headings
	if (structure.headings.length < 2) {
		errors.push("Content should have at least 2 headings for better structure");
	}

	// Check for proper heading hierarchy
	const headingLevels = structure.headings.map((h) => h.level);
	if (headingLevels.length > 0) {
		const firstLevel = headingLevels[0];
		if (firstLevel !== 1) {
			errors.push("Content should start with an H1 heading");
		}
	}

	// Check for content in sections
	if (structure.sections.length === 0) {
		errors.push("No structured sections found");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Format content for different output types
 */
export function formatContent(
	content: string,
	format: "markdown" | "html" | "plain",
): string {
	switch (format) {
		case "html":
			return markdownToHtml(content);
		case "plain":
			return markdownToPlain(content);
		case "markdown":
		default:
			return content;
	}
}

/**
 * Convert markdown to HTML (basic implementation)
 */
function markdownToHtml(markdown: string): string {
	return (
		markdown
			// Headers
			.replace(/^### (.*$)/gm, "<h3>$1</h3>")
			.replace(/^## (.*$)/gm, "<h2>$1</h2>")
			.replace(/^# (.*$)/gm, "<h1>$1</h1>")
			// Bold
			.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
			// Italic
			.replace(/\*(.*?)\*/g, "<em>$1</em>")
			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
			// Line breaks
			.replace(/\n\n/g, "</p><p>")
			.replace(/\n/g, "<br>")
			// Wrap in paragraphs
			.replace(/^(.+)$/gm, "<p>$1</p>")
			// Clean up empty paragraphs
			.replace(/<p><\/p>/g, "")
	);
}

/**
 * Convert markdown to plain text
 */
function markdownToPlain(markdown: string): string {
	return (
		markdown
			// Remove headers
			.replace(/^#{1,6}\s+/gm, "")
			// Remove bold/italic
			.replace(/\*\*(.*?)\*\*/g, "$1")
			.replace(/\*(.*?)\*/g, "$1")
			// Remove links but keep text
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			// Clean up extra whitespace
			.replace(/\n{3,}/g, "\n\n")
			.trim()
	);
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Estimate content complexity
 */
export function estimateComplexity(
	content: string,
): "beginner" | "intermediate" | "advanced" {
	const words = content.split(/\s+/);
	const avgWordLength =
		words.reduce((sum, word) => sum + word.length, 0) / words.length;
	const sentences = content.split(/[.!?]+/).length;
	const avgSentenceLength = words.length / sentences;

	// Simple heuristic based on word and sentence length
	if (avgWordLength < 5 && avgSentenceLength < 15) {
		return "beginner";
	} else if (avgWordLength < 6.5 && avgSentenceLength < 20) {
		return "intermediate";
	} else {
		return "advanced";
	}
}

/**
 * Extract meta information from content
 */
export function extractMetaInfo(content: string) {
	const structure = parseMarkdownContent(content);

	return {
		title: structure.title,
		wordCount: structure.wordCount,
		readingTime: calculateReadTime(content),
		headingCount: structure.headings.length,
		sectionCount: structure.sections.length,
		complexity: estimateComplexity(content),
		keywords: extractKeywords(content),
		slug: generateSlug(structure.title || "untitled"),
	};
}

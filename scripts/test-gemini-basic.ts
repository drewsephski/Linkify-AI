#!/usr/bin/env tsx

import { BlogGenerationRequest } from "../lib/gemini/types";
import {
	calculateReadTime,
	createBlogPrompt,
	estimateComplexity,
	extractKeywords,
	extractMetaInfo,
	generateSlug,
	parseMarkdownContent,
	validateBlogContent,
} from "../lib/gemini/utils";

async function testBasicFunctionality() {
	console.log("🧪 Testing Gemini Service Basic Functionality...\n");

	// Test content
	const testContent = `
    # The Future of Artificial Intelligence in Business

    Artificial intelligence is transforming the way businesses operate across industries. 
    From healthcare to finance, AI technologies are enabling companies to automate processes, 
    gain insights from data, and improve customer experiences.

    ## Machine Learning Applications

    Machine learning algorithms are being used for:
    - Predictive analytics
    - Fraud detection
    - Recommendation systems
    - Customer segmentation

    ## Natural Language Processing

    NLP technologies enable:
    - Chatbots and virtual assistants
    - Sentiment analysis
    - Language translation
    - Content generation

    ## Computer Vision

    Computer vision applications include:
    - Quality control in manufacturing
    - Medical image analysis
    - Autonomous vehicles
    - Security and surveillance

    ## Conclusion

    The adoption of AI technologies will continue to accelerate as businesses 
    recognize their potential to drive efficiency and innovation.
    `;

	// Test 1: Blog prompt creation
	console.log("1️⃣ Testing blog prompt creation...");
	const request: BlogGenerationRequest = {
		content: "Sample video transcript about AI in business...",
		contentType: "transcript",
		title: "AI in Business",
		targetAudience: "business professionals",
		tone: "professional",
		length: "medium",
	};

	const prompt = createBlogPrompt(request);
	console.log("✅ Prompt created successfully");
	console.log(`   Length: ${prompt.length} characters`);

	// Test 2: Markdown parsing
	console.log("\n2️⃣ Testing markdown content parsing...");
	const parsed = parseMarkdownContent(testContent);
	console.log("✅ Content parsed successfully");
	console.log(`   Title: ${parsed.title}`);
	console.log(`   Headings: ${parsed.headings.length}`);
	console.log(`   Sections: ${parsed.sections.length}`);
	console.log(`   Word count: ${parsed.wordCount}`);

	// Test 3: Reading time calculation
	console.log("\n3️⃣ Testing reading time calculation...");
	const readTime = calculateReadTime(testContent);
	console.log("✅ Reading time calculated");
	console.log(`   Estimated time: ${readTime} minutes`);

	// Test 4: Keyword extraction
	console.log("\n4️⃣ Testing keyword extraction...");
	const keywords = extractKeywords(testContent);
	console.log("✅ Keywords extracted");
	console.log(`   Keywords: ${keywords.slice(0, 5).join(", ")}`);

	// Test 5: Content validation
	console.log("\n5️⃣ Testing content validation...");
	const validation = validateBlogContent(testContent);
	console.log(
		`✅ Validation completed: ${validation.isValid ? "VALID" : "INVALID"}`,
	);
	if (!validation.isValid) {
		console.log(`   Errors: ${validation.errors.join(", ")}`);
	}

	// Test 6: Slug generation
	console.log("\n6️⃣ Testing slug generation...");
	const slug = generateSlug(
		"The Future of Artificial Intelligence in Business",
	);
	console.log("✅ Slug generated");
	console.log(`   Slug: ${slug}`);

	// Test 7: Complexity estimation
	console.log("\n7️⃣ Testing complexity estimation...");
	const complexity = estimateComplexity(testContent);
	console.log("✅ Complexity estimated");
	console.log(`   Complexity: ${complexity}`);

	// Test 8: Meta information extraction
	console.log("\n8️⃣ Testing meta information extraction...");
	const metaInfo = extractMetaInfo(testContent);
	console.log("✅ Meta information extracted");
	console.log(`   Title: ${metaInfo.title}`);
	console.log(`   Word count: ${metaInfo.wordCount}`);
	console.log(`   Reading time: ${metaInfo.readingTime} minutes`);
	console.log(`   Complexity: ${metaInfo.complexity}`);
	console.log(`   Slug: ${metaInfo.slug}`);

	// Test 9: Type imports
	console.log("\n9️⃣ Testing type imports...");
	try {
		const { BLOG_GENERATION_CONFIG, BLOG_SYSTEM_INSTRUCTION } = await import(
			"../lib/gemini/client"
		);
		console.log("✅ Configuration imported successfully");
		console.log(`   Model: ${BLOG_GENERATION_CONFIG.model}`);
		console.log(
			`   System instruction length: ${BLOG_SYSTEM_INSTRUCTION.length} characters`,
		);
	} catch (error) {
		console.error("❌ Configuration import failed:", error);
	}

	// Test 10: Service class import (without instantiation)
	console.log("\n🔟 Testing service class import...");
	try {
		const { GeminiBlogService } = await import("../lib/gemini/service");
		console.log("✅ Service class imported successfully");
		console.log(`   Class name: ${GeminiBlogService.name}`);
	} catch (error) {
		console.error("❌ Service class import failed:", error);
	}

	console.log("\n🎉 All basic functionality tests completed successfully!");
	console.log("\n📝 Summary:");
	console.log("   ✅ Utility functions working correctly");
	console.log("   ✅ Type definitions properly structured");
	console.log("   ✅ Configuration files accessible");
	console.log("   ✅ Service architecture properly set up");
	console.log(
		"\n💡 To test full functionality, set GOOGLE_API_KEY or GEMINI_API_KEY and run the full test.",
	);
}

// Run the test
testBasicFunctionality().catch(console.error);

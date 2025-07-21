#!/usr/bin/env tsx

import { geminiBlogService } from "../lib/gemini";
import { BlogGenerationRequest } from "../lib/gemini/types";

async function testGeminiService() {
	console.log("🧪 Testing Gemini Blog Generation Service...\n");

	// Check if API key is available
	const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error(
			"❌ No API key found. Please set GOOGLE_API_KEY or GEMINI_API_KEY environment variable.",
		);
		process.exit(1);
	}

	console.log("✅ API key found");

	// Test content
	const testContent = `
    Welcome to today's discussion about artificial intelligence and its impact on modern business. 
    In this video, we explore how AI is transforming various industries, from healthcare to finance.
    
    First, let's talk about machine learning. Machine learning is a subset of AI that enables computers 
    to learn and improve from experience without being explicitly programmed. This technology is being 
    used in recommendation systems, fraud detection, and predictive analytics.
    
    Next, we'll discuss natural language processing, or NLP. NLP allows computers to understand, 
    interpret, and generate human language. This is the technology behind chatbots, voice assistants, 
    and language translation services.
    
    Finally, we'll look at computer vision, which enables machines to interpret and understand 
    visual information from the world. This technology is used in autonomous vehicles, medical 
    imaging, and quality control in manufacturing.
    
    The key takeaway is that AI is not just a futuristic concept – it's here now and transforming 
    how we work and live. Businesses that embrace AI technologies will have a competitive advantage 
    in the digital economy.
    `;

	const request: BlogGenerationRequest = {
		content: testContent,
		contentType: "transcript",
		title: "The Impact of AI on Modern Business",
		targetAudience: "business professionals and entrepreneurs",
		tone: "professional",
		length: "medium",
		includeOutline: true,
		seoOptimization: true,
		customInstructions:
			"Focus on practical applications and include actionable insights for business leaders.",
	};

	try {
		console.log("🚀 Generating blog post...");
		const startTime = Date.now();

		const result = await geminiBlogService.generateBlog(request);

		const endTime = Date.now();
		const duration = (endTime - startTime) / 1000;

		if (result.success && result.data) {
			console.log(`✅ Blog generation completed in ${duration}s\n`);

			console.log("📊 Generation Results:");
			console.log(`Title: ${result.data.title}`);
			console.log(`Word Count: ${result.data.metadata.wordCount}`);
			console.log(
				`Estimated Read Time: ${result.data.metadata.estimatedReadTime} minutes`,
			);
			console.log(`Model Used: ${result.data.metadata.model}`);

			if (result.usage) {
				console.log(`Tokens Used: ${result.usage.totalTokens}`);
			}

			console.log("\n📝 Generated Content Preview:");
			console.log(result.data.content.substring(0, 500) + "...\n");

			if (result.data.outline) {
				console.log("📋 Generated Outline:");
				console.log(`Sections: ${result.data.outline.sections.length}`);
				console.log(
					`Keywords: ${result.data.outline.targetKeywords.join(", ")}`,
				);
			}

			if (result.data.seoData) {
				console.log("\n🔍 SEO Data:");
				console.log(`Meta Title: ${result.data.seoData.metaTitle}`);
				console.log(`Primary Keyword: ${result.data.seoData.primaryKeyword}`);
			}
		} else {
			console.error("❌ Blog generation failed:", result.error);
		}
	} catch (error) {
		console.error("❌ Test failed:", error);
	}

	// Test streaming generation
	console.log("\n🌊 Testing streaming generation...");
	try {
		const streamRequest: BlogGenerationRequest = {
			content: testContent.substring(0, 500), // Shorter content for streaming test
			contentType: "transcript",
			tone: "conversational",
			length: "short",
		};

		let streamedContent = "";
		const stream = geminiBlogService.generateBlogStream(streamRequest);

		for await (const chunk of stream) {
			streamedContent += chunk;
			process.stdout.write(".");
		}

		console.log(
			`\n✅ Streaming completed. Generated ${streamedContent.length} characters`,
		);
	} catch (error) {
		console.error("❌ Streaming test failed:", error);
	}

	// Test content analysis
	console.log("\n🔍 Testing content analysis...");
	try {
		const analysis = await geminiBlogService.analyzeContent(testContent);
		console.log("✅ Content analysis completed");
		console.log(`Topics: ${analysis.topics.join(", ")}`);
		console.log(`Sentiment: ${analysis.sentiment}`);
		console.log(`Complexity: ${analysis.complexity}`);
	} catch (error) {
		console.error("❌ Content analysis failed:", error);
	}

	console.log("\n🎉 All tests completed!");
}

// Run the test
testGeminiService().catch(console.error);

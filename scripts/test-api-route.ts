import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testApiRoute() {
	console.log("Testing blog generation API route...");

	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		console.error("No API key found.");
		return;
	}

	try {
		const response = await fetch("http://localhost:3000/api/blog-generation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				topic: "The Future of AI in Web Development",
				keywords: ["AI", "web development", "future technology"],
				tone: "professional",
				wordCount: 1500,
				apiKey: apiKey,
			}),
		});

		console.log("Response status:", response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Error response:", errorText);
			return;
		}

		const data = await response.json();
		console.log("Success! Blog post generated:");
		console.log("Title:", data.data?.title);
		console.log("Sections:", data.data?.sections?.length);
		console.log("Processing time:", data.metadata?.processingTime, "ms");
	} catch (error) {
		console.error("Error testing API route:", error);
	}
}

testApiRoute().catch(console.error);

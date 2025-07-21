import { NextRequest } from "next/server";
import { POST } from "./route";

// Mocking dependencies
jest.mock("@/lib/gemini/client", () => ({
	client: {
		getGenerativeModel: jest.fn(() => ({
			generateContent: jest.fn().mockResolvedValue({
				response: {
					text: () =>
						JSON.stringify({
							title: "Test Blog Post",
							meta: {
								metaDescription: "Test meta description.",
								keywords: ["test", "blog"],
								readingTime: 5,
								slug: "test-blog-post",
							},
							introduction: "This is a test introduction.",
							sections: [
								{ heading: "Test Section", content: "This is test content." },
							],
							conclusion: "This is a test conclusion.",
							callToAction: "Sign up for Linkify AI!",
							imagePrompts: [],
							internalLinks: [],
							tags: ["testing"],
						}),
				},
			}),
		})),
	},
	GEMINI_CONFIG: {
		model: "gemini-1.5-flash",
		maxRetries: 1,
		retryDelay: 10,
		generationConfig: {},
	},
}));

jest.mock("@/lib/gemini/utils", () => ({
	IPUtil: {
		getClientIP: jest.fn(() => "127.0.0.1"),
	},
	rateLimiter: {
		checkLimit: jest.fn(() => ({
			allowed: true,
			remaining: 59,
			reset: Date.now() + 60000,
		})),
	},
	AuthUtil: {
		getUserId: jest.fn(() => Promise.resolve("test-user")),
		checkSubscription: jest.fn(() =>
			Promise.resolve({ hasAccess: true, tier: "pro" }),
		),
	},
	RequestValidator: {
		validateBlogRequest: jest.fn(() => ({ valid: true, errors: [] })),
		sanitizeInput: jest.fn((input: string) => input),
	},
	cache: {
		generateKey: jest.fn(() => "test-cache-key"),
		get: jest.fn(() => null),
		set: jest.fn(),
	},
	RetryUtil: {
		withExponentialBackoff: jest.fn((fn: () => any) => fn()),
	},
	ErrorHandler: {
		createErrorResponse: jest.fn((error: any) => {
			const baseResponse: {
				error: string;
				details?: any;
				retryAfter?: number;
			} = {
				error: "Internal server error",
			};
			if (error.name === "RateLimitError") {
				baseResponse.error = "Rate limit exceeded";
				baseResponse.retryAfter = error.retryAfter;
			} else if (error.name === "ValidationError") {
				baseResponse.error = "Validation failed";
				baseResponse.details = error.details || error.message;
			} else if (error.name === "AuthError") {
				baseResponse.error = "Authentication required";
			} else if (error.name === "SubscriptionError") {
				baseResponse.error = "Subscription required";
			} else if (error.message) {
				baseResponse.details = error.message;
			}
			return baseResponse;
		}),
		logError: jest.fn(),
	},
}));

const {
	RequestValidator,
	rateLimiter,
	AuthUtil,
	cache,
	client,
} = require("@/lib/gemini/utils");

describe("Blog Generation API", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Reset mocks to default successful state before each test
		rateLimiter.checkLimit.mockReturnValue({
			allowed: true,
			remaining: 59,
			reset: Date.now() + 60000,
		});
		AuthUtil.getUserId.mockResolvedValue("test-user");
		AuthUtil.checkSubscription.mockResolvedValue({
			hasAccess: true,
			tier: "pro",
		});
		RequestValidator.validateBlogRequest.mockReturnValue({
			valid: true,
			errors: [],
		});
		cache.get.mockReturnValue(null);
	});

	it("should generate a blog post successfully", async () => {
		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(body.data.title).toBe("Test Blog Post");
		expect(body.metadata.cached).toBe(false);
	});

	it("should return 400 for invalid JSON body", async () => {
		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: '{ "invalid json" }',
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(400);
		expect(body.error).toBe("Validation failed");
		expect(body.details).toBe("Invalid JSON in request body");
	});

	it("should return 400 for invalid request body", async () => {
		RequestValidator.validateBlogRequest.mockReturnValue({
			valid: false,
			errors: ["Topic is required"],
		});

		const requestBody = {
			topic: "", // Invalid topic
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(400);
		expect(body.error).toBe("Validation failed");
	});

	it("should return 429 for rate limit exceeded", async () => {
		rateLimiter.checkLimit.mockReturnValue({
			allowed: false,
			remaining: 0,
			reset: Date.now() + 60000,
		});

		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(429);
		expect(body.error).toBe("Rate limit exceeded");
	});

	it("should return 401 for unauthenticated user", async () => {
		AuthUtil.getUserId.mockResolvedValue(null);

		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(401);
		expect(body.error).toBe("Authentication required");
	});

	it("should return 403 for user without subscription", async () => {
		AuthUtil.checkSubscription.mockResolvedValue({
			hasAccess: false,
			tier: "free",
		});

		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(403);
		expect(body.error).toBe("Subscription required");
	});

	it("should return 500 for AI service failure", async () => {
		const { client } = require("@/lib/gemini/client");
		client.getGenerativeModel.mockImplementation(() => ({
			generateContent: jest
				.fn()
				.mockRejectedValue(new Error("AI service error")),
		}));

		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(500);
		expect(body.error).toBe("Internal server error");
	});

	it("should return a cached response successfully", async () => {
		const cachedData = {
			title: "Test Blog Post",
			meta: { metaDescription: "Test meta description." },
		};
		cache.get.mockReturnValue(cachedData);

		const requestBody = {
			topic: "Test Topic",
			keywords: ["test"],
		};

		const req = new NextRequest("http://localhost/api/blog-generation", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(req);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(body.data.title).toBe("Test Blog Post");
		expect(body.metadata.cached).toBe(true);
		expect(cache.set).not.toHaveBeenCalled();
	});
});

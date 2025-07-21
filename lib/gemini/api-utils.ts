import { BlogGenerationRequest } from "./schemas";

// Request validation utilities
export class RequestValidator {
	static validateBlogRequest(request: BlogGenerationRequest): {
		valid: boolean;
		errors: string[];
	} {
		const errors: string[] = [];

		if (!request.topic || request.topic.trim().length === 0) {
			errors.push("Topic is required");
		}

		if (request.topic && request.topic.length > 500) {
			errors.push("Topic must be less than 500 characters");
		}

		if (request.keywords && request.keywords.length > 20) {
			errors.push("Maximum 20 keywords allowed");
		}

		if (
			request.wordCount &&
			(request.wordCount < 100 || request.wordCount > 5000)
		) {
			errors.push("Word count must be between 100 and 5000");
		}

		if (
			request.tone &&
			![
				"professional",
				"casual",
				"technical",
				"conversational",
				"informative",
				"humorous",
				"authoritative",
				"inspirational",
			].includes(request.tone)
		) {
			errors.push("Invalid tone specified");
		}

		if (
			request.contentStructure &&
			![
				"standard",
				"listicle",
				"howto",
				"comparison",
				"case-study",
				"interview",
			].includes(request.contentStructure)
		) {
			errors.push("Invalid content structure specified");
		}

		if (
			request.seoFocus &&
			!["high", "medium", "low"].includes(request.seoFocus)
		) {
			errors.push("Invalid SEO focus level specified");
		}

		if (
			request.customInstructions &&
			request.customInstructions.length > 1000
		) {
			errors.push("Custom instructions must be less than 1000 characters");
		}

		return {
			valid: errors.length === 0,
			errors,
		};
	}

	static sanitizeInput(input: string): string {
		return input.trim().replace(/[<>]/g, "");
	}
}

// Error handling utilities
export class ErrorHandler {
	static createErrorResponse(error: any): any {
		if (error instanceof Error) {
			return {
				error: error.name || "Error",
				message: error.message,
				details: error.stack,
			};
		}

		if (typeof error === "object" && error.name && error.message) {
			return {
				error: error.name,
				message: error.message,
				details: error.details,
			};
		}

		return {
			error: "UnknownError",
			message: "An unknown error occurred",
			details: error,
		};
	}

	static async logError(error: any, context: any): Promise<void> {
		console.error("Gemini API Error:", {
			error: error.message || error,
			context,
			timestamp: new Date().toISOString(),
		});
	}
}

// Retry utilities
export class RetryUtil {
	static async withExponentialBackoff<T>(
		fn: () => Promise<T>,
		maxRetries: number = 3,
		baseDelay: number = 1000,
	): Promise<T> {
		let lastError: Error;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				return await fn();
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt === maxRetries) {
					throw lastError;
				}

				const delay = baseDelay * Math.pow(2, attempt);
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		throw lastError!;
	}
}

// Authentication utilities
export class AuthUtil {
	static async getUserId(request: Request): Promise<string | null> {
		// For now, return a mock user ID
		// In production, this would extract from JWT or session
		return "user-123";
	}

	static async checkSubscription(
		userId: string,
	): Promise<{ hasAccess: boolean; plan?: string }> {
		// For now, return true for all users
		// In production, this would check the user's subscription status
		return { hasAccess: true, plan: "basic" };
	}
}

// IP utilities
export class IPUtil {
	static getClientIP(request: Request): string {
		const forwarded = request.headers.get("x-forwarded-for");
		const realIP = request.headers.get("x-real-ip");

		if (forwarded) {
			return forwarded.split(",")[0].trim();
		}

		if (realIP) {
			return realIP;
		}

		return "127.0.0.1";
	}
}

// Simple in-memory cache
class SimpleCache {
	private cache = new Map<string, { data: any; expires: number }>();

	generateKey(request: BlogGenerationRequest): string {
		const keyData = {
			topic: request.topic,
			keywords: request.keywords?.sort(),
			tone: request.tone,
			wordCount: request.wordCount,
		};
		return Buffer.from(JSON.stringify(keyData)).toString("base64");
	}

	get<T>(key: string): T | null {
		const item = this.cache.get(key);
		if (!item) return null;

		if (Date.now() > item.expires) {
			this.cache.delete(key);
			return null;
		}

		return item.data;
	}

	set<T>(key: string, data: T, ttlMs: number = 300000): void {
		// 5 minutes default
		this.cache.set(key, {
			data,
			expires: Date.now() + ttlMs,
		});
	}

	clear(): void {
		this.cache.clear();
	}
}

export const cache = new SimpleCache();

// Simple rate limiter
class SimpleRateLimiter {
	private requests = new Map<string, { count: number; resetTime: number }>();

	checkLimit(
		ip: string,
		limit: number = 60,
		windowMs: number = 60000,
	): {
		allowed: boolean;
		remaining: number;
		reset: number;
	} {
		const now = Date.now();
		const windowStart = now - windowMs;

		let record = this.requests.get(ip);

		if (!record || record.resetTime < windowStart) {
			record = { count: 0, resetTime: now + windowMs };
			this.requests.set(ip, record);
		}

		record.count++;

		return {
			allowed: record.count <= limit,
			remaining: Math.max(0, limit - record.count),
			reset: record.resetTime,
		};
	}
}

export const rateLimiter = new SimpleRateLimiter();

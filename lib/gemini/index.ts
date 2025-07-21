// Main exports for Gemini blog generation service
export { GeminiBlogService, geminiBlogService } from "./service";
export {
	getClient,
	GEMINI_CONFIG,
	BLOG_GENERATION_CONFIG,
	BLOG_SYSTEM_INSTRUCTION,
} from "./client";
export * from "./types";
export * from "./utils";

// Re-export commonly used types from @google/genai
export type {
	GoogleGenAI,
	GenerateContentResponse,
	GenerateContentConfig,
	FunctionDeclaration,
	FunctionCall,
} from "@google/genai";

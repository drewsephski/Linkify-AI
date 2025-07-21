// Types for Gemini AI blog generation

// Blog generation types
export interface BlogGenerationRequest {
	content: string;
	contentType: "transcript" | "audio" | "video" | "text";
	title?: string;
	targetAudience?: string;
	tone?: "professional" | "casual" | "technical" | "conversational";
	length?: "short" | "medium" | "long";
	includeOutline?: boolean;
	seoOptimization?: boolean;
	customInstructions?: string;
}

export interface BlogOutline {
	title: string;
	sections: BlogSection[];
	targetKeywords: string[];
	estimatedReadTime: number;
}

export interface BlogSection {
	heading: string;
	keyPoints: string[];
}

export interface KeyInsight {
	insight: string;
	context: string;
	importance: "high" | "medium" | "low";
}

export interface ExtractedInsights {
	mainTopics: string[];
	keyInsights: KeyInsight[];
	actionableItems: string[];
}

export interface SEOOptimization {
	metaTitle: string;
	metaDescription: string;
	primaryKeyword: string;
	secondaryKeywords: string[];
	headingStructure: HeadingStructure[];
}

export interface HeadingStructure {
	level: number;
	text: string;
	keywords?: string[];
}

export interface BlogGenerationResult {
	title: string;
	content: string;
	outline?: BlogOutline;
	insights?: ExtractedInsights;
	seoData?: SEOOptimization;
	metadata: {
		wordCount: number;
		estimatedReadTime: number;
		generatedAt: Date;
		model: string;
		tokensUsed?: number;
	};
}

export interface BlogGenerationError {
	code: string;
	message: string;
	details?: any;
}

// Content analysis types
export interface ContentAnalysis {
	contentType: string;
	language: string;
	topics: string[];
	sentiment: "positive" | "negative" | "neutral";
	complexity: "beginner" | "intermediate" | "advanced";
	keyTerms: string[];
	estimatedLength: number;
}

// Streaming response types
export interface BlogGenerationStreamChunk {
	type: "outline" | "content" | "seo" | "complete";
	data: any;
	progress?: number;
}

// Configuration types
export interface BlogGenerationConfig {
	model?: string;
	temperature?: number;
	maxOutputTokens?: number;
	useStreaming?: boolean;
	enableFunctionCalling?: boolean;
	customSystemInstruction?: string;
}

// Response wrapper
export interface GeminiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: BlogGenerationError;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}

// Function call result types
export interface FunctionCallResult {
	name: string;
	result: any;
	success: boolean;
	error?: string;
}

// Batch processing types
export interface BatchBlogRequest {
	requests: BlogGenerationRequest[];
	batchId?: string;
	priority?: "low" | "normal" | "high";
}

export interface BatchBlogResult {
	batchId: string;
	results: (BlogGenerationResult | BlogGenerationError)[];
	completedAt: Date;
	totalProcessingTime: number;
}

// Template types
export interface BlogTemplate {
	id: string;
	name: string;
	description: string;
	structure: BlogSection[];
	targetAudience: string;
	tone: string;
	systemInstruction: string;
}

// Export utility type for Gemini responses
export type GeminiGenerateContentResponse = any;

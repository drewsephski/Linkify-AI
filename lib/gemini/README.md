# Linkify AI - Gemini Blog Generation Service

A comprehensive TypeScript service for generating high-quality blog posts using Google's Gemini 2.0 AI models. This service transforms video transcripts, audio content, or raw text into engaging, SEO-optimized blog posts.

## Features

- 🤖 **Advanced AI Generation**: Uses Google's latest Gemini 2.0 Flash model
- 📝 **Multiple Content Types**: Supports transcripts, audio, video, and text input
- 🎯 **SEO Optimization**: Built-in SEO analysis and optimization
- 📊 **Content Analysis**: Detailed content insights and analytics
- 🌊 **Streaming Support**: Real-time content generation with streaming
- 🛠️ **Function Calling**: Advanced AI capabilities with structured outputs
- 📋 **Outline Generation**: Automatic blog post structure creation
- 🔍 **Insight Extraction**: Key insights and actionable items extraction
- ⚙️ **Highly Configurable**: Customizable tone, length, and audience targeting

## Installation

The service is already integrated into the Linkify AI project. Make sure you have the required dependencies:

```bash
npm install @google/genai
```

## Setup

1. **API Key Configuration**
   Set your Google AI API key in your environment:

   ```bash
   export GOOGLE_API_KEY="your-api-key-here"
   # or
   export GEMINI_API_KEY="your-api-key-here"
   ```

2. **Get API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a new API key
   - Add it to your environment variables

## Quick Start

```typescript
import { geminiBlogService } from "@/lib/gemini";

// Basic blog generation
const result = await geminiBlogService.generateBlog({
  content: "Your video transcript or content here...",
  contentType: "transcript",
  title: "My Blog Post Title",
  targetAudience: "developers and tech enthusiasts",
  tone: "professional",
  length: "medium",
  includeOutline: true,
  seoOptimization: true,
});

if (result.success) {
  console.log("Generated blog:", result.data.content);
  console.log("SEO data:", result.data.seoData);
}
```

## API Reference

### GeminiBlogService

The main service class for blog generation.

#### Methods

##### `generateBlog(request: BlogGenerationRequest): Promise<GeminiResponse<BlogGenerationResult>>`

Generate a complete blog post from content.

**Parameters:**

- `request`: Blog generation configuration

**Returns:**

- Promise resolving to blog generation result with metadata

##### `generateBlogStream(request: BlogGenerationRequest): AsyncGenerator<string>`

Generate a blog post with streaming response for real-time updates.

##### `generateOutline(content: string): Promise<BlogOutline>`

Generate a structured outline for a blog post.

##### `extractInsights(content: string): Promise<ExtractedInsights>`

Extract key insights and actionable items from content.

##### `optimizeForSEO(content: string, targetAudience?: string): Promise<SEOOptimization>`

Optimize content for search engine optimization.

##### `analyzeContent(content: string): Promise<ContentAnalysis>`

Analyze content characteristics and properties.

### Types

#### BlogGenerationRequest

```typescript
interface BlogGenerationRequest {
  content: string; // Source content to transform
  contentType: "transcript" | "audio" | "video" | "text";
  title?: string; // Optional title
  targetAudience?: string; // Target audience description
  tone?: "professional" | "casual" | "technical" | "conversational";
  length?: "short" | "medium" | "long";
  includeOutline?: boolean; // Generate outline
  seoOptimization?: boolean; // Include SEO optimization
  customInstructions?: string; // Additional instructions
}
```

#### BlogGenerationResult

```typescript
interface BlogGenerationResult {
  title: string; // Generated title
  content: string; // Blog post content (Markdown)
  outline?: BlogOutline; // Structured outline
  insights?: ExtractedInsights; // Key insights
  seoData?: SEOOptimization; // SEO optimization data
  metadata: {
    wordCount: number;
    estimatedReadTime: number;
    generatedAt: Date;
    model: string;
    tokensUsed?: number;
  };
}
```

## Configuration

### Environment Variables

- `GOOGLE_API_KEY` or `GEMINI_API_KEY`: Your Google AI API key
- `GOOGLE_GENAI_USE_VERTEXAI`: Set to 'true' to use Vertex AI (optional)
- `GOOGLE_CLOUD_PROJECT`: GCP project ID (for Vertex AI)
- `GOOGLE_CLOUD_LOCATION`: GCP location (for Vertex AI)

### Generation Config

```typescript
const config = {
  model: "gemini-2.0-flash-001",
  temperature: 0.8, // Creativity level (0-1)
  maxOutputTokens: 4096, // Maximum response length
  topK: 40, // Token selection diversity
  topP: 0.95, // Nucleus sampling
};
```

## Examples

### Basic Blog Generation

```typescript
import { geminiBlogService } from "@/lib/gemini";

const transcript = `
Welcome to our discussion about artificial intelligence...
[your content here]
`;

const result = await geminiBlogService.generateBlog({
  content: transcript,
  contentType: "transcript",
  tone: "professional",
  length: "medium",
  targetAudience: "business professionals",
});

console.log(result.data?.content);
```

### Streaming Generation

```typescript
const stream = geminiBlogService.generateBlogStream({
  content: transcript,
  contentType: "transcript",
  tone: "conversational",
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

### SEO Optimization

```typescript
const seoData = await geminiBlogService.optimizeForSEO(
  blogContent,
  "developers and tech enthusiasts"
);

console.log("Meta title:", seoData.metaTitle);
console.log("Keywords:", seoData.primaryKeyword);
console.log("Headings:", seoData.headingStructure);
```

### Content Analysis

```typescript
const analysis = await geminiBlogService.analyzeContent(content);

console.log("Topics:", analysis.topics);
console.log("Sentiment:", analysis.sentiment);
console.log("Complexity:", analysis.complexity);
```

## Advanced Features

### Function Calling

The service uses Gemini's function calling capabilities for structured outputs:

- **generateBlogOutline**: Creates structured blog outlines
- **extractKeyInsights**: Extracts insights with importance levels
- **optimizeForSEO**: Provides structured SEO recommendations

### Custom System Instructions

```typescript
const result = await geminiBlogService.generateBlog({
  content: transcript,
  contentType: "transcript",
  customInstructions: `
    Focus on practical applications.
    Include code examples where relevant.
    Add a resources section at the end.
  `,
});
```

### Batch Processing

For processing multiple pieces of content:

```typescript
const requests = [
  { content: transcript1, contentType: "transcript" },
  { content: transcript2, contentType: "transcript" },
];

const results = await Promise.all(
  requests.map((req) => geminiBlogService.generateBlog(req))
);
```

## Testing

Run the test suite to verify the service:

```bash
npm run gemini:test
```

The test script will:

- Verify API key configuration
- Test basic blog generation
- Test streaming generation
- Test content analysis
- Display performance metrics

## Error Handling

The service provides comprehensive error handling:

```typescript
const result = await geminiBlogService.generateBlog(request);

if (!result.success) {
  console.error("Generation failed:", result.error);
  // Handle specific error codes
  switch (result.error?.code) {
    case "GENERATION_FAILED":
      // Handle generation failure
      break;
    case "API_KEY_INVALID":
      // Handle API key issues
      break;
    default:
    // Handle other errors
  }
}
```

## Performance Optimization

### Token Management

- Monitor token usage with `result.usage`
- Adjust `maxOutputTokens` based on content length
- Use streaming for long-form content

### Caching

Consider implementing caching for:

- Frequently used outlines
- SEO optimizations
- Content analysis results

### Rate Limiting

The service includes built-in rate limiting configuration:

```typescript
const RATE_LIMIT_CONFIG = {
  requestsPerMinute: 60,
  requestsPerHour: 1000,
  burstLimit: 10,
};
```

## Best Practices

1. **Content Preparation**

   - Clean and format input content
   - Remove unnecessary noise from transcripts
   - Provide clear context and instructions

2. **Prompt Engineering**

   - Use specific, clear instructions
   - Provide examples when needed
   - Iterate on prompts for better results

3. **Error Handling**

   - Always check for success/failure
   - Implement retry logic for transient failures
   - Log errors for debugging

4. **Performance**
   - Use appropriate content lengths
   - Monitor token usage
   - Implement caching where appropriate

## Troubleshooting

### Common Issues

1. **API Key Not Found**

   ```
   Error: API key is not available
   ```

   Solution: Set `GOOGLE_API_KEY` or `GEMINI_API_KEY` environment variable

2. **Content Too Long**

   ```
   Error: Content exceeds maximum token limit
   ```

   Solution: Reduce content length or increase `maxOutputTokens`

3. **Generation Failed**
   ```
   Error: Generated content validation failed
   ```
   Solution: Check content quality and adjust generation parameters

### Debug Mode

Enable debug logging by setting:

```bash
export DEBUG=gemini:*
```

## Contributing

When contributing to the Gemini service:

1. Follow TypeScript best practices
2. Add comprehensive error handling
3. Include unit tests for new features
4. Update documentation
5. Test with various content types

## License

This service is part of the Linkify AI project and follows the same license terms.

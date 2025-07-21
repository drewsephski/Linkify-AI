"use client";

import { GenerationProgress } from "@/components/dashboard/generation-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedBlogPost } from "@/lib/gemini/schemas";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	ChevronUp,
	FileText,
	Info,
	Key,
	Settings,
	Sparkles,
	Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ApiKeyModal } from "./api-key-modal";
import { BlogPostDisplay } from "./blog-post-display";

const promptSuggestions = [
	"Write a listicle about...",
	"Create a tutorial for...",
	"Compare and contrast...",
	"Review the product...",
	"Write a case study about...",
	"Explain the benefits of...",
	"How to get started with...",
	"The ultimate guide to...",
	"Common mistakes in...",
	"Best practices for...",
	"The future of...",
	"Why you should consider...",
];

const prefilledPrompts = {
	Marketing: [
		"10 Digital Marketing Strategies That Actually Work in 2024",
		"How to Build a Content Marketing Strategy from Scratch",
		"Social Media Marketing vs Traditional Advertising: ROI Comparison",
		"Email Marketing Automation: Complete Setup Guide",
		"The Psychology Behind Successful Marketing Campaigns",
	],
	Technology: [
		"AI and Machine Learning: Transforming Business Operations",
		"Cybersecurity Best Practices for Small Businesses",
		"Cloud Computing vs On-Premise: Which is Right for You?",
		"The Future of Web Development: Trends to Watch",
		"How to Choose the Right Tech Stack for Your Startup",
	],
	Business: [
		"Remote Work Management: Tools and Strategies for Success",
		"Customer Retention Strategies That Boost Revenue",
		"Scaling Your Business: When and How to Expand",
		"Financial Planning for Small Business Owners",
		"Building a Strong Company Culture in the Digital Age",
	],
	"E-commerce": [
		"Conversion Rate Optimization: A Complete Guide",
		"E-commerce SEO: Driving Organic Traffic to Your Store",
		"Customer Service Excellence in Online Retail",
		"Mobile Commerce: Optimizing for Mobile Shoppers",
		"Inventory Management Systems for Growing Businesses",
	],
	Productivity: [
		"Time Management Techniques for Busy Professionals",
		"Project Management Tools: Comparison and Reviews",
		"Building Effective Remote Teams",
		"Automation Tools That Save Hours Every Week",
		"Work-Life Balance in the Modern Workplace",
	],
};

const promptTemplates = {
	"How-To Guide": "How to {topic} - A step-by-step guide for beginners",
	Listicle: "X Essential {topic} Tips Every Professional Should Know",
	Comparison: "{topic} vs Alternatives: Which is Right for Your Business?",
	"Case Study": "How {company} Achieved Success with {topic}",
	"Trend Analysis": "The Future of {topic}: Trends and Predictions for 2024",
	"Problem-Solution": "Solving Common {topic} Challenges: Expert Solutions",
	Review: "Complete {topic} Review: Features, Pricing, and Alternatives",
	"Beginner's Guide": "The Complete Beginner's Guide to {topic}",
	"Best Practices": "{topic} Best Practices: Lessons from Industry Leaders",
	"Myth Busting": "Debunking Common {topic} Myths and Misconceptions",
};

const toneOptions = [
	{
		value: "Professional",
		description: "Formal, authoritative, business-focused",
	},
	{ value: "Casual", description: "Friendly, conversational, approachable" },
	{
		value: "Informative",
		description: "Educational, fact-based, comprehensive",
	},
	{ value: "Humorous", description: "Light-hearted, entertaining, engaging" },
	{ value: "Technical", description: "Detailed, precise, expert-level" },
	{ value: "Conversational", description: "Personal, relatable, story-driven" },
	{
		value: "Authoritative",
		description: "Expert, confident, industry-leading",
	},
	{ value: "Inspirational", description: "Motivating, uplifting, encouraging" },
];

const audienceOptions = [
	"Beginners/Newcomers",
	"Small Business Owners",
	"Marketing Professionals",
	"Developers/Technical Audience",
	"C-Level Executives",
	"Entrepreneurs",
	"Students/Academics",
	"General Public",
	"Industry Specialists",
	"Content Creators",
];

const contentStructureOptions = [
	{
		value: "standard",
		label: "Standard Article",
		description: "Introduction, main sections, conclusion",
	},
	{
		value: "listicle",
		label: "Listicle",
		description: "Numbered or bulleted list format",
	},
	{
		value: "howto",
		label: "How-To Guide",
		description: "Step-by-step instructional format",
	},
	{
		value: "comparison",
		label: "Comparison",
		description: "Side-by-side analysis format",
	},
	{
		value: "case-study",
		label: "Case Study",
		description: "Problem, solution, results format",
	},
	{
		value: "interview",
		label: "Interview Style",
		description: "Q&A format with expert insights",
	},
];

const wordCountOptions = [
	{
		value: 800,
		label: "Short (800 words)",
		description: "Quick read, 3-4 minutes",
	},
	{
		value: 1200,
		label: "Medium (1,200 words)",
		description: "Standard length, 5-6 minutes",
	},
	{
		value: 1800,
		label: "Long (1,800 words)",
		description: "In-depth coverage, 7-9 minutes",
	},
	{
		value: 2500,
		label: "Comprehensive (2,500 words)",
		description: "Complete guide, 10-12 minutes",
	},
	{
		value: 3500,
		label: "Ultimate Guide (3,500+ words)",
		description: "Definitive resource, 15+ minutes",
	},
];

const seoFocusOptions = [
	{
		value: "high",
		label: "High SEO Focus",
		description: "Keyword-optimized, search-friendly",
	},
	{
		value: "medium",
		label: "Balanced SEO",
		description: "Natural keywords, readable content",
	},
	{
		value: "low",
		label: "Content-First",
		description: "Focus on quality over optimization",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			duration: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { y: 10, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut" as const,
		},
	},
};

export function BlogGeneratorForm() {
	const [topic, setTopic] = useState("");
	const [tone, setTone] = useState("Professional");
	const [keywords, setKeywords] = useState<string[]>([""]);
	const [targetAudience, setTargetAudience] = useState("");
	const [wordCount, setWordCount] = useState(1200);
	const [contentStructure, setContentStructure] = useState("standard");
	const [seoFocus, setSeoFocus] = useState("medium");
	const [includeImages, setIncludeImages] = useState(true);
	const [brandVoice, setBrandVoice] = useState(true);
	const [customInstructions, setCustomInstructions] = useState("");
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [blogPost, setBlogPost] = useState<EnhancedBlogPost | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [apiKey, setApiKey] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);

	useEffect(() => {
		const storedApiKey = localStorage.getItem("gemini_api_key");
		if (storedApiKey) {
			setApiKey(storedApiKey);
		}
		setIsInitialized(true);
	}, []);

	const handleApiKeySave = (newApiKey: string) => {
		setApiKey(newApiKey);
		localStorage.setItem("gemini_api_key", newApiKey);
	};

	const saveGeneratedPost = async (blogPostData: EnhancedBlogPost) => {
		try {
			// Convert blog post to markdown format
			let content = "";

			if (blogPostData.introduction) {
				content += `${blogPostData.introduction}\n\n`;
			}

			if (blogPostData.sections && Array.isArray(blogPostData.sections)) {
				blogPostData.sections.forEach((section) => {
					if (section.heading) {
						content += `## ${section.heading}\n\n`;
					}
					if (section.content) {
						content += `${section.content}\n\n`;
					}
				});
			}

			if (blogPostData.conclusion) {
				content += `## Conclusion\n\n${blogPostData.conclusion}`;
			}

			await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: blogPostData.title || "Generated Blog Post",
					content: content.trim(),
				}),
			});
		} catch (error) {
			console.error("Error auto-saving post:", error);
			// Don't throw error to avoid disrupting the user experience
		}
	};

	const handleKeywordChange = (index: number, value: string) => {
		const newKeywords = [...keywords];
		newKeywords[index] = value;
		setKeywords(newKeywords);
	};

	const addKeywordInput = () => {
		setKeywords([...keywords, ""]);
	};

	const removeKeywordInput = (index: number) => {
		const newKeywords = keywords.filter((_, i) => i !== index);
		setKeywords(newKeywords);
	};

	const applyTemplate = (templateKey: string) => {
		const template =
			promptTemplates[templateKey as keyof typeof promptTemplates];
		if (template) {
			const topicPlaceholder = topic || "{topic}";
			const filledTemplate = template.replace(/\{topic\}/g, topicPlaceholder);
			setTopic(filledTemplate);
			setSelectedTemplate(templateKey);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setBlogPost(null);

		try {
			const response = await fetch("/api/blog-generation", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					topic,
					keywords: keywords.filter((kw) => kw.trim() !== ""),
					tone: tone.toLowerCase(),
					targetAudience,
					wordCount,
					contentStructure,
					seoFocus,
					includeImages,
					brandVoice,
					customInstructions,
					apiKey,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An unknown error occurred.");
			}

			const data = await response.json();

			// Check if the response indicates an error
			if (data.error || data.success === false) {
				throw new Error(
					data.error || data.message || "Failed to generate blog post",
				);
			}

			// Handle both direct blog post and wrapped response formats
			const blogPostData = data.data || data;

			// Validate that we have the minimum required fields
			if (!blogPostData || typeof blogPostData !== "object") {
				throw new Error("Invalid response format from server");
			}

			setBlogPost(blogPostData);

			// Automatically save the generated blog post
			await saveGeneratedPost(blogPostData);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Don't render until initialized to prevent hydration issues
	if (!isInitialized) {
		return (
			<div className="mx-auto w-full max-w-3xl space-y-10">
				<div className="animate-pulse">
					<div className="mb-4 h-8 rounded bg-gray-200"></div>
					<div className="h-64 rounded bg-gray-200"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-4xl space-y-12 py-8">
			<GenerationProgress isGenerating={isLoading} />

			<Card className="fade-in-0 animate-in overflow-hidden rounded-xl bg-background/95 shadow-lg duration-500">
				<CardHeader className="border-border/50 border-b bg-gradient-to-br from-primary/10 to-transparent p-6">
					<CardTitle className="flex items-center gap-3 font-bold text-2xl text-primary-foreground">
						<Sparkles className="h-7 w-7 text-primary" />
						AI Blog Post Generator
					</CardTitle>
					<p className="mt-1 text-muted-foreground text-sm">
						Craft engaging blog posts with the power of AI. Fill out the details
						below to get started.
					</p>
				</CardHeader>
				<CardContent className="p-6 md:p-8">
					<motion.form
						onSubmit={handleSubmit}
						className="space-y-10"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Topic Section */}
						<motion.div
							className="space-y-4 border-border/50 border-b pb-8"
							variants={itemVariants}
						>
							<div className="flex items-center gap-3">
								<FileText className="h-6 w-6 text-primary" />
								<Label htmlFor="topic" className="font-semibold text-lg">
									Blog Topic
								</Label>
							</div>
							<div className="relative">
								<Input
									id="topic"
									value={topic}
									onChange={(e) => setTopic(e.target.value)}
									placeholder="e.g., 'The Future of AI in Web Development' or 'How to Master Digital Marketing'"
									required
									className="border-border/50 pr-10 focus-visible:ring-primary focus-visible:ring-offset-2"
								/>
								<HoverCard>
									<HoverCardTrigger asChild>
										<motion.button
											type="button"
											className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground transition-colors hover:text-primary"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											transition={{ duration: 0.1 }}
										>
											<Info className="h-4 w-4" />
										</motion.button>
									</HoverCardTrigger>
									<HoverCardContent className="border-border/50 bg-popover text-popover-foreground shadow-md">
										<p className="text-sm">
											Enter a clear and concise topic for your blog post. Good
											examples: "The Future of AI in Marketing," or "How to
											Build a Successful E-commerce Brand."
										</p>
									</HoverCardContent>
								</HoverCard>
							</div>
						</motion.div>

						{/* Template Selection */}
						<motion.div
							className="space-y-6 border-border/50 border-b pb-8"
							variants={itemVariants}
						>
							<div className="flex items-center gap-3">
								<Sparkles className="h-6 w-6 text-primary" />
								<Label className="font-semibold text-lg">
									Content Templates & Ideas
								</Label>
							</div>

							{/* Prompt Templates */}
							<div className="space-y-3">
								<h4 className="font-medium text-foreground text-md">
									Choose a Template
								</h4>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
									{Object.entries(promptTemplates).map(([key]) => (
										<motion.div
											key={key}
											whileHover={{
												scale: 1.02,
												boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
											}}
											whileTap={{ scale: 0.98 }}
											transition={{ duration: 0.1 }}
										>
											<Badge
												variant={
													selectedTemplate === key ? "default" : "secondary"
												}
												className="w-full cursor-pointer justify-center rounded-lg border border-border/50 py-3 font-medium text-sm shadow-sm transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
												onClick={() => applyTemplate(key)}
											>
												{key}
											</Badge>
										</motion.div>
									))}
								</div>
							</div>

							{/* Prefilled Prompts by Category */}
							<div className="space-y-3">
								<h4 className="font-medium text-foreground text-md">
									Popular Blog Ideas
								</h4>
								<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
									{Object.entries(prefilledPrompts).map(
										([category, prompts]) => (
											<DropdownMenu key={category}>
												<DropdownMenuTrigger asChild>
													<Button
														variant="outline"
														className="w-full justify-between rounded-lg border-border/50 py-3 text-sm shadow-sm transition-colors hover:bg-accent/50"
													>
														{category}
														<ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="w-56 border-border/50 bg-popover text-popover-foreground shadow-lg">
													<DropdownMenuLabel className="font-semibold text-primary">
														{category} Ideas
													</DropdownMenuLabel>
													<DropdownMenuSeparator className="bg-border/50" />
													{prompts.map((prompt) => (
														<DropdownMenuItem
															key={prompt}
															onClick={() => setTopic(prompt)}
															className="cursor-pointer py-2 text-sm transition-colors hover:bg-accent/50 focus:bg-accent/50"
														>
															{prompt}
														</DropdownMenuItem>
													))}
												</DropdownMenuContent>
											</DropdownMenu>
										),
									)}
								</div>
							</div>

							{/* Quick Suggestions */}
							<div className="space-y-3">
								<h4 className="font-medium text-foreground text-md">
									Quick Starters
								</h4>
								<div className="flex flex-wrap gap-2">
									{promptSuggestions.map((prompt) => (
										<motion.div
											key={prompt}
											whileHover={{
												scale: 1.02,
												boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
											}}
											whileTap={{ scale: 0.98 }}
											transition={{ duration: 0.1 }}
										>
											<Badge
												variant="secondary"
												className="cursor-pointer rounded-full border border-border/50 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-accent/50"
												onClick={() => setTopic(prompt)}
											>
												{prompt}
											</Badge>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Core Settings */}
						<motion.div
							className="space-y-8 border-border/50 border-b pb-8"
							variants={itemVariants}
						>
							<h3 className="flex items-center gap-3 font-semibold text-lg">
								<Settings className="h-6 w-6 text-primary" />
								Core Settings
							</h3>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{/* Tone Selection */}
								<div className="space-y-3">
									<Label htmlFor="tone" className="font-medium text-sm">
										Tone of Voice
									</Label>
									<Select value={tone} onValueChange={setTone}>
										<SelectTrigger
											id="tone"
											className="border-border/50 focus-visible:ring-primary focus-visible:ring-offset-2"
										>
											<SelectValue placeholder="Select a tone" />
										</SelectTrigger>
										<SelectContent className="border-border/50 bg-popover text-popover-foreground shadow-lg">
											{toneOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
													className="py-2"
												>
													<div className="flex flex-col">
														<span className="font-medium">{option.value}</span>
														<span className="text-muted-foreground text-xs">
															{option.description}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Target Audience */}
								<div className="space-y-3">
									<Label htmlFor="audience" className="font-medium text-sm">
										Target Audience
									</Label>
									<Select
										value={targetAudience}
										onValueChange={setTargetAudience}
									>
										<SelectTrigger
											id="audience"
											className="border-border/50 focus-visible:ring-primary focus-visible:ring-offset-2"
										>
											<SelectValue placeholder="Select target audience" />
										</SelectTrigger>
										<SelectContent className="border-border/50 bg-popover text-popover-foreground shadow-lg">
											{audienceOptions.map((audience) => (
												<SelectItem key={audience} value={audience}>
													{audience}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Article Length */}
							<div className="space-y-3">
								<Label className="font-medium text-sm">Article Length</Label>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
									{wordCountOptions.map((option) => (
										<motion.div
											key={option.value}
											whileHover={{
												scale: 1.02,
												boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
											}}
											whileTap={{ scale: 0.98 }}
											transition={{ duration: 0.1 }}
										>
											<Badge
												variant={
													wordCount === option.value ? "default" : "secondary"
												}
												className="h-auto w-full cursor-pointer flex-col justify-start rounded-lg border border-border/50 py-4 text-left shadow-sm transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
												onClick={() => setWordCount(option.value)}
											>
												<span className="font-semibold text-base">
													{option.label}
												</span>
												<span className="text-xs leading-tight opacity-90">
													{option.description}
												</span>
											</Badge>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Keywords Section */}
						<motion.div
							className="space-y-6 border-border/50 border-b pb-8"
							variants={itemVariants}
						>
							<h3 className="flex items-center gap-3 font-semibold text-lg">
								<Target className="h-6 w-6 text-primary" />
								SEO & Keywords
							</h3>
							<div className="space-y-4">
								<Label className="font-medium text-sm">
									SEO Keywords (Optional)
								</Label>
								{keywords.map((keyword, index) => (
									<div key={index} className="flex items-center gap-3">
										<Input
											value={keyword}
											onChange={(e) =>
												handleKeywordChange(index, e.target.value)
											}
											placeholder={`Keyword ${index + 1}`}
											className="flex-1 border-border/50 focus-visible:ring-primary focus-visible:ring-offset-2"
										/>
										{keywords.length > 1 && (
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => removeKeywordInput(index)}
												className="border-destructive/50 text-destructive-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
											>
												Remove
											</Button>
										)}
									</div>
								))}
								<Button
									type="button"
									variant="outline"
									onClick={addKeywordInput}
									className="w-full rounded-lg border-border/50 py-3 text-sm transition-colors hover:bg-accent/50"
								>
									Add Keyword
								</Button>
							</div>

							{/* SEO Focus */}
							<div className="space-y-3">
								<Label className="font-medium text-sm">
									SEO Optimization Level
								</Label>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
									{seoFocusOptions.map((option) => (
										<motion.div
											key={option.value}
											whileHover={{
												scale: 1.02,
												boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
											}}
											whileTap={{ scale: 0.98 }}
											transition={{ duration: 0.1 }}
										>
											<Badge
												variant={
													seoFocus === option.value ? "default" : "secondary"
												}
												className="h-auto w-full cursor-pointer flex-col justify-center rounded-lg border border-border/50 py-4 text-center shadow-sm transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
												onClick={() => setSeoFocus(option.value)}
											>
												<span className="font-semibold text-base">
													{option.label}
												</span>
												<span className="text-xs leading-tight opacity-90">
													{option.description}
												</span>
											</Badge>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Advanced Settings */}
						<motion.div variants={itemVariants}>
							<Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										className="w-full justify-between rounded-lg p-3 font-semibold text-lg transition-all duration-300 hover:bg-accent/50 focus-visible:ring-primary focus-visible:ring-offset-2"
									>
										<div className="flex items-center gap-3">
											<Settings className="h-6 w-6 text-primary" />
											<span>Advanced Settings</span>
										</div>
										{showAdvanced ? (
											<ChevronUp className="h-5 w-5 text-muted-foreground" />
										) : (
											<ChevronDown className="h-5 w-5 text-muted-foreground" />
										)}
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="space-y-8 pt-6">
									{/* Content Structure */}
									<div className="space-y-3">
										<Label className="font-medium text-sm">
											Content Structure
										</Label>
										<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
											{contentStructureOptions.map((option) => (
												<motion.div
													key={option.value}
													whileHover={{
														scale: 1.02,
														boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
													}}
													whileTap={{ scale: 0.98 }}
													transition={{ duration: 0.1 }}
												>
													<Badge
														variant={
															contentStructure === option.value
																? "default"
																: "secondary"
														}
														className="h-auto w-full cursor-pointer flex-col justify-center rounded-lg border border-border/50 py-4 text-center shadow-sm transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
														onClick={() => setContentStructure(option.value)}
													>
														<span className="font-semibold text-base">
															{option.label}
														</span>
														<span className="text-xs leading-tight opacity-90">
															{option.description}
														</span>
													</Badge>
												</motion.div>
											))}
										</div>
									</div>

									{/* Toggle Options */}
									<div className="space-y-6">
										<div className="flex items-center justify-between rounded-lg border border-border/50 bg-accent/10 p-4 shadow-sm">
											<div className="space-y-1">
												<Label className="font-medium text-base">
													Include Image Suggestions
												</Label>
												<p className="text-muted-foreground text-sm">
													Generate AI image prompts for your blog post.
												</p>
											</div>
											<Switch
												checked={includeImages}
												onCheckedChange={setIncludeImages}
												className="data-[state=checked]:bg-primary"
											/>
										</div>

										<div className="flex items-center justify-between rounded-lg border border-border/50 bg-accent/10 p-4 shadow-sm">
											<div className="space-y-1">
												<Label className="font-medium text-base">
													Use Brand Voice
												</Label>
												<p className="text-muted-foreground text-sm">
													Apply Linkify AI brand guidelines and tone.
												</p>
											</div>
											<Switch
												checked={brandVoice}
												onCheckedChange={setBrandVoice}
												className="data-[state=checked]:bg-primary"
											/>
										</div>
									</div>

									{/* Custom Instructions */}
									<div className="space-y-3">
										<Label
											htmlFor="instructions"
											className="font-medium text-sm"
										>
											Custom Instructions (Optional)
										</Label>
										<Textarea
											id="instructions"
											value={customInstructions}
											onChange={(e) => setCustomInstructions(e.target.value)}
											placeholder="Add any specific requirements, style preferences, or additional context (e.g., 'Write in a sarcastic tone', 'Focus on actionable tips for small businesses')."
											className="min-h-[100px] border-border/50 focus-visible:ring-primary focus-visible:ring-offset-2"
										/>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</motion.div>

						<Separator className="bg-border/50" />

						{/* Generate Button */}
						<motion.div
							className="flex flex-col items-center gap-4 pt-4 sm:flex-row"
							variants={itemVariants}
						>
							<Button
								type="submit"
								disabled={isLoading}
								className="w-full flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 font-semibold text-base text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.02] hover:from-purple-700 hover:to-blue-600 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto"
								size="lg"
							>
								{isLoading ? "Generating Blog Post..." : "Generate Blog Post"}
							</Button>
							<Button
								type="button"
								variant="outline"
								size="lg"
								onClick={() => setIsModalOpen(true)}
								className="w-full rounded-lg border-border/50 px-6 py-3 text-base shadow-md transition-colors hover:bg-accent/50 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
							>
								<Key className="mr-2 h-5 w-5 text-muted-foreground" />
								API Key
							</Button>
						</motion.div>
					</motion.form>
				</CardContent>
			</Card>

			<ApiKeyModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onApiKeySave={handleApiKeySave}
			/>

			<AnimatePresence>
				{error && (
					<motion.div
						layout
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						<Card className="border-destructive/50 bg-destructive/10 shadow-md">
							<CardHeader className="border-destructive/50 border-b">
								<CardTitle className="flex items-center gap-2 text-destructive">
									<Info className="h-5 w-5" />
									Error
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<p className="text-destructive-foreground text-sm">{error}</p>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setError(null)}
									className="mt-4 border-destructive/50 text-destructive-foreground transition-colors hover:bg-destructive/20"
								>
									Dismiss
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{blogPost && (
					<motion.div
						layout
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						<BlogPostDisplay blogPost={blogPost} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

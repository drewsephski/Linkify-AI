"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogSection, EnhancedBlogPost } from "@/lib/gemini/schemas";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { Check, Save, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostDisplayProps {
	blogPost: EnhancedBlogPost;
}

export function BlogPostDisplay({ blogPost }: BlogPostDisplayProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const router = useRouter();

	const savePost = async () => {
		setIsSaving(true);
		try {
			// Convert blog post to markdown format
			let content = "";

			if (blogPost.introduction) {
				content += `${blogPost.introduction}\n\n`;
			}

			if (blogPost.sections && Array.isArray(blogPost.sections)) {
				blogPost.sections.forEach((section: BlogSection) => {
					if (section.heading) {
						content += `## ${section.heading}\n\n`;
					}
					if (section.content) {
						content += `${section.content}\n\n`;
					}
				});
			}

			if (blogPost.conclusion) {
				content += `## Conclusion\n\n${blogPost.conclusion}`;
			}

			const response = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: blogPost.title || "Generated Blog Post",
					content: content.trim(),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save post");
			}

			setIsSaved(true);
			setTimeout(() => {
				router.push("/posts");
			}, 1500);
		} catch (error) {
			console.error("Error saving post:", error);
		} finally {
			setIsSaving(false);
		}
	};

	// Defensive checks to ensure we have a valid blog post
	if (!blogPost || typeof blogPost !== "object") {
		return (
			<Card
				className={cn(
					"border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm",
					"shadow-lg transition-all duration-300 hover:shadow-xl",
				)}
			>
				<CardContent className="p-6">
					<p className="text-foreground/70">
						Invalid blog post data received. Please try generating again.
					</p>
				</CardContent>
			</Card>
		);
	}

	const renderSections = () => {
		try {
			if (!Array.isArray(blogPost.sections)) {
				return (
					<div className="rounded-lg border border-border/20 bg-muted/20 p-4 backdrop-blur-sm">
						<p className="text-center text-foreground/70">
							No sections available for this blog post.
						</p>
					</div>
				);
			}

			if (blogPost.sections.length === 0) {
				return (
					<div className="rounded-lg border border-border/20 bg-muted/20 p-4 backdrop-blur-sm">
						<p className="text-center text-foreground/70">
							This blog post has no content sections.
						</p>
					</div>
				);
			}

			return blogPost.sections.map((section: BlogSection, index: number) => {
				// Ensure section is valid
				if (!section || typeof section !== "object") {
					return (
						<div
							key={index}
							className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 backdrop-blur-sm"
						>
							<h3 className="mb-2 font-semibold text-destructive text-lg">
								Section {index + 1}
							</h3>
							<p className="text-destructive/70 text-sm leading-relaxed">
								Invalid section data.
							</p>
						</div>
					);
				}

				return (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index, duration: 0.4 }}
						className={cn(
							"group relative rounded-lg p-4",
							"border border-border/10 hover:border-primary/20",
							"bg-background/30 hover:bg-background/50",
							"backdrop-blur-sm",
							"transition-all duration-300 ease-out",
							"hover:shadow-lg hover:shadow-primary/5",
						)}
					>
						<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						<div className="relative">
							<h3
								className={cn(
									"mb-3 font-semibold text-lg leading-tight",
									"text-foreground group-hover:text-primary/90",
									"transition-colors duration-300",
								)}
							>
								{section.heading || `Section ${index + 1}`}
							</h3>
							<div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={{
										p: ({ children }) => (
											<p className="mb-2 last:mb-0">{children}</p>
										),
										strong: ({ children }) => (
											<strong className="font-semibold text-foreground">
												{children}
											</strong>
										),
										em: ({ children }) => (
											<em className="italic">{children}</em>
										),
										ul: ({ children }) => (
											<ul className="ml-2 list-inside list-disc space-y-1">
												{children}
											</ul>
										),
										ol: ({ children }) => (
											<ol className="ml-2 list-inside list-decimal space-y-1">
												{children}
											</ol>
										),
										li: ({ children }) => (
											<li className="text-sm">{children}</li>
										),
									}}
								>
									{section.content || "No content available for this section."}
								</ReactMarkdown>
							</div>
						</div>
					</motion.div>
				);
			});
		} catch (error) {
			console.error("Error rendering blog sections:", error);
			return (
				<div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 backdrop-blur-sm">
					<p className="text-center text-destructive">
						Error displaying blog sections. Please try generating again.
					</p>
				</div>
			);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="relative"
		>
			{/* Glassmorphic Background with Gradient */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 blur-3xl" />

			<Card
				className={cn(
					"relative overflow-hidden",
					"border border-border/20 hover:border-primary/30",
					"bg-background/60 backdrop-blur-sm hover:bg-background/70",
					"shadow-xl hover:shadow-2xl hover:shadow-primary/10",
					"transition-all duration-500 ease-out",
					"[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				)}
			>
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)]" />
				</div>

				<CardHeader className="relative">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<div className="mb-3 flex items-center gap-2">
								<motion.div
									initial={{ rotate: 0 }}
									animate={{ rotate: 360 }}
									transition={{ duration: 2, ease: "easeInOut" }}
									className="rounded-lg bg-primary/10 p-2 backdrop-blur-sm"
								>
									<Sparkles className="h-4 w-4 text-primary" />
								</motion.div>
								<Badge
									variant="secondary"
									className="border-primary/20 bg-primary/10 text-primary"
								>
									AI Generated
								</Badge>
							</div>
							<CardTitle
								className={cn(
									"font-bold text-2xl leading-tight",
									"bg-gradient-to-r from-foreground via-foreground to-primary/80",
									"bg-clip-text text-transparent",
								)}
							>
								{blogPost.title || "Generated Blog Post"}
							</CardTitle>
						</div>
						<div className="flex items-center gap-2">
							<Button
								onClick={savePost}
								disabled={isSaving || isSaved}
								size="sm"
								className={cn(
									"transition-all duration-300",
									isSaved && "bg-green-600 hover:bg-green-700",
								)}
							>
								{isSaving ? (
									<>
										<div className="mr-2 h-3 w-3 animate-spin rounded-full border-white border-b-2" />
										Saving...
									</>
								) : isSaved ? (
									<>
										<Check className="mr-2 h-3 w-3" />
										Saved!
									</>
								) : (
									<>
										<Save className="mr-2 h-3 w-3" />
										Save Post
									</>
								)}
							</Button>
						</div>
					</div>
				</CardHeader>

				<CardContent className="relative">
					<div className="prose dark:prose-invert max-w-none">
						{blogPost.introduction && (
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className={cn(
									"mb-6 rounded-lg p-4",
									"bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5",
									"border border-primary/20",
									"backdrop-blur-sm",
								)}
							>
								<div className="prose prose-sm dark:prose-invert max-w-none font-medium text-foreground/90 italic leading-relaxed">
									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											p: ({ children }) => (
												<p className="mb-2 italic last:mb-0">{children}</p>
											),
											strong: ({ children }) => (
												<strong className="font-semibold text-foreground">
													{children}
												</strong>
											),
											em: ({ children }) => (
												<em className="italic">{children}</em>
											),
										}}
									>
										{blogPost.introduction}
									</ReactMarkdown>
								</div>
							</motion.div>
						)}

						<div className="space-y-6">{renderSections()}</div>

						{blogPost.conclusion && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className={cn(
									"mt-8 pt-6",
									"border-border/30 border-t",
									"relative",
								)}
							>
								<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
								<div
									className={cn(
										"rounded-lg p-4",
										"bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5",
										"border border-primary/20",
										"backdrop-blur-sm",
									)}
								>
									<div className="prose prose-sm dark:prose-invert max-w-none font-medium text-foreground/90 italic leading-relaxed">
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												p: ({ children }) => (
													<p className="mb-2 italic last:mb-0">{children}</p>
												),
												strong: ({ children }) => (
													<strong className="font-semibold text-foreground">
														{children}
													</strong>
												),
												em: ({ children }) => (
													<em className="italic">{children}</em>
												),
											}}
										>
											{blogPost.conclusion}
										</ReactMarkdown>
									</div>
								</div>
							</motion.div>
						)}
					</div>
				</CardContent>

				{/* Bottom Glow Effect */}
				<div className="-translate-x-1/2 absolute bottom-0 left-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
			</Card>
		</motion.div>
	);
}

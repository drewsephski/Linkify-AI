"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/db/schema";
import { cn } from "@/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Edit, Eye, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function PostsPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch("/api/posts");
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data = await response.json();
			setPosts(data.posts || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="space-y-6">
					<div className="animate-pulse">
						<div className="mb-4 h-8 w-48 rounded bg-muted"></div>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[...Array(6)].map((_, i) => (
								<div key={i} className="h-64 rounded-lg bg-muted"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card className="border-destructive/20 bg-destructive/5">
					<CardContent className="p-6">
						<p className="text-destructive">Error: {error}</p>
						<Button onClick={fetchPosts} className="mt-4">
							Try Again
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-8"
			>
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-3xl tracking-tight">Your Posts</h1>
						<p className="mt-2 text-muted-foreground">
							Manage your AI-generated blog posts
						</p>
					</div>
					<Badge variant="secondary" className="bg-primary/10 text-primary">
						{posts.length} {posts.length === 1 ? "Post" : "Posts"}
					</Badge>
				</div>

				{posts.length === 0 ? (
					<Card
						className={cn(
							"border border-border/20 bg-background/60 backdrop-blur-sm",
							"shadow-lg transition-all duration-300 hover:shadow-xl",
						)}
					>
						<CardContent className="p-12 text-center">
							<FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
							<h3 className="mb-2 font-semibold text-lg">No posts yet</h3>
							<p className="mb-6 text-muted-foreground">
								Generate your first AI blog post to get started
							</p>
							<Button asChild>
								<a href="/dashboard">Generate Blog Post</a>
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{posts.map((post, index) => (
							<motion.div
								key={post.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
							>
								<Card
									className={cn(
										"group relative overflow-hidden",
										"border border-border/20 hover:border-primary/30",
										"bg-background/60 backdrop-blur-sm hover:bg-background/70",
										"shadow-lg hover:shadow-primary/10 hover:shadow-xl",
										"transition-all duration-300 ease-out",
										"cursor-pointer",
									)}
								>
									<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

									<CardHeader className="relative">
										<div className="flex items-start justify-between gap-2">
											<CardTitle className="line-clamp-2 font-semibold text-lg leading-tight transition-colors group-hover:text-primary/90">
												{post.title}
											</CardTitle>
											<Badge variant="outline" className="shrink-0">
												<FileText className="mr-1 h-3 w-3" />
												Blog
											</Badge>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground text-sm">
											<Calendar className="h-3 w-3" />
											{format(new Date(post.createdAt), "MMM d, yyyy")}
										</div>
									</CardHeader>

									<CardContent className="relative">
										<p className="mb-4 line-clamp-3 text-muted-foreground text-sm">
											{post.content?.substring(0, 150)}...
										</p>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Button variant="ghost" size="sm" className="h-8 px-2">
													<Eye className="mr-1 h-3 w-3" />
													View
												</Button>
												<Button variant="ghost" size="sm" className="h-8 px-2">
													<Edit className="mr-1 h-3 w-3" />
													Edit
												</Button>
											</div>
											<Button
												variant="ghost"
												size="sm"
												className="h-8 px-2 text-destructive hover:text-destructive"
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				)}
			</motion.div>
		</div>
	);
}

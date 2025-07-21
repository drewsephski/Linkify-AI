"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ExternalLink, FileText } from "lucide-react";

interface Post {
	id: string;
	title: string;
	createdAt: Date;
	status: "draft" | "published";
}

interface RecentPostsProps {
	posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
	if (posts.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Recent Blog Posts
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="py-8 text-center text-muted-foreground">
						<FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
						<p>No blog posts yet</p>
						<p className="text-sm">Generate your first blog post above!</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<FileText className="h-5 w-5" />
					Recent Blog Posts
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{posts.slice(0, 5).map((post) => (
						<div
							key={post.id}
							className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
						>
							<div className="min-w-0 flex-1">
								<h4 className="truncate font-medium">{post.title}</h4>
								<div className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
									<Calendar className="h-3 w-3" />
									{formatDistanceToNow(post.createdAt, { addSuffix: true })}
								</div>
							</div>
							<div className="ml-4 flex items-center gap-2">
								<Badge
									variant={
										post.status === "published" ? "default" : "secondary"
									}
									className="text-xs"
								>
									{post.status}
								</Badge>
								<Button size="sm" variant="ghost">
									<ExternalLink className="h-3 w-3" />
								</Button>
							</div>
						</div>
					))}

					{posts.length > 5 && (
						<Button variant="outline" className="w-full">
							View All Posts ({posts.length})
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

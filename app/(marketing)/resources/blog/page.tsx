import Blogs from "@/components/blog/blogs";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	Lightbulb,
	Search,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";

const BlogPage = () => {
	const categories = [
		{
			name: "AI & Content Creation",
			count: 12,
			icon: <Zap className="h-4 w-4" />,
		},
		{
			name: "SEO & Marketing",
			count: 8,
			icon: <TrendingUp className="h-4 w-4" />,
		},
		{
			name: "Tutorials & Guides",
			count: 15,
			icon: <BookOpen className="h-4 w-4" />,
		},
		{
			name: "Tips & Best Practices",
			count: 10,
			icon: <Lightbulb className="h-4 w-4" />,
		},
		{ name: "Case Studies", count: 6, icon: <Users className="h-4 w-4" /> },
	];

	const featuredTopics = [
		"AI Content Generation",
		"SEO Optimization",
		"Content Strategy",
		"Analytics & Insights",
		"Team Collaboration",
		"QR Code Marketing",
	];

	return (
		<MaxWidthWrapper className="pb-20">
			<AnimationContainer delay={0.1} className="w-full">
				<div className="flex flex-col items-center justify-center py-20">
					<Badge variant="outline" className="mb-4">
						Resources & Insights
					</Badge>
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						The Linkify Blog
					</h1>
					<p className="mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
						Discover the latest insights, tutorials, and best practices for
						AI-powered content creation. Learn how to maximize your content
						strategy with expert tips and real-world case studies.
					</p>

					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
						<div className="relative">
							<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
							<input
								type="text"
								placeholder="Search articles..."
								className="w-64 rounded-md border border-border bg-background py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/20"
							/>
						</div>
						<Button variant="outline" asChild>
							<Link href="/newsletter">Subscribe to Newsletter</Link>
						</Button>
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.15} className="w-full">
				<div className="mb-12">
					<h2 className="mb-6 font-heading font-semibold text-2xl">
						Browse by Category
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{categories.map((category, index) => (
							<Link
								key={index}
								href={`/blog/category/${category.name
									.toLowerCase()
									.replace(/\s+/g, "-")}`}
								className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
							>
								<div className="flex items-center gap-3">
									<div className="rounded-lg bg-primary/10 p-2 text-primary">
										{category.icon}
									</div>
									<span className="font-medium">{category.name}</span>
								</div>
								<Badge variant="secondary">{category.count}</Badge>
							</Link>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2} className="w-full">
				<div className="mb-12">
					<h2 className="mb-6 font-heading font-semibold text-2xl">
						Popular Topics
					</h2>
					<div className="flex flex-wrap gap-2">
						{featuredTopics.map((topic, index) => (
							<Link
								key={index}
								href={`/blog/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}
								className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground text-sm transition-colors hover:bg-secondary/80"
							>
								{topic}
							</Link>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.25} className="w-full">
				<Blogs />
			</AnimationContainer>

			<AnimationContainer delay={0.3} className="w-full">
				<div className="mt-16 rounded-lg border bg-card p-8 text-center">
					<h3 className="mb-4 font-heading font-semibold text-2xl">
						Stay Updated
					</h3>
					<p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
						Get the latest articles, tutorials, and insights delivered straight
						to your inbox. Join thousands of content creators who rely on our
						weekly newsletter.
					</p>
					<div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 rounded-md border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
						/>
						<Button>Subscribe</Button>
					</div>
					<p className="mt-3 text-muted-foreground text-xs">
						No spam, unsubscribe at any time.
					</p>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default BlogPage;

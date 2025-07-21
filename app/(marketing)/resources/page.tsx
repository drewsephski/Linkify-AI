import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import DotCard from "@/components/mvpblocks/dot-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	Calendar,
	ExternalLink,
	FileText,
	Lightbulb,
	MessageCircle,
	Star,
	TrendingUp,
	Users,
	Video,
	Zap,
} from "lucide-react";
import Link from "next/link";

const ResourcesPage = () => {
	const resourceCategories = [
		{
			title: "Learning Center",
			description:
				"Comprehensive guides and tutorials to master AI content creation",
			icon: <BookOpen className="h-8 w-8 text-blue-500" />,
			resources: [
				{
					title: "Getting Started Guide",
					type: "Guide",
					link: "/resources/getting-started",
				},
				{
					title: "AI Content Best Practices",
					type: "Tutorial",
					link: "/resources/ai-best-practices",
				},
				{
					title: "SEO Optimization Masterclass",
					type: "Course",
					link: "/resources/seo-masterclass",
				},
				{
					title: "Content Strategy Playbook",
					type: "Ebook",
					link: "/resources/strategy-playbook",
				},
			],
		},
		{
			title: "Video Tutorials",
			description: "Step-by-step video guides for all Linkify features",
			icon: <Video className="h-8 w-8 text-green-500" />,
			resources: [
				{
					title: "Platform Overview (5 min)",
					type: "Video",
					link: "/resources/platform-overview",
				},
				{
					title: "Advanced AI Prompting",
					type: "Video",
					link: "/resources/ai-prompting",
				},
				{
					title: "Team Collaboration Setup",
					type: "Video",
					link: "/resources/team-setup",
				},
				{
					title: "Analytics Deep Dive",
					type: "Video",
					link: "/resources/analytics-guide",
				},
			],
		},
		{
			title: "Templates & Tools",
			description:
				"Ready-to-use templates and tools to accelerate your content creation",
			icon: <FileText className="h-8 w-8 text-blue-500" />,
			resources: [
				{
					title: "Blog Post Templates",
					type: "Template",
					link: "/resources/blog-templates",
				},
				{
					title: "Content Calendar Template",
					type: "Template",
					link: "/resources/content-calendar",
				},
				{
					title: "SEO Checklist",
					type: "Checklist",
					link: "/resources/seo-checklist",
				},
				{
					title: "Brand Voice Guide",
					type: "Template",
					link: "/resources/brand-voice",
				},
			],
		},
		{
			title: "Community & Events",
			description: "Connect with other creators and join our events",
			icon: <Users className="h-8 w-8 text-orange-500" />,
			resources: [
				{ title: "Community Forum", type: "Community", link: "/community" },
				{ title: "Monthly Webinars", type: "Event", link: "/events/webinars" },
				{ title: "User Showcase", type: "Gallery", link: "/showcase" },
				{
					title: "Expert Interviews",
					type: "Podcast",
					link: "/resources/interviews",
				},
			],
		},
	];

	const featuredResources = [
		{
			title: "The Complete Guide to AI Content Creation",
			description:
				"Everything you need to know about creating high-quality content with AI",
			type: "Comprehensive Guide",
			readTime: "15 min read",
			featured: true,
			link: "/resources/ai-content-guide",
		},
		{
			title: "2025 Content Marketing Trends",
			description:
				"Stay ahead with the latest trends in AI-powered content marketing",
			type: "Industry Report",
			readTime: "8 min read",
			featured: true,
			link: "/resources/2025-trends",
		},
		{
			title: "ROI Calculator for Content Marketing",
			description:
				"Calculate the return on investment for your content marketing efforts",
			type: "Interactive Tool",
			readTime: "5 min use",
			featured: true,
			link: "/tools/roi-calculator",
		},
	];

	const quickLinks = [
		{
			title: "API Documentation",
			icon: <FileText className="h-4 w-4" />,
			link: "/docs/api",
		},
		{
			title: "Feature Requests",
			icon: <Lightbulb className="h-4 w-4" />,
			link: "/feedback",
		},
		{
			title: "Status Page",
			icon: <TrendingUp className="h-4 w-4" />,
			link: "/status",
		},
		{
			title: "Changelog",
			icon: <Calendar className="h-4 w-4" />,
			link: "/changelog",
		},
		{
			title: "Help Center",
			icon: <MessageCircle className="h-4 w-4" />,
			link: "/help",
		},
		{
			title: "Contact Support",
			icon: <ExternalLink className="h-4 w-4" />,
			link: "/contact",
		},
	];

	return (
		<MaxWidthWrapper className="pb-20">
			<AnimationContainer delay={0.1} className="w-full">
				<div className="flex flex-col items-center justify-center py-20">
					<Badge variant="outline" className="mb-4">
						Resources & Learning
					</Badge>
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						Everything You Need to Succeed
					</h1>
					<p className="mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-lg">
						Discover comprehensive resources, tutorials, and tools to master
						AI-powered content creation. From beginner guides to advanced
						strategies, we've got you covered.
					</p>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2} className="w-full">
				<div className="mb-16">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Featured Resources
					</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{featuredResources.map((resource, index) => (
							<Link
								key={index}
								href={resource.link}
								className="group rounded-lg border bg-card p-6 transition-all duration-200 hover:shadow-lg"
							>
								<div className="mb-3 flex items-center gap-2">
									<Badge variant="secondary" className="text-xs">
										{resource.type}
									</Badge>
									{resource.featured && (
										<Star className="h-4 w-4 fill-current text-yellow-500" />
									)}
								</div>
								<h3 className="mb-2 font-semibold text-lg transition-colors group-hover:text-primary">
									{resource.title}
								</h3>
								<p className="mb-4 text-muted-foreground">
									{resource.description}
								</p>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground text-sm">
										{resource.readTime}
									</span>
									<ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
								</div>
							</Link>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.3} className="w-full">
				<div className="mb-16">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Resource Categories
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{resourceCategories.map((category, index) => (
							<DotCard key={index}>
								<div className="p-6">
									<div className="mb-4 flex items-center gap-4">
										{category.icon}
										<div>
											<h3 className="font-semibold text-xl">
												{category.title}
											</h3>
											<p className="text-muted-foreground">
												{category.description}
											</p>
										</div>
									</div>
									<div className="space-y-3">
										{category.resources.map((resource, resourceIndex) => (
											<Link
												key={resourceIndex}
												href={resource.link}
												className="flex items-center justify-between rounded-lg bg-background p-3 transition-colors hover:bg-accent"
											>
												<div>
													<span className="font-medium">{resource.title}</span>
													<Badge variant="outline" className="ml-2 text-xs">
														{resource.type}
													</Badge>
												</div>
												<ExternalLink className="h-4 w-4 text-muted-foreground" />
											</Link>
										))}
									</div>
								</div>
							</DotCard>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.4} className="w-full">
				<div className="mb-16">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Quick Links
					</h2>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
						{quickLinks.map((link, index) => (
							<DotCard key={index}>
								<Link
									href={link.link}
									className="block p-4 text-center transition-colors hover:bg-accent"
								>
									<div className="flex flex-col items-center gap-2">
										<div className="rounded-lg bg-primary/10 p-2 text-primary">
											{link.icon}
										</div>
										<span className="font-medium text-sm">{link.title}</span>
									</div>
								</Link>
							</DotCard>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.5} className="w-full">
				<div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-8 text-center">
					<div className="mx-auto max-w-2xl">
						<Zap className="mx-auto mb-4 h-12 w-12 text-primary" />
						<h3 className="mb-4 font-heading font-semibold text-2xl">
							Can't Find What You're Looking For?
						</h3>
						<p className="mb-6 text-muted-foreground">
							Our team is here to help you succeed. Reach out for personalized
							guidance, custom training, or specific resource requests.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button asChild>
								<Link href="/contact">Contact Support</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/feedback">Request Resource</Link>
							</Button>
						</div>
					</div>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default ResourcesPage;

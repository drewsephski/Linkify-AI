import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	CreditCard,
	ExternalLink,
	FileText,
	HelpCircle,
	Mail,
	MessageCircle,
	Phone,
	Search,
	Settings,
	Shield,
	Users,
	Video,
	Zap,
} from "lucide-react";
import Link from "next/link";

const HelpPage = () => {
	const helpCategories = [
		{
			title: "Getting Started",
			description: "Learn the basics of using Linkify for content creation",
			icon: <Zap className="h-6 w-6" />,
			articles: [
				"Creating your first AI-generated blog post",
				"Setting up your account and workspace",
				"Understanding the dashboard",
				"Basic content generation workflow",
			],
		},
		{
			title: "Content Creation",
			description: "Master AI-powered content generation and optimization",
			icon: <BookOpen className="h-6 w-6" />,
			articles: [
				"Advanced AI prompting techniques",
				"Customizing content tone and style",
				"Using templates and presets",
				"Content editing and refinement",
			],
		},
		{
			title: "Analytics & SEO",
			description: "Track performance and optimize for search engines",
			icon: <Settings className="h-6 w-6" />,
			articles: [
				"Understanding your analytics dashboard",
				"SEO optimization best practices",
				"Tracking content performance",
				"Setting up conversion goals",
			],
		},
		{
			title: "Team & Collaboration",
			description: "Work with your team and manage permissions",
			icon: <Users className="h-6 w-6" />,
			articles: [
				"Inviting team members",
				"Setting user roles and permissions",
				"Sharing and collaborating on content",
				"Team workflow best practices",
			],
		},
		{
			title: "Security & Privacy",
			description: "Keep your content and data secure",
			icon: <Shield className="h-6 w-6" />,
			articles: [
				"Password protection setup",
				"Data privacy and GDPR compliance",
				"Two-factor authentication",
				"Content backup and recovery",
			],
		},
		{
			title: "Billing & Plans",
			description: "Manage your subscription and billing",
			icon: <CreditCard className="h-6 w-6" />,
			articles: [
				"Understanding pricing plans",
				"Upgrading or downgrading your plan",
				"Managing billing information",
				"Cancellation and refund policy",
			],
		},
	];

	const quickActions = [
		{
			title: "Video Tutorials",
			description: "Watch step-by-step guides",
			icon: <Video className="h-5 w-5" />,
			link: "/tutorials",
		},
		{
			title: "API Documentation",
			description: "Integrate with our API",
			icon: <FileText className="h-5 w-5" />,
			link: "/docs/api",
		},
		{
			title: "Community Forum",
			description: "Connect with other users",
			icon: <MessageCircle className="h-5 w-5" />,
			link: "/community",
		},
		{
			title: "Feature Requests",
			description: "Suggest new features",
			icon: <HelpCircle className="h-5 w-5" />,
			link: "/feedback",
		},
	];

	const contactOptions = [
		{
			title: "Live Chat",
			description: "Get instant help from our support team",
			icon: <MessageCircle className="h-6 w-6 text-green-500" />,
			action: "Start Chat",
			available: "Available 24/7",
		},
		{
			title: "Email Support",
			description: "Send us a detailed message",
			icon: <Mail className="h-6 w-6 text-blue-500" />,
			action: "Send Email",
			available: "Response within 2 hours",
		},
		{
			title: "Phone Support",
			description: "Speak directly with our team",
			icon: <Phone className="h-6 w-6 text-blue-500" />,
			action: "Call Now",
			available: "Mon-Fri, 9AM-6PM EST",
		},
	];

	return (
		<MaxWidthWrapper className="pb-20">
			<AnimationContainer delay={0.1} className="w-full">
				<div className="flex flex-col items-center justify-center py-20">
					<Badge variant="outline" className="mb-4">
						Help & Support
					</Badge>
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						How can we help you?
					</h1>
					<p className="mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
						Find answers to your questions, learn how to use Linkify
						effectively, or get in touch with our support team for personalized
						assistance.
					</p>

					<div className="relative mt-8 w-full max-w-md">
						<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-muted-foreground" />
						<input
							type="text"
							placeholder="Search help articles..."
							className="w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
						/>
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2} className="w-full">
				<div className="mb-16">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Browse Help Topics
					</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{helpCategories.map((category, index) => (
							<div
								key={index}
								className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
							>
								<div className="mb-4 flex items-center gap-3">
									<div className="rounded-lg bg-primary/10 p-2 text-primary">
										{category.icon}
									</div>
									<h3 className="font-semibold text-lg">{category.title}</h3>
								</div>
								<p className="mb-4 text-muted-foreground">
									{category.description}
								</p>
								<ul className="space-y-2">
									{category.articles.map((article, articleIndex) => (
										<li key={articleIndex}>
											<Link
												href={`/help/article/${article
													.toLowerCase()
													.replace(/\s+/g, "-")}`}
												className="flex items-center gap-1 text-primary text-sm hover:underline"
											>
												{article}
												<ExternalLink className="h-3 w-3" />
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.3} className="w-full">
				<div className="mb-16">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Quick Actions
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						{quickActions.map((action, index) => (
							<Link
								key={index}
								href={action.link}
								className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
							>
								<div className="rounded-lg bg-primary/10 p-2 text-primary">
									{action.icon}
								</div>
								<div>
									<h3 className="font-medium">{action.title}</h3>
									<p className="text-muted-foreground text-sm">
										{action.description}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.4} className="w-full">
				<div className="rounded-lg border bg-card p-8">
					<h2 className="mb-8 text-center font-heading font-semibold text-2xl">
						Still need help?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
						Can't find what you're looking for? Our support team is here to help
						you succeed with Linkify.
					</p>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{contactOptions.map((option, index) => (
							<div
								key={index}
								className="rounded-lg border bg-background p-6 text-center"
							>
								<div className="mb-4 flex justify-center">{option.icon}</div>
								<h3 className="mb-2 font-semibold text-lg">{option.title}</h3>
								<p className="mb-4 text-muted-foreground">
									{option.description}
								</p>
								<p className="mb-4 text-muted-foreground text-sm">
									{option.available}
								</p>
								<Button variant="outline" className="w-full">
									{option.action}
								</Button>
							</div>
						))}
					</div>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default HelpPage;

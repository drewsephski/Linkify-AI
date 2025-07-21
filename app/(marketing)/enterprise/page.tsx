import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import DotCard from "@/components/mvpblocks/dot-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	BarChart3,
	Building2,
	CheckCircle,
	Clock,
	Database,
	Globe,
	HeadphonesIcon,
	Lock,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";

const EnterprisePage = () => {
	const features = [
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Enterprise Security",
			description:
				"SOC 2 compliance, SSO integration, and advanced encryption for maximum data protection.",
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: "Team Management",
			description:
				"Advanced user roles, permissions, and team collaboration tools for large organizations.",
		},
		{
			icon: <Database className="h-6 w-6" />,
			title: "Custom Integrations",
			description:
				"API access, webhooks, and custom integrations with your existing workflow tools.",
		},
		{
			icon: <BarChart3 className="h-6 w-6" />,
			title: "Advanced Analytics",
			description:
				"Comprehensive reporting, custom dashboards, and data export capabilities.",
		},
		{
			icon: <HeadphonesIcon className="h-6 w-6" />,
			title: "Priority Support",
			description:
				"Dedicated account manager, 24/7 support, and custom training sessions.",
		},
		{
			icon: <Globe className="h-6 w-6" />,
			title: "Global Deployment",
			description:
				"Multi-region hosting, CDN optimization, and compliance with international regulations.",
		},
	];

	const benefits = [
		"Unlimited content generation and storage",
		"Custom AI model training on your data",
		"White-label solutions available",
		"99.9% uptime SLA guarantee",
		"Advanced security and compliance",
		"Dedicated infrastructure options",
		"Custom feature development",
		"Priority feature requests",
	];

	const useCases = [
		{
			title: "Media & Publishing",
			description:
				"Scale content production across multiple publications with AI-powered generation and brand consistency.",
			icon: <Building2 className="h-8 w-8 text-blue-500" />,
		},
		{
			title: "Marketing Agencies",
			description:
				"Manage multiple client accounts with team collaboration, white-label options, and custom branding.",
			icon: <Zap className="h-8 w-8 text-green-500" />,
		},
		{
			title: "E-commerce Platforms",
			description:
				"Generate product descriptions, marketing content, and SEO-optimized pages at scale.",
			icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
		},
	];

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="flex flex-col items-center justify-center py-20">
					<Badge variant="outline" className="mb-4">
						Enterprise Solutions
					</Badge>
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						Scale Content Creation Across Your Organization
					</h1>
					<p className="mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-lg">
						Empower your entire organization with enterprise-grade AI content
						generation. From small teams to global enterprises, we provide the
						tools, security, and support you need to succeed.
					</p>
					<div className="mt-8 flex items-center justify-center gap-x-4">
						<Button size="lg" asChild>
							<Link href="/contact">Schedule Demo</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/pricing">View Pricing</Link>
						</Button>
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2}>
				<div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<DotCard key={index}>
							<div className="p-6">
								<div className="mb-4 flex items-center gap-3">
									<div className="rounded-lg bg-primary/10 p-2 text-primary">
										{feature.icon}
									</div>
									<h3 className="font-semibold text-lg">{feature.title}</h3>
								</div>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						</DotCard>
					))}
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.3}>
				<div className="py-16">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-heading font-semibold text-3xl md:text-4xl">
							Enterprise Use Cases
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							See how leading organizations use Linkify to transform their
							content operations
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{useCases.map((useCase, index) => (
							<div key={index} className="text-center">
								<div className="mb-4 flex justify-center">{useCase.icon}</div>
								<h3 className="mb-3 font-semibold text-xl">{useCase.title}</h3>
								<p className="text-muted-foreground">{useCase.description}</p>
							</div>
						))}
					</div>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.4}>
				<div className="py-16">
					<div className="rounded-lg border bg-card p-8 md:p-12">
						<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
							<div>
								<h2 className="mb-6 font-heading font-semibold text-3xl md:text-4xl">
									Everything You Need for Enterprise Success
								</h2>
								<p className="mb-8 text-lg text-muted-foreground">
									Our enterprise plan includes all the features and support your
									organization needs to scale content creation efficiently and
									securely.
								</p>
								<div className="space-y-3">
									{benefits.map((benefit, index) => (
										<div key={index} className="flex items-center gap-3">
											<CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
											<span>{benefit}</span>
										</div>
									))}
								</div>
							</div>
							<div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-8">
								<div className="text-center">
									<h3 className="mb-4 font-semibold text-2xl">
										Ready to Get Started?
									</h3>
									<p className="mb-6 text-muted-foreground">
										Schedule a personalized demo to see how Linkify can
										transform your content operations.
									</p>
									<div className="space-y-4">
										<Button size="lg" className="w-full" asChild>
											<Link
												href="/contact"
												className="flex items-center justify-center gap-2"
											>
												Schedule Demo
												<ArrowRight className="h-4 w-4" />
											</Link>
										</Button>
										<div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												<span>30-min demo</span>
											</div>
											<div className="flex items-center gap-1">
												<Lock className="h-4 w-4" />
												<span>No commitment</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default EnterprisePage;

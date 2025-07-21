import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Bug, Calendar, Plus, Zap } from "lucide-react";

const ChangeLogPage = () => {
	const updates = [
		{
			version: "2.4.0",
			date: "January 15, 2025",
			type: "major",
			items: [
				{
					type: "feature",
					title: "AI-Powered Content Suggestions",
					description:
						"Get intelligent recommendations for improving your content based on performance data and trending topics.",
				},
				{
					type: "feature",
					title: "Advanced Analytics Dashboard",
					description:
						"New comprehensive analytics with real-time insights, audience demographics, and performance predictions.",
				},
				{
					type: "improvement",
					title: "Enhanced QR Code Customization",
					description:
						"More branding options including custom logos, colors, and frame styles for QR codes.",
				},
			],
		},
		{
			version: "2.3.2",
			date: "December 28, 2024",
			type: "minor",
			items: [
				{
					type: "fix",
					title: "Password Protection Stability",
					description:
						"Fixed issues with password-protected content not loading correctly on mobile devices.",
				},
				{
					type: "improvement",
					title: "Faster Content Generation",
					description:
						"Improved AI processing speed by 40% for faster blog post generation.",
				},
			],
		},
		{
			version: "2.3.0",
			date: "December 10, 2024",
			type: "major",
			items: [
				{
					type: "feature",
					title: "Multi-Language Content Support",
					description:
						"Generate content in 25+ languages with AI-powered translation and localization.",
				},
				{
					type: "feature",
					title: "Team Collaboration Tools",
					description:
						"Share workspaces, collaborate on content, and manage team permissions.",
				},
				{
					type: "improvement",
					title: "Enhanced SEO Optimization",
					description:
						"Improved SEO suggestions with keyword density analysis and meta tag optimization.",
				},
			],
		},
		{
			version: "2.2.1",
			date: "November 22, 2024",
			type: "patch",
			items: [
				{
					type: "fix",
					title: "Export Functionality",
					description:
						"Resolved issues with PDF and Word document exports not preserving formatting.",
				},
				{
					type: "fix",
					title: "Mobile Responsiveness",
					description:
						"Fixed layout issues on tablets and improved touch interactions.",
				},
			],
		},
	];

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "feature":
				return <Plus className="h-4 w-4 text-green-500" />;
			case "improvement":
				return <ArrowUp className="h-4 w-4 text-blue-500" />;
			case "fix":
				return <Bug className="h-4 w-4 text-orange-500" />;
			default:
				return <Zap className="h-4 w-4 text-blue-500" />;
		}
	};

	const getVersionBadge = (type: string) => {
		switch (type) {
			case "major":
				return (
					<Badge
						variant="default"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
					>
						Major
					</Badge>
				);
			case "minor":
				return (
					<Badge
						variant="secondary"
						className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
					>
						Minor
					</Badge>
				);
			case "patch":
				return (
					<Badge
						variant="outline"
						className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
					>
						Patch
					</Badge>
				);
			default:
				return <Badge variant="outline">Update</Badge>;
		}
	};

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="flex flex-col items-center justify-center py-20">
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						What's New in Linkify
					</h1>
					<p className="mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
						Stay up to date with the latest features, improvements, and fixes.
						We're constantly evolving to make your content creation experience
						better.
					</p>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2}>
				<div className="mx-auto max-w-4xl">
					{updates.map((update, index) => (
						<div key={update.version} className="mb-12 last:mb-0">
							<div className="mb-6 flex items-center gap-4">
								<div className="flex items-center gap-3">
									<h2 className="font-heading font-semibold text-2xl">
										v{update.version}
									</h2>
									{getVersionBadge(update.type)}
								</div>
								<div className="flex items-center gap-2 text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span className="text-sm">{update.date}</span>
								</div>
							</div>

							<div className="space-y-4">
								{update.items.map((item, itemIndex) => (
									<div
										key={itemIndex}
										className="flex gap-4 rounded-lg border bg-card p-4"
									>
										<div className="mt-1 flex-shrink-0">
											{getTypeIcon(item.type)}
										</div>
										<div className="flex-1">
											<h3 className="mb-2 font-semibold text-lg">
												{item.title}
											</h3>
											<p className="text-muted-foreground">
												{item.description}
											</p>
										</div>
									</div>
								))}
							</div>

							{index < updates.length - 1 && (
								<div className="mt-8 border-border border-b"></div>
							)}
						</div>
					))}
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.3}>
				<div className="mt-20 text-center">
					<div className="mx-auto max-w-2xl rounded-lg border bg-card p-8">
						<h3 className="mb-4 font-heading font-semibold text-xl">
							Want to suggest a feature?
						</h3>
						<p className="mb-6 text-muted-foreground">
							We love hearing from our users! If you have ideas for new features
							or improvements, we'd love to hear them.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<a
								href="mailto:feedback@linkify.com"
								className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
							>
								Send Feedback
							</a>
							<a
								href="/contact"
								className="inline-flex items-center justify-center rounded-md border border-border px-6 py-2 transition-colors hover:bg-accent"
							>
								Contact Support
							</a>
						</div>
					</div>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default ChangeLogPage;

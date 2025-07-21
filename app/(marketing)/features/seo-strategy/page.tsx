import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import CardFlip from "@/components/mvpblocks/card-flip";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { COMPANIES } from "@/utils";
import {
	ArrowRightIcon,
	BarChart3,
	FileText,
	Lightbulb,
	Search,
	Target,
	TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SEOStrategyPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<AnimationContainer delay={0.1} className="w-full">
					<div className="mx-auto flex max-w-xl flex-col items-center justify-center py-10">
						<MagicBadge title="AI-Optimized" />
						<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
							AI-Powered SEO Content Strategy
						</h1>
						<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
							Generate SEO-optimized content that ranks higher and drives more
							traffic. Our AI understands search intent and creates content that
							both users and search engines love.
						</p>
						<div className="mt-8 flex items-center justify-center gap-x-4">
							<Button size="sm" asChild>
								<Link href="/dashboard">Start Optimizing</Link>
							</Button>
							<Button size="sm" variant="outline" asChild>
								<Link href="/blog">SEO Guide</Link>
							</Button>
						</div>
					</div>
				</AnimationContainer>

				<AnimationContainer delay={0.15} className="w-full">
					<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
						<CardFlip
							title="Keyword Intelligence"
							subtitle="AI-powered research"
							description="AI-powered keyword research and content optimization for maximum search visibility"
							features={[
								"Smart Keyword Research",
								"Competition Analysis",
								"Search Volume Insights",
								"Ranking Opportunities",
							]}
							icon={<Search className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="Search Intent Matching"
							subtitle="Perfect content alignment"
							description="Create content that perfectly matches what users are searching for with intent analysis"
							features={[
								"Intent Analysis",
								"Content Matching",
								"User Journey Mapping",
								"Query Understanding",
							]}
							icon={<Target className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="Ranking Optimization"
							subtitle="Algorithm-aware SEO"
							description="Continuous optimization based on search engine algorithm updates and ranking factors"
							features={[
								"Algorithm Updates",
								"Ranking Factors",
								"Performance Monitoring",
								"Optimization Suggestions",
							]}
							icon={<TrendingUp className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2} className="w-full">
					<div className="mx-auto flex w-full max-w-4xl py-10">
						<Image
							src="/assets/shorten-links.svg"
							alt="AI-powered SEO content optimization and strategy dashboard"
							width={80}
							height={80}
							className="h-auto w-full"
						/>
					</div>
				</AnimationContainer>

				<AnimationContainer delay={0.25} className="w-full">
					<div className="mx-auto max-w-6xl py-16">
						<div className="mb-12 text-center">
							<h2 className="mb-4 font-heading font-semibold text-3xl md:text-4xl">
								Complete SEO Content Suite
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Everything you need to create, optimize, and track SEO-friendly
								content that drives organic traffic
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							<GradientCard>
								<div className="p-6">
									<div className="mb-4 flex items-center gap-3">
										<FileText className="h-6 w-6 text-primary" />
										<h3 className="font-semibold text-lg">
											Content Optimization
										</h3>
									</div>
									<p className="mb-4 text-muted-foreground">
										AI-powered content analysis and optimization suggestions
									</p>
									<ul className="space-y-1 text-muted-foreground text-sm">
										<li>• Keyword density optimization</li>
										<li>• Meta tag generation</li>
										<li>• Content structure analysis</li>
										<li>• Readability improvements</li>
									</ul>
								</div>
							</GradientCard>

							<GradientCard>
								<div className="p-6">
									<div className="mb-4 flex items-center gap-3">
										<BarChart3 className="h-6 w-6 text-primary" />
										<h3 className="font-semibold text-lg">
											Performance Tracking
										</h3>
									</div>
									<p className="mb-4 text-muted-foreground">
										Monitor your content's search engine performance
									</p>
									<ul className="space-y-1 text-muted-foreground text-sm">
										<li>• Search ranking positions</li>
										<li>• Organic traffic analytics</li>
										<li>• Click-through rate tracking</li>
										<li>• Competitor analysis</li>
									</ul>
								</div>
							</GradientCard>

							<GradientCard>
								<div className="p-6">
									<div className="mb-4 flex items-center gap-3">
										<Lightbulb className="h-6 w-6 text-primary" />
										<h3 className="font-semibold text-lg">Smart Suggestions</h3>
									</div>
									<p className="mb-4 text-muted-foreground">
										Get AI-powered recommendations for content improvement
									</p>
									<ul className="space-y-1 text-muted-foreground text-sm">
										<li>• Topic suggestions based on trends</li>
										<li>• Content gap analysis</li>
										<li>• Optimization opportunities</li>
										<li>• Seasonal content ideas</li>
									</ul>
								</div>
							</GradientCard>
						</div>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.3} className="w-full">
					<div className="py-14">
						<div className="mx-auto px-4 md:px-8">
							<h2 className="text-center font-heading font-medium text-neutral-400 text-sm uppercase">
								Trusted by the best in the industry
							</h2>
							<div className="mt-8">
								<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 py-8 md:gap-x-16">
									{COMPANIES.map((company) => (
										<li key={company.name}>
											<Image
												src={company.logo}
												alt={company.name}
												width={80}
												height={80}
												quality={100}
												className="h-auto w-28"
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>
			<MaxWidthWrapper className="pt-20">
				<AnimationContainer delay={0.4} className="w-full">
					<LampContainer className="mx-auto max-w-2xl">
						<div className="relative flex w-full flex-col items-center justify-center text-center">
							<h2 className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 bg-clip-text py-4 text-center font-heading font-semibold text-4xl text-transparent tracking-tight md:text-7xl">
								Powerup your content strategy
							</h2>
							<p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
								Take control of your blog posts with advanced features and
								real-time insights. Simplify your workflow and achieve more.
							</p>
							<div className="mt-6">
								<Button asChild>
									<Link href="/sign-in" className="flex items-center">
										Get started for free
										<ArrowRightIcon className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</LampContainer>
				</AnimationContainer>
			</MaxWidthWrapper>
		</>
	);
};

export default SEOStrategyPage;

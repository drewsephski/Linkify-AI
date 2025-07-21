import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import CardFlip from "@/components/mvpblocks/card-flip";
import DotCard from "@/components/mvpblocks/dot-card";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { COMPANIES } from "@/utils";
import {
	ArrowRightIcon,
	BarChart3,
	Clock,
	Globe,
	Target,
	TrendingUp,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AnalyticsPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<AnimationContainer delay={0.1} className="w-full">
					<div className="mx-auto flex max-w-xl flex-col items-center justify-center py-10">
						<MagicBadge title="AI-Powered" />
						<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
							Smart Analytics for Content Performance
						</h1>
						<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
							Unlock the power of AI-driven insights to understand your
							content's impact. Track engagement, optimize performance, and grow
							your audience with intelligent analytics that learn from your
							data.
						</p>
						<div className="mt-8 flex items-center justify-center gap-x-4">
							<Button size="sm" asChild>
								<Link href="/dashboard">Start Analyzing</Link>
							</Button>
							<Button size="sm" variant="outline" asChild>
								<Link href="/blog">View Demo</Link>
							</Button>
						</div>
					</div>
				</AnimationContainer>

				<AnimationContainer delay={0.15} className="w-full">
					<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
						<CardFlip
							title="Real-time Insights"
							subtitle="Live analytics dashboard"
							description="Monitor content performance as it happens with live analytics and real-time data visualization"
							features={[
								"Live Performance Tracking",
								"Real-time Notifications",
								"Instant Data Updates",
								"Dynamic Dashboards",
							]}
							icon={<BarChart3 className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="AI Predictions"
							subtitle="Smart forecasting"
							description="Get intelligent forecasts on content trends and engagement with machine learning algorithms"
							features={[
								"Trend Forecasting",
								"Engagement Prediction",
								"Performance Modeling",
								"Smart Recommendations",
							]}
							icon={<TrendingUp className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="Smart Optimization"
							subtitle="AI-powered suggestions"
							description="Receive AI-powered suggestions to improve content performance and maximize engagement"
							features={[
								"Content Optimization",
								"SEO Improvements",
								"Engagement Boosters",
								"Performance Enhancements",
							]}
							icon={<Target className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2} className="w-full">
					<div className="mx-auto flex w-full max-w-4xl py-10">
						<Image
							src="/assets/analytics.svg"
							alt="AI-powered analytics dashboard showing content performance metrics"
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
								Comprehensive Analytics Dashboard
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Get detailed insights into every aspect of your content
								performance with our AI-enhanced analytics suite
							</p>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							<DotCard variant="subtle">
								<div className="mb-3 flex items-center gap-3">
									<Users className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Audience Insights</h3>
								</div>
								<p className="text-muted-foreground text-sm">
									Track reader demographics, behavior patterns, and engagement
									preferences with detailed analytics
								</p>
							</DotCard>

							<DotCard variant="subtle">
								<div className="mb-3 flex items-center gap-3">
									<Globe className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Geographic Data</h3>
								</div>
								<p className="text-muted-foreground text-sm">
									Understand where your content resonates most with global reach
									analytics and regional insights
								</p>
							</DotCard>

							<DotCard variant="subtle">
								<div className="mb-3 flex items-center gap-3">
									<Clock className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Time Analysis</h3>
								</div>
								<p className="text-muted-foreground text-sm">
									Discover optimal posting times and content consumption
									patterns for maximum engagement
								</p>
							</DotCard>

							<DotCard variant="subtle">
								<div className="mb-3 flex items-center gap-3">
									<TrendingUp className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Performance Trends</h3>
								</div>
								<p className="text-muted-foreground text-sm">
									Monitor content performance over time with predictive
									analytics and trend forecasting
								</p>
							</DotCard>
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
								Take control of your content with advanced features and
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

export default AnalyticsPage;

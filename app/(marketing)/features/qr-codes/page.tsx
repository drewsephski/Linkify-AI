import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import CardFlip from "@/components/mvpblocks/card-flip";
import DotCard from "@/components/mvpblocks/dot-card";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { COMPANIES } from "@/utils";
import {
	ArrowRightIcon,
	Download,
	Palette,
	QrCode,
	Share2,
	Smartphone,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QRCodesPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<AnimationContainer delay={0.1} className="w-full">
					<div className="mx-auto flex max-w-xl flex-col items-center justify-center py-10">
						<MagicBadge title="AI-Enhanced" />
						<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
							Smart QR Codes for Content Sharing
						</h1>
						<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
							Generate beautiful, trackable QR codes that bridge the gap between
							physical and digital content. Perfect for marketing campaigns,
							events, and content distribution.
						</p>
						<div className="mt-8 flex items-center justify-center gap-x-4">
							<Button size="sm" asChild>
								<Link href="/dashboard">Create QR Code</Link>
							</Button>
							<Button size="sm" variant="outline" asChild>
								<Link href="/blog">See Examples</Link>
							</Button>
						</div>
					</div>
				</AnimationContainer>

				<AnimationContainer delay={0.15} className="w-full">
					<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
						<CardFlip
							title="Instant Generation"
							subtitle="AI-powered QR creation"
							description="Create QR codes for any content in seconds with AI optimization and smart formatting"
							features={[
								"One-Click Generation",
								"AI Optimization",
								"Bulk Creation",
								"Smart Formatting",
							]}
							icon={<QrCode className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="Custom Branding"
							subtitle="Brand-aligned designs"
							description="Personalize QR codes with your brand colors, logos, and styles for consistent branding"
							features={[
								"Brand Colors",
								"Logo Integration",
								"Custom Styles",
								"Design Templates",
							]}
							icon={<Palette className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
						<CardFlip
							title="Smart Tracking"
							subtitle="Advanced analytics"
							description="Monitor scans, locations, and engagement with detailed analytics and performance insights"
							features={[
								"Scan Analytics",
								"Location Tracking",
								"Engagement Metrics",
								"Performance Reports",
							]}
							icon={<Zap className="h-6 w-6 text-white" />}
							className="h-[320px] max-w-none"
						/>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2} className="w-full">
					<div className="mx-auto flex w-full max-w-4xl py-10">
						<Image
							src="/assets/qr-codes.svg"
							alt="Smart QR code generator with custom branding and analytics"
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
								Advanced QR Code Features
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Go beyond basic QR codes with intelligent features designed for
								modern content creators and marketers
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							<DotCard variant="subtle" className="p-6">
								<div className="mb-4 flex items-center gap-3">
									<Download className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Multiple Formats</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									Download QR codes in PNG, SVG, PDF, or EPS formats for any use
									case
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• High-resolution PNG for digital use</li>
									<li>• Vector SVG for scalable graphics</li>
									<li>• Print-ready PDF and EPS files</li>
								</ul>
							</DotCard>

							<DotCard variant="subtle" className="p-6">
								<div className="mb-4 flex items-center gap-3">
									<Smartphone className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Mobile Optimized</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									QR codes optimized for fast scanning on all mobile devices
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• Error correction for damaged codes</li>
									<li>• Optimal size recommendations</li>
									<li>• Cross-platform compatibility</li>
								</ul>
							</DotCard>

							<DotCard variant="subtle" className="p-6">
								<div className="mb-4 flex items-center gap-3">
									<Share2 className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Dynamic Content</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									Update QR code destinations without reprinting the code
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• Change URLs anytime</li>
									<li>• A/B test different landing pages</li>
									<li>• Schedule content updates</li>
								</ul>
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

export default QRCodesPage;

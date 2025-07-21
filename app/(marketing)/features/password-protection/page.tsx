import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import DotCard from "@/components/mvpblocks/dot-card";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { COMPANIES } from "@/utils";
import {
	ArrowRightIcon,
	Eye,
	Key,
	Lock,
	Shield,
	Timer,
	UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PasswordProtectionPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<AnimationContainer delay={0.1} className="w-full">
					<div className="mx-auto flex max-w-xl flex-col items-center justify-center py-10">
						<MagicBadge title="Enterprise-Grade" />
						<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
							Secure Content with Smart Protection
						</h1>
						<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
							Protect your valuable content with advanced password protection
							and access controls. Perfect for premium content, internal
							documents, and exclusive materials.
						</p>
						<div className="mt-8 flex items-center justify-center gap-x-4">
							<Button size="sm" asChild>
								<Link href="/dashboard">Secure Content</Link>
							</Button>
							<Button size="sm" variant="outline" asChild>
								<Link href="/blog">Security Guide</Link>
							</Button>
						</div>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.25} className="w-full">
					<div className="mx-auto max-w-6xl py-16">
						<div className="mb-12 text-center">
							<h2 className="mb-4 font-heading font-semibold text-3xl md:text-4xl">
								Advanced Security Features
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Comprehensive protection options to keep your content secure
								while maintaining user experience
							</p>
						</div>

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							<DotCard variant="subtle">
								<div className="mb-4 flex items-center gap-3">
									<Lock className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Custom Passwords</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									Set unique passwords for different content pieces or user
									groups
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• Individual content passwords</li>
									<li>• Group-based access codes</li>
									<li>• Temporary access tokens</li>
								</ul>
							</DotCard>

							<DotCard variant="subtle">
								<div className="mb-4 flex items-center gap-3">
									<Timer className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">Time-Based Access</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									Control when content is accessible with scheduled protection
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• Expiring access links</li>
									<li>• Scheduled content release</li>
									<li>• Time-limited viewing</li>
								</ul>
							</DotCard>

							<DotCard variant="subtle">
								<div className="mb-4 flex items-center gap-3">
									<UserCheck className="h-6 w-6 text-primary" />
									<h3 className="font-semibold text-lg">User Management</h3>
								</div>
								<p className="mb-4 text-muted-foreground text-sm">
									Manage who can access your protected content with user
									controls
								</p>
								<ul className="space-y-1 text-muted-foreground text-xs">
									<li>• User whitelist/blacklist</li>
									<li>• Role-based permissions</li>
									<li>• Access attempt logging</li>
								</ul>
							</DotCard>
						</div>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.15} className="w-full">
					<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
						<DotCard variant="subtle" className="max-w-none">
							<div className="mb-4 flex items-center gap-3">
								<Shield className="h-6 w-6 text-primary" />
								<h3 className="font-semibold text-lg">
									Military-Grade Security
								</h3>
							</div>
							<p className="mb-4 text-muted-foreground text-sm">
								AES-256 encryption and secure authentication protocols to keep
								your content safe
							</p>
							<ul className="space-y-1 text-muted-foreground text-xs">
								<li>• AES-256 Encryption</li>
								<li>• Secure Authentication</li>
								<li>• Data Protection</li>
								<li>• Security Compliance</li>
							</ul>
						</DotCard>
						<DotCard variant="subtle" className="max-w-none">
							<div className="mb-4 flex items-center gap-3">
								<Key className="h-6 w-6 text-primary" />
								<h3 className="font-semibold text-lg">Flexible Access</h3>
							</div>
							<p className="mb-4 text-muted-foreground text-sm">
								Multiple authentication methods and custom access rules for
								different user groups
							</p>
							<ul className="space-y-1 text-muted-foreground text-xs">
								<li>• Multiple Auth Methods</li>
								<li>• Custom Access Rules</li>
								<li>• User Group Management</li>
								<li>• Permission Controls</li>
							</ul>
						</DotCard>
						<DotCard variant="subtle" className="max-w-none">
							<div className="mb-4 flex items-center gap-3">
								<Eye className="h-6 w-6 text-primary" />
								<h3 className="font-semibold text-lg">Access Monitoring</h3>
							</div>
							<p className="mb-4 text-muted-foreground text-sm">
								Track who accesses your content and when with comprehensive
								monitoring tools
							</p>
							<ul className="space-y-1 text-muted-foreground text-xs">
								<li>• Access Logs</li>
								<li>• Real-time Monitoring</li>
								<li>• User Activity Tracking</li>
								<li>• Security Alerts</li>
							</ul>
						</DotCard>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2} className="w-full">
					<div className="mx-auto flex w-full max-w-4xl py-10">
						<Image
							src="/assets/password-protection.svg"
							alt="Advanced password protection and access control for content security"
							width={80}
							height={80}
							className="h-auto w-full"
						/>
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

export default PasswordProtectionPage;

"use client";

/**
 * @author: @nuelst
 * @description: Card Flip - MVP Development Theme
 * @version: 1.1.0
 * @date: 2025-01-14
 * @license: MIT
 * @website: https://nueslt.vercel.app
 * @github: https://github.com/nuelst
 */

import { cn } from "@/utils";
import { ArrowRight, Code2, Copy, Rocket, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
	title?: string;
	subtitle?: string;
	description?: string;
	features?: string[];
	icon?: React.ReactNode;
	className?: string;
}

export default function CardFlip({
	title = "Build MVPs Fast",
	subtitle = "Launch your idea in record time",
	description = "Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.",
	features = [
		"Copy & Paste Ready",
		"Developer-First",
		"MVP Optimized",
		"Zero Setup Required",
	],
	icon,
	className,
}: CardFlipProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<div
			className={cn(
				"group relative h-[360px] w-full max-w-[300px] [perspective:2000px]",
				className,
			)}
			onMouseEnter={() => setIsFlipped(true)}
			onMouseLeave={() => setIsFlipped(false)}
		>
			<div
				className={cn(
					"relative h-full w-full",
					"[transform-style:preserve-3d]",
					"transition-all duration-700",
					isFlipped
						? "[transform:rotateY(180deg)]"
						: "[transform:rotateY(0deg)]",
				)}
			>
				{/* Front of card */}
				<div
					className={cn(
						"absolute inset-0 h-full w-full",
						"[backface-visibility:hidden] [transform:rotateY(0deg)]",
						"overflow-hidden rounded-2xl",
						"bg-gradient-to-br from-background via-background/95 to-muted/50",
						"border border-border/20",
						"shadow-lg backdrop-blur-sm",
						"transition-all duration-700",
						"group-hover:shadow-primary/5 group-hover:shadow-xl",
						"group-hover:border-border/40",
						"group-hover:bg-gradient-to-br group-hover:from-background group-hover:via-primary/5 group-hover:to-primary/10",
						isFlipped ? "opacity-0" : "opacity-100",
					)}
				>
					{/* Enhanced background gradient effect */}
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

					{/* Subtle mesh pattern overlay */}
					<div
						className="absolute inset-0 opacity-[0.02] transition-opacity duration-700 group-hover:opacity-[0.05]"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>

					{/* Card content - restructured for better layout */}
					<div className="absolute inset-0 flex flex-col">
						{/* Top section with icon and animated elements */}
						<div className="relative flex flex-1 items-center justify-center pt-6 pb-4">
							<div className="relative flex h-full w-full max-w-[220px] flex-col items-center justify-center">
								{/* Floating particles */}
								{[...Array(8)].map((_, i) => (
									<div
										key={`particle-${i}`}
										className="absolute h-1 w-1 animate-pulse rounded-full bg-primary/30"
										style={{
											left: `${20 + Math.random() * 60}%`,
											top: `${20 + Math.random() * 60}%`,
											animationDelay: `${i * 0.3}s`,
											animationDuration: `${2 + Math.random() * 2}s`,
										}}
									/>
								))}

								{/* Animated code blocks */}
								{[...Array(5)].map((_, i) => (
									<div
										key={`code-${i}`}
										className={cn(
											"mb-2 h-2 rounded-full",
											"bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20",
											"animate-[slideIn_3s_ease-in-out_infinite]",
											"opacity-0 group-hover:opacity-100",
											"transition-opacity duration-500",
										)}
										style={{
											width: `${50 + Math.random() * 50}%`,
											animationDelay: `${i * 0.3}s`,
											marginLeft: `${Math.random() * 25}%`,
										}}
									/>
								))}

								{/* Enhanced central icon */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="relative">
										{/* Glow effect */}
										<div className="absolute inset-0 scale-150 rounded-xl bg-primary/20 blur-md transition-transform duration-500 group-hover:scale-175" />

										{/* Main icon container */}
										<div
											className={cn(
												"relative h-16 w-16 rounded-xl",
												"bg-gradient-to-br from-primary via-primary/90 to-primary/70",
												"flex items-center justify-center",
												"shadow-lg shadow-primary/25",
												"border border-primary/20",
												"transition-all duration-500",
												"group-hover:rotate-6 group-hover:scale-110",
												"group-hover:shadow-primary/30 group-hover:shadow-xl",
											)}
										>
											{icon || <Rocket className="h-8 w-8 text-white" />}

											{/* Sparkle effect */}
											<Sparkles className="-top-1 -right-1 absolute h-4 w-4 animate-pulse text-primary/60" />
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom section with text content */}
						<div className="flex-shrink-0 p-6 pt-0">
							<div className="flex items-end justify-between gap-4">
								<div className="flex-1 space-y-3">
									<div className="space-y-2">
										<h3 className="font-bold text-foreground text-xl leading-tight tracking-tight transition-all duration-500 ease-out group-hover:translate-y-[-4px] group-hover:text-primary">
											{title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px] group-hover:text-foreground/80">
											{subtitle}
										</p>
									</div>

									{/* Progress indicator */}
									<div className="flex items-center gap-2 opacity-0 transition-opacity delay-200 duration-500 group-hover:opacity-100">
										<div className="h-1 w-8 overflow-hidden rounded-full bg-primary/30">
											<div className="h-full w-full animate-pulse rounded-full bg-primary" />
										</div>
										<span className="text-muted-foreground text-xs">
											Hover to explore
										</span>
									</div>
								</div>

								<div className="group/icon relative flex-shrink-0 self-start">
									<div
										className={cn(
											"absolute inset-[-10px] rounded-xl transition-all duration-300",
											"bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
											"scale-90 opacity-0 group-hover/icon:scale-100 group-hover/icon:opacity-100",
										)}
									/>
									<div className="relative rounded-lg bg-primary/5 p-2 transition-colors duration-300 group-hover/icon:bg-primary/10">
										<Zap className="h-5 w-5 text-primary transition-all duration-300 group-hover/icon:rotate-12 group-hover/icon:scale-110" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Back of card */}
				<div
					className={cn(
						"absolute inset-0 h-full w-full",
						"[backface-visibility:hidden] [transform:rotateY(180deg)]",
						"rounded-2xl p-5",
						"bg-gradient-to-br from-background via-background/95 to-muted/30",
						"border border-border/20",
						"shadow-xl backdrop-blur-sm",
						"flex flex-col",
						"transition-all duration-700",
						"group-hover:shadow-2xl group-hover:shadow-primary/10",
						"group-hover:border-border/40",
						"group-hover:bg-gradient-to-br group-hover:from-primary/5 group-hover:via-background group-hover:to-primary/10",
						!isFlipped ? "opacity-0" : "opacity-100",
					)}
				>
					{/* Enhanced background gradient */}
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />

					{/* Subtle grid pattern */}
					<div
						className="absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>

					<div className="relative z-10 flex h-full flex-col justify-between">
						{/* Header section */}
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="relative flex-shrink-0">
									<div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm" />
									<div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg">
										{icon || <Code2 className="h-4 w-4 text-white" />}
									</div>
								</div>
								<div className="min-w-0 flex-1">
									<h3 className="font-bold text-foreground text-lg leading-tight tracking-tight">
										{title}
									</h3>
									<div className="mt-1.5 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary/50" />
								</div>
							</div>
						</div>

						{/* Features section */}
						<div className="flex flex-1 flex-col justify-center py-2">
							<div className="space-y-2.5">
								{features.slice(0, 4).map((feature, index) => {
									const icons = [Copy, Code2, Rocket, Zap];
									const IconComponent = icons[index % icons.length];

									return (
										<div
											key={feature}
											className="group/feature flex items-center gap-2.5 text-foreground/90 text-sm transition-all duration-500 hover:text-foreground"
											style={{
												transform: isFlipped
													? "translateX(0)"
													: "translateX(-15px)",
												opacity: isFlipped ? 1 : 0,
												transitionDelay: `${index * 80 + 200}ms`,
											}}
										>
											<div className="relative flex-shrink-0">
												<div className="absolute inset-0 rounded-md bg-primary/10 blur-sm transition-colors duration-300 group-hover/feature:bg-primary/20" />
												<div className="relative flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 transition-colors duration-300 group-hover/feature:bg-primary/15">
													<IconComponent className="h-3 w-3 text-primary" />
												</div>
											</div>
											<span className="font-medium text-xs leading-tight">
												{feature}
											</span>
										</div>
									);
								})}
							</div>
						</div>

						{/* Bottom action section */}
						<div className="relative z-10">
							<div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

							<div
								className={cn(
									"group/start relative",
									"flex items-center justify-between",
									"rounded-lg p-3",
									"transition-all duration-300",
									"bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30",
									"hover:from-primary/10 hover:via-primary/5 hover:to-primary/10",
									"hover:scale-[1.02] hover:cursor-pointer",
									"border border-border/30 hover:border-primary/30",
									"backdrop-blur-sm",
								)}
							>
								<div className="flex items-center gap-2.5">
									<div className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-primary" />
									<span className="font-semibold text-foreground text-xs transition-colors duration-300 group-hover/start:text-primary">
										Get Started
									</span>
								</div>

								<div className="group/icon relative flex-shrink-0">
									<div
										className={cn(
											"absolute inset-[-6px] rounded-lg transition-all duration-300",
											"bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
											"scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100",
										)}
									/>
									<div className="relative rounded-md bg-primary/10 p-1 transition-colors duration-300 group-hover/start:bg-primary/20">
										<ArrowRight className="h-3 w-3 text-primary transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
		</div>
	);
}

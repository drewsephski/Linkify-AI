import { cn } from "@/utils";

interface DotCardProps {
	children?: React.ReactNode;
	className?: string;
	title?: string;
	description?: string;
	variant?: "default" | "subtle" | "minimal";
}

export default function DotCard({
	children,
	className,
	title = "Build with Us",
	description = "Start building your next project with our pre-built components. Let's build MVPs fast",
	variant = "subtle",
}: DotCardProps) {
	const getVariantStyles = () => {
		switch (variant) {
			case "minimal":
				return {
					container:
						"border-border/20 bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:border-border/40",
					lines: "bg-border/10",
					borders: "border-border/10",
					dots: "bg-primary/30 outline-background/80",
				};
			case "subtle":
				return {
					container:
						"border-border/30 bg-background/60 backdrop-blur-sm hover:bg-background/90 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
					lines: "bg-border/20 group-hover:bg-primary/20",
					borders: "border-border/20 group-hover:border-primary/30",
					dots: "bg-primary/40 outline-background/90 group-hover:bg-primary/60",
				};
			default:
				return {
					container:
						"border-border/50 bg-background hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10",
					lines: "bg-border/30",
					borders: "border-border/30",
					dots: "bg-primary outline-background",
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<div
			className={cn(
				"group relative mx-auto w-full max-w-sm rounded-xl border border-dashed px-8 py-6 transition-all duration-300",
				styles.container,
				className,
			)}
		>
			{/* Top line */}
			<div
				className={cn(
					"absolute top-3 left-0 h-px w-full transition-colors duration-300",
					styles.lines,
				)}
			/>

			{/* Bottom line */}
			<div
				className={cn(
					"absolute bottom-3 left-0 h-px w-full transition-colors duration-300",
					styles.lines,
				)}
			/>

			{/* Side borders */}
			<div
				className={cn(
					"relative w-full border-x transition-colors duration-300",
					styles.borders,
				)}
			>
				{/* Corner dots */}
				<div className="absolute inset-0 grid h-full w-full items-center">
					<section className="absolute grid h-full w-full grid-cols-2 place-content-between py-3">
						{/* Top left dot */}
						<div
							className={cn(
								"-translate-x-[3px] size-1.5 rounded-full outline outline-4 transition-all duration-300",
								styles.dots,
							)}
						/>

						{/* Top right dot */}
						<div
							className={cn(
								"size-1.5 translate-x-[3px] place-self-end rounded-full outline outline-4 transition-all duration-300",
								styles.dots,
							)}
						/>

						{/* Bottom left dot */}
						<div
							className={cn(
								"-translate-x-[3px] size-1.5 place-self-start self-end rounded-full outline outline-4 transition-all duration-300",
								styles.dots,
							)}
						/>

						{/* Bottom right dot */}
						<div
							className={cn(
								"size-1.5 translate-x-[3px] place-self-end self-end rounded-full outline outline-4 transition-all duration-300",
								styles.dots,
							)}
						/>
					</section>
				</div>

				{/* Content area */}
				<div className="relative z-20 mx-auto px-2 py-8">
					{children ? (
						<div className="transition-all duration-300 group-hover:translate-y-[-1px]">
							{children}
						</div>
					) : (
						<div className="space-y-3 text-center transition-all duration-300 group-hover:translate-y-[-1px]">
							<h3 className="font-bold text-foreground text-lg leading-tight">
								{title}
							</h3>
							<div className="mx-auto h-0.5 w-8 rounded-full bg-gradient-to-r from-primary/50 to-primary" />
							<p className="text-muted-foreground text-sm leading-relaxed">
								{description}
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Subtle hover glow */}
			<div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</div>
	);
}

"use client";

import { cn } from "@/utils";
import { useRef, useState } from "react";

interface EnhancedCardProps {
	children: React.ReactNode;
	className?: string;
	variant?: "default" | "subtle" | "spotlight" | "gradient";
	hover3d?: boolean;
	glowEffect?: boolean;
}

export default function EnhancedCard({
	children,
	className,
	variant = "subtle",
	hover3d = false,
	glowEffect = false,
}: EnhancedCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [rotation, setRotation] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setMousePosition({ x, y });

		if (hover3d) {
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const rotateX = ((y - centerY) / centerY) * -10;
			const rotateY = ((x - centerX) / centerX) * 10;
			setRotation({ x: rotateX, y: rotateY });
		}
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setRotation({ x: 0, y: 0 });
	};

	const getVariantStyles = () => {
		switch (variant) {
			case "default":
				return "border-border/50 bg-background hover:border-border/70 hover:shadow-xl hover:shadow-primary/10";
			case "subtle":
				return "border-border/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 hover:border-border/40 hover:shadow-lg hover:shadow-primary/5";
			case "spotlight":
				return "border-border/20 bg-background/60 backdrop-blur-sm hover:border-border/40 hover:shadow-lg hover:shadow-primary/5";
			case "gradient":
				return "border-border/30 bg-gradient-to-br from-background via-background/95 to-muted/30 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";
			default:
				return "border-border/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 hover:border-border/40 hover:shadow-lg hover:shadow-primary/5";
		}
	};

	return (
		<div
			ref={cardRef}
			className={cn(
				"group relative overflow-hidden rounded-xl border transition-all duration-300",
				getVariantStyles(),
				hover3d && "transform-gpu",
				className,
			)}
			style={
				hover3d
					? {
							transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
						}
					: undefined
			}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
		>
			{/* Spotlight effect for spotlight variant */}
			{variant === "spotlight" && isHovered && (
				<div
					className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style={{
						background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 70%)`,
					}}
				/>
			)}

			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{/* Glow effect */}
			{glowEffect && (
				<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
			)}

			{/* Content */}
			<div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-1px]">
				{children}
			</div>
		</div>
	);
}

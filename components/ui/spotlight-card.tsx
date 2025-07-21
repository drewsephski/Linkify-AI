"use client";

import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface SpotlightCardProps {
	children: React.ReactNode;
	className?: string;
	spotlightColor?: string;
	spotlightSize?: number;
	borderRadius?: string;
}

export default function SpotlightCard({
	children,
	className,
	spotlightColor = "rgba(255, 255, 255, 0.1)",
	spotlightSize = 200,
	borderRadius = "rounded-xl",
}: SpotlightCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (cardRef.current && isHovered) {
				const rect = cardRef.current.getBoundingClientRect();
				setMousePosition({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			}
		};

		if (isHovered) {
			document.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isHovered]);

	return (
		<div
			ref={cardRef}
			className={cn(
				"group relative overflow-hidden bg-background/60 backdrop-blur-sm",
				"border border-border/20 hover:border-border/40",
				"transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
				borderRadius,
				className,
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Spotlight effect */}
			{isHovered && (
				<div
					className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style={{
						background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 70%)`,
					}}
				/>
			)}

			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}

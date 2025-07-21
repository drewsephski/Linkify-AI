"use client";

import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface SpotlightProps {
	className?: string;
	size?: number;
}

export function Spotlight({ className, size = 64 }: SpotlightProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setMousePosition({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			}
		};

		const handleMouseEnter = () => setIsVisible(true);
		const handleMouseLeave = () => setIsVisible(false);

		const container = containerRef.current;
		if (container) {
			container.addEventListener("mousemove", handleMouseMove);
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
		}

		return () => {
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 overflow-hidden">
			<div
				className={cn(
					"pointer-events-none absolute transition-opacity duration-300",
					isVisible ? "opacity-100" : "opacity-0",
					className,
				)}
				style={{
					left: mousePosition.x - size / 2,
					top: mousePosition.y - size / 2,
					width: size,
					height: size,
					background: `radial-gradient(circle, currentColor, transparent 70%)`,
				}}
			/>
		</div>
	);
}

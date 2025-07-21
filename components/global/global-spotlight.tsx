"use client";

import { cn } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface GlobalSpotlightProps {
	className?: string;
	size?: number;
	enabled?: boolean;
}

export function GlobalSpotlight({
	className,
	size = 300,
	enabled = true,
}: GlobalSpotlightProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const rafRef = useRef<number>();
	const lastPositionRef = useRef({ x: 0, y: 0 });

	const updatePosition = useCallback((x: number, y: number) => {
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
		}

		rafRef.current = requestAnimationFrame(() => {
			// Only update if position actually changed to prevent unnecessary renders
			if (lastPositionRef.current.x !== x || lastPositionRef.current.y !== y) {
				setMousePosition({ x, y });
				lastPositionRef.current = { x, y };
			}
		});
	}, []);

	useEffect(() => {
		if (!enabled) return;

		const handleMouseMove = (e: MouseEvent) => {
			updatePosition(e.clientX, e.clientY);
			if (!isVisible) {
				setIsVisible(true);
			}
		};

		const handleMouseEnter = () => {
			setIsVisible(true);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		// Use passive listeners for better performance
		document.addEventListener("mousemove", handleMouseMove, { passive: true });
		document.addEventListener("mouseenter", handleMouseEnter, {
			passive: true,
		});
		document.addEventListener("mouseleave", handleMouseLeave, {
			passive: true,
		});

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseenter", handleMouseEnter);
			document.removeEventListener("mouseleave", handleMouseLeave);

			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [enabled, updatePosition, isVisible]);

	if (!enabled) return null;

	return (
		<div
			className={cn(
				"pointer-events-none fixed z-10 transition-opacity duration-300 ease-out",
				isVisible ? "opacity-100" : "opacity-0",
			)}
			style={{
				left: 0,
				top: 0,
				width: size,
				height: size,
				background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.06) 30%, rgba(59, 130, 246, 0.03) 60%, transparent 80%)`,
				filter: "blur(40px)",
				transform: `translate3d(${mousePosition.x - size / 2}px, ${
					mousePosition.y - size / 2
				}px, 0)`,
				willChange: "transform",
			}}
		/>
	);
}

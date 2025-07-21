"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	gradient?: string;
	delay?: number;
}

export const FeatureCard = ({
	icon: Icon,
	title,
	description,
	gradient = "from-blue-500 to-blue-800",
	delay = 0,
}: FeatureCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
			className="group relative rounded-2xl border border-border/20 bg-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border/40 hover:shadow-lg hover:shadow-primary/5"
		>
			<div
				className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `linear-gradient(135deg, ${gradient
						.replace("from-", "")
						.replace("to-", "")
						.split(" ")
						.join(", ")}, transparent 70%)`,
				}}
			/>

			{/* Subtle gradient overlay */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			<div className="relative z-10">
				<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/30">
					<Icon className="h-6 w-6 text-primary" />
				</div>

				<h3 className="mb-2 font-semibold text-foreground text-xl transition-colors group-hover:text-primary">
					{title}
				</h3>

				<p className="text-muted-foreground text-sm transition-colors group-hover:text-foreground/80">
					{description}
				</p>
			</div>
		</motion.div>
	);
};

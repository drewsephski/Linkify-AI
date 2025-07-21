"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface GenerationProgressProps {
	isGenerating: boolean;
}

const steps = [
	"Analyzing your topic...",
	"Researching content...",
	"Structuring the blog post...",
	"Writing introduction...",
	"Creating main sections...",
	"Crafting conclusion...",
	"Finalizing your blog post...",
];

export function GenerationProgress({ isGenerating }: GenerationProgressProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!isGenerating) {
			setCurrentStep(0);
			setProgress(0);
			return;
		}

		const interval = setInterval(() => {
			setCurrentStep((prev) => {
				const next = prev + 1;
				if (next >= steps.length) {
					return prev;
				}
				return next;
			});

			setProgress((prev) => {
				const next = prev + 100 / steps.length;
				return Math.min(next, 95); // Don't reach 100% until actually done
			});
		}, 2000);

		return () => clearInterval(interval);
	}, [isGenerating]);

	if (!isGenerating) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<Card className="border-primary/20 bg-primary/5">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Sparkles className="h-5 w-5 text-primary" />
						Generating Your Blog Post
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Progress value={progress} className="w-full" />
					<div className="flex items-center gap-2 text-muted-foreground text-sm">
						<Loader2 className="h-4 w-4 animate-spin" />
						{steps[currentStep] || "Almost done..."}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

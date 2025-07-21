"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, FileText, Zap } from "lucide-react";

interface UsageStatsProps {
	planType: string;
	postsUsed: number;
	postsLimit: number;
}

const planLimits = {
	starter: { limit: 0, color: "bg-gray-500" },
	basic: { limit: 3, color: "bg-blue-500" },
	pro: { limit: Infinity, color: "bg-purple-500" },
};

export function UsageStats({
	planType,
	postsUsed,
	postsLimit,
}: UsageStatsProps) {
	const plan =
		planLimits[planType as keyof typeof planLimits] || planLimits.starter;
	const isUnlimited = postsLimit === Infinity;
	const usagePercentage = isUnlimited ? 0 : (postsUsed / postsLimit) * 100;

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center justify-between">
					<span className="flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Usage Statistics
					</span>
					<Badge variant="outline" className="capitalize">
						{planType === "pro" && <Crown className="mr-1 h-3 w-3" />}
						{planType === "basic" && <Zap className="mr-1 h-3 w-3" />}
						{planType} Plan
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Blog Posts Generated</span>
						<span className="font-medium">
							{postsUsed} {!isUnlimited && `/ ${postsLimit}`}
						</span>
					</div>
					{!isUnlimited && <Progress value={usagePercentage} className="h-2" />}
				</div>

				{!isUnlimited && (
					<div className="text-muted-foreground text-sm">
						{postsLimit - postsUsed > 0 ? (
							<span className="text-green-600">
								{postsLimit - postsUsed} posts remaining this month
							</span>
						) : (
							<span className="text-red-600">
								You've reached your monthly limit
							</span>
						)}
					</div>
				)}

				{isUnlimited && (
					<div className="text-green-600 text-sm">✨ Unlimited blog posts</div>
				)}
			</CardContent>
		</Card>
	);
}

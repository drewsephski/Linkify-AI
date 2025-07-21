import { MaxWidthWrapper } from "@/components/global";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
	return (
		<MaxWidthWrapper className="mb-40">
			{/* Header Section */}
			<div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4 py-10">
				<Skeleton className="h-6 w-48" />
				<Skeleton className="h-12 w-80" />
				<Skeleton className="h-6 w-96" />
			</div>

			{/* Usage Stats */}
			<div className="mx-auto mb-8 max-w-4xl">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<Skeleton className="h-6 w-32" />
							<Skeleton className="h-6 w-20" />
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-4 w-16" />
							</div>
							<Skeleton className="h-2 w-full" />
						</div>
						<Skeleton className="h-4 w-48" />
					</CardContent>
				</Card>
			</div>

			{/* Blog Generator Form */}
			<div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
				<Card className="w-full max-w-2xl">
					<CardHeader>
						<Skeleton className="h-6 w-48" />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-10 w-full" />
						</div>

						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton key={i} className="h-6 w-24" />
								))}
							</div>
						</div>

						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 w-full" />
						</div>

						<div className="space-y-4">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-8 w-32" />
						</div>

						<div className="flex items-center gap-2">
							<Skeleton className="h-10 flex-1" />
							<Skeleton className="h-10 w-10" />
						</div>
					</CardContent>
				</Card>
			</div>
		</MaxWidthWrapper>
	);
}

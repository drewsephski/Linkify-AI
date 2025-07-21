import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogGeneratorSkeleton() {
	return (
		<div className="mx-auto w-full max-w-2xl space-y-8">
			<Card>
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
	);
}

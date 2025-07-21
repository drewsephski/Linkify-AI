import { BlogGeneratorSkeleton } from "@/components/dashboard/blog-generator-skeleton";
import { MaxWidthWrapper } from "@/components/global";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
	return (
		<MaxWidthWrapper className="mb-40">
			<div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
				<Skeleton className="mb-4 h-8 w-48" />
				<Skeleton className="mb-4 h-12 w-80" />
				<Skeleton className="h-6 w-96" />
			</div>

			<div className="mx-auto mb-8 max-w-4xl">
				<Skeleton className="h-32 w-full" />
			</div>

			<div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
				<BlogGeneratorSkeleton />
			</div>
		</MaxWidthWrapper>
	);
}

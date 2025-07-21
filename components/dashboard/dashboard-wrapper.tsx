"use client";

import { Suspense } from "react";
import { BlogGeneratorSkeleton } from "./blog-generator-skeleton";
import { ErrorBoundary } from "./error-boundary";

interface DashboardWrapperProps {
	children: React.ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
	return (
		<ErrorBoundary>
			<Suspense fallback={<BlogGeneratorSkeleton />}>{children}</Suspense>
		</ErrorBoundary>
	);
}

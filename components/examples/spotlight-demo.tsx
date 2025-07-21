import { SpotlightWrapper } from "@/components/global/spotlight-wrapper";

export function SpotlightDemo() {
	return (
		<div className="grid gap-6 p-6">
			{/* Basic spotlight card */}
			<SpotlightWrapper className="aspect-video h-[200px] rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black">
				<div className="flex h-full items-center justify-center">
					<h3 className="font-semibold text-lg">Basic Spotlight Effect</h3>
				</div>
			</SpotlightWrapper>

			{/* Spotlight with grid */}
			<SpotlightWrapper
				className="aspect-video h-[200px] rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black"
				showGrid={true}
			>
				<div className="flex h-full items-center justify-center">
					<h3 className="font-semibold text-lg">Spotlight with Grid Pattern</h3>
				</div>
			</SpotlightWrapper>

			{/* Custom colored spotlight */}
			<SpotlightWrapper
				className="aspect-video h-[200px] rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black"
				spotlightClassName="from-blue-800 via-blue-600 to-blue-400 blur-xl dark:from-blue-900 dark:via-blue-500 dark:to-blue-900"
				size={100}
			>
				<div className="flex h-full items-center justify-center">
					<h3 className="font-semibold text-lg">Custom blue Spotlight</h3>
				</div>
			</SpotlightWrapper>
		</div>
	);
}

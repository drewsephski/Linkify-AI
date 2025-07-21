interface Props {
	title: string;
}

const MagicBadge = ({ title }: Props) => {
	return (
		<div className="relative inline-flex h-8 select-none overflow-hidden rounded-full p-[1.5px] focus:outline-none">
			<span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e40af_0%,#3b82f6_50%,#1e40af_100%)]" />
			<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 font-medium text-sm text-white backdrop-blur-3xl">
				{title}
			</span>
		</div>
	);
};

export default MagicBadge;

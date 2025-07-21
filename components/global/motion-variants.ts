import { Variants } from "framer-motion";

export const hoverVariant: Variants = {
	hover: {
		scale: 1.05,
		transition: {
			type: "spring",
			stiffness: 300,
		},
	},
};

export const dragVariant: Variants = {
	drag: {
		scale: 1.1,
		boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
		transition: {
			type: "spring",
			stiffness: 500,
		},
	},
};

export const fadeIn: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

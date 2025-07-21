"use client";

import { Variants, motion } from "framer-motion";
import React from "react";

interface AnimationWrapperProps {
	children: React.ReactNode;
	className?: string;
}

const animationVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
	children,
	className,
}) => {
	return (
		<motion.div
			className={className}
			variants={animationVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
};

export default AnimationWrapper;

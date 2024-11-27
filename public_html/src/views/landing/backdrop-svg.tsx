'use client';

import React from 'react';
import { m, MotionValue, useSpring, useTransform } from 'framer-motion';

import useWindowDimensions from '@/components/hooks/use-window-dimensions';
import screens from '@/lib/screens';

import { FranchiseProgramBubblesDesktop } from './franchise-program';
import { BackdropCircles } from './icons';

type Props = {
  scrollYProgress: MotionValue<number>;
};

const BackdropSvg: React.FC<Props> = ({ scrollYProgress }) => {
	const windowDimensions = useWindowDimensions();
	const isMobile = windowDimensions.width < screens.lg;

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
	/** SVG Backdrop circle */
	const svgRotate = useSpring(
		useTransform(
			scrollYProgress,
			[0.1, 0.2, 0.3, 0.4, 0.6, 0.7],
			['0deg', '90deg', '90deg', '270deg', '270deg', '450deg']
		),
		springConfig
	);
	const svgScale = useSpring(
		useTransform(
			scrollYProgress,
			[0.1, 0.2, 0.3, 0.4, 0.6, 0.7],
			[1, 1.4, 1.4, 0.8, 0.8, 1]
		),
		springConfig
	);
	const svgTop = useSpring(
		useTransform(
			scrollYProgress,
			[0.1, 0.2, 0.3, 0.4, 0.6, 0.7],
			[-73, 80, 80, -400, -400, -50]
		),
		springConfig
	);
	const svgOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

	const props = isMobile
		? {
			style: {
				opacity: svgOpacity,
				rotate: svgRotate,
				scale: svgScale,
				top: 0,
			},
		}
		: {
			style: {
				rotate: svgRotate,
				scale: svgScale,
				top: svgTop,
				opacity: 1,
			},
		};

	if (!windowDimensions.width) return null;

	return (
		<m.div
			className='relative w-full h-full'
			{ ...props }>
			<BackdropCircles className='max-lg:h-svh lg:w-[73.906vw]' />

			{ !isMobile && (
				<FranchiseProgramBubblesDesktop scrollYProgress={ scrollYProgress } />
			) }
		</m.div>
	);
};

export default BackdropSvg;

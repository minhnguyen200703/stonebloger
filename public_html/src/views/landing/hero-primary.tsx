'use client';

import React from 'react';
import { m, MotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

import ShinyButton from '@/components/shiny-button';
import landingData from '@/constant/data/landing';

import { SectionDescription } from './section';

type Props = {
	scrollYProgress: MotionValue<number>;
};

const HeroPrimary: React.FC<Props> = ({ scrollYProgress }) => {
	const opacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);
	const scale = useTransform(scrollYProgress, [0.05, 0.15], [1, 0.5]);
	const zIndex = useTransform(scrollYProgress, [0, 0.15, 0.2], [10, 10, 0]);

	const translateY = useTransform(
		scrollYProgress,
		[0.05, 0.15],
		['0%', '100%']
	);
	const translateX = useTransform(scrollYProgress, [0.05, 0.15], [0, -50]);

	return (
		<m.div
			id={landingData.hero_1.id}
			style={{
				opacity,
				translateY,
				translateX,
				scale,
				zIndex,
			}}
			className='absolute inset-0 flex h-full flex-col items-end justify-center overflow-hidden p-4 pt-[calc(80px_+_16px)] text-black'
		>
			<div className='flex flex-col text-left'>
				<h1 className='font-bold text-2xl 2xl:text-5xl text-white lg:text-gray-primary'>
					{landingData.hero_1.title}
				</h1>
				<div className='mt-[22px] lg:max-w-[35.102vw]'>
					<SectionDescription>
						<span className='max-lg:text-white'>
							{landingData.hero_1.description}
						</span>
					</SectionDescription>
				</div>
				<div className="flex mt-[27px]">
					<div // Use div instead of button to avoid nesting issues
						onClick={() => {
							window.scrollBy({
								top: window.innerHeight * 2, // Scroll down 2 screen heights
								behavior: "smooth",
							});
						}}
					>
						<ShinyButton>{landingData.hero_1.cta.text}</ShinyButton>
					</div>
				</div>
			</div>
		</m.div>
	);
};

export default HeroPrimary;

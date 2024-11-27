'use client';

import React from 'react';
import { m, MotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

import ShinyButton from '@/components/shiny-button';
import landingData from '@/constant/data/landing';

import { SectionDescription, SectionTitle } from './section';

type Props = {
  scrollYProgress: MotionValue<number>;
};

const HeroSecondary: React.FC<Props> = ({ scrollYProgress }) => {
	const scale = useTransform(
		scrollYProgress,
		[0, 0.15, 0.2, 0.3, 0.35],
		[0, 0, 1, 1, 0]
	);
	const zIndex = useTransform(scrollYProgress, [0, 0.15, 0.2], [0, 0, 10]);
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.15, 0.2, 0.3, 0.35],
		[0, 0, 1, 1, 0]
	);
	const y = useTransform(
		scrollYProgress,
		[0, 0.15, 0.2, 0.3, 0.35],
		['0%', '-50%', '0%', '0%', '100%']
	);

	return (
		<m.div
			style={{ scale, opacity, y, zIndex }}
			className='absolute inset-0 grid top-[23%] overflow-hidden'
		>
			<div className='flex flex-col items-center text-center max-lg:container-center lg:max-w-[64.896vw] mx-auto'>
				<SectionTitle>{landingData.hero_2.title}</SectionTitle>
				<div className='mt-[60px] 3xl:mt-[75px]'>
					<SectionDescription>
						<span className='3xl:text-3xl'>
							{landingData.hero_2.description}
						</span>
					</SectionDescription>
				</div>
				<div className='flex flex-col lg:flex-row flex-wrap gap-4 mt-[39px] 3xl:mt-[54px]'>
				{landingData.hero_2.ctas.map((cta, index) => (
					<Link key={index} href={cta.href} passHref>
						<ShinyButton>{cta.text}</ShinyButton>
					</Link>
					))}
				</div>
			</div>
		</m.div>
	);
};

export default HeroSecondary;

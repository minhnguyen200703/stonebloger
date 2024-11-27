'use client';

import React from 'react';
import { m, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ShinyButton from '@/components/shiny-button';
import landingData from '@/constant/data/landing';
import { cn } from '@/lib/utils';

import { SectionDescription, SectionTitle } from './section';

type Props = {
  scrollYProgress: MotionValue<number>;
};

const OurService: React.FC<Props> = ({ scrollYProgress }) => {
	const opacity = useTransform(
		scrollYProgress,
		[0.3, 0.4, 0.6, 0.65],
		[0, 1, 1, 0]
	);
	const scale = useTransform(
		scrollYProgress,
		[0.3, 0.4, 0.6, 0.65],
		[0, 1, 1, 0]
	);
	const y = useTransform(
		scrollYProgress,
		[0.3, 0.4, 0.6, 0.65],
		['-100%', '0%', '0%', '-40%']
	);
	const zIndex = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 0, 10]);

	const scaleIcon1 = useTransform(scrollYProgress, [0.425, 0.475], [0, 1]);
	const scaleIcon2 = useTransform(scrollYProgress, [0.475, 0.5], [0, 1]);
	const scaleIcon3 = useTransform(scrollYProgress, [0.5, 0.525], [0, 1]);

	const getIconStyle = (iconIdx: number) => {
		if (iconIdx === 0) return { scale: scaleIcon1 };
		if (iconIdx === 1) return { scale: scaleIcon2 };
		if (iconIdx === 2) return { scale: scaleIcon3 };
	};

	return (
		<m.div
			style={ { opacity, scale, y, zIndex } }
			className='absolute inset-0 grid top-[16%] sm:top-[18%] overflow-hidden'
		>
			<div className='relative flex flex-col items-center text-center max-lg:container-center max-w-[58.073vw] mx-auto'>
				<SectionTitle>{ landingData.ourService.title }</SectionTitle>
				<div className='mt-[49px] 3xl:mt-16'>
					<SectionDescription>
						{ landingData.ourService.description }
					</SectionDescription>
				</div>
				<div className='flex mt-[49px] 3xl:mt-16'>
					<Link href={landingData.ourService.cta.href} passHref>
						<ShinyButton>{landingData.ourService.cta.text}</ShinyButton>
					</Link>
				</div>

				{ landingData.ourService.icons.map((icon, iconIdx) => {
					return (
						<m.div
							key={ iconIdx }
							style={ {
								...getIconStyle(iconIdx),
								...(iconIdx === 1 && { translateX: '-50%' }),
							} }
							className={ cn(
								'absolute',
								iconIdx === 0 &&
                  'left-4 sm:left-[6%] 3xl:left-[4%] top-[50%] sm:top-[45%] w-[81px] h-[150px] sm:w-[131px] sm:h-[200px] 3xl:w-[161px] 3xl:h-[230px]',
								iconIdx === 1 &&
                  'left-1/2 top-[75%] sm:top-[62%] w-[182px] sm:w-[232px] h-[100px] sm:h-[153px] 3xl:w-[262px] 3xl:h-[183px]',
								iconIdx === 2 &&
                  'right-4 sm:right-[10%] 3xl:right-[8%] top-[50%] sm:top-[45%] w-[106px] h-[135px] sm:w-[156px] sm:h-[185px] 3xl:w-[186px] 3xl:h-[215px]'
							) }
						>
							<Image
								src={ icon }
								alt=''
								fill
								className='object-contain' />
						</m.div>
					);
				}) }
			</div>
		</m.div>
	);
};

export default OurService;

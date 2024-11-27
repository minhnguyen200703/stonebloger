'use client';

import React from 'react';
import { m, MotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

import ShinyButton from '@/components/shiny-button';
import landingData from '@/constant/data/landing';
import { cn } from '@/lib/utils';

import { SectionDescription, SectionTitle } from './section';

type Props = {
  scrollYProgress: MotionValue<number>;
};

const FranchiseProgram: React.FC<Props> = ({ scrollYProgress }) => {
	const opacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);
	const zIndex = useTransform(scrollYProgress, [0.4, 0.6, 0.7], [0, 0, 10]);

	const scaleIcon1 = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
	const scaleIcon2 = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
	const scaleIcon3 = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
	const scaleIcon4 = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

	const getStyleItem = (itemIdx: number) => {
		switch (itemIdx) {
			case 0:
				return { scale: scaleIcon1 };
			case 1:
				return { scale: scaleIcon2 };
			case 2:
				return { scale: scaleIcon3 };
			case 3:
				return { scale: scaleIcon4 };
			default:
				return;
		}
	};

	return (
		<m.div
			style={ { opacity, zIndex } }
			className='absolute inset-0 grid top-[16%] sm:top-[18%] overflow-hidden'
		>
			<div className='relative flex flex-col items-center text-center max-lg:container-center w-full'>
				<SectionTitle>{ landingData.frachiseProgram.title }</SectionTitle>
				<div className='mt-[4.571vh] sm:mt-[49px] lg:hidden'>
					<SectionDescription>
						{ landingData.frachiseProgram.description }
					</SectionDescription>
				</div>
				<div className='flex mt-[4.571vh] sm:mt-[49px] 3xl:mt-16'>
					<Link href={landingData.frachiseProgram.cta.href} passHref>
						<ShinyButton>{landingData.frachiseProgram.cta.text}</ShinyButton>
					</Link>
				</div>
				<div className='lg:hidden mt-[4.571vh] h-full max-h-[300px] grid grid-cols-2 w-full'>
					{ landingData.frachiseProgram.list.map((item, itemIdx) => {
						return (
							<m.div
								key={ itemIdx }
								style={ getStyleItem(itemIdx) }
								className={ cn(
									'flex',
									'text-white text-center text-xs sm:text-sm',
									itemIdx === 0 && 'justify-start',
									itemIdx === 1 && 'justify-end',
									(itemIdx === 2 || itemIdx === 3) && 'justify-center'
								) }
							>
								<div className='rounded-full bg-btn p-2 size-[120px] sm:size-[150px] md:size-[200px] flex items-center justify-center flex-shrink-0'>
									{ item }
								</div>
							</m.div>
						);
					}) }
				</div>
			</div>
		</m.div>
	);
};

export default FranchiseProgram;

export const FranchiseProgramBubblesDesktop: React.FC<Props> = ({
	scrollYProgress,
}) => {
	const scaleIcon1 = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
	const scaleIcon2 = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
	const scaleIcon3 = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
	const scaleIcon4 = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

	const opacityDescription = useTransform(
		scrollYProgress,
		[0, 0.6, 0.7, 0.75],
		[0, 0, 0, 1]
	);

	const getStyleItem = (itemIdx: number) => {
		switch (itemIdx) {
			case 0:
				return { scale: scaleIcon1 };
			case 1:
				return { scale: scaleIcon2 };
			case 2:
				return { scale: scaleIcon3 };
			case 3:
				return { scale: scaleIcon4 };
			default:
				return;
		}
	};

	return (
		<m.div className='max-lg:hidden absolute inset-0 w-full h-full'>
			{ landingData.frachiseProgram.list.map((item, itemIdx) => {
				return (
					<m.div
						key={ itemIdx }
						style={ { ...getStyleItem(itemIdx), rotate: '-90deg' } }
						className={ cn(
							'absolute flex size-[12.865vw] p-2.5 items-center justify-center rounded-full bg-btn',
							'text-white text-center text-base 3xl:text-2xl',
							itemIdx === 0 && 'right-[55%] bottom-[5%]',
							itemIdx === 1 && 'right-[42%] bottom-[22.5%]',
							itemIdx === 2 && 'right-[42%] top-[22.5%]',
							itemIdx === 3 && 'right-[55%] top-[5%]'
						) }
					>
						{ item }
					</m.div>
				);
			}) }

			<m.div
				style={ { opacity: opacityDescription } }
				className='absolute right-[12%] bottom-[50%] translate-y-1/2 w-full text-center -rotate-90 max-w-[48.906vw] mx-auto'
			>
				<SectionDescription>
					{ landingData.frachiseProgram.description }
				</SectionDescription>
			</m.div>
		</m.div>
	);
};

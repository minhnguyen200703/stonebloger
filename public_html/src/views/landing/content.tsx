'use client';

import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

import BackdropSvg from './backdrop-svg';
import FranchiseProgram from './franchise-program';
import HeroPrimary from './hero-primary';
import HeroSecondary from './hero-secondary';
import OurService from './our-service';

const Content: React.FC = () => {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	/** Blue background on the first Hero */
	const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

	return (
		<div
			ref={ targetRef }
			className='relative z-0 h-[900vh] flex w-full'>
			<div className='sticky top-0 h-screen w-full bg-white'>
				<m.div className='absolute left-0 right-0 overflow-hidden z-0'>
					<BackdropSvg scrollYProgress={ scrollYProgress } />
				</m.div>
				<m.div
					style={ {
						opacity: backgroundOpacity,
						background:
              'linear-gradient(-90deg, #00A3FF 0%, #007AE6 7%, #0055CE 16%, #0036BB 24%, #001EAC 33%, #000DA2 42%, #00039B 53%, #00009A 65%)',
					} }
					className='absolute left-0 inset-y-0 w-screen lg:w-[55vw] h-full -z-10'
				/>

				<HeroPrimary scrollYProgress={ scrollYProgress } />

				<HeroSecondary scrollYProgress={ scrollYProgress } />

				<OurService scrollYProgress={ scrollYProgress } />

				<FranchiseProgram scrollYProgress={ scrollYProgress } />
			</div>
		</div>
	);
};

export default Content;

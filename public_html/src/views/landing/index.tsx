import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

import Content from './content';

const LandingViews: React.FC = () => {
	return (
		<div className='relative'>
			<Navbar />
			<Content />
			<div className='grid h-[15vw]' />
			<Footer />
		</div>
	);
};

export default LandingViews;

import React from 'react';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import '@/styles/about.css';

const AboutPage = () => {
	return (
		<div className='relative'>
			<Navbar />
			<section className='about-us-section'>
				<div className='about-us-header'>
					<div className='header-overlay'>
					<h1 style={{ fontSize: '2.5rem' }}>About Us</h1>
					</div>
				</div>
				<div className='about-us-content'>
					<p>At STONE Accounting Group, our mission is to deliver exceptional financial services with integrity, accuracy, and dedication. We strive to empower our clients by providing expert guidance, personalized solutions, and proactive support. Our reputation is built on developing long-term partnerships with a loyal base of clients, fostering relationships built on trust and mutual success. With local experts in each area, we ensure our clients receive tailored support and guidance customized to their specific needs.</p>
					<p>Through our commitment to excellence and innovation, we aim to make a positive impact on the financial health and prosperity of our clients and communities.</p>
				</div>
			</section>
			<Footer />

		</div>
	)
};

export default AboutPage;

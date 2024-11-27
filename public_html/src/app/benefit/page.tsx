import React from 'react';
import Footer from '@/components/footer';

import Navbar from '@/components/navbar';
import '@/styles/base.css';

import '@/styles/benefit.css';

const BenefitPage = () => {
	return (
		<div className='relative'>
			<Navbar />
			<main>
        <section className="value-section">
        <h1 style={{ fontSize: '2.5rem' }}>Client Benefits</h1>

            <div className="item-card left number">

                <h2>01</h2>
                <div className="header left">
                    <h3>Accessibility</h3>
                </div>

            </div>

            <div className="item-card right text">
                <div className="text-content">
                    <p>With a global vision, we transcend geographical boundaries, connecting diverse markets and fostering collaboration. Our global perspective reflects our commitment to expanding opportunities and making a positive impact on a global scale. With local experts in each area, we ensure that our clients receive tailored support and guidance, customized to their specific needs.</p>
                </div>
            </div>

            <div className="item-card right number">
                <h2>02</h2>
                <div className="header right">
                    <h3>Team Empowerment</h3>
                </div>
                
            </div>

            <div className="item-card left text">
                <div className="text-content">
                    <p>We believe in the strength of our team. We empower our professionals to excel by fostering a collaborative and supportive environment that encourages growth, creativity, and a commitment to excellence.</p>
                </div>
               
            </div>

            <div className="item-card left number">
                <h2>03</h2>
                <div className="header left">
                    <h3>Client-Centric Excellence</h3>
                </div>
               
            </div>
            
            <div className="item-card right text">
                <div className="text-content">
                    <p>Our commitment to clients is unwavering. We prioritize client needs, providing exceptional service that goes beyond expectations, and fostering lasting relationships built on trust and integrity.</p>
                </div>
               
            </div>
            
            <div className="item-card right number">
                <h2>04</h2>
                <div className="header right">
                    <h3>Efficiency</h3>
                </div>
               
            </div>
            
            <div className="item-card left text">
                <div className="text-content">
                    <p>We prioritize efficiency in all aspects of our operations. Through streamlined processes and a commitment to excellence, we aim to deliver services that exceed expectations and optimize client and franchisee experiences.</p>
                </div>
               
            </div>
            
            <div className="item-card left number">
                <h2>05</h2>
                <div className="header left">
                    <h3>Flexibility</h3>
                </div>
               
            </div>
            
            <div className="item-card right text">
                <div className="text-content">
                    <p>Recognizing the importance of work-life balance, we champion flexible work practices that empower our team members to achieve professional success while maintaining fulfilling lifestyles.</p>
                </div>
               
            </div>
        </section>
    </main>
			<Footer />

		</div>
	)
};

export default BenefitPage;

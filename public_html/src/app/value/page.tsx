import React from 'react';
import Footer from '@/components/footer';

import Navbar from '@/components/navbar';

import '@/styles/base.css';
import '@/styles/value.css';

const ValuePage = () => {
	return (
		<div className='relative'>
			<Navbar />
            <main>
			<section className="value-section">
            <h1 style={{ fontSize: '2.5rem' }}>Our Values</h1>

            <div className="value-card left">
                <div className="circle">
                    <h2>01</h2>
                    <span>Global Perspectivewith Local Expertise</span>
                    
                </div>
                <div className="value-content">
                    With a global vision, we transcend geographical boundaries, connecting diverse markets and fostering collaboration. Our global perspective reflects our commitment to expanding opportunities and making a positive impact on a global scale. With local experts in each area, we ensure that our clients receive tailored support and guidance, customized to their specific needs.
                </div>
            </div>

            <div className="value-card right">
                <div className="circle">
                    <h2>02</h2>
                    <span>Innovation</span>
                    
                </div>
                <div className="value-content">
                    <p>We embrace a culture of continuous innovation, leveraging cutting-edge technology to redefine traditional accounting practices and deliver solutions that set industry standards.</p>
                </div>
            </div>

            <div className="value-card left">
                
                <div className="circle">
                    <h2>03</h2>
                    <span>Economic Empowerment</span>
                    
                </div>
                <div className="value-content">
                    <p>We are dedicated to empowering businesses and individuals economically, making financial services accessible, and creating pathways for success through our innovative approaches.</p>
                </div>
            </div>

            <div className="value-card right">
                
                <div className="circle">
                    <h2>04</h2>
                    <span>Community Impact</span>
                    
                </div>
                <div className="value-content">
                    <p>Beyond financial expertise, we actively contribute to the well-being and development of the communities we serve, reflecting our dedication to making a positive and meaningful impact through acts of philanthropy to those in need.</p>
                </div>
            </div>

            <div className="value-card left">
                
                <div className="circle">
                    <h2>05</h2>
                    <span>Integrity</span>
                    
                </div>
                <div className="value-content">
                    <p>Integrity is the cornerstone of our brand. We conduct business with honesty, transparency, and accountability, upholding the highest ethical standards in all our interactions.</p>
                </div>
            </div>
        </section>
        </main>
			<Footer />

		</div>
	)
};

export default ValuePage;

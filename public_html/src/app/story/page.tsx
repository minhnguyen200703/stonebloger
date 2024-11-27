import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

import '@/styles/base.css';
import '@/styles/story.css';

const StoryPage = () => {
	return (
		<div className='relative'>
			<Navbar/>
            <main>
			<section className="story-section">
            <div className="story-header">
                <p>Started in Victoria, Australia, Rodney Stone, and Lydia Atwell, both distinguished chartered accountants certified by Chartered Accountants Australia and New Zealand, envisioned a new era in financial services. Their journey began with a shared passion for excellence and a commitment to redefining the accounting experience for clients worldwide.</p>
            </div>
            <div className="story-title">
            <h1 style={{ fontSize: '2.5rem' }}>The Story of STONE</h1>
            </div>
            <div className="story-content">
                <p>Rodney, with his sharp business acumen, and Lydia, with her meticulous attention to detail, joined forces to establish STONE Accounting Group in 2017. From its humble beginnings in Portland, Victoria, Australia, the firm quickly gained recognition for its innovative approach and unwavering dedication to client success. As the demand for their services grew, Rodney and Lydia recognized the need to expand their reach beyond borders. With a bold vision in mind, they strategically set up an office in the dynamic urban landscape of Ho Chi Minh City, Vietnam. This move not only allowed them to tap into new markets but also showcased their commitment to providing personalized accounting and advisory services across nations.</p>

                <figure>
                    <img src="/images/story.jpg" alt="Rodney Stone - Executive Director at STONE Accounting Group" className="story-image" /> 
                    <figcaption>Mr. Rodney Stone - Executive Director at STONE Accounting Group</figcaption>
                </figure>

                <p>Back in Victoria, Australia, Lydia oversees the Head Office operations, ensuring that the firm stays true to its core values of integrity, accuracy, and dedication. Her leadership and expertise serve as the guiding light for the entire team, driving them toward excellence in every endeavor. Meanwhile, Rodney spearheads the operations in Ho Chi Minh City, bringing his unique perspective and local insights to the table. His presence in Vietnam not only strengthens the firm's global presence but also allows it to better serve clients in the Asia-Pacific region.</p>

                <p>With a relentless pursuit of growth and innovation, STONE Accounting Group is set to establish more offices in strategic locations, including Sydney, Melbourne, Brisbane, Adelaide and beyond. These upcoming offices will further solidify the firm's commitment to providing top-notch accounting and advisory services tailored to the unique needs of clients across the globe.</p>
            </div>
        </section>
        </main>
			<Footer />

		</div>
	)
};

export default StoryPage;

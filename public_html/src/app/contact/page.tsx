"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/base.css';
import '@/styles/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});
	const [status, setStatus] = useState('');
	
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	  ) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	  
	  
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			// Send email via EmailJS
			const result = await emailjs.send(
				'service_2asll6a',  // Replace with your EmailJS service ID
				'template_bycrwai',  // Replace with your EmailJS template ID
				formData,
				'3daf8wIq7jRRTCyxQ'       // Replace with your EmailJS user ID (public key)
			);
			console.log('Email sent successfully:', result.text);

			// Reset the form after successful submission
			setFormData({
				name: '',
				lastName: '',
				email: '',
				phone: '',
				message: '',
			});
		} catch (error) {
			console.error('Failed to send the message:');
		}
	};

	return (
		<div className='relative'>
			<Navbar />
			<main>
				<div className="contact">
					<div className="contact_content">
						<h1>Get in touch with <br /> STONE Accounting Group!</h1>
						<p className="contact_content-desc">Questions, comments, or suggestions?<br />
							Simply fill in the form and we’ll be in touch shortly.</p>

						<div className="contact_info">
							<div className="contact_info-item">
								<div className="icon">
								<FontAwesomeIcon icon={faPhone} aria-hidden="true" />
								</div>
								<div className="text">
									<p>(+61) 355 231 234</p>
								</div>
							</div>
							<div className="contact_info-item">
								<div className="icon">
								<FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
								</div>
								<div className="text">
									<p style={{ textDecoration: 'underline' }}>hello@stoneaccounting.com.au</p>
								</div>
							</div>
						</div>
					</div>

					<div className="contact_form">
						<form onSubmit={handleSubmit}>
							<div className="input_box contact_form-name">
								<input
									type="text"
									name="name"
									placeholder="Name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
								<input
									type="text"
									name="lastName"
									placeholder="Last Name"
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input_box contact_form-email">
								<input
									type="email"
									name="email"
									placeholder="Email*"
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input_box contact_form-phone">
								<input
									type="text"
									name="phone"
									placeholder="Phone Number"
									value={formData.phone}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input_box contact_form-message">
								<textarea
									name="message"
									placeholder="Your message..."
									value={formData.message}
									onChange={handleChange}
									required
								></textarea>
							</div>
							<div className="input_box contact_form-submit">
								<button type="submit">SEND</button>
							</div>
						</form>
						{status && <p>{status}</p>}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default ContactPage;

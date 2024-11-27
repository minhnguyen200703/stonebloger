"use client"; // This tells Next.js that this is a client component

import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/base.css';
import '@/styles/franchise.css';

const FranchisePage = () => {
    useEffect(() => {
        const scrollToElement = (element: HTMLElement) => {
            if (element) {
                const offset = window.innerHeight / 2 - element.clientHeight / 2;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        const handleHashLinkClick = (e: Event) => {
            const target = e.currentTarget as HTMLAnchorElement;
            const hash = target.hash;

            if (hash) {
                const targetElement = document.querySelector(hash) as HTMLElement | null;
                if (targetElement) {
                    e.preventDefault(); // Prevent the default scrolling behavior
                    scrollToElement(targetElement); // Scroll to the middle of the page
                }
            }
        };

        const handleIconClick = (icon: HTMLElement) => {
            const benefitId = icon.getAttribute('data-benefit');
            if (benefitId) {
                const targetElement = document.getElementById(benefitId);
                if (targetElement) {
                    // Remove active class from all icons
                    document.querySelectorAll('.icon').forEach(item => item.classList.remove('active'));
                    // Add active class to clicked icon
                    icon.classList.add('active');

                    // Remove active class from all benefit contents
                    document.querySelectorAll('.benefit-content').forEach(content => content.classList.remove('active'));

                    // Add active class to the corresponding benefit content
                    targetElement.classList.add('active');

                    // Scroll the element to the center of the viewport
                    scrollToElement(targetElement);
                }
            }
        };

        // Scroll to the hash on initial load
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash) as HTMLElement | null;
            if (targetElement) {
                scrollToElement(targetElement); // Scroll to the middle of the page
            }
        }

        // Attach event listener to all links with hash
        const hashLinks = document.querySelectorAll('a[href^="#"]');
        hashLinks.forEach(link => {
            link.addEventListener('click', handleHashLinkClick);
        });

        // Attach event listener to all icons
        const icons = document.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.addEventListener('click', () => handleIconClick(icon as HTMLElement));
        });

        return () => {
            // Clean up event listeners
            hashLinks.forEach(link => {
                link.removeEventListener('click', handleHashLinkClick);
            });
            icons.forEach(icon => {
                icon.removeEventListener('click', () => handleIconClick(icon as HTMLElement));
            });
        };
    }, []);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm('service_wu2vnsl', 'template_1gp6g2g', e.target as HTMLFormElement, '3daf8wIq7jRRTCyxQ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        (e.target as HTMLFormElement).reset(); // Optionally reset the form after submission
    };

    return (
        <div className='relative'>
            <Navbar />
            <main>
                <section className="franchise-section">
                    <div id="overview" className="franchise-content">
                        <div className="franchise-content-header">
                            <h1 style={{ fontSize: '2.5rem' }}>Franchise Program</h1>
                        </div>
                        <div className="franchise-content-item">
                            <p>As industry leaders with decades of experience, the team at STONE Accounting Group understands the demanding nature of accounting work. Our franchisee model is designed to provide unparalleled flexibility and autonomy.</p>
                            <p>Unlike rigid, systematized workflows, STONE Accounting Group franchisees enjoy the freedom to manage their time and client responsibilities according to their personal and professional needs. Whether it’s setting their own office hours, taking extended vacations, or delegating administrative tasks to support staff, franchisees can structure their days around their priorities.</p>
                            <p>This level of control helps franchisees avoid burnout common in traditional accounting practices. Instead, they can focus on building meaningful client relationships, optimizing efficiency with the latest financial technologies, and growing a sustainable business.</p>
                            <p>With a business model built on steady, predictable cash flow, franchisees can enjoy security and profitability often unattainable in other start-up ventures. It’s an opportunity to establish a foothold in a thriving industry, supported by an industry-leading franchise system that knows accounting inside and out.</p>
                        </div>
                    </div>

                    <div id='benefit' className="benefits-icons">
                        <div className="icon" data-benefit="financial-tech">
                            <p>Access to Latest Financial Technologies</p>
                        </div>
                        <div className="icon" data-benefit="flexibility">
                            <p>Flexibility & Autonomy</p>
                        </div>
                        <div className="icon" data-benefit="support">
                            <p>Industry-Leading Support</p>
                        </div>
                        <div className="icon" data-benefit="network">
                            <p>Extensive Network & Professional Development</p>
                        </div>
                    </div>

                    <div className="benefit-details">
                        <div id="financial-tech" className="benefit-content">
                            <ul>
                                <li><strong>Benefit from advanced financial technologies</strong>, ensuring accessibility and efficiency in managing accounting practices</li>
                                <li>Xero Tax Software Provided</li>
                                <li><strong>Access to our Franchisee Portal</strong> for a wealth of resources, standard documents, standard spreadsheets, checklists, branding tools, etc</li>
                            </ul>
                        </div>
                        <div id="flexibility" className="benefit-content">
                            <ul>
                                <li><strong>Freedom to choose work hours and location</strong>, allowing for a personalized work-life balance, creating your own lifestyle</li>
                                <li><strong>Access to over 250 fully trained and ready-to-go accountants</strong> for one-off tasks, overflow work, regular bookkeeping and compliance tasks, or more permanent arrangements</li>
                                <li>Locations currently available in all states for founding franchisees</li>
                            </ul>
                        </div>
                        <div id="support" className="benefit-content">
                            <ul>
                                <li><strong>Technical Support Service</strong> from Head Office - with fast turnaround time</li>
                                <li><strong>Comprehensive Induction Programme</strong> for new franchisees to ensure appropriate support and good habits are formed for success</li>
                                <li><strong>Assistance with becoming a registered Tax Agent</strong> in your own right through our Tax Agent Accelerator Programme</li>
                                <li><strong>Marketing and branding advice</strong> for assistance with your promotional activities</li>
                                <li><strong>1st year of Professional Indemnity Insurance included</strong></li>
                            </ul>
                        </div>
                        <div id="network" className="benefit-content">
                            <ul>
                                <li><strong>Join a group with leadership of more than 30 years' experience</strong> in starting, building, growing, acquiring, and merging successful accounting practices</li>
                                <li><strong>Become part of a network with memberships and registrations</strong> such as Member of the Institute of Chartered Accountants in Australia and New Zealand, ICOANZ Certificate of Public Practice, Registered Tax Agent with the ATO, Registered Agent with ASIC, member of the Xero Partner Programme</li>
                                <li><strong>Franchisee welcome pack consisting of</strong> Business Cards, Branded Pens, Branded Coffee Mugs, Branded Mouse Pads, Branded Tote Bags</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Franchise Inquiry Section */}
                <div id='application' className="inquiry text-white py-12 px-4 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start justify-around">
                    <div style={{ textAlign: 'left' }} className="mb-8 lg:mb-0 lg:max-w-[50%]">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            To be a part of the program or further for any requests, leave your email below.
                        </h2>
                        <p className="text-sm lg:text-base">
                            The team at STONE will guide you through the process by first filling out our Franchise Inquiry Form, provide additional information regarding the Franchise Program that get you ready for the next steps.
                        </p>
                    </div>
                    <form
                        className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg w-full lg:w-auto"
                        onSubmit={sendEmail}
                    >
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Enter your email here"
                            required
                            className="text-gray-600 placeholder-gray-400 flex-grow px-4 py-2 bg-transparent focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-700 text-white font-bold py-2 px-6 rounded-full ml-4"
                        >
                            SEND
                        </button>
                    </form>

                </div>

                {/* Horizontal Line */}
                <hr className="border-t-2 border-white opacity-50" />

            </main>
            <Footer />
        </div>
    );
};

export default FranchisePage;

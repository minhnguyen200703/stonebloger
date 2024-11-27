"use client"; // Ensure this component is treated as a client-side component

import React, { useEffect } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/base.css';
import '@/styles/services.css';

const ServicesPage = () => {
    useEffect(() => {
        const menuItems = document.querySelectorAll('.services-menu li');
        const serviceContents = document.querySelectorAll('.service-content');
    
        const activateTab = (service:string) => {
            menuItems.forEach(item => item.classList.remove('active'));
            serviceContents.forEach(content => content.classList.remove('active'));
    
            const activeMenuItem = Array.from(menuItems).find(item => item.getAttribute('data-service') === service);
            if (activeMenuItem) {
                activeMenuItem.classList.add('active');
            }
    
            const serviceElement = document.getElementById(service);
            if (serviceElement) {
                serviceElement.classList.add('active');
            }
        };
    
        const initialHash = window.location.hash.substring(1); // Get the initial hash without the '#'
        activateTab(initialHash || 'accounting'); // Default to 'accounting' if no hash
    
        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', function (event) {
              event.preventDefault(); // Prevent the default scrolling behavior
              const serviceId = menuItem.getAttribute('data-service');
              if (serviceId) {
                activateTab(serviceId);
              }
            });
          });
          
    
        return () => {
            menuItems.forEach(menuItem => {
                menuItem.removeEventListener('click', function () {
                    // Clean up logic here if needed
                });
            });
        };
    }, []);
    

    return (
        <div className='relative'>
            <Navbar />
            <main>
            <section className="services-section">
            <h1 style={{ fontSize: '2.5rem' }}>Our Services</h1>
                <div className="container">
                    <div className="services-menu-container">
                        <ul className="services-menu">
                            <ul style={{ listStyle: 'none' }}>
                                <li data-service="accounting">Accounting</li>
                                <li data-service="taxation">Taxation</li>
                            </ul>
                            <ul style={{ listStyle: 'none' }}>
                                <li data-service="business-advisory">Business Advisory</li>
                                <li data-service="others">Others</li>
                            </ul>
                        </ul>
                    </div>  
                    <div className="services-content-container">
                        <div id="accounting" className="service-content">
                            <ul>
                                <li><strong>Bookkeeping</strong> - Managing financial records, transactions, and reconciliations.</li>
                                <li><strong>Financial Reporting</strong> - Preparing financial statements (balance sheets, income statements, cash flow statements).</li>
                                <li><strong>Payroll Processing</strong> - Handling employee wages, taxes, and superannuation contributions.</li>
                                <li><strong>Budgeting and Forecasting</strong> - Assisting with financial planning and projections.</li>
                                <li><strong>Management Accounting</strong> - Providing insights for decision-making within the business.</li>
                            </ul>
                        </div>
                        <div id="taxation" className="service-content">
                            <ul>
                                <li><strong>Income Tax Returns</strong> - Preparation and lodgment of annual tax returns for individuals and businesses.</li>
                                <li><strong>Goods and Services Tax (GST)</strong> - Advising on GST compliance and reporting.</li>
                                <li><strong>Fringe Benefits Tax (FBT)</strong> - Managing benefits provided to employees.</li>
                                <li><strong>Capital Gains Tax (CGT)</strong> - Calculating tax on asset sales.</li>
                                <li><strong>Tax Planning</strong> - Comprehensive strategizing to minimize tax liabilities in accordance with tax laws.</li>
                            </ul>
                        </div>
                        <div id="business-advisory" className="service-content">
                            <ul>
                                <li><strong>Business Structure Advice</strong> - Recommending suitable legal structures (e.g., sole trader, company, trust).</li>
                                <li><strong>Cash Flow Management</strong> - Assisting with cash flow optimization.</li>
                                <li><strong>Business Valuation</strong> - Evaluating the worth of a business.</li>
                                <li><strong>Strategic Planning</strong> - Developing growth strategies and business goals.</li>
                                <li><strong>Economic and Project Evaluations</strong> - Assessing economic conditions and evaluating the viability of projects.</li>
                                <li><strong>Risk Management</strong> - Identifying and mitigating business risks.</li>
                            </ul>
                        </div>
                        <div id="others" className="service-content">
                            <ul>
                                <li><strong>Self Managed Superannuation Fund</strong> - A full suite of services tailored so that you can take control of your retirement savings. Setup, Administration, Tax Return Preparation, Lodgement, Audit, and all other compliance related services.</li>
                                <li><strong>Outsourced Accounting Services and Labour Hire</strong> - Through our access to a pool of reliable, fully trained, accountants and administration assistants, we can arrange productive, efficient, and cost-effective solutions for individual tasks, regular compliance tasks, work overflow, or more permanent arrangements tailored to your needs.</li>
                                <li><strong>Special Project Work</strong> - We have an in-depth understanding of the following industries where we have worked with some of the globes major organisations to assist them to realise their goals and gain a greater understanding of their business so that they can make more meaningful decisions.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            </main>
			<Footer />

        </div>
    );
};

export default ServicesPage;

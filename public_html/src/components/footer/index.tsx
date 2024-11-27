import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

import footerData from '@/constant/data/footer';

const Footer: React.FC = () => {
	return (
		<footer
			aria-labelledby='footer-heading'
			className='bg-primary relative z-10'>
			<div className='container-center w-full h-full pt-16 pb-24 sm:py-24 lg:pt-[96px] lg:pb-[125px]'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8'>
					{footerData.list.map((footer) => (
						<div
							key={footer.name}
							className='flex flex-col max-sm:items-center max-sm:text-center'
						>
							<h3 className='text-base sm:text-2xl xl:text-3xl 3xl:text-[40px] font-bold 3xl:leading-[57px] text-white tracking-[0.005em]'>
								{footer.name}
							</h3>
							<ul className='mt-[15px] space-y-1'>
								{footer.items?.map((item: NavMenuItem) => (
									<li
										key={item.name}
										className='flex items-center gap-2 sm:gap-3.5 max-sm:justify-center'
									>
										<i className="bi bi-chevron-right text-lilac" style={{ color: '#47B2E4' }}></i>
										{item.image && (
											<Image
												src={item.image}
												alt=''
												width={40}
												height={40}
												className='w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 flex-shrink-0'
											/>
										)}
										<Link
											href={item.href}
											className='text-sm sm:text-base 3xl:text-2xl text-lilac hover:text-white'
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
							{footer.name.toLowerCase().includes('contact') && (
								<div className='mt-[37px] flex items-center gap-2 xl:gap-3 lg:-ml-3'>
									{footerData.socmed.map((socmed) => (
										<div key={socmed.type}>
											<Link href={socmed.href} target='_blank'>
												<Image
													src={socmed.image}
													width={64}
													height={64}
													alt={socmed.type}
													className='w-16 h-16 3xl:w-20 3xl:h-20'
												/>
											</Link>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className='pb-[30px] flex text-center justify-center container-center'>
				<p className='text-[#737373] text-xs sm:text-sm !leading-6 tracking-0.014em'>
					{footerData.copyright}
				</p>
			</div>
		</footer>
	);
};

export default Footer;

"use client";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";

import "@/styles/article-detail.css";
import Link from "next/link";
import { menuItems } from "@/constant/data/news";

const page = ({ params }: any) => {
	const [news, setNews] = useState<any>();

	useEffect(() => {
		const handelFetchApi = async () => {
			try {
				const response = await fetch(`http://localhost:1968/new/` + params.id);
				const data = await response.json();
				setNews(data?.data);
			} catch (error) {
				//
			}
		};
		handelFetchApi();
	}, []);
	const calculateTimeAgo = (createdDate: any) => {
		const now: any = new Date();
		const created: any = new Date(createdDate);
		const diffInSeconds = Math.floor((now - created) / 1000);

		// Tính số phút, giờ, ngày, v.v.
		if (diffInSeconds < 60) {
			return `${diffInSeconds} seconds ago`;
		} else if (diffInSeconds < 3600) {
			// less than 1 hour
			const minutes = Math.floor(diffInSeconds / 60);
			return `${minutes} minutes ago`;
		} else if (diffInSeconds < 86400) {
			// less than 1 day
			const hours = Math.floor(diffInSeconds / 3600);
			return `${hours} hours ago`;
		} else if (diffInSeconds < 2592000) {
			// less than 30 days
			const days = Math.floor(diffInSeconds / 86400);
			return `${days} days ago`;
		} else if (diffInSeconds < 31536000) {
			// less than 1 year
			const months = Math.floor(diffInSeconds / 2592000);
			return `${months} months ago`;
		} else {
			// more than 1 year
			const years = Math.floor(diffInSeconds / 31536000);
			return `${years} years ago`;
		}
	};

	return (
		<div>
			<div className="bg-white mb-5 relative">
				<div className="h-[720px]">
					<header className="flex justify-between items-center p-4  relative z-50">
						<Link href="/" className="flex items-center">
							<img
								src="/images/logo/logo.webp"
								alt="Company Logo"
								className="mr-2 w-[140px]"
							/>
						</Link>
						<nav className="flex space-x-4">
							{menuItems.map((item) => {
								const { name, href } = item;
								console.log("href: ", href);
								return (
									<Link
										href={href}
										className={`${
											href === "/news" ? "text-[#6D6E71]" : "text-white"
										} font-medium`}
									>
										{name}
									</Link>
								);
							})}

							<a href="#" className="text-gray-700">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 15.75L19.5 19.5M10.5 17.25A6.75 6.75 0 1010.5 3.75a6.75 6.75 0 000 13.5z"
									/>
								</svg>
							</a>
						</nav>
					</header>
					<section className="absolute top-0 w-full">
						<img
							src={`http://localhost:1968/${news?.image}`}
							alt="Main News Image"
							className="w-full h-[700px] object-cover"
						/>
					</section>
				</div>
				<main className="article-detail">
					<section className=" mx-20">
						<div className="relative">
							<div className="bg-white">
								<h1 className="font-bold">
									{news?.title}
								</h1>
								<div className="flex items-center text-gray-500 mt-2 mb-[107px]">
									<span className="mr-4">
										{calculateTimeAgo(news?.createdDate)} mins ago
									</span>
									<span>2 min read</span>
									<div className="flex ml-auto space-x-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M7.5 12h9M12 7.5l4.5 4.5-4.5 4.5"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5.25 5.25v13.5l5.25-2.625L15.75 18.75V5.25M5.25 5.25h13.5"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6.75 12h10.5m-10.5 4.5h10.5m-10.5-9h10.5"
											/>
										</svg>
									</div>
								</div>
							</div>
							<article className="article-content">
								<div
									dangerouslySetInnerHTML={{
										__html: news?.detail || "",
									}}
									className="text-base text-justify prose max-w-full"
								/>
							</article>
						</div>
					</section>
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default page;

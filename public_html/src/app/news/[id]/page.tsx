"use client";
import { useEffect, useState } from "react";

import "@/styles/article-detail.css";
import { env } from "@/config/env.configs";

const page = ({ params }: any) => {
	const [news, setNews] = useState<any>();

	useEffect(() => {
		const handelFetchApi = async () => {
			try {
				const response = await fetch(`${env.API_URL}/new/` + params.id);
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
		<main className="article-detail pb-5">
			<section className="relative">
				<img
					src={`${env.API_URL}/${news?.image}`}
					alt="Main News Image"
					className="w-full h-full object-cover"
				/>
			</section>
			<section className="mx-20 mt-5">
				<div className="relative" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1200px" }}>
					<div className="bg-white">
						<h1 className="font-bold">{news?.title}</h1>
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
	);
};

export default page;

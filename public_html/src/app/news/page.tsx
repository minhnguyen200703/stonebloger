"use client";

import { getCategories } from "@/apis/category.api";
import { getNews } from "@/apis/news.api";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { env } from "@/config/env.configs";
import { menuItems } from "@/constant/data/news";
import { Empty, Pagination, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PAGE_SIZE = 8;

const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "Australia/Sydney",
	};
	return new Intl.DateTimeFormat("en-AU", options).format(new Date(dateString));
};

const page = () => {
	const [firstNews, setFirstNew] = useState<any>(null);
	const [news, setNews] = useState<any>([]);
	const [isLoadingNews, setIsLoadingNews] = useState(false);
	const [categories, setCategories] = useState<any>([]);
	const [selectedCatIdx, setSelectedCatIdx] = useState(0);
	const [currentDate, setCurrentDate] = useState<string>(""); // Track current date
	const router = useRouter();

	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	// Fetch current date on component mount
	useEffect(() => {
		setCurrentDate(formatDate(new Date().toISOString()));
	}, []);

	// API: Query news data
	useEffect(() => {
		const handelFetchApi = async () => {
			setIsLoadingNews(true);
			try {
				const categoryId = categories?.[selectedCatIdx]?._id;
				const data = await getNews({
					start: currentPage,
					limit: PAGE_SIZE,
					categoryId,
				});
				setTotal(data?.total);
				const dataB = data?.data.sort(
					(a: any, b: any) =>
						new Date(b.createdDate).getTime() -
						new Date(a.createdDate).getTime()
				);
				// TODO: If CATEGORY ID has value, then we don't set state
				if (!categoryId) {
					setFirstNew(dataB?.[0]);
				}
				setNews(dataB);

				setIsLoadingNews(false);
			} catch (error) {
				setIsLoadingNews(false);
			}
		};
		handelFetchApi();
	}, [currentPage, selectedCatIdx, categories]);

	// API: Query categories
	useEffect(() => {
		const PAGE = 1;
		const handelFetchApi = async () => {
			try {
				const data = await getCategories({ start: PAGE, limit: PAGE_SIZE });
				setCategories([{ name: "All", _id: undefined }, ...data?.data]);
			} catch (error) {
				//
			}
		};
		handelFetchApi();
	}, []);

	const render = (image: any) => {
		return `${env.API_URL}/${image}`;
	};

	return (
		<main className="mt-[80px]">
			<section className="text-center py-4">
				<h1
					style={{ color: "#0419DC", marginBottom: 0 }}
					className="text-8xl font-bold text-blue-600"
				>
					News
				</h1>
				<p className="text-black font-bold mt-2">{currentDate}</p>
			</section>
			<section className="relative">
				<img
					src={firstNews?.image ? render(firstNews?.image) : "/image.png"}
					alt="Main News Image"
					className="w-[1920px] h-full"
				/>
				<div
					className="absolute inset-0 flex flex-col justify-center text-white p-4"
					style={{ marginRight: "6rem", marginLeft: "6rem" }}
				>
					<h2 className="text-4xl font-bold hidden absolute bottom-[160px]">
						{firstNews?.title}
					</h2>

					<p className="mt-4 absolute hidden bottom-[100px] pl-3">
						{firstNews?.content
							? `${firstNews.content.split(" ").slice(0, 200).join(" ")}...`
							: "Content not available."}
					</p>
				</div>
			</section>

			<section className="p-8 mx-24">
				<div className="flex justify-start space-x-4 mb-4 border-b border-[#222222] w-[570px]">
					{categories?.length > 0 &&
						categories?.map((item: any, index: number) => {
							const { name } = item || {};
							const active = categories?.[selectedCatIdx]?._id === item?._id;
							return (
								<a
									onClick={(e) => {
										e.preventDefault();
										setSelectedCatIdx(index);
									}}
									className={`${index === 0
										? "border-l-4 bg-[#6D6E71] border-[#0419DC] text-white cursor-pointer hover:font-bold active:font-bold"
										: active
											? "text-black font-bold border-b-2 border-[#0419DC] bg-transparent cursor-pointer"
											: "text-black font-normal bg-transparent border-b-2 border-transparent cursor-pointer hover:font-bold"
										}`}
									style={{
										marginLeft: 0,
										marginRight: 0,
										paddingLeft: index === 0 ? "1rem" : "1.5rem",
										paddingRight: index === 0 ? "4rem" : "1.5rem",
									}}
								>
									{name}
								</a>
							);
						})}
				</div>
				<div className="min-h-[50vh] flex flex-col">
					{isLoadingNews && (
						<div className="flex items-center justify-center flex-1">
							<Spin size="large" className="py-5" />
						</div>
					)}
					{!isLoadingNews && news?.length > 0 && (
						<>
							<div className="grid grid-cols-4 gap-[31px] my-[61px]">
								{news?.map((items: any, index: number) => (
									<div
										onClick={() => router.push(`/news/${items?._id}`)}
										key={items?._id}
										className="bg-white cursor-pointer"
									>
										<div className="flex justify-center items-center">
											<img
												src={`${env.API_URL}/${items?.image}`}
												alt="News Image 1"
												className="w-[364px] h-[205px] mb-4 block"
											/>
										</div>
										<h3 className="text-xl font-bold text-clamp mb-5">
											{items?.title}
										</h3>
										<p className="text-gray-500 mt-2">
											{formatDate(items?.createdAt)}
										</p>
									</div>
								))}
							</div>
							<div className="mt-3">
								<hr className="bg-black p-[1px]" />
							</div>
							<div className="flex items-center justify-center space-x-4 mt-10">
								<Pagination
									defaultCurrent={currentPage}
									total={total}
									pageSize={PAGE_SIZE}
									onChange={(page) => {
										setCurrentPage(page);
									}}
									showSizeChanger={false}
								/>
							</div>
						</>
					)}
					{!isLoadingNews && news?.length <= 0 && (
						<div className="flex items-center justify-center flex-1">
							<Empty />
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default page;

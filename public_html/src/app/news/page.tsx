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
const page = () => {
	const [firstNews, setFirstNew] = useState<any>(null);
	const [news, setNews] = useState<any>([]);
	const [isLoadingNews, setIsLoadingNews] = useState(false);
	const [categories, setCategories] = useState<any>([]);
	const [selectedCatIdx, setSelectedCatIdx] = useState(0);
	const router = useRouter();

	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	// API: query news data
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
				// TODO: IF CATEGORY ID HAS VALUE THEN WE DON'T SET STATE
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

	// API: handle query category
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
	const formatDate = (dateString: any) => {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		} as any;
		const date = new Date(dateString);

		return date.toLocaleDateString("en-US", options).toUpperCase();
	};
	const render = (image: any) => {
		console.log('image: ', image);
		return `${env.API_URL}/${image}`;
	};


	return (
		<main className="mt-[80px]">
			<section className="text-center py-4">
				<h1 style={{ color: "#0419DC", marginBottom: 0 }} className="text-8xl font-bold text-blue-600">NEWS</h1>
				<p className="text-gray-500 mt-2">MONDAY | DECEMBER 19, 2022</p>
			</section>
			<section className="relative">
				<img
					src={firstNews?.image ? render(firstNews?.image) : "/image.png"}
					alt="Main News Image"
					className=" w-[1920px] h-[600px]"
				/>
				<div className="absolute inset-0 flex flex-col justify-center text-white p-4" style={{ marginRight: '6rem', marginLeft: '6rem' }}>
					<h2 className="text-4xl font-bold absolute bottom-[160px]">
						{firstNews?.title}
					</h2>

					<p className="mt-4 absolute bottom-[100px] pl-3">
						The called object, which has flown Montana to Kansas, an "intelligence <br /> gathering" balloon. Beijing said it was used mainly for weather research and had strayed off course.
					</p>
				</div>

			</section>
			<section className="bg-gray-300 text-left py-4 mt-12">
				<p className="text-black font-bold text-lg">
					Club Med's values of kindness, freedom, responsibility, and multiculturalism. You’ll connect with diverse cultures, sharpen your professional skills, and enjoy various benefits like travel, lodging, meals, and leisure activities.
				</p>
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
									className={`${active
										? "text-black font-bold border-b-2 border-[#0419DC] bg-transparent px-6 cursor-pointer"
										: "text-black font-normal bg-transparent border-b-2 border-transparent px-6 cursor-pointer hover:font-bold"
										} ${index === 0 ? "border-l-2" : ""}`}
									style={
										index === 0
											? { minWidth: "80px", borderColor: "#0419DC" }
											: undefined
									}
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

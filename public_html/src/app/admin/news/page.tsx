"use client";
import { getNews } from "@/apis/news.api";
import NewsDeleting from "@/components/admin/news/news-deleting";
import PageContent from "@/components/admin/page-content";
import { env } from "@/config/env.configs";
import {
	EditOutlined,
	HomeOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import {
	Breadcrumb,
	Button,
	Pagination,
	Space,
	Table,
	Tooltip,
	Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Title } = Typography;

const PAGE_SIZE = 10;
const Admin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	const [news, setNews] = useState([]);

	const handelFetchApi = async () => {
		try {
			setIsLoading(true);
			const data = await getNews({ start: currentPage, limit: PAGE_SIZE });
			setNews(data?.data);
			setTotal(data?.total);
			setIsLoading(false);
			// console.log(data);
		} catch (error) {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		handelFetchApi();
	}, [currentPage]);
	const dataSource = news?.map((itc: any, index: any) => {
		const order = (currentPage - 1) * PAGE_SIZE + index + 1;
		return {
			stt: order,
			...itc,
			key: itc._id,
			image: itc.image,
		};
	});

	const columns = [
		{
			title: "#",
			dataIndex: "stt",
			key: "stt",
		},
		{
			title: "Tiêu đề",
			dataIndex: "title",
			key: "title",
			render: (title: string) => {
				return <p className="text-clamp max-w-[250px]">{title}</p>;
			},
		},
		{
			title: "Danh mục",
			dataIndex: "category",
			key: "category",
			render: (category: any) => {
				return <p>{category?.name}</p>;
			},
		},
		{
			title: "Hình ảnh",
			dataIndex: "image",
			key: "image",
			render: (image: any) => {
				return <img src={`${env.API_URL}/${image}`} className="w-[100px] h-[100px]" />;
			},
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (image: any) => {
				return <p>{image?.split("T")[0]}</p>;
			},
		},
		{
			title: "Cập nhật lúc",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: any) => {
				return <p>{updatedAt?.split("T")[0]}</p>;
			},
		},
		{
			title: "Thao tác",
			render: (row: any) => {
				return (
					<Space>
						<Tooltip title="Sửa bài viêt">
							<Button
								type="primary"
								icon={<EditOutlined />}
								onClick={() => {
									router.push(`/admin/news/${row?.key}/edit`);
								}}
							/>
						</Tooltip>
						<NewsDeleting
							onRefetchApi={handelFetchApi}
							newsId={row?.key || ""}
						/>
					</Space>
				);
			},
		},
	];
	return (
		<>
			<Breadcrumb style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>
					<Link href="/">
						<HomeOutlined />
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Link href="/admin/news">Bài viết</Link>
				</Breadcrumb.Item>
			</Breadcrumb>
			<PageContent>
				<Title level={3}>Danh sách bài viết</Title>
				<div className="flex justify-end mb-3">
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={() => router.push("/admin/news/add")}
					>
						Thêm bài viết
					</Button>
				</div>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={isLoading}
					pagination={false}
				/>
				<div className="flex justify-end">
					<Pagination
						className="mt-3"
						defaultCurrent={currentPage}
						total={total}
						pageSize={PAGE_SIZE}
						onChange={(page) => {
							setCurrentPage(page);
						}}
						showSizeChanger={false}
					/>
				</div>
			</PageContent>
		</>
	);
};

export default Admin;

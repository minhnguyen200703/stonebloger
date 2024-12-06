"use client";
import { getCategories } from "@/apis/category.api";
import CategoryAdding from "@/components/admin/category/category-adding";
import CategoryEditing from "@/components/admin/category/category-editing";
import PageContent from "@/components/admin/page-content";
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
	const [categories, setCategories] = useState([]);

	const handelFetchApi = async () => {
		try {
			setIsLoading(true);
			const data = await getCategories({
				start: currentPage,
				limit: PAGE_SIZE,
			});
			setCategories(data?.data);
			setTotal(data?.total);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		handelFetchApi();
	}, [currentPage]);
	const dataSource = categories?.map((itc: any, index: any) => {
		const order = (currentPage - 1) * PAGE_SIZE + index + 1;
		return {
			stt: order,
			...itc,
			key: itc._id,
		};
	});

	const columns = [
		{
			title: "#",
			dataIndex: "stt",
			key: "stt",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name: string) => {
				return <p className="text-clamp max-w-[250px]">{name}</p>;
			},
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: any) => {
				return <p>{createdAt?.split("T")[0]}</p>;
			},
		},
		{
			title: "Update At",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: any) => {
				return <p>{updatedAt?.split("T")[0]}</p>;
			},
		},
		{
			title: "Actions",
			render: (row: any) => {
				console.log('row: ', row);
				return (
					<Space>
						<CategoryEditing item={row} onRefetchApi={handelFetchApi} />
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
					<Link href="/admin/news">Post</Link>
				</Breadcrumb.Item>
			</Breadcrumb>
			<div>
			<PageContent>
				<Title level={3}>Post Lists</Title>
				<div className="flex justify-end mb-3" style={{ marginBottom: "20px", marginTop: "20px" }}>
					<CategoryAdding onRefetchApi={handelFetchApi} />
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
			</div>
		</>
	);
};

export default Admin;

"use client";

import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Typography } from "antd";
import NewsForm from "./news-form";
import Link from "next/link";
import PageContent from "@/components/admin/page-content";
const { Title } = Typography;

interface NewsAddingRouteProps {}

const NewsAddingRoute: React.FC<NewsAddingRouteProps> = ({}) => {
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
				<Breadcrumb.Item>
					<span>Sửa bài viết</span>
				</Breadcrumb.Item>
			</Breadcrumb>
			<PageContent>
				<Title level={3}>Sửa bài viết</Title>
				<NewsForm />
			</PageContent>
		</>
	);
};

export default NewsAddingRoute;

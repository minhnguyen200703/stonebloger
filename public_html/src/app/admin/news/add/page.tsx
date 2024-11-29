"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, theme, Typography } from "antd";
import Link from "next/link";
import React from "react";
import NewsForm from "./news-form";
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
					<span>Tạo bài viết</span>
				</Breadcrumb.Item>
			</Breadcrumb>
			<PageContent>
				<Title level={3}>Tạo bài viết</Title>
				<NewsForm />
			</PageContent>
		</>
	);
};

export default NewsAddingRoute;

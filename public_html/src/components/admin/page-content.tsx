"use client";

import { Layout, theme } from "antd";
import React from "react";
const { Content } = Layout;

interface PageContentProps {
	children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Content
			className={`p-[24px] m-0 min-h-[100vh]`}
			style={{
				background: colorBgContainer,
				borderRadius: borderRadiusLG,
			}}
		>
			{children}
		</Content>
	);
};

export default PageContent;

import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import LenisWrapper from "@/components/lenis-scroller/lenis-wrapper";
import "@/styles/app.css";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL('https://stoneaccounting.com.au'), // Set your primary domain
	title: "Stone Accounting Group",
	description:
		"At Stone Accounting Group, our franchisees offer a comprehensive range of Accounting, Taxation, and Business Advisory services.",
	keywords:
		"Accounting Service, Financial Compliance, Business Accounting Solutions, Corporate Tax Services, Accounting Firm, Franchise Accounting Services, Small Business Accounting, Tax Accountants, Innovative Accounting Solutions, Accounting for Startups, Financial Advisory, Tax Planning and Preparation, Bookkeeping Services, Australia",
	openGraph: {
		title: "Stone Accounting Group",
		description:
			"Comprehensive range of Accounting, Taxation, and Business Advisory services.",
		url: "https://www.stoneaccounting.com.au",
		siteName: "Stone Accounting Group",
		images: [
			{
				url: "/images/logo/blue.webp",
				width: 800,
				height: 600,
				alt: "Stone Accounting Group Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: 'history.scrollRestoration = "manual"',
					}}
				/>
			</head>
			<body className="bg-white">
				<AntdRegistry>
					<LenisWrapper>{children}</LenisWrapper>
				</AntdRegistry>
			</body>
		</html>
	);
}

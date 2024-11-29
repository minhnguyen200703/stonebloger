"use client";
import { menuItems } from "@/constant/data/admin/menu-items";
import { Layout, Menu, theme, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const { Header, Sider } = Layout;

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const active = menuItems?.find((item) => pathname.includes(item.url));
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout>
			<Header className="flex fixed w-full z-[10] px-5">
				<Link href="/" className="flex items-center">
					<img
						src="/images/logo/logo.webp"
						alt="Company Logo"
						className="w-[140px]"
					/>
				</Link>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
			</Header>
			<Layout className="app-container">
				<Sider
					width={200}
					className="side-nav pt-5"
					style={{ background: colorBgContainer }}
				>
					<Menu
						mode="inline"
						defaultSelectedKeys={[String(active?.id)]}
						// defaultOpenKeys={["sub1"]}
						style={{ height: "100%", borderRight: 0 }}
					>
						{menuItems.map((item) => {
							return (
								<Menu.Item key={item.id} icon={item.icon} className="px-5">
									<Link href={item.url}>
										<span>{item.name}</span>
									</Link>
								</Menu.Item>
							);
						})}
					</Menu>
				</Sider>
				<Layout
					className="app-layout"
					style={{ padding: "0 24px 24px", marginLeft: 200, marginTop: 64 }}
				>
					{children}
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;

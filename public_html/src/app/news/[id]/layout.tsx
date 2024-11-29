import type { Metadata } from "next";
import React from "react";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const response = await fetch(`http://localhost:1968/new/` + params.id);
	const data = await response.json();
	return {
		title: data?.data?.title,
		description:
			"At Stone Accounting Group, our franchisees offer a comprehensive range of Accounting, Taxation, and Business Advisory services.",
	};
}

export default async function LayoutRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}

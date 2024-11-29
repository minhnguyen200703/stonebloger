import { ReactNode } from "react";
import { Metadata } from "next";
import AdminLayout from "@/components/layout/admin-layout";

interface EmailLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Danh mục bài viết",
};

export default function EmailLayout({ children }: EmailLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}

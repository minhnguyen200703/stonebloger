import { EditOutlined, TagOutlined } from "@ant-design/icons";

export const menuItems = [
  {
    id: "blogs",
    name: "Bài viết",
    icon: <EditOutlined />,
    url: "/admin/news",
  },
  {
    id: "category",
    name: "Danh mục bài viết",
    icon: <TagOutlined />,
    url: "/admin/categories",
  },
];
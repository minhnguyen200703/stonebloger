import { EditOutlined, TagOutlined } from "@ant-design/icons";

export const menuItems = [
  {
    id: "blogs",
    name: "Posts",
    icon: <EditOutlined />,
    url: "/admin/news",
  },
  {
    id: "category",
    name: "Categories",
    icon: <TagOutlined />,
    url: "/admin/categories",
  },
];
"use client";

import React, { useEffect, useState } from "react";
import dynamicImport from "next/dynamic"; // Renamed the import to avoid conflict
import { useRouter } from "next/navigation";
import { LaptopOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Drawer,
  Layout,
  Menu,
  message,
  Space,
  Table,
  theme,
} from "antd";

// Force dynamic rendering for the page
export const runtime = "force-dynamic";

const { Header, Content, Sider } = Layout;

// Dynamically import CKEditor with SSR disabled
const CKEditor = dynamicImport(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), {
  ssr: false,
});

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    detail: "",
  });
  const [checkId, setCheckId] = useState<string | null>(null);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch API data
  const handleFetchApi = async () => {
    try {
      const response = await fetch(`https://stonebloger-be.onrender.com/news`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      message.error("Failed to fetch news.");
    }
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  // Handle drawer open/close
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Handle file input change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData2 = new FormData();
      formData2.append("image", file);

      try {
        const response = await fetch("https://stonebloger-be.onrender.com/upload-image", {
          method: "POST",
          body: formData2,
        });
        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({ ...prev, image: data }));
        } else {
          console.error("Error uploading image:", response.statusText);
          message.error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        message.error("Error uploading image.");
      }
    }
  };

  // Save data
  const handleSave = async () => {
    try {
      if (!checkId) {
        const response = await fetch("https://stonebloger-be.onrender.com/post-news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          message.success("News added successfully!");
          handleFetchApi();
        } else {
          message.error("Failed to add news.");
        }
      } else {
        const response = await fetch(`https://stonebloger-be.onrender.com/edit-news/${checkId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            image: formData.image || dataEdit.image,
          }),
        });
        if (response.ok) {
          message.success("News updated successfully!");
          handleFetchApi();
        } else {
          message.error("Failed to update news.");
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving news:", error);
      message.error("Error saving news.");
    }
  };

  // Table data
  const dataSource = news.map((item, index) => ({
    stt: index + 1,
    key: item._id,
    title: item.title,
    image: `https://stonebloger-be.onrender.com/${item.image}`,
    createdAt: item.createdAt.split("T")[0],
  }));

  const columns = [
    { title: "#", dataIndex: "stt", key: "stt" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="News" style={{ width: 100, height: 100 }} />
      ),
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      render: (record: any) => (
        <Space>
          <Button
            onClick={() => {
              setCheckId(record.key);
              setDataEdit(record);
              showDrawer();
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={async () => {
              if (typeof window !== "undefined" && window.confirm("Are you sure?")) {
                try {
                  const response = await fetch(
                    `https://stonebloger-be.onrender.com/new1/${record.key}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (response.ok) {
                    message.success("News deleted successfully!");
                    handleFetchApi();
                  } else {
                    message.error("Failed to delete news.");
                  }
                } catch (error) {
                  console.error("Error deleting news:", error);
                  message.error("Error deleting news.");
                }
              }
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <LaptopOutlined />,
                label: "Blog Administration",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Button type="primary" onClick={showDrawer}>
              Add News
            </Button>
            <Table dataSource={dataSource} columns={columns} style={{ marginTop: 24 }} />
          </Content>
        </Layout>
      </Layout>
      <Drawer
        title={checkId ? "Edit News" : "Add News"}
        open={open}
        onClose={onClose}
        width={800}
      >
        <div>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{ width: 100, height: 100 }}
            />
          )}
          <CKEditor
            editor={ClassicEditor}
            data={formData.detail}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setFormData({ ...formData, detail: data });
            }}
          />
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default Admin;

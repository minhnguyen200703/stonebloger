"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LaptopOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Layout, Menu, message, Space, Table, theme } from "antd";

const { Header, Content, Sider } = Layout;

// Dynamically import CKEditor and explicitly type it as `any`
const CKEditor: any = dynamic(
  () =>
    import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

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

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://stonebloger-be.onrender.com/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        message.error("Failed to fetch news.");
      }
    };

    fetchNews();
  }, []);

  const handleSave = async () => {
    try {
      const response = checkId
        ? await fetch(`https://stonebloger-be.onrender.com/edit-news/${checkId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, image: formData.image || dataEdit.image }),
          })
        : await fetch("https://stonebloger-be.onrender.com/post-news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

      if (response.ok) {
        message.success(checkId ? "News updated successfully!" : "News added successfully!");
        const refreshNews = async () => {
          const res = await fetch("https://stonebloger-be.onrender.com/news");
          const data = await res.json();
          setNews(data);
        };
        refreshNews();
        setOpen(false);
      } else {
        message.error("Error saving news.");
      }
    } catch (error) {
      message.error("Error saving news.");
    }
  };

  const columns = [
    { title: "#", dataIndex: "stt", key: "stt" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="Preview" style={{ width: 100, height: 100 }} />,
    },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Actions",
      render: (record: any) => (
        <Space>
          <Button onClick={() => { setCheckId(record.key); setDataEdit(record); setOpen(true); }}>Edit</Button>
          <Button
            danger
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete this?")) {
                try {
                  await fetch(`https://stonebloger-be.onrender.com/new1/${record.key}`, { method: "DELETE" });
                  message.success("News deleted successfully!");
                  const refreshNews = async () => {
                    const res = await fetch("https://stonebloger-be.onrender.com/news");
                    const data = await res.json();
                    setNews(data);
                  };
                  refreshNews();
                } catch (error) {
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
              { key: "1", icon: <LaptopOutlined />, label: "Blog Administration" },
            ]}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px", padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Button type="primary" onClick={() => setOpen(true)}>Add News</Button>
            <Table dataSource={news.map((item, index) => ({ ...item, stt: index + 1 }))} columns={columns} style={{ marginTop: 24 }} />
          </Content>
        </Layout>
      </Layout>
      <Drawer
        title={checkId ? "Edit News" : "Add News"}
        open={open}
        onClose={() => setOpen(false)}
        width={800}
      >
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const formData2 = new FormData();
              formData2.append("image", file);
              fetch("https://stonebloger-be.onrender.com/upload-image", { method: "POST", body: formData2 })
                .then((res) => res.json())
                .then((data) => setFormData((prev) => ({ ...prev, image: data })))
                .catch((err) => console.error("Upload failed:", err));
            }
          }}
        />
        {formData.image && (
          <img src={formData.image} alt="Preview" style={{ width: 100, height: 100 }} />
        )}
        <CKEditor
          editor={ClassicEditor}
          data={formData.detail}
          onChange={(event: any, editor: any) => setFormData({ ...formData, detail: editor.getData() })}
        />
        <Button type="primary" onClick={handleSave}>Save</Button>
      </Drawer>
    </Layout>
  );
};

export default Admin;

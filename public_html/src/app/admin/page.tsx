"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Drawer,
  Form,
  Layout,
  Menu,
  message,
  Space,
  Table,
  theme,
} from "antd";

const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });
const ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), { ssr: false });

const { Header, Content, Sider } = Layout;

const Admin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    title: "",
    image: "",
    detail: "",
  });
  const [checkId, setCheckId] = useState(null);
  const [dataEdit, setDataEdit] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState([]);

  const checkAdmin = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    if (!checkAdmin) {
      alert("Bạn không có quyền");
      setTimeout(() => {
        router.push("/");
      }, 300);
    }
  }, [checkAdmin]);

  const handleFetchApi = async () => {
    try {
      const response = await fetch(`https://stonebloger-be.onrender.com/news`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    handleFetchApi();
  }, []);

  useEffect(() => {
    if (checkId != null && dataEdit) {
      setFormData({
        title: dataEdit.title,
        image: dataEdit.image,
        detail: dataEdit.detail,
      });
    }
  }, [checkId, dataEdit]);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

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
          setFormData((prev: any) => ({
            ...prev,
            image: data,
          }));
        } else {
          console.error("Error uploading image:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!checkId) {
        const response = await fetch(`https://stonebloger-be.onrender.com/post-news`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          message.success("Added successfully");
          handleFetchApi();
          setTimeout(() => {
            window.location.href = "/news";
          }, 400);
        }
      } else {
        const response = await fetch(
          `https://stonebloger-be.onrender.com/edit-news/${checkId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              image: formData.image || dataEdit.image,
            }),
          }
        );
        if (response.ok) {
          message.success("Edited successfully!");
          handleFetchApi();
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const dataSource = news?.map((itc: any, index: number) => ({
    stt: index + 1,
    key: itc._id,
    title: itc.title,
    image: `https://stonebloger-be.onrender.com/${itc.image}`,
    createdAt: itc.createdAt,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="news" className="w-24 h-24" />,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <p>{date.split("T")[0]}</p>,
    },
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
            onClick={async () => {
              if (typeof window !== "undefined" && window.confirm("Do you want to delete it?")) {
                await fetch(`https://stonebloger-be.onrender.com/news/${record.key}`, {
                  method: "DELETE",
                });
                message.success("Deleted successfully!");
                handleFetchApi();
              }
            }}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Drawer
        title={checkId ? "Edit News" : "Add News"}
        onClose={onClose}
        open={open}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border rounded"
            />
          </Form.Item>
          <Form.Item label="Image">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-3 w-48 h-48 object-cover"
              />
            )}
          </Form.Item>
          <Form.Item label="Details">
            <CKEditor
              editor={ClassicEditor}
              data={formData.detail}
              onChange={(event, editor) => {
                setFormData((prev: any) => ({
                  ...prev,
                  detail: editor.getData(),
                }));
              }}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Form>
      </Drawer>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Layout>
          <Sider width={200}>
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
          <Content style={{ padding: 24 }}>
            <Button type="primary" onClick={showDrawer}>
              Add News
            </Button>
            <Table dataSource={dataSource} columns={columns} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Admin;

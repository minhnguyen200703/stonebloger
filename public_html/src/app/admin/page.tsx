"use client";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
const { Header, Content, Sider } = Layout;

const Admin = () => {
  const [formData, setFormData] = useState<any>({
    title: "",
    image: "",
    detail: "",
  });
  const [checkId, setCheckId] = useState(null);
  const [dataEdit, setDataEdit] = useState<any>(null);
  console.log(dataEdit, "dataEdit");
  const form = Form.useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState([]);
  const handelFetchApi = async () => {
    try {
      const response = await fetch(`http://localhost:1968/news`);
      const data = await response.json();
      setNews(data);
      console.log(data);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    handelFetchApi();
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (checkId != null) {
      setFormData({
        title: dataEdit.title,
        image: dataEdit.image,
        detail: dataEdit.detail,
      });
    }
  }, [checkId]);
  const onClose = () => {
    setOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items2: MenuProps["items"] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Quản trị blogs`,
    };
  });
  const checkAdmin = localStorage.getItem("email");
  // useEffect(() => {
  //   if (!checkAdmin) {
  //     alert("bạn không có quyền");
  //     setTimeout(() => {
  //       router.push("/admin");
  //     }, 300);
  //   }
  // }, [checkAdmin]);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData2 = new FormData();
      formData2.append("image", file); // Gắn file vào FormData

      try {
        // Gửi file tới server qua API
        const response = await fetch("http://localhost:1968/upload-image", {
          method: "POST",
          body: formData2,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Ảnh đã được upload:", data);
          setFormData({
            ...formData,
            image: data,
          });
        } else {
          console.error("Lỗi khi upload ảnh:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      console.log(formData,'formData')
      if (!checkId) {
        const response = await fetch(`http://localhost:1968/post-news`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), 
        });
        const result = await response.json();
        console.log("Lưu thành công:", result);
        message.success("Thêm mói thành công");
        setTimeout(() => {
          window.location.href = "/news";
        }, 400);
      } else {
        const response = await fetch(
          `http://localhost:1968/edit-news/${checkId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData, image : formData.image ? formData.image : dataEdit.image}),
          }
        );
        const result = await response.json();
        console.log("Lưu thành công:", result);
        message.success("thành công");
        handelFetchApi();
      }
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
    }
  };
  const dataSource = news?.map((itc: any, index: any) => ({
    stt: index + 1,
    key: itc._id,
    title: itc.title,
    image: "http://localhost:1968/" + itc.image,
    createdAt: itc.createdAt,
  }));

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => {
        // Loại bỏ "http://localhost:1968/" nếu nó có ở đầu của URL
        let imageUrl = image.startsWith("http://localhost:1968/")
          ? image.replace("http://localhost:1968/", "")
          : image;
      
        // Thêm lại "http://localhost:1968/" nếu imageUrl không có nó
        if (!imageUrl.startsWith("http://localhost:1968/")) {
          imageUrl = "http://localhost:1968/" + imageUrl;
        }
      
        return <img src={imageUrl} className="w-[100px] h-[100px]" />;
      }
      
      
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (image: any) => {
        return <p>{image?.split("T")[0]}</p>;
      },
    },
    {
      title: "Action",
      render: (image: any) => {
        return (
          <div>
            <Space>
              <Button
                onClick={() => {
                  setCheckId(image.key);
                  setDataEdit(image);
                  showDrawer();
                }}
              >
                Sửa
              </Button>
              <Button
                onClick={async () => {
                  if (window.confirm("bạn có muốn xoá nó ?")) {
                    const res = await fetch(
                      `http://localhost:1968/new1/` + image.key
                    );
                    message.success("Thành công");
                    handelFetchApi();
                  }
                }}
                className="bg-red-500 text-white font-medium"
              >
                Xoá
              </Button>
            </Space>
          </div>
        );
      },
    },
  ];
  console.log(formData, "formData.image ");
  return (
    <>
      <Drawer
        title={checkId ? "Sửa bài viết" : "Thêm bài viết"}
        onClose={onClose}
        open={open}
        width={800}
      >
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              className="w-full border px-3 py-2 rounded-md"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-bold mb-1">
              Ảnh
            </label>
            <input
              type="file"
              id="image"
              className="w-full border px-3 py-2 rounded-md"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <img
                src={
                  formData.image.startsWith("http://localhost:1968/")
                    ? formData.image
                    : "http://localhost:1968/" + formData.image
                }
                alt="Preview"
                className="mt-2 w-48 h-48 object-cover border rounded-md"
              />
            )}
          </div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Viết nội dung tại đây...</p>"
            onReady={(editor) => {
              // Tùy chỉnh upload ảnh
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return {
                  upload: async () => {
                    const file = (await loader.file) as any; // Lấy file từ loader
                    const formData = new FormData();
                    formData.append("image", file);
                    try {
                      const response = await fetch(
                        "http://localhost:1968/upload-image",
                        {
                          method: "POST",
                          body: formData,
                        }
                      );
                      if (response.ok) {
                        const data = await response.json();
                        return {
                          default: "http://localhost:1968/" + data, // Trả về URL ảnh
                        };
                      } else {
                        throw new Error("Failed to upload image");
                      }
                    } catch (error) {
                      console.error("Lỗi upload ảnh:", error);
                      throw error;
                    }
                  },
                  abort: () => {
                    console.log("Upload ảnh đã bị hủy.");
                  },
                };
              };
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({
                ...formData,
                detail: data, // Lưu nội dung HTML
              });
            }}
          />

          <button
            className="bg-green-500 text-white font-bold px-3 py-2 rounded-md mt-4"
            onClick={handleSave}
          >
            Lưu bài viết
          </button>
        </div>
      </Drawer>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb
              items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
              style={{ margin: "16px 0" }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    showDrawer();
                    setCheckId(null);
                  }}
                  className="bg-green-500 text-white font-medium"
                >
                  Thêm mới
                </Button>
              </div>
              <Table dataSource={dataSource} columns={columns} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Admin;

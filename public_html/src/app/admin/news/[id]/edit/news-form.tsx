import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	Input,
	message,
	Row,
	Space,
	Spin,
	Switch,
} from "antd";
import { env } from "@/config/env.configs";
import CkEditor from "@/components/ck-editor";
import { editNews, getNewsById } from "@/apis/news.api";
import { useParams, useRouter } from "next/navigation";
import DebounceSelect from "@/components/debounce-select";
import { getCategories } from "@/apis/category.api";

interface NewsFormProps {}

const NewsForm: React.FC<NewsFormProps> = ({}) => {
	const router = useRouter();
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [image, setImage] = useState("");
	console.log("image: ", image);
	// submit form
	const onFinish = (values: any) => {
		const body = {
			...values,
			image,
			categoryId: values?.categoryId?.value,
		};
		setLoadingBtn(true);
		editNews(body, id as string)
			.then(() => {
				message.success("Sửa bài viết thành công!");
				router.push("/admin/news");
			})
			.catch((error) => {
				message.success("Tạo bài viết thất bại!");
			})
			.finally(() => {
				setLoadingBtn(false);
			});
	};

	const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData2 = new FormData();
			formData2.append("image", file);
			try {
				const response = await fetch(`${env.API_URL}/upload-image`, {
					method: "POST",
					body: formData2,
				});

				if (response.ok) {
					const data = await response.json();
					console.log("Ảnh đã được upload:", data);
					setImage(data);
				} else {
					console.error("Lỗi khi upload ảnh:", response.statusText);
				}
			} catch (error) {
				console.error("Lỗi khi upload ảnh:", error);
			}
		}
	};

	const fetchNews = (id: string) => {
		setLoading(true);
		getNewsById(id)
			.then((res) => {
				const data = res?.data;
				form.setFieldsValue({
					...data,
					detail: data?.detail || "",
					image: data?.detail || "",
					categoryId: {
						value: data?.category?._id,
						label: data?.category?.name,
					},
				});
				setImage(data?.image || "");
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchNews(id as string);
	}, []);
	if (loading) {
		return (
			<div className="flex justify-center items-center h-[100vh]">
				<Spin size="large" className="py-5" />
			</div>
		);
	}

	async function fetchCategories(search: string) {
		const params = {
			name: search,
		};
		return getCategories(params).then((data) => {
			return data?.data.map((item: any) => ({
				label: item.name,
				value: item._id,
			}));
		});
	}

	return (
		<Form
			name="blog-form"
			layout="vertical"
			onFinish={onFinish}
			form={form}
			initialValues={{
				title: "",
				image: "",
				categoryId: "",
				detail: "",
			}}
		>
			<Row gutter={12}>
				<Col span={12}>
					<Form.Item
						key="title"
						label="Tiêu đề"
						name="title"
						rules={[{ required: true, message: "Bắt buộc" }]}
					>
						<Input className="h-[45px]" placeholder="Tiêu đề" />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item key="title" label="Hình ảnh">
						<Input
							type="file"
							id="image"
							className="w-full border px-3 py-2 rounded-md"
							accept="image/*"
							onChange={onChangeImage}
						/>
						{image && (
							<img
								src={`${env.API_URL}/${image}`}
								alt="Preview"
								className="mt-2 w-48 h-48 object-cover border rounded-md"
							/>
						)}
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						key="categoryId"
						label="Danh mục bài viết"
						name="categoryId"
						rules={[{ required: true, message: "Bắt buộc" }]}
					>
						<DebounceSelect
							placeholder="Danh mục bài viết"
							fetchOptions={fetchCategories}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<CkEditor form={form} />
				</Col>
			</Row>
			<Space>
				<Button type="primary" htmlType="submit" loading={loadingBtn}>
					Save
				</Button>
			</Space>
		</Form>
	);
};

export default NewsForm;

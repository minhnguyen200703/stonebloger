import { addCategory } from "@/apis/category.api";
import { useToggle } from "@/hooks/useToggle";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import React, { useState } from "react";

interface CategoryAddingProps {
	onRefetchApi: () => void;
}

const CategoryAdding: React.FC<CategoryAddingProps> = ({ onRefetchApi }) => {
	const { isVisible, onToggle } = useToggle();
	const [form] = Form.useForm();
	const [loadingBtn, setLoadingBtn] = useState(false);
	// submit form
	const onFinish = (values: any) => {
		const body = {
			...values,
		};
		setLoadingBtn(true);
		addCategory(body)
			.then(() => {
				onRefetchApi();
				message.success("Tạo danh mục thành công!");
				onToggle();
        form.resetFields();
			})
			.catch((error) => {
				message.error("Tạo danh mục thất bại!");
			})
			.finally(() => {
				setLoadingBtn(false);
			});
	};
	return (
		<>
			<Button type="primary" icon={<PlusCircleOutlined />} onClick={onToggle}>
				Thêm danh mục
			</Button>
			<Modal
				closable={false}
				open={isVisible}
				centered
				title="Tạo danh mục"
				footer={
					<>
						<Button
							type="primary"
							className="mr-2"
							onClick={() => form.submit()}
							loading={loadingBtn}
						>
							Tạo danh mục
						</Button>
						<Button onClick={onToggle}>Huỷ</Button>
					</>
				}
			>
				<Form
					className="mt-3"
					name="category-form"
					layout="vertical"
					onFinish={onFinish}
					form={form}
				>
					<Row gutter={12}>
						<Col span={24}>
							<Form.Item
								key="name"
								label="Tên danh mục"
								name="name"
								rules={[{ required: true, message: "Bắt buộc" }]}
							>
								<Input className="h-[45px]" placeholder="Tên danh mục" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default CategoryAdding;

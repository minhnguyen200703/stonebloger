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
				message.success("Category added!");
				onToggle();
        form.resetFields();
			})
			.catch((error) => {
				message.error("Category add fails!");
			})
			.finally(() => {
				setLoadingBtn(false);
			});
	};
	return (
		<>
			<Button type="primary" icon={<PlusCircleOutlined />} onClick={onToggle}>
				Add category
			</Button>
			<Modal
				closable={false}
				open={isVisible}
				centered
				title="Add category"
				footer={
					<>
						<Button
							type="primary"
							className="mr-2"
							onClick={() => form.submit()}
							loading={loadingBtn}
						>
							Add category
						</Button>
						<Button onClick={onToggle}>Cancel</Button>
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
								label="Category Name"
								name="name"
								rules={[{ required: true, message: "Required" }]}
							>
								<Input className="h-[45px]" placeholder="Category" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default CategoryAdding;

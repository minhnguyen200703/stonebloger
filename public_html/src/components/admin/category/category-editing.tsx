import { addCategory, editCategory } from "@/apis/category.api";
import { useToggle } from "@/hooks/useToggle";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Modal, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

interface CategoryEditingProps {
	onRefetchApi: () => void;
	item: {
		name: string;
		_id: string
	};
}

const CategoryEditing: React.FC<CategoryEditingProps> = ({
	onRefetchApi,
	item,
}) => {
	const { _id } = item || {};
	const { isVisible, onToggle } = useToggle();
	const [form] = Form.useForm();
	const [loadingBtn, setLoadingBtn] = useState(false);
	// submit form
	const onFinish = (values: any) => {
		const body = {
			...values,
		};
		setLoadingBtn(true);
		editCategory(_id, body)
			.then(() => {
				onRefetchApi();
				message.success("Sửa danh mục thành công!");
				onToggle();
			})
			.catch((error) => {
				message.error("Sửa danh mục thất bại!");
			})
			.finally(() => {
				setLoadingBtn(false);
			});
	};
	useEffect(() => {
		form.setFieldsValue({
			...item,
		});
	}, [item]);
	return (
		<>
			<Tooltip title="Sửa danh mục">
				<Button type="primary" icon={<EditOutlined />} onClick={onToggle} />
			</Tooltip>
			<Modal
				closable={false}
				open={isVisible}
				centered
				title="Sửa danh mục"
				footer={
					<>
						<Button
							type="primary"
							className="mr-2"
							onClick={() => form.submit()}
							loading={loadingBtn}
						>
							Sửa danh mục
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

export default CategoryEditing;

"use client";

import { Form, FormInstance } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface CkEditorProps {
	form: FormInstance<any>;
}

const CkEditor: React.FC<CkEditorProps> = ({ form }) => {
	const [editorLoaded, setEditorLoaded] = useState(false);
	const editorRef = useRef<any>();
	const { CKEditor, ClassicEditor } = editorRef.current || {};

	useEffect(() => {
		editorRef.current = {
			CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
			ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
		};
		setEditorLoaded(true)
	}, []);
	function uploadAdapter(loader: any) {
		return {
			upload: async () => {
				const file = (await loader.file) as any; // Lấy file từ loader
				const formData = new FormData();
				formData.append("image", file);
				try {
					const response = await fetch("http://localhost:1968/upload-image", {
						method: "POST",
						body: formData,
					});
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
		};
	}

	function uploadPlugin(editor: any) {
		editor.plugins.get("FileRepository").createUploadAdapter = (
			loader: any
		) => {
			return uploadAdapter(loader);
		};
	}

	return (
		<React.Fragment>
			<Form.Item
				key="desc"
				label="Nội dung"
				name="detail"
				valuePropName="data"
				getValueFromEvent={(event, editor) => {
					const data = editor.getData();
					return data;
				}}
				rules={[{ required: true, message: "Bắt buộc" }]}
			>
				{editorLoaded && (
					<CKEditor
						editor={ClassicEditor}
						config={{
							extraPlugins: [uploadPlugin],
						}}
						onBlur={(event: any, editor: any) => {
							const data = editor.getData();
							form.setFieldsValue({
								[`detail`]: data,
							});
						}}
					/>
				)}
				{!editorLoaded && <div>Editor loading</div>}
			</Form.Item>
		</React.Fragment>
	);
};

export default CkEditor;

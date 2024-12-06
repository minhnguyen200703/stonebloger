import { deleteNews } from "@/apis/news.api";
import ConfirmModal from "@/components/confirm-modal";
import { useToggle } from "@/hooks/useToggle";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import React, { useState } from "react";

interface NewsDeletingProps {
	onRefetchApi: () => void;
	newsId: string
}

const NewsDeleting: React.FC<NewsDeletingProps> = ({ onRefetchApi, newsId }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const { isVisible, onToggle } = useToggle();
	// ACTION: delete news mutation
	const onDeleteNews = () => {
		setIsDeleting(true);
		deleteNews(newsId)
			.then(() => {
				message.success("Post deleted!");
				// refetch API
				onRefetchApi();
				setIsDeleting(false);
			})
			.catch((error) => {
				message.error(error?.message || "Some thing went wrong!");
			})
			.then(() => setIsDeleting(false));
	};
	return (
		<>
			<Tooltip title="Delete Post">
				<Button type="default" icon={<DeleteOutlined />} onClick={onToggle} />
			</Tooltip>
			<ConfirmModal
				isVisible={isVisible}
				onConfirm={onDeleteNews}
				onToggle={onToggle}
				target="this post"
				action="delete"
				isPending={isDeleting}
			/>
		</>
	);
};

export default NewsDeleting;

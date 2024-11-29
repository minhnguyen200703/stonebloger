import React, { useContext } from "react";
import { Button, Modal } from "antd";

interface ConfirmModalProps {
	isVisible: boolean;
	onToggle: () => void;
	action: string;
	target?: string | React.ReactNode;
	fullMessage?: string | React.ReactNode;
	onConfirm: () => void;
	isPending: boolean;
	size?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isVisible,
	action,
	target,
	onToggle,
	isPending,
	onConfirm,
}) => {
	return (
		<Modal
			closable={false}
			open={isVisible}
			centered
			title="Xác nhận"
			footer={(_, { OkBtn, CancelBtn }) => (
				<>
					<Button
						type="primary"
						className="mr-2"
						onClick={onConfirm}
						loading={isPending}
					>
						Xác nhận
					</Button>
					<Button onClick={onToggle}>Huỷ</Button>
				</>
			)}
		>
			<span>Bạn đã chắc chắn muốn</span>
			<span className="text-lowercase ms-1">
				{action} {target}?
			</span>
		</Modal>
	);
};

export default ConfirmModal;

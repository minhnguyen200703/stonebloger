"use client";

import { usePathname } from "next/navigation";
import MotionLazy from "../animate/motion-lazy";
import LenisScroller from ".";

const LenisWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname();

	const enableLenis = !pathname.startsWith("/admin");

	return (
		<MotionLazy>
			{enableLenis && <LenisScroller />}
			{children}
		</MotionLazy>
	);
};

export default LenisWrapper;

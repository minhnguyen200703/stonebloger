'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import styles from './style.module.css';

type ShinyButtonProps = PropsWithChildren &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

const ShinyButton: React.FC<ShinyButtonProps> = ({
	children,
	className,
	...btnProps
}) => {
	const parentRef = useRef<HTMLDivElement | null>(null);
	const btnRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		if (btnRef.current) {
			btnRef.current.addEventListener('mouseover', () => {
				if (parentRef.current) {
					parentRef.current.style.setProperty('--size', '250px');
					parentRef.current.style.setProperty(
						'--shineColor',
						'rgba(255, 255, 255, 0.3)'
					);
				}
			});

			btnRef.current.addEventListener('mouseleave', () => {
				if (parentRef.current) {
					parentRef.current.style.setProperty('--size', '0px');
					parentRef.current.style.setProperty(
						'--shineColor',
						'rgba(255, 255, 255, 0.0)'
					);
				}
			});

			btnRef.current.addEventListener('mousemove', e => {
				if (parentRef.current) {
					parentRef.current.style.setProperty('--x', e.offsetX + 'px');
					parentRef.current.style.setProperty('--y', e.offsetY + 'px');
				}
			});
		}
	}, [btnRef.current, parentRef.current]);

	return (
		<div
			ref={ parentRef }
			className={ styles.skeuParent }>
			<button
				ref={ btnRef }
				className={ cn(
					styles.skeu,
					'font-bold text-base py-3 sm:py-4 px-10 sm:px-16 rounded-xl',
					'overflow-hidden cursor-pointer text-white bg-btn transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0px_3px_7px_#6903f6]',
					className
				) }
				{ ...btnProps }
			>
				{ children }
			</button>
		</div>
	);
};

export default ShinyButton;

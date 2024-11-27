'use client';
import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import navData from '@/constant/data/navigation';
import { cn } from '@/lib/utils';

const MobileNav: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

	const pathname = usePathname();

	const menuList = [
		{
			name: 'Home',
			href: '/',
			items: [],
		},
		...navData.menu,
	];

	const toggleMenu = () => {
		setOpen(prevOpen => !prevOpen);
		setExpandedIdx(null);
	};

	return (
		<div className='block lg:hidden'>
			<HamburgerButton
				open={ open }
				onClick={ toggleMenu } />
			<AnimatePresence>
				{ open && (
					<m.div
						variants={ menuVars }
						initial='initial'
						animate='animate'
						exit='exit'
						className='max-h-[calc(100dvh)] h-screen w-full z-[99] fixed top-0 left-0 origin-top bg-primary px-4 pt-16'
					>
						<div className='flex h-full flex-col'>
							<m.div
								variants={ containerVars }
								initial='initial'
								animate='open'
								exit='initial'
								className='flex flex-col h-full gap-4 justify-between'
							>
								<div className='flex flex-col h-full gap-5 pt-8'>
									{ menuList.map((menu, menuIdx) => {
										return (
											<NavLink
												key={ menu.name }
												menu={ menu }
												currentPathname={ pathname }
												index={ menuIdx }
												expandedIdx={ expandedIdx }
												setExpandedIdx={ setExpandedIdx }
											/>
										);
									}) }
								</div>
							</m.div>
						</div>
					</m.div>
				) }
			</AnimatePresence>
		</div>
	);
};

export default MobileNav;

type HamburgerButtonProps = {
  open: boolean;
  onClick?: () => void;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, onClick }) => {
	return (
		<m.button
			initial={ false }
			animate={ open ? 'open' : 'closed' }
			onClick={ onClick }
			className='group absolute right-4 top-2.5 z-[100] transition-all w-8 h-10 focus:ring-0 focus:outline-none'
		>
			<m.span
				variants={ hamburgerVars.top }
				className='absolute block h-[2.5px] w-[18px] bg-lilac rounded-full'
				style={ { y: '-50%', left: '50%', x: '-50%' } }
			/>
			<m.span
				variants={ hamburgerVars.middle }
				className='absolute block h-[2.5px] w-[18px] bg-lilac rounded-full'
				style={ { x: '-50%', top: '50%', y: '-50%' } }
			/>
			<m.span
				variants={ hamburgerVars.bottom }
				className='absolute block h-[2.5px] w-[18px] bg-lilac rounded-full'
				style={ { x: '-50%', y: '50%' } }
			/>
		</m.button>
	);
};

type NavLinkProps = {
  menu: NavMenu;
  index: number;
  currentPathname: string;
  expandedIdx: null | number;
  setExpandedIdx: React.Dispatch<React.SetStateAction<null | number>>;
};

const NavLink = ({
	menu,
	currentPathname,
	index,
	expandedIdx,
	setExpandedIdx,
}: NavLinkProps) => {
	const href = menu.href;
	const active = currentPathname === href;

	return (
		<div>
			<div className='overflow-hidden'>
				<m.div
					variants={ mobileLinkVars }
					className={ cn('text-base', active ? 'text-white' : 'text-lilac') }
				>
					{ menu.items?.length && !href ? (
						<>
							<button
								className='focus:ring-0 focus:outline-none w-full text-left'
								onClick={ () => {
									if (expandedIdx === index) setExpandedIdx(null);
									else setExpandedIdx(index);
								} }
							>
								{ menu.name }
							</button>

							{ expandedIdx === index && (
								<div className='flex flex-col gap-y-3 pl-4 pt-3 animate-fadeIn duration-200 transform transition-all'>
									{ menu.items.map(item => (
										<Link
											href={ item.href }
											key={ item.name }
											className={ cn(
												'text-sm',
												active ? 'text-white' : 'text-lilac'
											) }
										>
											{ item.name }
										</Link>
									)) }
								</div>
							) }
						</>
					) : (
						<Link
							href={ menu.href ?? '/' }
							className='w-full flex'>
							{ menu.name }
						</Link>
					) }
				</m.div>
			</div>
		</div>
	);
};

const menuVars = {
	initial: {
		scaleY: 0,
	},
	animate: {
		scaleY: 1,
		transition: {
			duration: 0.5,
			ease: [0.12, 0, 0.39, 0],
		},
	},
	exit: {
		scaleY: 0,
		transition: {
			delay: 0.5,
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};
const containerVars = {
	initial: {
		transition: {
			staggerChildren: 0.09,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.09,
			staggerDirection: 1,
		},
	},
};

const mobileLinkVars = {
	initial: {
		y: '30vh',
		transition: {
			duration: 0.5,
			ease: [0.37, 0, 0.63, 1],
		},
	},
	open: {
		y: 0,
		transition: {
			ease: [0, 0.55, 0.45, 1],
			duration: 0.7,
		},
	},
};

const hamburgerVars = {
	top: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			top: ['35%', '50%', '50%'],
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			top: ['50%', '50%', '35%'],
		},
	},
	middle: {
		open: {
			rotate: ['0deg', '0deg', '-45deg'],
			left: '50%',
		},
		closed: {
			rotate: ['-45deg', '0deg', '0deg'],
			left: 'calc(50% + 4px)',
		},
	},
	bottom: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			bottom: ['35%', '50%', '50%'],
			left: '50%',
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			bottom: ['50%', '50%', '35%'],
			left: '50%',
		},
	},
};

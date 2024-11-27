import { PropsWithChildren } from 'react';

export const SectionTitle: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<h2 className='text-2xl sm:text-4xl 2xl:text-5xl 3xl:text-[64px] leading-none font-bold text-gray-primary'>
			{ children }
		</h2>
	);
};

export const SectionDescription: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<p className='text-base sm:text-xl 2xl:text-2xl text-gray-secondary'>
			{ children }
		</p>
	);
};

import navigationData from './navigation';

const footerData = {
	list: navigationData.menu,
	socmed: [
		{
			type: 'facebook',
			href: 'https://www.facebook.com/stoneaccounting',
			image: '/images/social-media/facebook.svg',
		},
		{
			type: 'linkedin',
			href: 'https://www.linkedin.com/company/stoneaccountinggroup/',
			image: '/images/social-media/linkedin.svg',
		},
		{
			type: 'instagram',
			href: 'https://www.instagram.com/stoneaccountinggroup/',
			image: '/images/social-media/instagram.svg',
		},
	],
	copyright: 'Copyright @STONEAccountingGroup ',
};

export default footerData;

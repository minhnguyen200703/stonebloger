const landingData = {
	hero_1: {
		id:'home_started',
		title: 'At STONE Accounting Group,',
		description:
      'Our vision is to redefine the accounting experience, making excellence not just a standard but a catalyst for success in a dynamic and interconnected world.',
		cta: {
			text: 'GET STARTED',
			href: '/',
		},
	},
	hero_2: {
		id:'home_info',
		title: 'At STONE Accounting Group,',
		description:
      'The story is not just about numbers; it\'s about building lasting relationships, fostering trust, and empowering clients to thrive in an ever-changing world. Guided by Rodney and Lydia\'s leadership, the firm continues to write its story of success, one client at a time.',
		ctas: [
			{ text: 'Our Mission', href: '/about' },
			{ text: 'Our Values', href: '/value' },
			{ text: 'The Story', href: '/story' },
			{ text: 'Client Benefits', href: '/benefit' },
		],
	},
	ourService: {
		id:'home_services',
		title: 'Our Services',
		description:
      'Our vision is to redefine the accounting experience, making excellence not just a standard but a catalyst for success in a dynamic and interconnected world.',
		icons: [
			'/images/landing/graph.webp',
			'/images/landing/calculator.webp',
			'/images/landing/money.webp',
		],
		cta: {
			text: 'FIND OUT MORE',
			href: '/services',
		},
	},
	frachiseProgram: {
		id:'home_membership',
		title: 'Membership Program',
		description:
      'As industry leaders with decades of experience, the team at STONE Accounting Group understands the demanding nature of accounting work. Their membership model is designed to provide unparalleled flexibility and autonomy.',
		cta: {
			text: 'FIND OUT MORE',
			href: '/franchise',
		},
		list: [
			'Access to Latest Financial Technologies',
			'Flexibility & Autonomy',
			'Industry-Leading Support',
			'Extensive Network & Professional Development',
		],
	},
};

export default landingData;

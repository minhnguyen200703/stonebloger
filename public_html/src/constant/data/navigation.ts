const navigationData = {
  menu: [
    {
      name: "About Us",
      items: [
        {
          name: "Our Mission",
          href: "/about",
        },
        {
          name: "Our Values",
          href: "/value",
        },
        {
          name: "The Story",
          href: "/story",
        },
        {
          name: "Client Benefits",
          href: "/benefit",
        },
      ],
      href: "/about",
    },
    {
      name: "News",
      href: "/news",
    },
    {
      name: "Our Services",
      items: [
        {
          name: "Accounting",
          href: "/services#accounting",
        },
        {
          name: "Taxation",
          href: "/services#taxation",
        },
        {
          name: "Business Advisory",
          href: "/services#business-advisory",
        },
        {
          name: "Others",
          href: "/services#others",
        },
      ],
      href: "/services",
    },
    {
      name: "Our Offices",
      items: [
        {
          name: "Our Members",
          href: "/our-members#our-members",
        },
        {
          name: "Associate Offices",
          href: "/our-members#associate-offices",
        }
      ],
      href: "/our-members"
    },
    {
      name: "Contact",
      href: "/contact",
      items: [
        {
          image: "/images/icon/tel.svg",
          href: "tel:+61355231234",
          name: "(+61) 355 231 234",
        },
        {
          image: "/images/icon/mail.svg",
          href: "mailto:hello@stoneaccounting.com.au",
          name: "hello@stoneaccounting.com.au",
        },
      ],
    },
  ] satisfies NavMenu[],
};

export default navigationData;

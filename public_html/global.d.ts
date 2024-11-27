type NavMenuItem = {
  name: string;
  href: string;
  image?: string;
};

type NavMenu = {
  name: string;
  href?: string;
  items?: NavMenuItem[];
};

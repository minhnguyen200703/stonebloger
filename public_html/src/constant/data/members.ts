export enum Location {
  AU = 1,
  AS,
}
export interface Personal {
  id: string;
  region: string;
  services: string[];
  name: string;
  imageUrl: string;
  location: Location;
}

export const locationMapping: Record<number, string> = {
  [Location.AU]: "Australia",
  [Location.AS]: "Asia",
};

export const members: Personal[] = [
  {
    id: "rodneystone",
    region: "South East Asia",
    services: [
      "Business Advisory",
      "Accounting",
      "Taxation",
      "Incubator Program",
    ],
    name: "Rodney Stone",
    imageUrl: "/images/members/RodneyStone.png",
    location: Location.AS,
  },
  {
    id: "lydiaatwell",
    region: "Australia",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Lydia Atwell",
    imageUrl: "/images/members/LydiaAtwell.png",
    location: Location.AU,
  },
  {
    id: "darencardow",
    region: "Sunshine Coast",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Daren Cardow",
    imageUrl: "/images/members/DarenCardow.png",
    location: Location.AU,
  },
  {
    id: "paulwright",
    region: "Portland",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Paul Wright",
    imageUrl: "/images/members/PaulWright.png",
    location: Location.AU,
  },
  
];

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  region: string;
  description: string;
  contactDetails: {
    phone: string;
    email: string;
    address: string;
  };
  services: string[];
  certificates: string[];
  office: string;
  operatingHours?: string;
  linkedInUrl: string;
  imageUrl: string;
  location?: string;
}

export const profileDatas: ProfileData[] = [
  {
    id: "rodneystone",
    name: "Rodney Stone",
    title: "Executive Director",
    region: "Ho Chi Minh City (Vietnam)",
    description:
      "Rodney Stone serves as the Executive Director at STONE Accounting Group, overseeing operations in South East Asia, with the firm's office located in Ho Chi Minh City, Vietnam. He is focused on overseeing our global outsourcing operations, and developing the incubator program, which aims to support emerging accounting businesses and clients by providing essential resources, mentorship, and networking opportunities to help them thrive in a competitive market.",
    contactDetails: {
      phone: "+84 938 370 432",
      email: "rodney@stoneaccounting.com.au",
      address:
        "64/12 Street 34, An Khanh Ward, Thu Duc City, Ho Chi Minh City, Vietnam",
    },
    services: [
      "Business Advisory",
      "Accounting",
      "Taxation",
      "Global Outsourcing Operations",
      "Incubator Program",
    ],
    certificates: ["CA", "B. Acc", "AD (Fin Plan)", "Registered Tax Agent"],
    office: "South East Asia",
    operatingHours: "9 AM - 5 PM \n Monday to Friday",
    linkedInUrl: "https://www.linkedin.com/in/rodney-stone/", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/RodneyStone.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/embed?mid=1J5EaBau34rboyRDas__GfD76-3fedp4&ehbc=2E312F",
  },
  {
    id: "lydiaatwell",
    name: "Lydia Atwell",
    title: "Executive Director",
    region: "Portland, Victoria (Head Office)",
    description:
      "Lydia Atwell serves as the Executive Director at STONE Accounting Group, responsible for the firm's operations in Australia, with the head office located in Portland, Victoria. Lydia is committed to fostering client success through innovative accounting solutions and personalized advisory services, ensuring that STONE Accounting Group remains a trusted partner for businesses across Australia and beyond.",
    contactDetails: {
      phone: "+61 411 427 713",
      email: "lydia@stoneaccounting.com.au",
      address: "125b Percy Street, Portland, Victoria",
    },
    services: ["Business Advisory", "Accounting", "Taxation"],
    certificates: ["CA", "B. Com"],
    office: "Portland, Victoria (Head Office)",
    operatingHours: "9 AM - 5 PM\nMonday to Friday",
    linkedInUrl: "https://www.linkedin.com/in/lydia-atwell", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/LydiaAtwell.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/embed?mid=1U9bkfF-f2v2J_5rGSkP8F4eeBfRqxjc&ehbc=2E312F",
  },
  {
    id: "paulwright",
    name: "Paul Wright",
    title: "Senior Accountant",
    region: "Portland, Victoria",
    description:
      "Paul has consistently demonstrated that he's a rock-solid professional with a deep understanding of our core values. Backed by his extensive experience and a solid professional network, Paul is prepared to roll out top-tier services in tax preparation, bookkeeping, financial accounting, and business advisory. With years of experience, Paul’s dedication and readiness ensure that his clients are in capable hands.",
    contactDetails: {
      phone: "+61 3 5523 1234",
      email: "paul@stoneaccounting.com.au",
      address: "1b 111 Bentinck Street, Portland, Victoria ",
    },
    services: ["Business Advisory", "Accounting", "Taxation"],
    certificates: ["B. Com"],
    office: "Portland, Victoria",
    operatingHours: "9 AM - 5 PM\nMonday to Friday",
    linkedInUrl: "https://www.linkedin.com/in/wrightrp/ ", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/PaulWright.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/embed?mid=1b_ZXGTM-eNegYe4wjX5WOcwwnHjOlY8&ehbc=2E312F",
  },
  {
    id: "darencardow",
    name: "Daren Cardow",
    title: "Executive Director",
    region: "Sunshine Coast, Queensland",
    description:
      "With his reknowned expertise, a stellar local reputation, and unparalleled knowledge of the Sunshine Coast’s unique business environment, Daren is a natural fit for the STONE network. Backed by our innovative and extensive resources and commitment to exceptional service, Daren is set to elevate the client experience for businesses and individuals across the region.",
    contactDetails: {
      phone: "1300 712 446",
      email: "scoast@stoneaccounting.com.au",
      address: "M3-41, The Wharf Mooloolaba, 123 Parkyn Parade, MOOLOOLABA  QLD  4557",
    },
    services: ["Business Advisory", "Accounting", "Taxation"],
    certificates: ["CPA", "GAIDC", "Registered Tax Agent", "B. Bus"],
    office: "Sunshine Coast, Queensland",
    operatingHours: "9 AM - 5 PM\nMonday to Friday",
    linkedInUrl: "https://www.linkedin.com/in/daren-cardow-91039031/", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/DarenCardow.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/embed?mid=1j1jSstHZhPrk5iDQ8glwshXJIZxCd-o&ehbc=2E312F",
  },
];

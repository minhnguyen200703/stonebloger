export interface Personal {
  id: string;
  region: string;
  services: string[];
  name: string;
  imageUrl: string;
}

export const members: Personal[] = [
  {
    id: "1",
    region: "South East Asia",
    services: [
      "Business Advisory",
      "Accounting",
      "Taxation",
      "Incubator Program",
    ],
    name: "Rodney Stone",
    imageUrl: "/images/members/member1.png",
  },
  {
    id: "2",
    region: "Australia",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Lydia Atwell",
    imageUrl: "/images/members/member1.png",
  },
  {
    id: "3",
    region: "Portland, Victoria",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Paul Wright",
    imageUrl: "/images/members/member1.png",
  },
  {
    id: "4",
    region: "South East Asia",
    services: [
      "Business Advisory",
      "Accounting",
      "Taxation",
      "Incubator Program",
    ],
    name: "Rodney Stone",
    imageUrl: "/images/members/member1.png",
  },
  {
    id: "5",
    region: "Australia",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Lydia Atwell",
    imageUrl: "/images/members/member1.png",
  },
  {
    id: "6",
    region: "Portland, Victoria",
    services: ["Business Advisory", "Accounting", "Taxation"],
    name: "Paul Wright",
    imageUrl: "/images/members/member1.png",
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
    id: "1",
    name: "Rodney Stone",
    title: "Executive Director",
    region: "South East Asia",
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
    operatingHours: "9 AM - 5 PM, Monday to Friday",
    linkedInUrl: "https://linkedin.com/in/rodney-stone", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/member1.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/u/0/embed?mid=1uf7LJKbCDQ9MB5gz80mKeOUr_6Qs3pk&ehbc=2E312F",
  },
  {
    id: "2",
    name: "Lydia Atwell",
    title: "Executive Director",
    region: "Australia",
    description:
      "Lydia Atwell is an Executive Director at STONE Accounting Group, focusing on business advisory and taxation services in Australia. With expertise in accounting, she is committed to helping businesses navigate financial challenges and optimize their operations.",
    contactDetails: {
      phone: "+61 3 9876 5432",
      email: "lydia@stoneaccounting.com.au",
      address: "10/25 Collins St, Melbourne, Victoria, Australia",
    },
    services: ["Business Advisory", "Accounting", "Taxation"],
    certificates: ["CA", "B. Acc", "Registered Tax Agent"],
    office: "Australia",
    operatingHours: "9 AM - 5 PM, Monday to Friday",
    linkedInUrl: "https://linkedin.com/in/lydia-atwell", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/member1.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/u/0/embed?mid=1uf7LJKbCDQ9MB5gz80mKeOUr_6Qs3pk&ehbc=2E312F",
  },
  {
    id: "3",
    name: "Paul Wright",
    title: "Executive Director",
    region: "Portland, Victoria",
    description:
      "Paul Wright serves as the Executive Director at STONE Accounting Group, overseeing operations in Portland, Victoria. He brings years of experience in accounting and taxation, helping local businesses manage their finances and grow in the competitive market.",
    contactDetails: {
      phone: "+61 3 4567 8901",
      email: "paul@stoneaccounting.com.au",
      address: "12 Main St, Portland, Victoria, Australia",
    },
    services: ["Business Advisory", "Accounting", "Taxation"],
    certificates: ["CA", "B. Acc", "Registered Tax Agent"],
    office: "Portland, Victoria",
    operatingHours: "9 AM - 5 PM, Monday to Friday",
    linkedInUrl: "https://linkedin.com/in/paul-wright", // Replace with actual LinkedIn URL
    imageUrl: "/images/members/member1.png", // Replace with actual image URL
    location:
      "https://www.google.com/maps/d/u/0/embed?mid=1uf7LJKbCDQ9MB5gz80mKeOUr_6Qs3pk&ehbc=2E312F",
  },
];

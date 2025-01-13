export interface Office {
    id: string;
    region: string;
    name: string;
    email: string;
    address: string;
  }
  
  export const offices: Office[] = [
    {
      id: "rodneystone",
      region: "Adelaide, South Australia",
      name: "Regional Office",
      email: "hello@stoneaccounting.com.au",
      address: "",
    },
    {
      id: "lydiaatwell",
      region: "Brisbane, Queensland",
      name: "Regional Office",
      email: "hello@stoneaccounting.com.au",
      address: "",
    },
    {
      id: "paulwright",
      region: "Geelong, Victoria",
      name: "Regional Office",
      email: "hello@stoneaccounting.com.au",
      address: "120 Brougham Street, Geelong, Victoria 3220",
    },
    {
      id: "darencardow",
      region: "Melbourne, Victoria",
      name: "Regional Office",
      email: "hello@stoneaccounting.com.au",
      address: "",
    }
  ];
  
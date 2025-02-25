import { Location } from "./members";

export interface Office {
  id: string;
  region: string;
  name: string;
  email: string;
  address: string;
  location: Location;
}

export const offices: Office[] = [
  {
    id: "Adelaide",
    region: "Adelaide, South Australia",
    name: "",
    email: "adelaide@stoneaccounting.com.au",
    address: "",
    location: Location.AU,
  },
  {
    id: "Brisbane",
    region: "Brisbane, Queensland",
    name: "",
    email: "brisbane@stoneaccounting.com.au",
    address: "",
    location: Location.AU,
  },
  {
    id: "Geelong",
    region: "Geelong, Victoria",
    name: "",
    email: "geelong@stoneaccounting.com.au",
    address: "120 Brougham Street, Geelong, Victoria 3220",
    location: Location.AU,
  },
  {
    id: "Melbourne",
    region: "Melbourne, Victoria",
    name: "",
    email: "melbourne@stoneaccounting.com.au",
    address: "",
    location: Location.AU,
  },
  {
    id: "Portland",
    region: "Portland, Victoria",
    name: "Head Office",
    email: "admin@stoneaccounting.com.au",
    address: "125b Percy Street, Portland, Victoria",
    location: Location.AU,
  },
  {
    id: "Kobe",
    region: "Kobe, Japan",
    name: "",
    email: "kobe@stoneaccounting.com.au",
    address: "3-10 Imazu-Akebono cho, Nishinomiya, Hyogo, Japan",
    location: Location.AS,
  },
  {
    id: "HCMC",
    region: "Ho Chi Minh City, Viet Nam",
    name: "Head Office",
    email: "hcmc@stoneaccounting.com.au",
    address: "64/12 Street 34, An Khanh Ward, Thu Duc City, Ho Chi Minh City, Vietnam",
    location: Location.AS,
  },

];

export const PHONE = "410-417-8155";
export const PHONE_HREF = "tel:+14104178155";
export const EMAIL = "ns2llc@yahoo.com";
export const HOURS = "24/7 - 365 Days a Year Including Holidays.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
] as const;

const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: "/images/hero.jpg",
  about: px(3807277, 1600),
  roadside: "/images/roadside-assistance.jpg",
  battery: px(6907042, 1400),
  tires: px(3806249, 1400),
  fuel: "/images/fuel-delivery.jpg",
  lockout: px(8103920, 1400),
  recovery: "/images/accident-recovery.jpg",
  highway: px(33787044, 2000),
  emergency: px(6140995, 2000),
  contact: px(26727699),
} as const;

export type ServiceIcon = "battery" | "tire" | "fuel" | "lockout" | "recovery" | "roadside";

export interface Service {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  image: string;
  icon: ServiceIcon;
}

export const SERVICES: Service[] = [
  {
    id: "roadside-assistance",
    number: "01",
    title: "Roadside Assistance",
    short: "Roadside",
    description: "Comprehensive 24/7 emergency roadside support to resolve breakdowns quickly and keep you moving.",
    items: [
      "24/7 Emergency Response",
      "On-Site Diagnostics",
      "Minor Mechanical Repairs",
      "Emergency Fluids & Coolant",
      "Hazard & Safety Assistance",
      "Rapid Highway Dispatch",
    ],
    image: IMAGES.roadside,
    icon: "roadside",
  },
  {
    id: "jump-start-service",
    number: "02",
    title: "Jump Start Service",
    short: "Jump Start",
    description: "Dead battery? We'll get you back on the road quickly with our professional jump start service.",
    items: [
      "Fast Battery Jump-Start",
      "Battery Diagnostic & Testing",
      "Terminal Cleaning & Corrosion Check",
      "Alternator System Check",
      "New Battery Installation",
      "Battery Delivery Service",
    ],
    image: IMAGES.battery,
    icon: "battery",
  },
  {
    id: "tire-change",
    number: "03",
    title: "Tire Change",
    short: "Tire Change",
    description: "Flat tire assistance including spare tire installation and tire repair services.",
    items: [
      "Spare Tire Installation",
      "Flat Tire Repair & Patching",
      "New & Used Tire Replacements",
      "Tire Mounting & Balancing",
      "Tire Pressure & TPMS Check",
      "Rapid Mobile On-Site Service",
    ],
    image: IMAGES.tires,
    icon: "tire",
  },
  {
    id: "fuel-delivery",
    number: "04",
    title: "Fuel Delivery",
    short: "Fuel",
    description: "Ran out of gas? We'll bring fuel directly to your location to get you moving again.",
    items: [
      "Regular & Premium Gas Delivery",
      "Diesel Fuel Delivery",
      "Direct Vehicle Refueling",
      "Rapid Emergency Dispatch",
      "No Walking to Stations",
      "Safe & Spill-Free Delivery",
    ],
    image: IMAGES.fuel,
    icon: "fuel",
  },
  {
    id: "lockout-service",
    number: "05",
    title: "Lockout Service",
    short: "Lockout",
    description: "Locked out of your vehicle? Our technicians can safely unlock your car without damage.",
    items: [
      "Damage-Free Door Unlocking",
      "Trunk Lockout Assistance",
      "All Makes & Models Supported",
      "Keys Locked Inside Retrieval",
      "Safe Non-Destructive Entry",
      "24/7 Mobile Dispatch",
    ],
    image: IMAGES.lockout,
    icon: "lockout",
  },
  {
    id: "accident-recovery",
    number: "06",
    title: "Accident Recovery",
    short: "Recovery",
    description: "Complete accident recovery services including vehicle extraction and transport.",
    items: [
      "Scene Stabilization & Safety",
      "Vehicle Winching & Extraction",
      "Collision Debris Clearance",
      "Transport Coordination",
      "Safe Scene Securing",
      "24/7 Emergency Support",
    ],
    image: IMAGES.recovery,
    icon: "recovery",
  },
];

export const STEPS = [
  { number: "01", title: "Call Us", text: "Tell us your emergency and your location." },
  {
    number: "02",
    title: "We Come To You",
    text: "Our mobile team arrives fully equipped and ready to help.",
  },
  {
    number: "03",
    title: "Get Back On The Road",
    text: "Fast professional service that gets you moving again safely.",
  },
] as const;

export const SERVICE_OPTIONS = [
  "Roadside Assistance",
  "Jump Start Service",
  "Tire Change",
  "Fuel Delivery",
  "Lockout Service",
  "Accident Recovery",
  "Other",
] as const;


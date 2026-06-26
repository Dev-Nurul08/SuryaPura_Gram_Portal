import {
  BadgeCheck,
  Baby,
  BookOpenCheck,
  Building2,
  CloudSun,
  ClipboardCheck,
  Droplets,
  FileText,
  GraduationCap,
  HandCoins,
  HeartPulse,
  House,
  Landmark,
  MapPinned,
  MessageCircle,
  Mic2,
  Milk,
  PhoneCall,
  RadioTower,
  Route,
  School,
  ShieldCheck,
  Sprout,
  Tractor,
  UserRoundCheck,
  UsersRound,
  WalletCards,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  tone: string;
};

export type Feature = {
  title: string;
  eyebrow: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
};

export type KisanAction = {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
};

export type SchemeCategory = "All" | "Farmers" | "Students" | "Women" | "Housing" | "Health" | "Documents";

export type GovernmentScheme = {
  id: string;
  title: string;
  category: Exclude<SchemeCategory, "All">;
  audience: string;
  benefit: string;
  eligibility: string;
  documents: string[];
  deadline: string;
  status: "Open" | "Camp Soon" | "Priority";
  icon: LucideIcon;
};

export const metrics: Metric[] = [
  { label: "Population served", value: 18450, icon: UsersRound, tone: "bg-leaf-700" },
  { label: "Farmers enrolled", value: 4260, icon: Tractor, tone: "bg-amber-rural" },
  { label: "Students tracked", value: 3180, icon: GraduationCap, tone: "bg-sky-600" },
  { label: "Gram Score", value: 91, suffix: "%", icon: BadgeCheck, tone: "bg-rose-500" },
  { label: "Water projects", value: 42, icon: Droplets, tone: "bg-cyan-600" },
  { label: "Digital requests", value: 12870, icon: RadioTower, tone: "bg-indigo-600" },
];

export const developmentFeatures: Feature[] = [
  {
    title: "Transparent Panchayat",
    eyebrow: "Open budgets",
    detail: "Meetings, tenders, project spend, and delivery photos in one citizen dashboard.",
    icon: Landmark,
    tone: "from-leaf-700 to-emerald-500",
  },
  {
    title: "School Mission",
    eyebrow: "Every child visible",
    detail: "Attendance, scholarships, smart classroom repairs, and girl education support.",
    icon: School,
    tone: "from-sky-700 to-cyan-500",
  },
  {
    title: "Krishi Command",
    eyebrow: "Farm-first tools",
    detail: "Weather alerts, mandi prices, soil health, crop advisory, and scheme eligibility.",
    icon: Wheat,
    tone: "from-amber-600 to-lime-600",
  },
  {
    title: "Digital Identity",
    eyebrow: "Less paperwork",
    detail: "Birth certificates, property records, QR verification, and request tracking.",
    icon: ShieldCheck,
    tone: "from-slate-800 to-violet-600",
  },
];

export const kisanActions: KisanAction[] = [
  {
    title: "Schemes",
    value: "15 open",
    detail: "PM-Kisan, seed subsidy, scholarships, housing, health, and certificates.",
    icon: HandCoins,
    tone: "bg-yellow-300 text-black",
  },
  {
    title: "Weather",
    value: "Rain 62%",
    detail: "Spray advisory: wait 18 hours. Strong wind after 4 PM.",
    icon: CloudSun,
    tone: "bg-sky-300 text-black",
  },
  {
    title: "Crop Price",
    value: "Wheat 2,420",
    detail: "Mandi trend is up 4.8%. Nearby procurement window opens Monday.",
    icon: Sprout,
    tone: "bg-lime-300 text-black",
  },
];

export const updates = [
  "New solar streetlight tender published for Ward 4 and Ward 7.",
  "Scholarship verification camp starts at Suryapura School from 10 AM.",
  "Panchayat water dashboard updated with 42 live handpump service records.",
];

export const timeline = [
  { year: "2024", title: "Digital Birth Records", icon: WalletCards },
  { year: "2025", title: "Smart Classrooms", icon: BookOpenCheck },
  { year: "2026", title: "AI Chaupal Desk", icon: Mic2 },
  { year: "Next", title: "Village Health Map", icon: MapPinned },
];

export const dockItems = [
  { label: "Home", icon: Landmark, target: "home" },
  { label: "School", icon: GraduationCap, target: "school" },
  { label: "Krishi", icon: Tractor, target: "krishi" },
  { label: "Chaupal", icon: MessageCircle, target: "chaupal" },
];

export const contactTiles = [
  { label: "Helpline", value: "108 / 112", icon: PhoneCall },
  { label: "Dairy route", value: "6:20 AM", icon: Milk },
  { label: "Road works", value: "18.4 km", icon: Route },
];

export const schemeCategories: SchemeCategory[] = [
  "All",
  "Farmers",
  "Students",
  "Women",
  "Housing",
  "Health",
  "Documents",
];

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: "pm-kisan",
    title: "PM-Kisan Samman Nidhi",
    category: "Farmers",
    audience: "Small and marginal farmer families",
    benefit: "Rs. 6,000 yearly direct benefit in three installments.",
    eligibility: "Landholding farmer family with active bank and Aadhaar linkage.",
    documents: ["Aadhaar", "Bank passbook", "Land record", "Mobile number"],
    deadline: "e-KYC camp: 30 June",
    status: "Priority",
    icon: Wheat,
  },
  {
    id: "soil-health",
    title: "Soil Health Card",
    category: "Farmers",
    audience: "All cultivators",
    benefit: "Free soil testing with crop-wise fertilizer recommendations.",
    eligibility: "Any farmer cultivating land in Suryapura revenue boundary.",
    documents: ["Land plot number", "Farmer ID", "Crop details"],
    deadline: "Samples accepted weekly",
    status: "Open",
    icon: Sprout,
  },
  {
    id: "drip-irrigation",
    title: "Micro Irrigation Subsidy",
    category: "Farmers",
    audience: "Vegetable, fruit, and water-stressed farms",
    benefit: "Subsidy support for drip and sprinkler irrigation installation.",
    eligibility: "Farmers with verified land record and water source declaration.",
    documents: ["Aadhaar", "Land record", "Dealer quotation", "Bank passbook"],
    deadline: "Ward camp: 4 July",
    status: "Camp Soon",
    icon: Droplets,
  },
  {
    id: "kisan-credit",
    title: "Kisan Credit Card",
    category: "Farmers",
    audience: "Crop, dairy, and fisheries households",
    benefit: "Working capital credit for seeds, feed, fertilizer, and farm needs.",
    eligibility: "Farmer, tenant farmer, dairy owner, or SHG-linked producer.",
    documents: ["Aadhaar", "Bank account", "Land or activity proof", "Photo"],
    deadline: "Bank desk open Friday",
    status: "Open",
    icon: HandCoins,
  },
  {
    id: "scholarship-pre-matric",
    title: "Pre-Matric Scholarship",
    category: "Students",
    audience: "Class 1-10 students",
    benefit: "Fee and learning support for eligible school children.",
    eligibility: "Student enrolled in recognized school with income certificate.",
    documents: ["Student Aadhaar", "School ID", "Income certificate", "Bank account"],
    deadline: "School verification: 10 July",
    status: "Priority",
    icon: GraduationCap,
  },
  {
    id: "cycle-girl",
    title: "Balika Cycle Sahayata",
    category: "Students",
    audience: "Girls entering secondary school",
    benefit: "Cycle assistance for safe travel to school.",
    eligibility: "Girl student enrolled in Class 9 or nearby secondary school.",
    documents: ["School certificate", "Aadhaar", "Parent mobile", "Bank details"],
    deadline: "Principal desk: Monday",
    status: "Open",
    icon: BookOpenCheck,
  },
  {
    id: "digital-learning",
    title: "Digital Learning Device Support",
    category: "Students",
    audience: "Merit and need-based students",
    benefit: "Tablet/library-device access through school digital room.",
    eligibility: "Teacher verified student needing digital learning access.",
    documents: ["School ID", "Teacher note", "Parent consent"],
    deadline: "Review every Saturday",
    status: "Camp Soon",
    icon: RadioTower,
  },
  {
    id: "anganwadi-nutrition",
    title: "Anganwadi Nutrition Plus",
    category: "Women",
    audience: "Pregnant women, lactating mothers, and children",
    benefit: "Nutrition kit tracking, health visits, and growth monitoring.",
    eligibility: "Registered with Anganwadi or ASHA worker in village ward.",
    documents: ["Mother card", "Aadhaar", "Mobile number"],
    deadline: "Health day: 5 July",
    status: "Open",
    icon: Baby,
  },
  {
    id: "shg-livelihood",
    title: "Women SHG Livelihood Loan",
    category: "Women",
    audience: "Self-help group members",
    benefit: "Credit linkage and training for dairy, tailoring, food, and retail work.",
    eligibility: "Active SHG member with group meeting and repayment record.",
    documents: ["SHG passbook", "Aadhaar", "Activity plan", "Bank details"],
    deadline: "Cluster meeting: Wednesday",
    status: "Priority",
    icon: UsersRound,
  },
  {
    id: "ujjwala",
    title: "Ujjwala LPG Connection",
    category: "Women",
    audience: "Eligible women from low-income households",
    benefit: "LPG connection support for cleaner household cooking.",
    eligibility: "Adult woman from eligible household without LPG connection.",
    documents: ["Aadhaar", "Ration card", "Bank account", "Address proof"],
    deadline: "Open this month",
    status: "Open",
    icon: ClipboardCheck,
  },
  {
    id: "pm-awas",
    title: "PM Awas Gramin",
    category: "Housing",
    audience: "Families needing pucca housing",
    benefit: "Housing assistance with geo-tagged progress tracking.",
    eligibility: "Eligible household listed through village housing verification.",
    documents: ["Aadhaar", "Job card", "Land proof", "Bank account"],
    deadline: "Verification round active",
    status: "Priority",
    icon: House,
  },
  {
    id: "toilet-grant",
    title: "Swachh Bharat Toilet Support",
    category: "Housing",
    audience: "Households without functional toilets",
    benefit: "Toilet construction support and completion verification.",
    eligibility: "Household verified by Panchayat sanitation worker.",
    documents: ["Aadhaar", "House photo", "Bank details"],
    deadline: "Ward survey: Friday",
    status: "Open",
    icon: Building2,
  },
  {
    id: "ayushman",
    title: "Ayushman Bharat Health Card",
    category: "Health",
    audience: "Eligible families",
    benefit: "Health coverage and hospital access through verified family card.",
    eligibility: "Family listed as eligible in health beneficiary database.",
    documents: ["Aadhaar", "Ration card", "Mobile number"],
    deadline: "Health camp: Sunday",
    status: "Camp Soon",
    icon: HeartPulse,
  },
  {
    id: "disability-pension",
    title: "Disability Pension Assistance",
    category: "Health",
    audience: "Persons with benchmark disability",
    benefit: "Monthly pension support and certificate-linked service tracking.",
    eligibility: "Disability certificate and resident verification required.",
    documents: ["Disability certificate", "Aadhaar", "Bank passbook", "Photo"],
    deadline: "Pension desk: Thursday",
    status: "Open",
    icon: UserRoundCheck,
  },
  {
    id: "birth-caste-income",
    title: "Certificate Service Desk",
    category: "Documents",
    audience: "Students, families, and job applicants",
    benefit: "Birth, caste, income, residence, and property record requests.",
    eligibility: "Village resident with supporting record or ward verification.",
    documents: ["Aadhaar", "Application form", "Supporting proof", "Mobile number"],
    deadline: "Digital requests open 24/7",
    status: "Open",
    icon: FileText,
  },
];

export type PlanId = "free" | "pro" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  price: number; // INR per month
  yearlyPrice: number;
  description: string;
  features: string[];
  templateAccess: string[]; // template ids
  color: string;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Get started with basic resume building tools.",
    features: [
      "1 Resume",
      "1 Cover Letter",
      "2 Free Templates",
      "PDF Download",
      "Resume Strength Checker",
      "Bold Profile (limited)",
    ],
    templateAccess: ["minimal", "clean"],
    color: "#6b7280",
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    yearlyPrice: 3999,
    description: "Everything you need to land your next job.",
    badge: "Most Popular",
    features: [
      "5 Resumes",
      "5 Cover Letters",
      "10 Pro Templates",
      "PDF & Word Download",
      "AI Content Suggestions",
      "ATS Score Checker",
      "Job Tracker",
      "Bold Profile (full)",
      "Priority Support",
    ],
    templateAccess: ["minimal", "clean", "modern", "executive", "tech", "creative", "elegant", "bold", "slate", "navy"],
    color: "#00bcd4",
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    yearlyPrice: 7999,
    description: "Unlimited access to all features and templates.",
    features: [
      "Unlimited Resumes",
      "Unlimited Cover Letters",
      "All Templates (incl. Premium)",
      "PDF, Word & TXT Download",
      "AI Career Coach",
      "LinkedIn Optimization",
      "Interview Prep",
      "1-on-1 Resume Review",
      "Dedicated Account Manager",
    ],
    templateAccess: ["*"], // all
    color: "#7c3aed",
  },
];

export const TEMPLATES = [
  { id: "minimal", name: "Minimal", plan: "free", preview: "#f3f4f6" },
  { id: "clean", name: "Clean", plan: "free", preview: "#e0f2fe" },
  { id: "modern", name: "Modern", plan: "pro", preview: "#1a2332" },
  { id: "executive", name: "Executive", plan: "pro", preview: "#1e3a5f" },
  { id: "tech", name: "Tech", plan: "pro", preview: "#0f172a" },
  { id: "creative", name: "Creative", plan: "pro", preview: "#7c3aed" },
  { id: "elegant", name: "Elegant", plan: "pro", preview: "#78350f" },
  { id: "bold", name: "Bold", plan: "pro", preview: "#dc2626" },
  { id: "slate", name: "Slate", plan: "pro", preview: "#334155" },
  { id: "navy", name: "Navy", plan: "pro", preview: "#1e40af" },
  { id: "diamond", name: "Diamond", plan: "premium", preview: "#0d9488" },
  { id: "platinum", name: "Platinum", plan: "premium", preview: "#6d28d9" },
  { id: "gold", name: "Gold", plan: "premium", preview: "#d97706" },
  { id: "royal", name: "Royal", plan: "premium", preview: "#be185d" },
];

export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Resume {
  id: string;
  name: string;
  template: "minimal" | "clean" | "modern" | "executive" | "tech" | "creative" | "elegant" | "bold" | "slate" | "navy" | "diamond" | "platinum" | "gold" | "royal" | "classic";
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
  strength: number;
}

export interface ResumeSection {
  key: keyof Pick<Resume, "contact" | "summary" | "experience" | "education" | "skills">;
  label: string;
  complete: boolean;
  points: number;
}

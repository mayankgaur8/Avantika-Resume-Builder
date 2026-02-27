import { Resume, ResumeSection } from "@/types/resume";

export function calculateStrength(resume: Partial<Resume>): {
  score: number;
  sections: ResumeSection[];
} {
  const sections: ResumeSection[] = [
    {
      key: "contact",
      label: "Contact Information",
      complete: !!(
        resume.contact?.fullName &&
        resume.contact?.email &&
        resume.contact?.phone &&
        resume.contact?.location
      ),
      points: 20,
    },
    {
      key: "summary",
      label: "Professional Summary",
      complete: !!(resume.summary && resume.summary.trim().length >= 50),
      points: 20,
    },
    {
      key: "experience",
      label: "Work History",
      complete: !!(resume.experience && resume.experience.length >= 1),
      points: 20,
    },
    {
      key: "education",
      label: "Education",
      complete: !!(resume.education && resume.education.length >= 1),
      points: 20,
    },
    {
      key: "skills",
      label: "Skills",
      complete: !!(resume.skills && resume.skills.length >= 3),
      points: 20,
    },
  ];

  const score = sections
    .filter((s) => s.complete)
    .reduce((acc, s) => acc + s.points, 0);

  return { score, sections };
}

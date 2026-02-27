import { Resume } from "@/types/resume";
import { PlanId } from "@/lib/plans";

export const mockResumes: Resume[] = [
  {
    id: "1",
    name: "Mayank_Gaur_Resume_3",
    template: "modern",
    contact: {
      fullName: "Mayank Gaur",
      title: "Fullstack Developer",
      email: "mayankgaur@gmail.com",
      phone: "+91 9425491136",
      location: "Bengaluru, India 560100",
      website: "https://bold.pro/my/mayank-gaur",
      linkedin: "linkedin.com/in/mayankgaur",
    },
    summary:
      "An experienced IT professional with 14+ years of expertise in designing, developing, and managing Windows and web-based applications. Demonstrated mastery in JavaEE, Core Java, multithreaded applications, and J2EE enterprise architecture.",
    experience: [
      {
        id: "e1",
        company: "Tech Corp",
        position: "Senior Fullstack Developer",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description:
          "Led development of microservices architecture using Spring Boot. Built React frontends integrated with REST APIs. Improved system performance by 40%.",
      },
      {
        id: "e2",
        company: "Solutions Ltd",
        position: "Java Developer",
        startDate: "2016-03",
        endDate: "2019-12",
        current: false,
        description: "Developed enterprise applications using Java EE and Spring framework.",
      },
    ],
    education: [
      {
        id: "ed1",
        institution: "University of Technology",
        degree: "Bachelor of Engineering",
        field: "Computer Science",
        startDate: "2006-08",
        endDate: "2010-06",
        gpa: "3.8",
      },
    ],
    skills: [
      { id: "s1", name: "Java", level: 5 },
      { id: "s2", name: "React", level: 4 },
      { id: "s3", name: "Spring Boot", level: 5 },
      { id: "s4", name: "Kubernetes", level: 3 },
      { id: "s5", name: "AWS", level: 4 },
      { id: "s6", name: "PostgreSQL", level: 4 },
      { id: "s7", name: "RabbitMQ", level: 3 },
      { id: "s8", name: "Redux", level: 4 },
    ],
    createdAt: "05/04/2025",
    updatedAt: "16/04/2025",
    strength: 69,
  },
  {
    id: "2",
    name: "Mayank_Gaur_Resume_2",
    template: "executive",
    contact: {
      fullName: "Mayank Gaur",
      title: "Java Architect",
      email: "mayankgaur@gmail.com",
      phone: "+91 9425491136",
      location: "Bengaluru, India 560100",
    },
    summary: "Senior Java Architect with expertise in enterprise SOA and microservices design.",
    experience: [
      {
        id: "e1",
        company: "Enterprise Solutions",
        position: "Java Architect",
        startDate: "2018-01",
        endDate: "",
        current: true,
        description: "Designed and implemented SOA-based enterprise systems for Fortune 500 clients.",
      },
    ],
    education: [
      {
        id: "ed1",
        institution: "NIT Bhopal",
        degree: "B.Tech",
        field: "Computer Science",
        startDate: "2006-08",
        endDate: "2010-06",
      },
    ],
    skills: [
      { id: "s1", name: "Java", level: 5 },
      { id: "s2", name: "SOA", level: 5 },
      { id: "s3", name: "Microservices", level: 4 },
    ],
    createdAt: "15/08/2024",
    updatedAt: "10/11/2024",
    strength: 83,
  },
  {
    id: "3",
    name: "Mayank_Gaur_Resume_1",
    template: "clean",
    contact: {
      fullName: "Mayank Gaur",
      title: "Software Developer",
      email: "mayankgaur@gmail.com",
      phone: "+91 9425491136",
      location: "Bengaluru, India",
    },
    summary: "Software Developer with 12+ years of experience in Java and web technologies.",
    experience: [
      {
        id: "e1",
        company: "Infosys",
        position: "Software Developer",
        startDate: "2015-01",
        endDate: "2018-12",
        current: false,
        description: "Developed Java-based enterprise applications for banking domain.",
      },
    ],
    education: [
      {
        id: "ed1",
        institution: "University of Technology",
        degree: "B.Tech",
        field: "Computer Science",
        startDate: "2006-08",
        endDate: "2010-06",
      },
    ],
    skills: [
      { id: "s1", name: "Java", level: 5 },
      { id: "s2", name: "SQL", level: 4 },
    ],
    createdAt: "03/12/2023",
    updatedAt: "16/08/2024",
    strength: 77,
  },
];

export const mockUser = {
  name: "Mayank Gaur",
  email: "mayankgaur@gmail.com",
  avatar: "MG",
  profileVisitors: 45,
  plan: "free" as PlanId,
  coverLetters: [{ id: "cl1", name: "Mayank_Gaur_Letter_1" }],
};

export const recommendedJobs = [
  { id: "rj1", title: "Project Coordinator / Senior Project Manager", company: "Lakshya Digital", location: "Bengaluru, KA, IN", posted: "3 weeks ago" },
  { id: "rj2", title: "Lead Generation - Team Lead", company: "Arena Investors | Quaestor Advisors", location: "Bengaluru, KA, IN", posted: "2 weeks ago" },
  { id: "rj3", title: "AI Project Manager", company: "Weekday AI", location: "Bengaluru, KA, IN", posted: "3 weeks ago" },
  { id: "rj4", title: "Senior Python Engineer", company: "Mindrift", location: "Bengaluru, KA, IN", posted: "2 days ago" },
  { id: "rj5", title: "Project Manager", company: "Reveal Health Tech", location: "Bengaluru, KA, IN", posted: "2 weeks ago" },
];

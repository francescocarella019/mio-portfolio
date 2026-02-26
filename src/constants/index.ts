import { Cpu, Globe, Database, Layout } from "lucide-react";

export const SKILLS = [
  { name: "Frontend", icon: Layout, tech: ["React", "Next.js", "Tailwind", "TypeScript"] },
  { name: "Backend", icon: Database, tech: ["Node.js", "Express", "Prisma", "PostgreSQL"] },
  { name: "DevOps", icon: Cpu, tech: ["Docker", "AWS", "CI/CD", "Nginx"] },
  { name: "Altro", icon: Globe, tech: ["GraphQL", "REST APIs", "Jest", "Git"] },
];

export const PROJECTS = [
  {
    title: "E-Commerce Microservices",
    description: "Architettura a microservizi scalabile con gestione pagamenti Stripe e catalogo prodotti real-time.",
    tech: ["Next.js", "Go", "Redis", "Docker"],
    link: "#",
  },
  {
    title: "AI Dashboard SaaS",
    description: "Piattaforma di analisi dati che integra modelli OpenAI per insight predittivi aziendali.",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"],
    link: "#",
  },
];
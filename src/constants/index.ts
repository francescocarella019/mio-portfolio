import { Cpu, Globe, Database, Layout } from "lucide-react";

export const SKILLS = [
  { name: "Frontend", icon: Layout, tech: ["React", "Next.js", "Tailwind", "JavaScript/TypeScript", "Angular"] },
  { name: "Backend", icon: Database, tech: ["Node.js", "Express", "Java","Spring-Boot", "MySQL"] },
  { name: "DevOps", icon: Cpu, tech: ["Docker","CI/CD"] },
  { name: "Altro", icon: Globe, tech: ["NoSQL", "REST APIs", "Git/GitHub", "Json", "GDPR"] },
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
  {
    title: "Progetto gestione ristorante",
    description: "Piattoforma di sviluppo full-stack per la gestione degli ordini ai tavoli dei ristoranti",
    tech: ["Java", "Spring-Boot", "Maven", "Tailwind-CSS"],
    link: "#",
  },
  {
    title: "Sviluppo Portfolio",
    description: "Website per descrivere la mia figura professionale",
    tech: ["Next.js", "Typescript", "React", "Resend Skill", "CI/CD"],
    link: "https://github.com/francescocarella019/mio-portfolio",
  },
];
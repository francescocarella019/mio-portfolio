import { Cpu, Globe, Database, Layout } from "lucide-react";

export const SKILLS = [
  { name: "Frontend", icon: Layout, tech: ["React", "Next.js", "Tailwind", "JavaScript/TypeScript", "Angular"] },
  { name: "Backend", icon: Database, tech: ["Node.js", "Express", "Java","Spring-Boot", "MySQL"] },
  { name: "DevOps", icon: Cpu, tech: ["Docker","CI/CD"] },
  { name: "Altro", icon: Globe, tech: ["NoSQL", "REST APIs", "Git/GitHub", "Json", "GDPR"] },
];

export const PROJECTS = [
  {
    category: "Full Stack",
    title: "Forum Agenzia Viaggi Puglia",
    description: "Piattaforma web full-stack per la gestione di un forum turistico pugliese con recensioni verificate post-acquisto, commenti gerarchici, upload media e dashboard staff.",
    tech: ["Java", "Spring Boot", "MySQL", "Docker", "Thymeleaf"],
    link: "https://github.com/francescocarella019/PW_Gruppo4",
  },
  {
    category: "Full Stack",
    title: "Sviluppo Portfolio",
    description: "Website per descrivere la mia figura professionale",
    tech: ["Next.js", "Typescript", "React", "Resend Skill", "CI/CD"],
    link: "https://github.com/francescocarella019/mio-portfolio",
  },
];

export const PROJECT_CATEGORIES = ["Tutti", "Frontend", "Backend", "Full Stack"] as const;

export const EXPERIENCE = [
  {
    period: "2025 - 2027",
    title: "Software Architect Specialist",
    subtitle: "ITSAngeloRizzoli — Milano",
    summary:
      "Corso biennale di alta specializzazione tecnica focalizzato sulla progettazione e sviluppo di architetture software scalabili, ingegneria del software, sviluppo Full Stack (Java, Spring Boot, React, Angular) e gestione del ciclo di vita applicativo.",
  },
  {
    period: "03.2026",
    title: "BIP Media Innovation",
    subtitle: "Hogeschool van Amsterdam",
    summary:
      "Blended Intensive Programme internazionale focalizzato sull'innovazione nei media e nelle tecnologie digitali, con collaborazione in team multidisciplinari su progettazione e sviluppo di soluzioni innovative.",
  },
  {
    period: "06.2025 - 09.2025",
    title: "Operatore di Produzione",
    subtitle: "STMicroelectronics — Agrate Brianza",
    summary:
      "Esperienza lavorativa nel settore dei semiconduttori e dell'alta tecnologia, maturando rigore nei processi industriali, conformità agli standard qualitativi, precisione e lavoro di squadra in contesti strutturati.",
  },
  {
    period: "06.2024",
    title: "Artificial Intelligence Project",
    subtitle: "Cisco — Vimercate",
    summary:
      "Partecipazione a un progetto intensivo incentrato su concetti e applicazioni pratiche di Intelligenza Artificiale, networking avanzato e tecnologie infrastrutturali abilitanti.",
  },
  {
    period: "2020 - 2025",
    title: "Diploma in Informatica e Telecomunicazioni",
    subtitle: "IIS Albert Einstein — Vimercate",
    summary:
      "Percorso quinquennale di studi tecnici con focus approfondito su algoritmi, programmazione ad oggetti, progettazione di database SQL, reti di calcolatori e sistemi operativi.",
  },
  {
    period: "2022 - 2025",
    title: "Rider per consegne a domicilio / Cameriere",
    subtitle: "Cornate d'Adda",
    summary:
      "Esperienza lavorativa a contatto con il pubblico svolta in parallelo agli studi, fondamentale per consolidare autodisciplina, problem solving, gestione dello stress, puntualità e flessibilità.",
  },
];

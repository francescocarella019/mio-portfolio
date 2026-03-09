"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { trackEvent } from "../lib/analytics";

type ProjectCardProps = {
  project: {
    category: string;
    title: string;
    description: string;
    tech: string[];
    link: string;
  };
  index?: number;
};

export const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.22, 1, 0.36, 1] as const;
  const isExternalLink = project.link.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.45,
        ease: easeCurve,
        delay: shouldReduceMotion ? 0 : index * 0.06,
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      className="transition-all"
    >
      <SpotlightCard className="glass-panel rounded-2xl p-6" spotlightColor="56 189 248">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[11px] font-semibold text-blue-300">
            {project.category}
          </span>
          <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <a
              href={project.link}
              aria-label={`Apri il progetto ${project.title}`}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
              onClick={() => trackEvent("project_link_click", { project_title: project.title, category: project.category })}
            >
              <ExternalLink size={20} className="text-blue-400 transition-transform group-hover:scale-110 group-hover:-rotate-6" />
            </a>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-neutral-800 text-xs font-mono text-neutral-300 rounded-full border border-neutral-700">
              {t}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};


"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: {
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
      className="group bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <a href={project.link}>
            <ExternalLink size={20} className="text-blue-400" />
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
    </motion.div>
  );
};

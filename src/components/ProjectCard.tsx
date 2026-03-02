"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const ProjectCard = ({ project }: { project: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all shadow-xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
       <a href={project.link}><ExternalLink size={20} className="text-blue-400" /></a>
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
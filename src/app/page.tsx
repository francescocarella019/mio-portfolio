'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCE, PROJECTS, PROJECT_CATEGORIES, SKILLS } from '../constants/index';
import { ProjectCard } from '../components/ProjectCard';
import { trackEvent } from '../lib/analytics';

const NAV_ITEMS = [
  { id: 'progetti', label: 'Progetti' },
  { id: 'skills', label: 'Skills' },
  { id: 'esperienza', label: 'Esperienza' },
  { id: 'contatti', label: 'Contatti' },
] as const;

export default function FullStackPortfolio() {
  const [formData, setFormData] = useState({ nome: '', email: '', messaggio: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]['id']>('progetti');
  const [activeProjectFilter, setActiveProjectFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>(PROJECT_CATEGORIES[0]);
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    const updateActiveSection = () => {
      const probe = window.innerHeight * 0.32;
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= probe) {
          currentSection = id;
        }
        if (rect.top <= probe && rect.bottom >= probe) {
          currentSection = id;
          break;
        }
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ nome: '', email: '', messaggio: '' });
        trackEvent('contact_form_submit_success');
      } else {
        setStatus('error');
        trackEvent('contact_form_submit_error', { status_code: response.status });
      }
    } catch {
      setStatus('error');
      trackEvent('contact_form_submit_error', { status_code: 0 });
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeCurve },
    },
  };

  const filteredProjects =
    activeProjectFilter === 'Tutti'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeProjectFilter);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-neutral-950 text-neutral-50 font-sans selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 border-b border-neutral-800/90 bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm md:text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Francesco Pio Carella
          </span>
          <ul className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium text-neutral-400">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
                <a
                  href={`#${item.id}`}
                  className={`cursor-pointer transition-colors ${activeSection === item.id ? 'text-blue-400' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-16 space-y-24 md:space-y-32">
        <motion.section
          className="flex flex-col items-start gap-6 pt-10 md:pt-12 px-2 md:px-0 pb-4"
          variants={sectionVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-3 text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Disponibile per stage/apprendistato
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-neutral-100">
            Ciao, sono uno <br />
            <span className="text-blue-500">Sviluppatore Full Stack.</span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-neutral-300">
            Creo esperienze web moderne, performanti e curate nel dettaglio, dal frontend interattivo fino alle integrazioni backend.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-300">React + Next.js</span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-300">Java + Spring</span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-300">UI motion-driven</span>
          </div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: easeCurve }}
          >
            <a
              href="#contatti"
              onClick={() => trackEvent('cta_contact_click', { location: 'hero' })}
              className="btn-gradient inline-flex items-center justify-center rounded-xl border border-blue-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors"
            >
              Contattami
            </a>
            <a
              href="/FrancescoCarella_CV.pdf"
              download
              onClick={() => trackEvent('cta_cv_download_click', { location: 'hero' })}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 px-6 py-3 text-sm font-semibold text-neutral-100 hover:border-blue-500 hover:text-blue-400 transition-colors"
            >
              Scarica CV
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          id="progetti"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title text-3xl font-bold mb-8 tracking-tight">Progetti Architettati</h2>
          <div className="glass-panel rounded-2xl p-2 flex flex-wrap gap-2 mb-8 w-fit max-w-full">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveProjectFilter(category);
                  trackEvent('projects_filter_change', { category });
                }}
                className={`rounded-full border px-4 py-2 text-xs md:text-sm font-semibold transition-colors ${
                  activeProjectFilter === category
                    ? 'border-blue-500 bg-blue-500/25 text-blue-200 shadow-[0_8px_16px_rgba(37,99,235,0.25)]'
                    : 'border-neutral-700 bg-neutral-900/80 text-neutral-300 hover:text-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={gridVariants}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title text-3xl font-bold mb-8 tracking-tight">Competenze Tecniche</h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={gridVariants}>
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                className="glass-panel p-4 rounded-xl transition-colors"
              >
                <skill.icon className="mb-3 text-blue-400" size={24} />
                <h4 className="font-semibold mb-2">{skill.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {skill.tech.map((t) => (
                    <span key={t} className="text-[10px] text-neutral-500 font-mono">
                      - {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="esperienza"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title text-3xl font-bold mb-8 tracking-tight">Esperienza e Formazione</h2>
          <motion.div className="relative space-y-6 border-l border-neutral-800 pl-6 md:pl-8" variants={gridVariants}>
            {EXPERIENCE.map((item) => (
              <motion.article
                key={`${item.period}-${item.title}`}
                variants={itemVariants}
                className="glass-panel relative rounded-2xl p-5 md:p-6 transition-colors"
              >
                <span className="absolute -left-[33px] md:-left-[41px] top-7 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(23,23,23,1)]" />
                <p className="text-xs font-mono text-blue-400 mb-2">{item.period}</p>
                <h3 className="text-lg md:text-xl font-semibold text-neutral-100">{item.title}</h3>
                <p className="text-sm text-neutral-300 mt-1">{item.subtitle}</p>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">{item.summary}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="contatti"
          className="w-full py-5 flex flex-col items-center justify-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="w-full md:w-6/12 lg:w-1/2">
            <h2 className="section-title text-3xl font-bold mb-8 tracking-tight text-center">Contattami</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Il tuo nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-neutral-900/90 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
              <input
                type="email"
                required
                placeholder="La tua email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900/90 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
              <textarea
                required
                placeholder="Il tuo messaggio"
                rows={4}
                value={formData.messaggio}
                onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                className="w-full bg-neutral-900/90 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gradient self-center px-8 py-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-neutral-950 font-semibold rounded-xl transition-colors border border-blue-400"
              >
                {status === 'loading' ? 'Invio in corso...' : 'Invia Messaggio'}
              </button>

              <div className="text-center">
                {status === 'success' && <p className="text-green-400 text-sm mt-2">Messaggio inviato con successo!</p>}
                {status === 'error' && <p className="text-red-400 text-sm mt-2">Errore durante l&apos;invio. Riprova.</p>}
              </div>
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}


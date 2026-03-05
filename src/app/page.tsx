'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.22, 1, 0.36, 1] as const;
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });

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
      <motion.div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
        style={{ scaleX: progressScale }}
      />
      <div className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, -24, 0], y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <nav className="fixed top-0 w-full z-50 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm md:text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Francesco Pio Carella
          </span>
          <ul className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
                <a
                  href={`#${item.id}`}
                  aria-label={`Vai alla sezione ${item.label}`}
                  className={`cursor-pointer transition-colors ${activeSection === item.id ? 'text-blue-400' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Apri menu navigazione"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-neutral-100"
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileNavOpen ? <path d="M6 6L18 18M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      <motion.div
        initial={false}
        animate={
          mobileNavOpen
            ? { opacity: 1, y: 0, pointerEvents: 'auto' }
            : { opacity: 0, y: -8, pointerEvents: 'none' }
        }
        transition={{ duration: 0.2 }}
        className="fixed top-16 left-0 right-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md md:hidden"
      >
        <ul className="px-6 py-3 space-y-2 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMobileNavOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${activeSection === item.id ? 'bg-blue-500/20 text-blue-300' : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-16 space-y-24 md:space-y-32">
        <motion.section
          className="flex flex-col items-start gap-6 pt-12"
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
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: easeCurve }}
          >
            <a
              href="#contatti"
              aria-label="Vai alla sezione contatti"
              onClick={() => trackEvent('cta_contact_click', { location: 'hero' })}
              className="inline-flex items-center justify-center rounded-xl border border-blue-500 bg-blue-500 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-blue-400 hover:border-blue-400 transition-colors"
            >
              Contattami
            </a>
            <a
              href="/FrancescoCarella_CV.pdf"
              download
              aria-label="Scarica il CV di Francesco Carella"
              onClick={() => trackEvent('cta_cv_download_click', { location: 'hero' })}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-100 hover:border-blue-500 hover:text-blue-400 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Progetti Architettati</h2>
          <div className="flex flex-wrap gap-2 mb-8">
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
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-blue-500/50 hover:text-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={gridVariants}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={{ duration: 0.25 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Competenze Tecniche</h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={gridVariants}>
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                className="p-4 border border-neutral-800 rounded-xl bg-neutral-900/30 hover:border-blue-500/30 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Esperienza e Formazione</h2>
          <motion.div className="relative space-y-6 border-l border-neutral-800 pl-6 md:pl-8" variants={gridVariants}>
            {EXPERIENCE.map((item) => (
              <motion.article
                key={`${item.period}-${item.title}`}
                variants={itemVariants}
                className="relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 md:p-6 hover:border-blue-500/40 transition-colors"
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
          <div className="w-full px-6 md:w-6/12 lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8 tracking-tight text-center">Contattami</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Il tuo nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input
                type="email"
                required
                placeholder="La tua email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                required
                placeholder="Il tuo messaggio"
                rows={4}
                value={formData.messaggio}
                onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="self-center px-15 py-3 cursor-pointer disabled:bg-neutral-800 text-blue-400 font-medium rounded-xl transition-colors border border-blue-400 hover:border-blue-500 hover:text-blue-500"
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

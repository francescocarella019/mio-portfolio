'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { EXPERIENCE, PROJECTS, PROJECT_CATEGORIES, SKILLS } from '../constants/index';
import { LogoLoop } from '../components/LogoLoop';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { ProjectCard } from '../components/ProjectCard';
import { ScrollStack } from '../components/ScrollStack';
import { SplitText } from '../components/SplitText';
import { trackEvent } from '../lib/analytics';

const NAV_ITEMS = [
  { id: 'progetti', label: 'Progetti' },
  { id: 'skills', label: 'Skills' },
  { id: 'esperienza', label: 'Esperienza' },
  { id: 'contatti', label: 'Contatti' },
] as const;

const HERO_LOGOS = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', title: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js', title: 'Next.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', alt: 'Spring', title: 'Spring' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript', title: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS', title: 'Tailwind CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', title: 'Node.js' },
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: easeCurve },
    },
  };

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: easeCurve },
    },
  };

  const filteredProjects =
    activeProjectFilter === 'Tutti'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeProjectFilter);

  return (
    <div id="home" className="relative min-h-screen overflow-x-clip bg-neutral-950 text-neutral-50 font-sans selection:bg-blue-500/30">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
        style={{ scaleX: progressScale }}
      />
      <ParticlesBackground />
      <nav className="fixed top-0 w-full z-50 border-b border-neutral-800/90 bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home"><span className="max-w-[70vw] truncate text-xs sm:text-sm md:max-w-none md:text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Francesco Pio Carella
          </span></a>
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
        <ul className="px-5 py-3 space-y-2 text-sm font-medium">
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

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-7 md:px-8 pt-16 sm:pt-28 md:pt-32 pb-14 sm:pb-16 space-y-20 sm:space-y-24 md:space-y-32">
        <motion.section
          className="flex min-h-[calc(100svh-6rem)] sm:min-h-0 flex-col justify-center items-start gap-5 sm:gap-6 pt-2 sm:pt-10 md:pt-12 px-0 sm:px-1 md:px-0 pb-4"
          variants={sectionVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-blue-400 bg-blue-500/10 px-3.5 sm:px-4 py-2 rounded-full border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Disponibile per stage/apprendistato
          </div>
          <h1 className="text-[clamp(1.8rem,8.2vw,4.5rem)] leading-[1.08] font-bold tracking-tight text-neutral-100">
            Ciao, sono uno <span className="hidden sm:inline"><br /></span>
            <SplitText text="Sviluppatore Full Stack." className="text-blue-500" delay={0.2} />
          </h1>
          <p className="max-w-2xl text-base sm:text-base leading-relaxed text-neutral-300">
            Progetto e sviluppo applicazioni web dall'interfaccia al database. Scrivo codice pulito e scalabile, con una forte attenzione all'architettura del software e alle performance.
          </p>
          <LogoLoop logos={HERO_LOGOS} speed={80} logoHeight={26} gap={24} pauseOnHover className="w-full max-w-md" />
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: easeCurve }}
          >
            <a
              href="#contatti"
              aria-label="Vai alla sezione contatti"
              onClick={() => trackEvent('cta_contact_click', { location: 'hero' })}
              className="btn-gradient inline-flex items-center justify-center rounded-xl border border-blue-400 px-6 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
            >
              Contattami
            </a>
            <a
              href="/FrancescoCarella_CV.pdf"
              download
              aria-label="Scarica il CV di Francesco Carella"
              onClick={() => trackEvent('cta_cv_download_click', { location: 'hero' })}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 px-6 py-3 text-sm font-semibold text-neutral-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-neutral-800 hover:shadow-[0_10px_24px_rgba(2,6,23,0.35)] hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40"
            >
              Scarica CV
            </a>
          </motion.div>
        </motion.section>
          
        <motion.section 
          
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2  id="progetti" className="section-title text-2xl sm:text-3xl font-bold mb-7 sm:mb-8 tracking-tight">Progetti Architettati</h2>
          <div className="mb-8 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveProjectFilter(category);
                  trackEvent('projects_filter_change', { category });
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs md:text-sm font-semibold transition-colors ${
                  activeProjectFilter === category
                    ? 'border-blue-500 bg-blue-500/25 text-blue-200 shadow-[0_8px_16px_rgba(37,99,235,0.25)]'
                    : 'border-neutral-700 bg-neutral-900/80 text-neutral-300 hover:text-neutral-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
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
          <h2 className="section-title text-2xl sm:text-3xl font-bold mb-7 sm:mb-8 tracking-tight">Competenze Tecniche</h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" variants={gridVariants}>
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
          <h2 className="section-title text-2xl sm:text-3xl font-bold mb-7 sm:mb-8 tracking-tight">Esperienza e Formazione</h2>
          <ScrollStack items={EXPERIENCE} />
        </motion.section>

        <motion.section
          id="contatti"
          className="w-full py-5 flex flex-col items-center justify-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="w-full max-w-2xl px-0 sm:px-1 md:px-0 md:w-7/12 lg:w-1/2">
            <h2 className="section-title text-2xl sm:text-3xl font-bold mb-7 sm:mb-8 tracking-tight text-center">Contattami</h2>

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
                className="btn-gradient self-center px-8 py-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl border border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
              >
                {status === 'loading' ? 'Invio in corso...' : 'Invia Messaggio'}
              </button>

              <div className="text-center">
                {status === 'success' && <p className="text-green-400 text-sm mt-2">Messaggio inviato con successo!</p>}
                {status === 'error' && <p className="text-red-400 text-sm mt-2">Errore durante l&apos;invio. Riprova.</p>}
                <p className="text-xs text-neutral-500 mt-4">
                  Inviando il modulo accetti il trattamento dei dati secondo la{' '}
                  <a href="/privacy" className="underline underline-offset-4 hover:text-neutral-300">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </motion.section>
      </main>
    </div>
  );
}


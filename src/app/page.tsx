'use client';

import React, { useState } from 'react';
import { PROJECTS, SKILLS } from '../constants/index'; 
import { ProjectCard } from '../components/ProjectCard';

export default function FullStackPortfolio() {
  const [formData, setFormData] = useState({nome: '', email: '', messaggio: ''});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({nome: '', email: '', messaggio: ''});
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
      <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-blue-500/30">

        {/* NAVBAR ORIGINALE RIPRISTINATA */}
        <nav className="fixed top-0 w-full z-50 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
              className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Francesco Pio Carella
          </span>
            <ul className="flex gap-6 text-sm font-medium text-neutral-400">
              <li className="transition delay-150 duration-200 ease-in-out hover:text-white cursor-pointer   hover:-translate-y-1 hover:scale-100">
                <a
                    href="#progetti">Progetti</a></li>
              <li className="transition delay-150 duration-500 ease-in-out hover:text-white cursor-pointer hover:-translate-y-1 hover:scale-100">
                <a href="#skills">Skills</a></li>
              <li className="transition delay-150 duration-500 ease-in-out hover:text-white cursor-pointer hover:-translate-y-1 hover:scale-100">
                <a href="#contatti">Contatti</a></li>
            </ul>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-6 pt-32 pb-16 space-y-32">

          {/* HERO SECTION */}
          <section className="flex flex-col items-start gap-6 pt-12">
            <div
                className="flex items-center gap-3 text-sm font-mono text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
              Disponibile per stage/apprendistato
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-100">
              Ciao, sono uno <br/>
              <span className="text-blue-500">Sviluppatore Full Stack.</span>
            </h1>
          </section>

          {/* PROJECTS SECTION - DINAMICA */}
          <section id="progetti">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Progetti Architettati</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, index) => (
                  <ProjectCard key={index} project={project}/>
              ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Competenze Tecniche</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SKILLS.map((skill) => (
                  <div key={skill.name}
                       className="p-4 border border-neutral-800 rounded-xl bg-neutral-900/30 hover:border-blue-500/30 transition-colors">
                    <skill.icon className="mb-3 text-blue-400" size={24}/>
                    <h4 className="font-semibold mb-2">{skill.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.tech.map(t => (
                          <span key={t} className="text-[10px] text-neutral-500 font-mono">· {t}</span>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contatti" className="w-full py-5 flex flex-col items-center justify-center">
            {/* Container del form: 100% su mobile, 50% (6/12) su desktop */}
            <div className="w-full px-6 md:w-6/12 lg:w-1/2">

              {/* Titolo centrato */}
              <h2 className="text-3xl font-bold mb-8 tracking-tight text-center">
                Contattami
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text" required placeholder="Il tuo nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                    type="email" required placeholder="La tua email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <textarea
                    required placeholder="Il tuo messaggio" rows={4}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="self-center px-15 py-3 cursor-pointer disabled:bg-neutral-800 text-blue-400 font-medium rounded-xl transition-colors border border-blue-400 hover:border-blue-500 hover:text-blue-500"
                >
                  {status === 'loading' ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>

                {/* Messaggi di stato centrati */}
                <div className="text-center">
                  {status === 'success' &&
                      <p className="text-green-400 text-sm mt-2">Messaggio inviato con successo!</p>}
                  {status === 'error' && <p className="text-red-400 text-sm mt-2">Errore durante l'invio. Riprova.</p>}
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
  );
}
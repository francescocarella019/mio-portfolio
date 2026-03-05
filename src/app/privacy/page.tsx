import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa Privacy",
  description: "Informativa sul trattamento dei dati personali del sito portfolio di Francesco Pio Carella.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-7 md:px-8 py-20">
        <div className="mb-10">
          <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">
            ← Torna alla home
          </Link>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Informativa Privacy</h1>
          <p className="mt-3 text-sm md:text-base text-neutral-400">Ultimo aggiornamento: 5 marzo 2026</p>
        </div>

        <div className="grid gap-4">
          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">1. Titolare del trattamento</h2>
            <p className="text-neutral-300 leading-relaxed">Francesco Pio Carella.</p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">2. Dati raccolti</h2>
            <p className="text-neutral-300 leading-relaxed">
              Tramite il modulo contatti vengono raccolti nome, email e messaggio inseriti volontariamente dall&apos;utente.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">3. Finalita del trattamento</h2>
            <p className="text-neutral-300 leading-relaxed">
              I dati sono utilizzati esclusivamente per rispondere alle richieste inviate tramite il form di contatto.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">4. Base giuridica</h2>
            <p className="text-neutral-300 leading-relaxed">
              La base giuridica e il consenso espresso dall&apos;utente al momento dell&apos;invio del messaggio.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">5. Conservazione dei dati</h2>
            <p className="text-neutral-300 leading-relaxed">
              I dati vengono conservati per il tempo necessario a gestire la richiesta e successivamente eliminati, salvo obblighi di legge.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">6. Fornitori terzi</h2>
            <p className="text-neutral-300 leading-relaxed">
              Per l&apos;invio delle email viene utilizzato il servizio Resend. I dati possono quindi transitare tramite questo fornitore tecnico.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">7. Diritti dell&apos;interessato</h2>
            <p className="text-neutral-300 leading-relaxed">
              L&apos;utente puo richiedere accesso, rettifica, cancellazione, limitazione del trattamento o opposizione scrivendo al titolare.
            </p>
          </section>

          <section className="glass-panel rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">8. Contatti</h2>
            <p className="text-neutral-300 leading-relaxed">Per qualunque richiesta privacy: francescocarella019@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}

# Francesco Carella — Full Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📌 Titolo e Descrizione

**Mio Portfolio** è un'applicazione web moderna, interattiva e completamente reattiva creata per presentare il profilo professionale, le competenze tecniche e i progetti software di **Francesco Carella**, sviluppatore Full Stack.

### A quale esigenza risponde?
In un mercato tecnologico dinamico ed esigente, avere una presenza online efficace è fondamentale:
- **Vetrina professionale completa**: permette a recruiter, aziende e collaboratori di valutare concretamente l'approccio ingegneristico, lo stile di programmazione e le competenze sia frontend che backend.
- **Accesso immediato alle informazioni chiave**: offre una panoramica chiara delle tecnologie utilizzate, dei progetti architettati con link diretti ai repository GitHub e la possibilità di consultare o scaricare direttamente il CV in formato PDF.
- **Canale di contatto diretto e affidabile**: integra un modulo di contatto collegato a servizi cloud di mailing, evitando l'attrito dei client di posta locali ed eseguendo la validazione dei dati direttamente lato server.

---

## 🚀 Link alla Demo

### 🌐 Live Demo
Puoi esplorare l'applicazione live al seguente link:
- **Sito Web Live**: [👉 Visita il Portfolio](https://mio-portfolio-one.vercel.app/)

---

## ✨ Funzionalità Principali

- **⚡ Hero Section Interattiva**:
  - Badge dinamico di disponibilità lavorativa (*"Disponibile per stage/apprendistato"*).
  - Tipografia animata con componente custom `SplitText`.
  - Logo Loop ticker continuo con le icone delle principali tecnologie del profilo.
  - Pulsanti Call To Action rapidi per l'invio rapido di contatti e download del CV.

- **📁 Vetrina Progetti con Filtraggio Dinamico**:
  - Schede interattive (`ProjectCard`, `SpotlightCard`) con anteprima e descrizione approfondita dei progetti software (es. *Forum Agenzia Viaggi Puglia*).
  - Filtro in tempo reale per categoria: **Tutti**, **Frontend**, **Backend** e **Full Stack**.

- **🛠️ Matrice delle Competenze Tecniche (Skills)**:
  - Sezione a griglia suddivisa per macro-aree (*Frontend, Backend, DevOps, Altro*) arricchita da icone vettoriali e animazioni allo stato hover.

- **📜 Timeline Esperienza e Formazione**:
  - Componente a scorrimento `ScrollStack` che illustra in modo visuale e progressivo il percorso di apprendimento, formazione tecnica e progetti realizzati.

- **📬 Form di Contatto Full-Stack**:
  - Modulo integrato con validazione input client-side e gestione degli stati (*invio in corso, successo, errore*).
  - Serverless API Route Next.js (`/api/contact`) con validazione server-side.
  - Integrazione con **Resend** per la ricezione istantanea dei messaggi direttamente nella casella email.
  - Riferimento alla pagina di **Privacy Policy** (`/privacy`) conforme alle linee guida sul trattamento dei dati.

- **🎨 Esperienza Utente & Design Moderno**:
  - Sfondo animato a particelle (`ParticlesBackground`) su base canvas.
  - Barra di progresso dello scroll fluida posizionata in testata (`useScroll` e `useSpring` di Framer Motion).
  - Supporto nativo alla riduzione del movimento per utenti con `prefers-reduced-motion`.
  - Navigazione responsive completa di drawer mobile ottimizzato.

- **🔍 SEO & Analytics**:
  - Ottimizzazione con metadati Open Graph e Twitter Cards.
  - File generati dinamicamente per motori di ricerca: `robots.ts` e `sitemap.ts`.
  - Tracciamento eventi modulare (`analytics.ts`) pronto per Google Tag / Google Analytics.

---

## 💻 Tech Stack

| Categoria | Tecnologia | Scopo / Ruolo |
| :--- | :--- | :--- |
| **Framework Frontend** | [Next.js 16 (App Router)](https://nextjs.org/) | Rendering ibrido (SSR/Client), routing e ottimizzazione delle performance |
| **Libreria UI** | [React 19](https://react.dev/) | Sviluppo componenti dichiarativi e gestione dello stato |
| **Linguaggio** | [TypeScript 5](https://www.typescriptlang.org/) | Tipizzazione statica per robustezza, manutenibilità e clean code |
| **Stile & Layout** | [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS | Utility-first CSS moderno, responsive design e dark-theme |
| **Animazioni** | [Framer Motion](https://www.framer.com/motion/) | Transizioni fluide, scroll animations e micro-interazioni |
| **Iconografia** | [Lucide React](https://lucide.dev/) | Icone SVG coerenti e leggere |
| **Email Service** | [Resend](https://resend.com/) | Invio affidabile di email transazionali dal modulo di contatto |
| **Compiler & Quality** | React Compiler & ESLint 9 | Ottimizzazione automatica dei re-render e linting del codice |

---

## ⚙️ Configurazione Locale

Segui questi passaggi per clonare ed eseguire il progetto in locale sulla tua macchina.

### Prerequisiti
- **Node.js**: versione `20.x` o superiore consigliata
- **npm**, **pnpm** o **yarn**
- **Git** installato

### 1. Clonazione del repository
```bash
git clone https://github.com/francescocarella019/mio-portfolio.git
cd mio-portfolio
```

### 2. Installazione delle dipendenze
```bash
npm install
```

### 3. Configurazione delle variabili d'ambiente
Copia il file di esempio `.env.example` in un nuovo file `.env.local`:

```bash
cp .env.example .env.local
```
*(Su Windows PowerShell puoi usare: `Copy-Item .env.example .env.local`)*

Apri il file `.env.local` e inserisci i parametri richiesti:

```env
# Chiave API del servizio Resend per l'invio delle email (ottienila gratuitamente su https://resend.com)
RESEND_API_KEY=re_tua_chiave_personale

# URL base dell'applicazione per la generazione dei metadata e sitemap (in locale http://localhost:3000)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> [!NOTE]
> Se non disponi immediatamente di una chiave Resend, l'applicazione si avvierà comunque regolarmente in locale; l'unica funzionalità che richiederà la chiave configurata è l'invio effettivo delle email tramite il form di contatto.

### 4. Avvio dell'ambiente di sviluppo
```bash
npm run dev
```

Apri il browser all'indirizzo [http://localhost:3000](http://localhost:3000) per visualizzare l'applicazione.

### 5. Script disponibili nel `package.json`
- `npm run dev`: Avvia il server di sviluppo con hot-reloading su porta 3000.
- `npm run build`: Compila l'applicazione per la produzione con Next.js.
- `npm run start`: Avvia il server di produzione compilato.
- `npm run lint`: Esegue il controllo del codice con ESLint.

---

## 📬 Contatti

- **Autore**: Francesco Carella
- **GitHub**: [@francescocarella019](https://github.com/francescocarella019)
- **LinkedIn**: [Francesco Carella](https://www.linkedin.com/in/carellaf19/)
- **Email**: [francescocarella019@gmail.com](mailto:francescocarella019@gmail.com)

---

*Realizzato con passione e Next.js.*

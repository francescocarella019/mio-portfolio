import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "../lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Francesco Carella | Full Stack Developer",
    template: "%s | Francesco Carella",
  },
  description: "Sviluppatore Full Stack specializzato in React, Next.js e architetture backend scalabili.",
  applicationName: "Francesco Carella Portfolio",
  keywords: [
    "Francesco Carella",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Java",
    "Portfolio",
  ],
  authors: [{ name: "Francesco Carella" }],
  creator: "Francesco Carella",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Francesco Carella | Full Stack Developer",
    description: "Portfolio professionale con progetti Full Stack, competenze tecniche e contatti.",
    siteName: "Francesco Carella Portfolio",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francesco Carella | Full Stack Developer",
    description: "Portfolio professionale con progetti Full Stack, competenze tecniche e contatti.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

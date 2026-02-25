"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { FileDown, Mail, Linkedin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const INDIGO = "#6366F1";

export function Navbar() {
  const links = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-white/90"
        >
          {PORTFOLIO_DATA.hero.name.split(" ")[0]}
        </a>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function HeroSection() {
  const { hero } = PORTFOLIO_DATA;

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#0A0A0B] pt-16">
      {/* Subtle radial gradient behind name — indigo at 5% */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="h-[80vmin] w-[80vmin] rounded-full opacity-[0.05]"
          style={{
            background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl text-balance">
            {hero.name}
          </h1>
          <p
            className="mt-4 text-lg md:text-xl"
            style={{ color: INDIGO }}
          >
            {hero.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "#A1A1AA" }}>
            {hero.description}
          </p>
        </motion.div>

        {/* Link icons: mail, linkedin, file/resume — small, muted, brighten on hover */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          <a
            href={`mailto:${hero.cta_email}`}
            aria-label="Email"
            className="text-[#71717A] transition-colors hover:text-white"
          >
            <Mail className="size-5" />
          </a>
          <a
            href={hero.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#71717A] transition-colors hover:text-white"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href={hero.cta_resume}
            download
            aria-label="Resume"
            className="text-[#71717A] transition-colors hover:text-white"
          >
            <FileDown className="size-5" />
          </a>
        </motion.div>
      </div>

      {/* Animated chevron-down scroll indicator */}
      <motion.a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#71717A] transition-colors hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}

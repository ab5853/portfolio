"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Separator } from "@/components/ui/separator";
import { Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="bg-[#FFFFFF] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h2>

        <motion.div
          className="mt-6 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {about.bio}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground/70 italic">
            {about.interests}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { hero } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-border bg-[#F8F8FA]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${hero.cta_email}`}
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-5" />
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-5" />
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground/60">
            {"Built with AI tools \u2014 because that\u2019s the point."}
          </p>
          <p className="text-xs text-muted-foreground/40">
            {"\u00a9"} {new Date().getFullYear()} {hero.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

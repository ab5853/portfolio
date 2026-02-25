"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function ExperienceSection() {
  const { timeline, education } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="bg-[#F8F8FA] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="text-3xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Work timeline */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="size-4 text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Work
              </h3>
            </div>
            <div className="relative border-l-2 border-border pl-6">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.company}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUpVariants}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-accent bg-background" />
                  <p className="text-xs font-medium text-muted-foreground">
                    {entry.dates}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-foreground">
                    {entry.role}
                  </h4>
                  <p className="text-sm font-medium text-accent">
                    {entry.company}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="size-4 text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Education
              </h3>
            </div>
            <div className="relative border-l-2 border-border pl-6">
              {education.map((entry, i) => (
                <motion.div
                  key={entry.school}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUpVariants}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-accent bg-background" />
                  <p className="text-xs font-medium text-muted-foreground">
                    {entry.dates}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-foreground">
                    {entry.degree}
                  </h4>
                  <p className="text-sm font-medium text-accent">
                    {entry.school}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

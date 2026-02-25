"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import type { FeaturedProject, ProjectItem } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const INDIGO = "#6366F1";

/* ── Status config ────────────────────────────────────── */

const statusConfig = {
  shipped: {
    label: "Shipped",
    dot: "bg-emerald-500",
  },
  in_progress: {
    label: "In Progress",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    dot: "bg-indigo-500",
  },
} as const;

type Status = keyof typeof statusConfig;

function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {status === "in_progress" ? (
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
        </span>
      ) : (
        <span className={`inline-flex size-2 rounded-full ${config.dot}`} />
      )}
      {config.label}
    </span>
  );
}

/* ── Gradient placeholder (16/10, per-card hue) ───────── */

function mixWithWhite(hex: string, amount: number): string {
  const d = parseInt(hex.slice(1), 16);
  const r = Math.round(((d >> 16) & 0xff) * (1 - amount) + 255 * amount);
  const g = Math.round(((d >> 8) & 0xff) * (1 - amount) + 255 * amount);
  const b = Math.round((d & 0xff) * (1 - amount) + 255 * amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function GradientPlaceholder({
  color,
  index,
}: {
  color: string;
  index: number;
}) {
  const end = mixWithWhite(color, 0.25 + (index % 3) * 0.1);
  return (
    <div
      className="aspect-[16/10] w-full rounded-t-xl shrink-0"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${end} 100%)`,
      }}
    />
  );
}

/* ── Animation variants ───────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

/* ── Card with mouse-follow glow ──────────────────────── */

function ProjectCardWrapper({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string | null;
  className: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
  }, []);

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {/* Subtle circular shade following mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 120px at ${mouse.x * 100}% ${mouse.y * 100}%, ${INDIGO}08 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

/* ── Featured card (scannable: gradient, status, title, role, one result, tags) ── */

function FeaturedCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const color = project.thumbnail.color;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="group relative"
    >
      <ProjectCardWrapper
        href={project.link}
        className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-[#6366F1] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5"
      >
        <GradientPlaceholder color={color} index={index} />
        <div className="relative flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusBadge status={project.status as Status} />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.role}
            {project.dates && ` · ${project.dates}`}
            {project.location && ` · ${project.location}`}
          </p>
          <p className="text-sm font-semibold text-[#6366F1]">
            {project.impact}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border-0 bg-secondary px-2.5 py-0.5 text-[11px] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {project.link && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6366F1]">
                View Project
                <ArrowUpRight className="size-3" />
              </span>
            )}
          </div>
        </div>
      </ProjectCardWrapper>
    </motion.div>
  );
}

/* ── Project card (same scannable layout) ─────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const color = project.thumbnail.color;
  const offset = PORTFOLIO_DATA.featured.length + index;

  return (
    <motion.div
      custom={offset}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className="group relative"
    >
      <ProjectCardWrapper
        href={project.link}
        className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-[#6366F1] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5"
      >
        <GradientPlaceholder color={color} index={offset} />
        <div className="relative flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusBadge status={project.status as Status} />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.role}
            {project.dates && ` · ${project.dates}`}
          </p>
          <p className="text-sm font-semibold text-[#6366F1]">
            {project.impact}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border-0 bg-secondary px-2.5 py-0.5 text-[11px] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {project.link && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#6366F1]">
                View Project
                <ArrowUpRight className="size-3" />
              </span>
            )}
          </div>
        </div>
      </ProjectCardWrapper>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────── */

export function WorkSection() {
  const { featured, projects } = PORTFOLIO_DATA;

  return (
    <section id="work" className="bg-[#FFFFFF] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            What I've Built
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ventures and products I led from zero to one
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="mt-20 mb-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            More Projects
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

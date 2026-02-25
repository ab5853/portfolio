"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Linkedin, FileText, ChevronDown, X, ExternalLink,
  ArrowUpRight, Lightbulb, Target, TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const D = {
  hero: {
    firstName: "Ariun", nickname: "zaya", lastName: "Batbold",
    tagline: "Product Builder & Dual MBA + MS AI/ML @ Columbia",
    description: "I build products that are useful and net positive, powered by AI. Currently finishing my dual MBA + MS Engineering in AI/ML at Columbia Business School and Columbia Engineering. Previously shipped products as a founder in Mongolia and as a Technical Product Manager MBA at Amazon.",
    links: { email: "abatbold26@gsb.columbia.edu", linkedin: "https://linkedin.com/in/ariunzaya-batbold", github: "https://github.com/ariunzaya", resume: "/Ariunzaya_Resume.pdf" },
  },
  featured: [
    {
      title: "Ertech Labs", role: "Co-Founder, CEO & Founding PM", status: "shipped" as const, dates: "2022 – 2024",
      tags: ["EdTech", "0 to 1", "Product Strategy", "Underserved Markets"],
      problem: "40% of students in developing countries lack quality learning content online in a language they understand.",
      solution: "Co-founded Mongolia's first user-generated educational video platform for native (underserved) language content.",
      impact: "~1,700 users with 23.5% DAU/WAU stickiness within first 2 months; content campaign reached 170K+ people across 10 regions.",
      modal: { problem: "40% of students in developing countries lack quality learning content online in a language they understand. There's lack of data/information in underserved languages (e.g. African and Central Asian) on the internet, and searching for information becomes hard if one doesn't speak English or translation is non-contextual.", solution: "Built Mongolia's first user-generated educational video platform — a free space for Mongolians to create, consume, and share educational content in their native language.", results: ["~1,700 users acquired with 23.5% DAU/WAU stickiness ratio in first 2 months", "Nationwide campaign reached 170K+ (~5% of Mongolia's population) across 10 regions"] },
      link: "https://ertech.mn",
    },
    {
      title: "Amazon — Book Rewards", role: "Senior Product Manager - Technical MBA Intern", status: "done" as const, dates: "Summer 2025",
      tags: ["Product Strategy", "SQL", "Financial Modeling", "Writing", "Documentation", "User Research", "Prototyping with AI", "Cross-functional"],
      problem: "Existing book loyalty program limited to a single format and market, leaving global potential untapped. Customers want to feel rewarded and save on books.",
      solution: "Developed global expansion strategy and MVP for format-agnostic, multi-market rewards platform.",
      impact: "Delivered 25-page PR/FAQ and interactive prototype to senior leadership; informed key UX decisions via SQL analysis; unlocked $XXXm incremental annual revenue opportunity in the MVP market.",
      modal: { problem: "Amazon's existing book loyalty program was limited to a single format and single market, leaving significant untapped potential in the broader global books ecosystem. Customers wanted to save on books and feel rewarded everytime.", solution: "Developed long-term product strategy and MVP definition for expanding the rewards platform into a format-agnostic, multi-market broader book rewards platform. Led cross-functional partnerships across engineering, finance, BI, and international teams.", results: ["Defined product strategy and MVP for global expansion", "Conducted deep-dive purchasing pattern analysis using SQL to determine optimal reward thresholds", "Built financial models balancing customer value with business economics to inform key UX decisions", "Delivered 25-page PR/FAQ and interactive Lovable prototype to leadership"] },
      link: "https://www.amazon.com/kindlerewards",
    },
    {
      title: "Garage", role: "Co-Founder (part-time side project)", status: "shipped" as const, dates: "2023 – 2025",
      tags: ["No-Code/Low-Code", "AI", "Community"],
      problem: "Only 0.3% of the world can code — 99.7% are locked out of building digital solutions.",
      solution: "Founded Mongolia's first no-code/low-code × AI community for rapid digital product building.",
      impact: "Acquired ~80 members post-launch; designed and orchestrated 30-day MVP development pilot program, achieving NPS of 75",
      modal: { problem: "Only 0.3% of the world can code — meaning 99.7% of people are locked out of building digital solutions for problems they see every day.", solution: "Founded Mongolia's first no-code/low-code × AI community, teaching people to turn ideas into working digital products without writing code.", results: ["Members built: climate change AI solution, Global Shapers digital solution, Mongolian Tennis Association app"] },
      link: "https://garagemakers.club",
    },
  ],
  projects: [
    { title: "CBS Connect", context: "For Fun", status: "in_progress" as const, dates: "2026", tags: ["Multi-Agent AI", "RAG", "LLMs", "Claude Code", "Supabase"], problem: "MBA students graduate having deeply connected with only a fraction of their class.", solution: "AI agents discover connections from each other based on user's digital footprint and inputted 'interview'.", impact: "Launching Spring 2026 at Columbia Business School.", link: null },
    { title: "Personal Intelligence", context: "Dual Degree Capstone Project", status: "in_progress" as const, dates: "2026", tags: ["AI/ML", "Market Research", "Strategy"], problem: "LLM experience is fragmented for users who want more personalized contextual experience.", solution: "Mapping key players across AI assistant categories and positioning for a specific use case / problem (in research stage).", impact: "Researching the market landscape first.", link: null },
    { title: "Netflix Family Games", context: "Course Project in Digital PM Lab", status: "completed" as const, dates: "2025", tags: ["Product Strategy", "PRD", "Discovery", "Competitor Analysis", "User Research"], problem: "Netflix Games mobile engagement is low.", solution: "Multi-device family gaming with phones as controllers.", impact: "Presented to Netflix; validated when Netflix launched similar feature during project.", link: "https://pmlabnetflix.lovable.app" },
    { title: "GRE & GMAT Guru", context: "GPT", status: "shipped" as const, dates: "2024", tags: ["LLM", "ChatGPT", "Education"], problem: "GRE / GMAT prep for graduate programs is expensive and doesn't adapt to weak spots.", solution: "Custom GPT helper with personalized exam practice.", impact: "1K+ conversations, 4-star rating.", link: "https://chatgpt.com/g/g-1052XExEQ-gre-gmat-guru" },
    { title: "AdrenaLife", context: "For Fun (bootcamp experiment)", status: "completed" as const, dates: "2022", tags: ["No-Code", "Gamification", "Mobile App"], problem: "Extreme sports enthusiasts lack a dedicated discovery platform.", solution: "Gamified app for challenges, discovery, and connections.", impact: "Showcased at 100 School demo day.", link: "https://previewer.adalo.com/d169663d-699c-46e2-94b2-34fa9d8a50f4" },
  ],
  experience: [
    { company: "Amazon", role: "Senior Product Manager — Technical MBA Intern", dates: "2025", location: "Seattle, WA", highlight: "Books Rewards & Promotions" },
    { company: "Ertech Labs", role: "Co-Founder & CEO (previously Founding PM)", dates: "2022 – 2024", location: "Ulaanbaatar, Mongolia", highlight: "EdTech for underserved languages" },
    { company: "AND Solutions", role: "Project Manager", dates: "2022", location: "Ulaanbaatar, Mongolia", highlight: "Techstars-backed AI fintech" },
    { company: "Product HQ", role: "Community Leader", dates: "2022 – 2023", location: "Remote", highlight: "7K-member global PM community" },
    { company: "Citigroup", role: "Markets Analyst", dates: "2021 – 2022", location: "Hong Kong", highlight: "Rates & Currencies Structuring" },
    { company: "Mastercard", role: "Co-op", dates: "2019", location: "Purchase, NY", highlight: "Franchise Customer Enablement" },
  ],
  education: [
    { school: "Columbia Business School + Engineering", degree: "MBA × MS in AI & Machine Learning (Dual Degree, STEM)", dates: "2024 – 2026", note: "Columbia Fellow · Forté Fellow · Second Year Fellow · VP AI Club · VP CEO Club · Hermes Society" },
    { school: "Boston University", degree: "BA Economics, Minor: Business Administration and Management", dates: "2019 – 2021", note: "GPA 3.9/4.0 · Magna Cum Laude" },
  ],
  about: {
    bio: "I grew up in Mongolia, where my parents worked tirelessly to give me access to education most Mongolians coudn't get. That disparity shaped everything I've built — from Ertech, bringing educational content to Mongolian speakers, to Garage, teaching non-technical people to build with no-code and AI. I care about using technology to open doors for people who otherwise wouldn't have access.",
    personal: "International Master of Memory · Kiteboarding · Tennis · Snowboarding · Music",
  },
};

/* ═══════════════════════════════════════════════════════════════════
   PALETTE — Raycast #FF6363 red, darker sleek blue, pure black
   ═══════════════════════════════════════════════════════════════════ */

const RED = "#FF6363";
const RED_RGB = "255,99,99";
const BLUE = "#2D5BAA";
const BLUE_RGB = "45,91,170";

const STATUS: Record<string, { label: string; dot: string; text: string; ring: string; bg: string }> = {
  shipped: { label: "Shipped", dot: "bg-emerald-400", text: "text-emerald-400", ring: "ring-emerald-400/20", bg: "bg-emerald-400/10" },
  in_progress: { label: "Building", dot: "bg-amber-400 animate-pulse", text: "text-amber-400", ring: "ring-amber-400/20", bg: "bg-amber-400/10" },
  completed: { label: "Done", dot: "bg-zinc-400", text: "text-zinc-400", ring: "ring-zinc-400/20", bg: "bg-zinc-400/10" },
};

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════ */

function useFadeIn(t = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, [t]);
  return { ref, v };
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, v } = useFadeIn();
  return <div ref={ref} className={`transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════════
   FLUID BLOB ORB — bubbly metaball effect using SVG filter + canvas
   ═══════════════════════════════════════════════════════════════════ */

function FluidOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;

    const resize = () => {
      const p = canvas.parentElement!;
      w = canvas.width = p.offsetWidth;
      h = canvas.height = p.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Blob circles that merge together like a lava lamp
    interface Blob {
      x: number; y: number; r: number;
      vx: number; vy: number;
      baseR: number; phase: number; speed: number;
      side: "left" | "right";
    }

    const blobs: Blob[] = [];
    const BLOB_COUNT = 6;
    const leftCount = 3;
    for (let i = 0; i < BLOB_COUNT; i++) {
      const baseR = 40 + Math.random() * 60;
      const side: Blob["side"] = i < leftCount ? "left" : "right";
      blobs.push({
        x: side === "left"
          ? w * (0.05 + Math.random() * 0.15)  // 0.05 → 0.20
          : w * (0.80 + Math.random() * 0.15), // 0.80 → 0.95
        y: h * 0.3 + Math.random() * h * 0.4,
        r: baseR, baseR,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        side,
      });
    }

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      const cx = w / 2;
      const cy = h / 2;
      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;

      // Update blobs
      for (const b of blobs) {
        // Gentle pull toward side anchor (keeps blobs off the text)
        const ax = b.side === "left" ? w * 0.12 : w * 0.88;
        const ay = cy;
        const dx = ax - b.x;
        const dy = ay - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 120) {
          b.vx += (dx / dist) * 0.012;
          b.vy += (dy / dist) * 0.012;
        }

        // Mouse attraction (gentle)
        const mdx = mx - b.x;
        const mdy = my - b.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 400 && mdist > 10) {
          b.vx += (mdx / mdist) * 0.001;
          b.vy += (mdy / mdist) * 0.001;
        }

        // Random wandering
        b.vx += (Math.random() - 0.5) * 0.02;
        b.vy += (Math.random() - 0.5) * 0.02;

        // Strong center repulsion — dead zone over hero text
        const deadZoneLeft = w * 0.28;
        const deadZoneRight = w * 0.72;
        if (b.x > deadZoneLeft && b.x < deadZoneRight) {
          b.vx += b.x < cx ? -0.5 : 0.5;
        }

        // Wall boundaries per side to keep blobs on their half
        if (b.side === "left" && b.x > w * 0.35) {
          b.x = w * 0.35;
          if (b.vx > 0) b.vx *= -0.6;
        }
        if (b.side === "right" && b.x < w * 0.65) {
          b.x = w * 0.65;
          if (b.vx < 0) b.vx *= -0.6;
        }

        // Damping
        b.vx *= 0.985;
        b.vy *= 0.985;

        b.x += b.vx;
        b.y += b.vy;

        // Breathing size
        b.r = b.baseR + Math.sin(t * b.speed + b.phase) * (b.baseR * 0.25);
      }

      // Draw using metaball technique: render each blob as a soft radial gradient
      // then composite them so they merge visually
      ctx.globalCompositeOperation = "screen";

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2.5);
        grad.addColorStop(0, `rgba(${RED_RGB},0.22)`);
        grad.addColorStop(0.3, `rgba(${RED_RGB},0.10)`);
        grad.addColorStop(0.6, `rgba(${RED_RGB},0.03)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Add denser core to each blob
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, "rgba(255,255,255,0.06)");
        grad.addColorStop(0.4, `rgba(${RED_RGB},0.12)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[2]"
      style={{ filter: "blur(20px) contrast(1.3)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOWING STREAM — more particles, gentle upward drift
   ═══════════════════════════════════════════════════════════════════ */

function FlowingStream({ count = 14 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 16 + Math.random() * 14,
      size: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.12 + 0.03,
      drift: (Math.random() - 0.5) * 60,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} className="stream-particle absolute rounded-full"
          style={{
            left: `${p.left}%`, bottom: '-4px',
            width: `${p.size}px`, height: `${p.size}px`,
            backgroundColor: `rgba(${RED_RGB},${p.opacity})`,
            ["--drift" as string]: `${p.drift}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLASS CARD
   ═══════════════════════════════════════════════════════════════════ */

function GlassCard({ children, className = "", onClick, hoverable = true }: { children: React.ReactNode; className?: string; onClick?: () => void; hoverable?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => { if (!cardRef.current) return; const r = cardRef.current.getBoundingClientRect(); setMp({ x: e.clientX - r.left, y: e.clientY - r.top }); }, []);

  return (
    <div ref={cardRef} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={onMove}
      role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${hoverable ? "hover:-translate-y-1.5 cursor-pointer" : ""} ${className}`}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `rgba(${RED_RGB},0.25)` : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 40px rgba(${RED_RGB},0.06), 0 16px 48px rgba(0,0,0,0.4)` : '0 2px 16px rgba(0,0,0,0.3)',
      }}>
      {hovered && <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ background: `radial-gradient(350px circle at ${mp.x}px ${mp.y}px, rgba(${RED_RGB},0.06), transparent 60%)` }} />}
      <div className="absolute top-0 left-0 right-0 h-px opacity-50" style={{ background: `linear-gradient(90deg, transparent 10%, rgba(${RED_RGB},0.3) 50%, transparent 90%)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function StatusBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const s = STATUS[status] || STATUS.completed;
  if (compact) {
    return <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${s.text} ${s.bg} ring-1 ${s.ring}`}><span className={`w-1 h-1 rounded-full ${s.dot}`} />{s.label}</span>;
  }
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${s.text} ${s.bg} ring-1 ${s.ring}`}><span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}</span>;
}

function PSIRow({ icon: Icon, label, text }: { icon: typeof Lightbulb; label: string; text: string }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="mt-0.5 p-1 rounded-md shrink-0" style={{ background: `rgba(${RED_RGB},0.06)` }}><Icon size={10} style={{ color: RED }} className="opacity-70" /></div>
      <div className="min-w-0"><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 block mb-0.5">{label}</span><p className="text-[13px] text-zinc-300 leading-snug">{text}</p></div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-5"><h2 className="text-[32px] font-bold text-white tracking-tight leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2><div className="flex-1 h-px bg-gradient-to-r from-zinc-800 via-zinc-800 to-transparent" /></div>
      {subtitle && <p className="text-zinc-400 text-[15px] mt-2">{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════════════ */

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; if (isOpen) window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fadeIn" />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl animate-modalSlide" style={{ background: 'rgba(12,12,12,0.98)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 0 60px rgba(${RED_RGB},0.04), 0 40px 80px rgba(0,0,0,0.6)` }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="sticky top-0 float-right m-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"><X size={16} className="text-zinc-400" /></button>
        <div className="p-8 pt-6">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURED CARD
   ═══════════════════════════════════════════════════════════════════ */

function FeaturedCard({ item, onClick }: { item: (typeof D.featured)[0]; onClick: () => void }) {
  return (
    <GlassCard onClick={onClick} className="h-full flex flex-col">
      <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0" style={{ background: `radial-gradient(ellipse at 30% 40%, rgba(${RED_RGB},0.05), transparent 70%)` }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-black tracking-tight opacity-[0.05] text-white select-none">{item.title.split("—")[0].trim()}</span></div>
        <div className="absolute top-3 right-4"><StatusBadge status={item.status} /></div>
      </div>
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div><h3 className="text-[16px] font-bold text-white tracking-tight leading-tight">{item.title}</h3><p className="text-[13px] text-zinc-500 mt-0.5">{item.role} · {item.dates}</p></div>
        <div className="space-y-2.5 pt-3 border-t border-white/[0.04] flex-1">
          <PSIRow icon={Lightbulb} label="Problem" text={item.problem} />
          <PSIRow icon={Target} label="Solution" text={item.solution} />
          <PSIRow icon={TrendingUp} label="Impact" text={item.impact} />
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-1">
            {item.tags.map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 text-[11px] rounded-md bg-white/[0.04] text-zinc-400 font-medium border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[12px] font-semibold shrink-0 ml-3 hover:underline"
              style={{ color: BLUE }}
            >
              View <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECT CARD — fixed height, compact status, tighter layout
   ═══════════════════════════════════════════════════════════════════ */

function ProjectCard({ item }: { item: (typeof D.projects)[0] }) {
  return (
    <GlassCard hoverable className="h-full flex flex-col">
      <div className="p-4 space-y-2.5 flex-1 flex flex-col">
        {/* Header: icon + title + status */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
            style={{ background: `rgba(${RED_RGB},0.06)`, border: `1.5px solid rgba(${RED_RGB},0.25)` }}>
            <span className="text-sm font-black opacity-30 text-white select-none">{item.title.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1.5">
              <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight truncate">{item.title}</h3>
              <div className="shrink-0 mt-0.5"><StatusBadge status={item.status} compact /></div>
            </div>
            <p className="text-[12px] text-zinc-400 mt-0.5 truncate">{item.context} · {item.dates}</p>
          </div>
        </div>

        {/* PSI — compact */}
        <div className="space-y-2 pt-2.5 border-t border-white/[0.04] flex-1">
          <PSIRow icon={Lightbulb} label="Problem" text={item.problem} />
          <PSIRow icon={Target} label="Solution" text={item.solution} />
          <PSIRow icon={TrendingUp} label="Impact" text={item.impact} />
        </div>

        {/* Tags + link */}
        <div className="flex items-end justify-between pt-2 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-1">{item.tags.map((t) => <span key={t} className="px-1.5 py-0.5 text-[11px] rounded-md bg-white/[0.04] text-zinc-400 font-medium border border-white/[0.06]">{t}</span>)}</div>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold shrink-0 ml-2 hover:underline" style={{ color: BLUE }}>
              View <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function ModalContent({ item }: { item: (typeof D.featured)[0] }) {
  return (
    <div className="space-y-6">
      <div><div className="flex items-center gap-3 mb-3"><StatusBadge status={item.status} /><span className="text-sm text-zinc-400">{item.dates}</span></div><h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</h2><p className="text-base text-zinc-300 mt-1">{item.role}</p></div>
      <div className="rounded-xl p-5 border" style={{ background: `rgba(${RED_RGB},0.04)`, borderColor: `rgba(${RED_RGB},0.12)` }}><h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-2">The Problem</h4><p className="text-zinc-300 leading-relaxed text-[15px]">{item.modal.problem}</p></div>
      <div><h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-2">The Solution</h4><p className="text-zinc-300 leading-relaxed text-[15px]">{item.modal.solution}</p></div>
      <div><h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 mb-2">Results</h4><ul className="space-y-2.5">{item.modal.results.map((r, i) => <li key={i} className="flex gap-3 text-zinc-300 text-[15px]"><span className="mt-2 shrink-0" style={{ color: RED }}><svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg></span><span className="leading-relaxed">{r}</span></li>)}</ul></div>
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">{item.tags.map((t) => <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-white/[0.04] text-zinc-400 font-medium border border-white/[0.06]">{t}</span>)}</div>
      {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: BLUE }}>View <ExternalLink size={14} /></a>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <div className="min-h-screen bg-black text-white antialiased" style={{ background: '#000', fontFamily: "'Outfit', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalSlide { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out }
        .animate-modalSlide { animation: modalSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E") }
        html { scroll-behavior: smooth }
        body { background: #000; font-family: 'Outfit', sans-serif; }

        /* Flowing stream */
        @keyframes streamFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(var(--drift, 20px)); opacity: 0; }
        }
        .stream-particle { animation: streamFloat linear infinite; }

        ::selection { background: rgba(${RED_RGB},0.2); color: white; }

        * { font-family: 'Outfit', sans-serif; }
      `}</style>

      <div className="fixed inset-0 noise pointer-events-none z-[1]" />

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/[0.04]" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="text-sm font-bold tracking-tight"><span className="text-white">zaya</span><span className="text-zinc-700">.</span></a>
          <div className="flex items-center gap-0.5">
            {["Work", "Projects", "Experience", "About"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="px-3 py-1.5 text-[13px] font-medium text-zinc-500 rounded-lg hover:text-white hover:bg-white/[0.04] transition-all duration-300">{l}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FluidOrb />

        <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-[3]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] text-zinc-300 font-medium tracking-wide">Open to Product and Growth FT roles · May 2026</span>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-[-0.04em] leading-[0.9]">
              <span className="text-white">Ariun</span><span className="text-white">zaya</span>
              <br /><span className="text-white">{D.hero.lastName}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={180}><p className="mt-6 text-lg text-zinc-300 font-medium tracking-tight">{D.hero.tagline}</p></FadeIn>
          <FadeIn delay={280}><p className="mt-4 text-[15px] text-zinc-400 max-w-lg mx-auto leading-relaxed">{D.hero.description}</p></FadeIn>
          <FadeIn delay={380}>
            <div className="mt-8 flex items-center justify-center gap-2.5 flex-wrap">
              {[
                { href: `mailto:${D.hero.links.email}`, icon: Mail, label: "Email" },
                { href: D.hero.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: D.hero.links.resume, icon: FileText, label: "Resume" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={label !== "Email" && label !== "Resume" ? "_blank" : undefined} rel={label !== "Email" && label !== "Resume" ? "noopener noreferrer" : undefined}
                  className="group/btn inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-zinc-300 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:text-white hover:bg-white/[0.04] transition-all duration-300">
                  <Icon size={14} />{label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <a href="#work" className="group flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-medium group-hover:text-zinc-300 transition-colors">Scroll</span>
            <ChevronDown size={14} className="text-zinc-400 animate-bounce group-hover:text-zinc-300 transition-colors" />
          </a>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section id="work" className="py-28 relative">
        <FlowingStream count={12} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${RED_RGB},0.15), transparent)` }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn><SectionHeader title="What I've Built" subtitle="Products I founded, shipped, or led from concept to launch. Click for further details." /></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {D.featured.map((item, i) => <FadeIn key={item.title} delay={i * 120}><FeaturedCard item={item} onClick={() => setModal(<ModalContent item={item} />)} /></FadeIn>)}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-28 relative" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,6,8,1) 50%, rgba(0,0,0,0) 100%)' }}>
        <FlowingStream count={10} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn><SectionHeader title="More Projects" subtitle="Explorations, coursework, and things I'm building next." /></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {D.projects.map((item, i) => <FadeIn key={item.title} delay={i * 80}><ProjectCard item={item} /></FadeIn>)}
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE & EDUCATION ═══ */}
      <section id="experience" className="py-28 relative">
        <FlowingStream count={8} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <FadeIn className="lg:col-span-3"><div>
              <SectionHeader title="Experience" subtitle="Where I've worked." />
              <div className="space-y-0">
                {D.experience.map((item, i) => (
                  <div key={i} className="group relative pl-8 pb-8 last:pb-0 transition-colors duration-300" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = `rgba(${RED_RGB},0.3)`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'rgba(255,255,255,0.08)')}>
                    <div className="absolute -left-[5px] top-[5px] w-[9px] h-[9px] rounded-full bg-black border-2 border-zinc-700 group-hover:bg-black transition-all duration-300" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap"><span className="text-[15px] font-bold text-white">{item.company}</span><span className="text-[12px] text-zinc-400">· {item.dates}</span></div>
                      <p className="text-[14px] text-zinc-300 mt-0.5">{item.role}</p>
                      <p className="text-[13px] text-zinc-400 mt-1">{item.location} · {item.highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div></FadeIn>
            <FadeIn delay={200} className="lg:col-span-2"><div>
              <SectionHeader title="Education" subtitle="Where I've studied." />
              <div className="space-y-5">
                {D.education.map((item, i) => (
                  <div key={i} className="rounded-2xl p-5 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-start justify-between gap-3"><span className="text-[14px] font-bold text-white leading-tight">{item.school}</span><span className="text-[12px] text-zinc-400 shrink-0">{item.dates}</span></div>
                    <p className="text-[14px] text-zinc-300 mt-1.5">{item.degree}</p>
                    <p className="text-[13px] text-zinc-400 mt-1.5">{item.note}</p>
                  </div>
                ))}
              </div>
            </div></FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-28 relative" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,6,8,1) 50%, rgba(0,0,0,0) 100%)' }}>
        <FlowingStream count={6} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn><div className="max-w-2xl">
            <SectionHeader title="About" subtitle="" />
            <p className="text-zinc-300 leading-relaxed text-[15px] -mt-6">{D.about.bio}</p>
            <div className="mt-6 flex items-start gap-3">
              <div className="w-[3px] rounded-full self-stretch shrink-0" style={{ background: RED }} />
              <p className="text-[13px] text-zinc-400 leading-relaxed">{D.about.personal}</p>
            </div>
          </div></FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 border-t border-white/[0.04] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-sm font-bold"><span className="text-white">zaya</span><span className="text-zinc-700">.</span></span>
              <p className="text-[13px] text-zinc-400 mt-1">Built with Cursor, Claude, and V0.</p>
            </div>
            <div className="flex items-center gap-2.5">
              {[{ href: `mailto:${D.hero.links.email}`, icon: Mail, label: "Email" }, { href: D.hero.links.linkedin, icon: Linkedin, label: "LinkedIn" }].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="p-2.5 rounded-xl border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300" aria-label={label}><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.03] text-center"><p className="text-[11px] text-white">© {new Date().getFullYear()} Ariunzaya Batbold</p></div>
        </div>
      </footer>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)}>{modal}</Modal>
    </div>
  );
}

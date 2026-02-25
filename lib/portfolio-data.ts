export const PORTFOLIO_DATA = {
  hero: {
    name: "Ariunzaya Batbold",
    tagline: "AI Product Manager & Builder",
    description:
      "I build products at the intersection of AI, user needs, and underserved markets. Currently finishing my MBA \u00d7 MS in AI & Machine Learning at Columbia, looking for AI PM roles where I can ship products that matter.",
    cta_resume: "/Ariunzaya_Resume.pdf",
    cta_email: "abatbold26@gsb.columbia.edu",
    linkedin: "https://linkedin.com/in/ariunzaya-batbold",
    github: "https://github.com/ariunzaya",
  },

  featured: [
    {
      title: "Ertech Labs",
      role: "Co-Founder & CEO",
      dates: "2022 \u2013 2024",
      location: "Ulaanbaatar, Mongolia",
      status: "shipped" as const,
      thumbnail: { color: "#4A7CFF", initials: "EL" },
      problem:
        "40% of students in developing countries lack quality learning content in a language they understand. In Mongolia, most people only speak Mongolian \u2014 yet almost all online educational content is in English, locking millions out of opportunities to learn and grow.",
      solution:
        "Built Mongolia\u2019s first user-generated educational video platform, creating a free space for Mongolians to create, consume, and share educational content in their native language \u2014 without cultural, language, or financial barriers.",
      impact:
        "Reached 170K+ people (~5% of Mongolia\u2019s population) with 23.5% DAU/WAU stickiness and top-2 university partnerships",
      tags: ["EdTech", "0\u21921", "Product Strategy", "User Research", "Underserved Markets"],
      link: null as string | null,
    },
    {
      title: "Amazon \u2014 Book Rewards Platform",
      role: "Senior Product Manager Intern \u2014 Technical",
      dates: "Summer 2025",
      location: "Seattle, WA",
      status: "shipped" as const,
      thumbnail: { color: "#FF9900", initials: "AZ" },
      problem:
        "Amazon\u2019s existing book loyalty program was limited to a single format and single market, leaving significant untapped potential in the broader global books ecosystem.",
      solution:
        "Developed long-term product strategy and MVP definition for expanding the rewards platform into a format-agnostic, multi-market experience. Led cross-functional partnerships across engineering, finance, BI, and international teams.",
      impact:
        "Delivered product strategy, financial models, and 25-page PR/FAQ with interactive prototype to senior leadership",
      tags: ["Product Strategy", "SQL", "Financial Modeling", "PR/FAQ", "Cross-Functional Leadership"],
      link: null as string | null,
    },
    {
      title: "Garage",
      role: "Co-Founder",
      dates: "2023 \u2013 2025",
      location: "Ulaanbaatar, Mongolia",
      status: "shipped" as const,
      thumbnail: { color: "#1B2A4A", initials: "G" },
      problem:
        "Only 0.3% of the world can code \u2014 meaning 99.7% of people are locked out of building digital solutions for problems they see every day. In Mongolia, this gap was even wider, with no community or resources for non-technical builders.",
      solution:
        "Founded Mongolia\u2019s first no-code/low-code \u00d7 AI community, teaching people to turn ideas into working digital products without writing code \u2014 through workshops, content, events, and hands-on building.",
      impact:
        "30+ members building real solutions within 2 months \u2014 including climate AI tool, Global Shapers platform, and national tennis app",
      tags: ["No-Code/Low-Code", "AI", "Community Building", "Education"],
      link: "https://garagemakers.club",
    },
  ],

  projects: [
    {
      title: "MeetYou",
      role: "Solo Builder",
      dates: "Building Now",
      status: "in_progress" as const,
      thumbnail: { color: "#E05D8C", initials: "MY" },
      problem:
        "MBA students graduate having deeply connected with only a fraction of their class. Existing apps don\u2019t work in closed, trust-rich communities.",
      solution:
        "AI-native people discovery platform for closed communities. Users upload LinkedIn and complete an AI interview. Autonomous agents discover non-obvious connections, delivering weekly matches with transparent explanations.",
      impact: "Multi-agent AI matching with RAG pipelines and embeddings",
      tags: ["Multi-Agent AI", "RAG", "LLMs", "Next.js", "Supabase"],
      link: null as string | null,
    },
    {
      title: "Personal Intelligence \u2014 Capstone",
      role: "Researcher",
      dates: "2025 \u2013 2026",
      status: "in_progress" as const,
      thumbnail: { color: "#7C5CFC", initials: "PI" },
      problem:
        "The personal AI assistant market is evolving rapidly with fragmented players \u2014 hard to understand competitive positioning and whitespace opportunities.",
      solution:
        "Comprehensive competitive landscape analysis of the personal intelligence ecosystem \u2014 mapping key players, analyzing differentiation, and emerging trends across conversational AI and agentic systems.",
      impact: "Columbia MBA \u00d7 MS dual degree capstone research",
      tags: ["AI/ML", "Market Research", "Competitive Analysis", "Product Strategy"],
      link: null as string | null,
    },
    {
      title: "Netflix Family Games",
      role: "Product Lead",
      dates: "2025",
      status: "completed" as const,
      thumbnail: { color: "#E50914", initials: "NF" },
      problem:
        "Less than 1% of Netflix subscribers engage with Games \u2014 the family TV sits underutilized as a shared play space.",
      solution:
        "Designed a multi-device family gaming experience turning the TV into a shared playground. Conducted customer discovery (n=52), built prioritization framework, defined 4 product epics with user stories.",
      impact: "Product direction aligned with a feature Netflix launched during our project timeline",
      tags: ["Customer Discovery", "PRD", "Prototyping", "Gaming"],
      link: "https://pmlabnetflix.lovable.app",
    },
    {
      title: "Custom GRE Prep GPT",
      role: "Builder",
      dates: "2024",
      status: "shipped" as const,
      thumbnail: { color: "#10A37F", initials: "GR" },
      problem:
        "GRE prep is expensive, generic, and doesn\u2019t adapt to individual weak spots.",
      solution:
        "Built a custom GPT chatbot providing personalized GRE practice, adapting difficulty and focus areas based on performance. Created for the Access+ community of underrepresented applicants.",
      impact: "Personalized AI tutor for the Access+ community",
      tags: ["LLM", "ChatGPT", "EdTech"],
      link: null as string | null,
    },
    {
      title: "AdrenaLife",
      role: "Builder",
      dates: "2023",
      status: "shipped" as const,
      thumbnail: { color: "#F97316", initials: "AL" },
      problem:
        "Extreme sports enthusiasts lack a dedicated platform to discover experiences, connect, and track pursuits.",
      solution:
        "Built a gamified mobile app connecting extreme sports enthusiasts \u2014 featuring activity tracking, community challenges, and experience discovery.",
      impact: "Showcased at public demo day \u2014 100DaysOfNoCode Bootcamp",
      tags: ["No-Code", "Gamification", "Consumer"],
      link: null as string | null,
    },
  ],

  timeline: [
    {
      company: "AND Solutions Pte. Ltd.",
      role: "Project Manager",
      dates: "2022",
      description:
        "Singaporean Techstars-backed AI fintech. Co-led cross-functional team building process automation for Australian client. Championed product team creation.",
    },
    {
      company: "Product HQ",
      role: "Community Leader",
      dates: "2022 \u2013 2023",
      description:
        "Led 7K-member global product management community. Drove 30% increase in monthly active users through data-driven engagement initiatives.",
    },
    {
      company: "Citigroup",
      role: "Markets Analyst",
      dates: "2021 \u2013 2022",
      description:
        "Institutional Clients Group, Hong Kong. Rates & Currencies Structuring \u2014 pricing models, derivative contracts, fixed income research.",
    },
    {
      company: "Mastercard",
      role: "Franchise Customer Enablement Co-op",
      dates: "2019",
      description:
        "Owned High-Risk Merchant compliance program. Identified 23 customers violating Mastercard rules, preventing major compliance risks.",
    },
  ],

  education: [
    {
      school: "Columbia Business School",
      degree: "MBA \u2014 Technology Product Management",
      dates: "2024 \u2013 2026",
      note: "Dual MBA\u00d7MS (STEM), Columbia Fellow, Fort\u00e9 Fellow",
    },
    {
      school: "Columbia Engineering",
      degree: "MS \u2014 AI and Machine Learning",
      dates: "2024 \u2013 2026",
      note: "NLP, Applied ML, Artificial Intelligence, Analytics in Python",
    },
    {
      school: "Boston University",
      degree: "BA \u2014 Economics, Minor: Business Administration",
      dates: "2019 \u2013 2021",
      note: "GPA: 3.9/4.0, Magna Cum Laude",
    },
  ],

  about: {
    bio: "I grew up in Mongolia, where my parents worked tirelessly to give me access to education that most Mongolians never get. That disparity shaped everything I\u2019ve built since \u2014 from Ertech, a platform bringing educational content to Mongolian speakers, to Garage, a community teaching non-technical people to build with no-code and AI. I care about using technology to open doors for people who otherwise wouldn\u2019t have access. Now at Columbia, I\u2019m combining my MBA with a Masters in AI & Machine Learning, focused on building AI products that serve real human needs \u2014 especially in markets the tech industry tends to overlook.",
    interests:
      "International Master of Memory title holder, certified kiteboarder, national swimming medalist, snowboarder, tennis player, and collector of hidden gems.",
  },
};

export type FeaturedProject = (typeof PORTFOLIO_DATA.featured)[number];
export type ProjectItem = (typeof PORTFOLIO_DATA.projects)[number];
export type TimelineEntry = (typeof PORTFOLIO_DATA.timeline)[number];
export type EducationEntry = (typeof PORTFOLIO_DATA.education)[number];

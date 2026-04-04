import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "AI & Automation",
    color: "from-cyan-400 to-blue-500",
    skills: [
      { name: "AI Agent Orchestration (Multi-Agent)", level: 97 },
      { name: "LLM Integration (Gemini, GPT-4, Claude)", level: 96 },
      { name: "Prompt Engineering & RAG Systems", level: 95 },
      { name: "n8n / Make.com / Zapier Automation", level: 94 },
      { name: "Flowise / LangChain / AutoGen", level: 92 },
    ],
  },
  {
    title: "Full Stack Development",
    color: "from-violet-400 to-purple-600",
    skills: [
      { name: "React / Next.js / TypeScript", level: 93 },
      { name: "Node.js / Express / Python / FastAPI", level: 91 },
      { name: "SaaS & Cloud Application Development", level: 90 },
      { name: "REST APIs / GraphQL / WebSockets", level: 89 },
      { name: "PostgreSQL / MongoDB / Redis", level: 87 },
    ],
  },
  {
    title: "Specialisations",
    color: "from-emerald-400 to-teal-500",
    skills: [
      { name: "AI Document & Invoice Processing", level: 95 },
      { name: "Real Estate AI & ROI Dashboards", level: 90 },
      { name: "Zero-Knowledge Proof Security", level: 85 },
      { name: "Behavioral Biometrics (Keystroke)", level: 83 },
      { name: "Web Scraping & Data Pipelines", level: 88 },
    ],
  },
];

const TECH_BADGES = [
  "Gemini AI", "GPT-4", "Claude", "LangChain", "AutoGen", "Flowise",
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "MongoDB", "Redis", "Supabase", "Docker", "AWS",
  "n8n", "Make.com", "Zapier", "Vercel", "Pinecone", "Chroma DB",
  "Zero-Knowledge Proofs", "WebAssembly", "snarkjs", "Tailwind CSS",
];

function SkillBar({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground font-medium">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Technical Expertise</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Skills &{" "}
            <span className="text-gradient-cyan">Technologies</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            A comprehensive toolkit spanning AI orchestration, full-stack development, and intelligent automation —
            built over 40+ years in software engineering.
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={ci * 0.15}
              className="glass rounded-2xl p-6 border border-border/60 card-hover"
            >
              <h3
                className="font-bold text-foreground text-lg mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + ci * 0.1 + si * 0.08}
                    color={cat.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services offered */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
          className="glass rounded-2xl p-6 sm:p-8 border border-border/60 mb-6"
        >
          <h3
            className="text-center font-bold text-foreground text-lg mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Services Offered
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-6">
            From LinkedIn profile · Custom Software Development · Web Development · Application Development · SaaS Development · Cloud Application Development · IT Consulting
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Custom Software Development",
              "Web Development",
              "Application Development",
              "SaaS Development",
              "Cloud Application Development",
              "IT Consulting",
              "AI Automation Solutions",
              "AI Agent Design",
              "Invoice Processing Automation",
              "Real Estate AI Tools",
              "Security Systems",
              "Excel Automation",
            ].map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-primary/30 text-primary"
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tech badges cloud */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.5}
          className="glass rounded-2xl p-8 border border-border/60"
        >
          <h3
            className="text-center font-bold text-foreground text-lg mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tools & Platforms
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {TECH_BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.03 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

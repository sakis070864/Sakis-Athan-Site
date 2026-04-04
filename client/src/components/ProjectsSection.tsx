import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Brain, ExternalLink, FileText, Globe, Lock, MessageSquare, Shield, Workflow } from "lucide-react";

const CATEGORIES = ["All", "AI Agents", "Automation", "Real Estate", "Security"];

const PROJECTS = [
  {
    id: 1,
    title: "AI Multilingual Chatbot",
    category: "AI Agents",
    icon: MessageSquare,
    tags: ["Gemini AI", "React", "Node.js", "Multi-language"],
    description:
      "A live AI assistant that converses in all languages, demonstrating AI automation firsthand. Built to show businesses how intelligent chatbots can scale customer interactions and save time.",
    highlights: ["Supports all languages", "Real-time AI responses", "Live production demo"],
    color: "from-cyan-500/20 to-blue-600/10",
    borderColor: "border-cyan-500/30",
    accentColor: "text-cyan-400",
    liveUrl: "https://linkedin-sakis-bot.vercel.app/",
  },
  {
    id: 2,
    title: "AI Logistics Automation Playground",
    category: "Automation",
    icon: Workflow,
    tags: ["AI OCR", "Python", "FastAPI", "React", "Invoice Processing"],
    description:
      "An AI tool that automatically reads logistics invoices and organizes data in seconds. Transforms hours of manual data entry into an instant, error-free automated pipeline.",
    highlights: ["Invoice auto-processing", "Hours → seconds", "Live demo available"],
    color: "from-violet-500/20 to-purple-600/10",
    borderColor: "border-violet-500/30",
    accentColor: "text-violet-400",
    liveUrl: "https://linkedin-invoice.vercel.app/",
  },
  {
    id: 3,
    title: "EstateNexus Dubai | AI Real Estate Pro",
    category: "Real Estate",
    icon: Globe,
    tags: ["GPT-4", "React", "Real Estate AI", "ROI Analysis"],
    description:
      "Enterprise-grade AI terminal for real-time ROI analysis and deep technical auditing of prime Dubai real estate plots. Built for high-stakes developers and institutional investors, optimized for 2025 market cycles.",
    highlights: ["Real-time ROI analysis", "Risk auditing", "Institutional-grade"],
    color: "from-emerald-500/20 to-teal-600/10",
    borderColor: "border-emerald-500/30",
    accentColor: "text-emerald-400",
    liveUrl: "https://linkedin-nexus.vercel.app/",
  },
  {
    id: 4,
    title: "AI Plot Investor PRO",
    category: "Real Estate",
    icon: Brain,
    tags: ["AI", "React", "Financial Modeling", "Maps API"],
    description:
      "A professional AI tool for Real Estate ROI analysis featuring real-time financial modeling, AI risk auditing, and interactive map integration. Empowers investors with data-driven decisions.",
    highlights: ["Financial modeling", "AI risk auditing", "Interactive maps"],
    color: "from-orange-500/20 to-amber-600/10",
    borderColor: "border-orange-500/30",
    accentColor: "text-orange-400",
    liveUrl: "https://linkedin-oikopedo.vercel.app/",
  },
  {
    id: 5,
    title: "Excel Automation Dashboard",
    category: "Automation",
    icon: FileText,
    tags: ["React", "TypeScript", "Excel API", "Data Visualization"],
    description:
      "Transforms static spreadsheets into live, interactive profit engines. Connect Excel files to a dynamic dashboard and let automation handle the updates while you focus on the insights.",
    highlights: ["Static → dynamic dashboards", "Automated updates", "Profit engine"],
    color: "from-pink-500/20 to-rose-600/10",
    borderColor: "border-pink-500/30",
    accentColor: "text-pink-400",
    liveUrl: "https://linkedin-excel.vercel.app/",
  },
  {
    id: 6,
    title: "AI Legal Intake & Triage Pro",
    category: "AI Agents",
    icon: Bot,
    tags: ["Gemini AI", "Google Search Grounding", "React", "Legal Tech"],
    description:
      "A digital paralegal using Google Search Grounding to dynamically find and ask the most relevant legal questions for every unique case. Generates full case summaries, risk analysis, and viability scores before you touch a file.",
    highlights: ["Digital paralegal", "Case risk scoring", "Secure firm database"],
    color: "from-blue-500/20 to-indigo-600/10",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-400",
    liveUrl: null,
  },
  {
    id: 7,
    title: "Neural AI Bouncer",
    category: "Security",
    icon: Shield,
    tags: ["Gemini Flash", "React", "Bot Detection", "AI Security"],
    description:
      "A smarter CAPTCHA replacement using Gemini 3 Flash for natural conversation-based human verification. Bots can solve image puzzles, but they fail on real-time reasoning. Zero friction for real users.",
    highlights: ["Gemini-powered verification", "Zero user friction", "Bot-proof reasoning"],
    color: "from-teal-500/20 to-cyan-600/10",
    borderColor: "border-teal-500/30",
    accentColor: "text-teal-400",
    liveUrl: null,
  },
  {
    id: 8,
    title: "ZKP Security — Biometric Authentication",
    category: "Security",
    icon: Lock,
    tags: ["Zero-Knowledge Proofs", "TypeScript", "Biometrics", "Cryptography"],
    description:
      "Next-generation authentication built on Zero-Knowledge Protocol, Pedersen Commitment, and behavioral biometric verification (keystroke dynamics). No raw biometric data stored — even a stolen password cannot grant access without the user's unique typing behavior.",
    highlights: ["Zero-knowledge proofs", "Keystroke biometrics", "Quantum-resistant design"],
    color: "from-amber-500/20 to-yellow-600/10",
    borderColor: "border-amber-500/30",
    accentColor: "text-amber-400",
    liveUrl: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Featured{" "}
            <span className="text-gradient-cyan">AI Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Real AI systems, automation platforms, and intelligent applications I have designed and deployed in production.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "glass border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                exit={{ opacity: 0, scale: 0.95 }}
                custom={i * 0.08}
                className={`glass rounded-2xl p-6 border ${project.borderColor} card-hover group bg-gradient-to-br ${project.color}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-white/5 border ${project.borderColor} flex items-center justify-center flex-shrink-0`}>
                      <project.icon className={`w-5 h-5 ${project.accentColor}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold ${project.accentColor} uppercase tracking-wide`}>
                        {project.category}
                      </span>
                      <h3
                        className="font-bold text-foreground text-base leading-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-lg bg-white/5 border ${project.borderColor} flex items-center justify-center ${project.accentColor} hover:bg-white/10 transition-colors flex-shrink-0`}
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.accentColor} bg-current flex-shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live demo badge */}
                {project.liveUrl && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${project.accentColor} hover:underline`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Live Demo
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.6}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Have a project in mind? Let's build your custom AI solution.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 glow-cyan"
          >
            Let's Build Something
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
}

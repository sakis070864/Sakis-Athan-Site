import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Code2, Cpu, Globe, Layers, Shield, TrendingUp, Zap } from "lucide-react";

const STATS = [
  { value: "40+", label: "Years in Software", icon: Code2 },
  { value: "50+", label: "AI Projects Built", icon: Brain },
  { value: "10+", label: "Industries Served", icon: Globe },
  { value: "100%", label: "Custom Solutions", icon: Zap },
];

const SERVICES = [
  {
    icon: Brain,
    title: "Custom AI Tools",
    desc: "Intelligent automation systems tailored to your exact business workflow — from invoice processing to real estate analytics.",
  },
  {
    icon: Zap,
    title: "Business Automation",
    desc: "Eliminate manual data entry and spreadsheet drudgery. I turn static processes into dynamic, profit-generating engines.",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    desc: "End-to-end SaaS platforms, dashboards, and web applications built with modern React, Node.js, and cloud infrastructure.",
  },
  {
    icon: Shield,
    title: "AI Security Systems",
    desc: "Next-generation security using Zero-Knowledge Proofs, behavioral biometrics, and AI-powered bot detection.",
  },
  {
    icon: TrendingUp,
    title: "Real Estate AI",
    desc: "Live ROI dashboards, risk analysis tools, and AI-powered investment platforms for property developers and investors.",
  },
  {
    icon: Cpu,
    title: "AI Agent Orchestration",
    desc: "Multi-agent systems that autonomously execute, debug, test, and deploy code — your digital team that never sleeps.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Stop Losing Money on{" "}
            <span className="text-gradient-cyan">Manual Tasks</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="space-y-5"
          >
            <p className="text-muted-foreground text-base leading-relaxed">
              If your business relies on manual data entry and spreadsheets, you are burning profit every day.
              I'm <span className="text-foreground font-semibold">Athanasios (Sakis) Athanasopoulos</span> — a Senior Software Engineer
              and AI Orchestrator based in Athens, Greece, with over 40 years of experience in software development
              and a deep specialisation in AI automation and custom intelligent systems.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              I build custom AI tools that handle the heavy lifting for you. From automated invoice processing that
              turns hours of logistics work into seconds, to live ROI and risk dashboards for real estate investors,
              to dynamic Excel automation engines — my solutions eliminate errors, scale your operations, and keep
              more money in your business.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              I've reached a stage where my AI Agents have full control of my development environment. They run
              autonomously — debugging code, running security checks, and deploying applications — while I architect
              the vision. This "Orchestrator Mindset" means I can deliver complex, production-grade AI solutions
              in record time.
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "🚀 Shipping & Logistics Automation",
                "🏗️ Real Estate AI Dashboards",
                "📊 Excel & Data Automation",
                "🔐 Zero-Knowledge Security",
                "🤖 Multi-Agent AI Systems",
                "⚡ SaaS Platform Development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.2 + i * 0.1}
                className="glass rounded-2xl p-6 border border-border/60 card-hover text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div
                  className="text-3xl font-bold text-gradient-cyan mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
          className="mb-4"
        >
          <h3
            className="text-center text-xl font-bold text-foreground mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What I Build For You
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.4 + i * 0.08}
                className="glass rounded-2xl p-5 border border-border/60 card-hover group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3 group-hover:bg-primary/25 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h4
                  className="font-bold text-foreground text-sm mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {service.title}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
}

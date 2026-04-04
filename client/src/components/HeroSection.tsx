import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const PROFILE_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030011646/d2MVKFHYqkMFbqNGPN23GF/smileSAKIS_e6d6c34c.jpeg";

const TYPED_STRINGS = [
  "AI Orchestrator",
  "Full Stack Developer",
  "AI Automation Expert",
  "Custom AI Solutions Builder",
  "Software Engineer",
];

function useTypingEffect(strings: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setStringIndex((i) => (i + 1) % strings.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export default function HeroSection() {
  const typedText = useTypingEffect(TYPED_STRINGS);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-12">

          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Available for new projects
            </motion.div>

            {/* Name label */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="text-sm sm:text-base font-medium text-muted-foreground tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Athanasios Athanasopoulos
            </motion.div>

            {/* AI Tagline Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-foreground">AI Solutions</span>
              <br />
              <span className="text-gradient-cyan">For Every Business</span>
            </motion.h1>

            {/* Typing subtitle */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-6 h-10 flex items-center justify-center lg:justify-start gap-1"
            >
              <span className="text-primary">{typedText}</span>
              <span className="cursor-blink text-primary text-3xl leading-none">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Senior Software Engineer specializing in AI Automation & Custom AI Solutions for Any Industry.
              I build intelligent tools that eliminate manual tasks, automate logistics, and transform
              static spreadsheets into profit engines — so your business scales faster and keeps more money.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-200 glow-cyan animate-pulse-glow"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 rounded-xl glass border border-primary/40 text-foreground font-semibold text-base hover:bg-primary/10 transition-all duration-200"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.65}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://www.linkedin.com/in/sakis-athan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:sakis@sakisathan.com"
                className="w-11 h-11 rounded-xl glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/20 to-primary/10 blur-2xl scale-110 animate-pulse-glow" />

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-105 animate-float" />

              {/* Photo container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/40 glow-cyan">
                <img
                  src={PROFILE_PHOTO}
                  alt="Athanasios Athanasopoulos - AI Orchestrator & Software Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge: Experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="absolute -left-4 top-1/3 glass-strong rounded-xl px-3 py-2 border border-primary/30 shadow-xl"
              >
                <div className="text-xs text-muted-foreground">Experience</div>
                <div className="text-lg font-bold text-primary">40+ yrs</div>
              </motion.div>

              {/* Floating badge: Projects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-4 bottom-1/3 glass-strong rounded-xl px-3 py-2 border border-accent/30 shadow-xl"
              >
                <div className="text-xs text-muted-foreground">AI Projects</div>
                <div className="text-lg font-bold text-accent">50+</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="flex justify-center pb-8"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            aria-label="Scroll down"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Linkedin, Send, CheckCircle, Loader2, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import HumanVerifyChallenge from "./HumanVerifyChallenge";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "sakis@sakisathan.com",
    href: "mailto:sakis@sakisathan.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Agios Dimitrios, Athens, Greece",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sakis-athan",
    href: "https://www.linkedin.com/in/sakis-athan/",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Bot protection state
  const [challengeOpen, setChallengeOpen] = useState(false);

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! I'll get back to you soon.");
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Failed to send message. Please try again.");
    },
  });

  /** Step 1: Validate form fields, then open the human challenge */
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Open the bot-protection challenge instead of submitting directly
    setChallengeOpen(true);
  };

  /** Step 2: Called only after the human challenge is passed */
  const handleVerified = () => {
    setChallengeOpen(false);
    sendContact.mutate(form);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />

      {/* Bot protection challenge modal */}
      <HumanVerifyChallenge
        isOpen={challengeOpen}
        onVerified={handleVerified}
        onClose={() => setChallengeOpen(false)}
      />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's{" "}
            <span className="text-gradient-cyan">Work Together</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Have a project in mind? Whether it's an AI system, automation pipeline, or full-stack application —
            I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Contact info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-border/60">
              <h3
                className="font-bold text-foreground text-lg mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot-safe badge */}
            <div
              className="glass rounded-2xl p-4 border border-primary/20 flex items-center gap-3"
              style={{ background: "rgba(0,229,229,0.04)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(145deg, #00e5e5 0%, #007e7e 100%)",
                  boxShadow: "0 4px 12px rgba(0,229,229,0.35)",
                }}
              >
                <ShieldCheck className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Bot-Protected Form</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Human verification required before sending. No spam, no bots.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5">
              <h3 className="font-bold text-foreground text-base mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to build your AI solution?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                From concept to deployment, I handle the full lifecycle of AI-powered applications.
                Let's discuss your vision.
              </p>
              <a
                href="https://www.linkedin.com/in/sakis-athan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 border border-border/60">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl glass border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitClick} className="space-y-5">
                  <h3
                    className="font-bold text-foreground text-lg mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Send a Message
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    All messages are sent directly to my inbox with the subject "Form send from your Site".
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="AI project inquiry, collaboration, etc."
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project, requirements, or how I can help..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Send button — triggers challenge, not direct submit */}
                  <button
                    type="submit"
                    disabled={sendContact.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 glow-cyan"
                  >
                    {sendContact.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Bot protection notice */}
                  <p className="text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-primary/60" />
                    A quick human verification will appear before sending
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

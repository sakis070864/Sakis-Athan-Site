// Shared blog posts data — used by both the frontend BlogSection and server-side tests

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "ai-agents-autonomous-development",
    title: "AI Agents Have Full Control of My System — And It's a Game Changer",
    excerpt:
      "Building apps has officially moved from 'labor-intensive' to 'orchestration.' I'm at a stage where my AI Agents run autonomously — debugging code, running security checks, and deploying to Vercel while I'm at the gym.",
    content: `Building apps has officially moved from "labor-intensive" to "orchestration."

I'm currently at a stage where my AI Agents have full control of my system. They run autonomously, debugging code, running security checks, and using the Gemini CLI for deep research. While they work, I'm drinking my coffee and catching up on the news. Then I hear it: "DING." The app is fixed, tested, and ready.

**My "Digital Employees" are Overachieving**

Earlier today, I had a 75-minute gym session. Before I left, I gave my agents a task: Create a help file with screenshots so I could deploy the project to Vercel when I got back. When I returned and asked for an update, they didn't just have the files ready — they told me: "It's already deployed on Vercel." 🤯

**Why this is a Game Changer:**

**Autonomous Execution:** They don't just suggest code; they execute, test, and secure it.

**Multi-Agent Collaboration:** I often have three agents open at once. They talk to each other, solve problems together, and provide me with detailed reports.

**The "Architect" Mindset:** I can now offer to build almost anything in record time because I'm managing a team of loyal, digital experts rather than doing the manual labor myself.

The barrier between a vision and a live, scaled application has never been thinner. We aren't just using tools anymore — we are leading autonomous teams.`,
    category: "AI Agents",
    tags: ["AI", "Autonomous Agents", "Software Development", "Future of Work", "Gemini"],
    readTime: "4 min read",
    date: "2 weeks ago",
    dateISO: "2026-03-15",
    color: "from-cyan-500/15 to-blue-600/5",
    borderColor: "border-cyan-500/25",
    accentColor: "text-cyan-400",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
  {
    id: 2,
    slug: "zkp-security-biometric-authentication",
    title: "ZKP Security: The Bridge to the DNA Security Era",
    excerpt:
      "I'm calling it now — Zero-Knowledge Proofs (ZKP) is the new must-have in the security stack. Integrating biometrics with Pedersen commitments and Manhattan distance gives us the strongest bridge before the real end game: DNA-level security.",
    content: `I'm calling it now — ZKP (Zero-Knowledge Proofs) is the new must-have in the security stack.

**What makes ZKP revolutionary for security:**

The entire philosophy of Zero Knowledge is that no private data should ever leave the user's device. By using a JavaScript/TypeScript stack, the entire cryptographic process happens locally in the user's browser. The raw data never touches the internet. That is true privacy.

**Python is for training the brain; TypeScript is for keeping the secrets.**

We're entering the final phase of the identity problem.`,
    category: "Security",
    tags: ["ZKP", "Zero-Knowledge Proofs", "Biometrics", "Cybersecurity", "TypeScript"],
    readTime: "5 min read",
    date: "1 month ago",
    dateISO: "2026-02-28",
    color: "from-amber-500/15 to-yellow-600/5",
    borderColor: "border-amber-500/25",
    accentColor: "text-amber-400",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
  {
    id: 3,
    slug: "neural-ai-bouncer-captcha-replacement",
    title: "The Neural AI Bouncer: Why Traditional CAPTCHAs Are Dead in 2026",
    excerpt:
      "Traditional CAPTCHAs? They're toast. Bots chew through blurry image puzzles in milliseconds while your real users get frustrated and bounce. I built something smarter using Gemini Flash — a conversational human verifier that bots can't crack.",
    content: `Stop gambling with your app's security.

Traditional CAPTCHAs? They're toast in 2026. Bots chew through those blurry image puzzles in milliseconds, while your real users get frustrated and bounce.

**I built something smarter: the Neural AI Bouncer.**

Instead of puzzles, it uses Gemini 3 Flash for a quick, natural conversation that verifies you're human — logic over pixels.`,
    category: "AI Security",
    tags: ["Gemini AI", "Bot Detection", "Security", "CAPTCHA", "AI"],
    readTime: "3 min read",
    date: "2 months ago",
    dateISO: "2026-01-30",
    color: "from-teal-500/15 to-cyan-600/5",
    borderColor: "border-teal-500/25",
    accentColor: "text-teal-400",
    tagColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
  {
    id: 4,
    slug: "behavioral-biometrics-keystroke-dynamics",
    title: "Passwords Are Static. Behavior Is Dynamic.",
    excerpt:
      "Most phishing and data breach incidents happen because security is treated as a static gate. Once a hacker steals your password, the game is over. I built the Biometric Control Panel to prove there's a better way.",
    content: `Passwords are static. Behavior is dynamic.

**I built the Biometric Control Panel to prove there's a better way.**

Instead of verifying identity based on what you type, it verifies **how you type** — using Behavioral Biometrics (Keystroke Dynamics).

**Security must be an expert at its post, not a generalist in a suit.**`,
    category: "Security",
    tags: ["Biometrics", "Cybersecurity", "Passwordless", "Bot Detection", "JavaScript"],
    readTime: "4 min read",
    date: "2 months ago",
    dateISO: "2026-01-20",
    color: "from-violet-500/15 to-purple-600/5",
    borderColor: "border-violet-500/25",
    accentColor: "text-violet-400",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
  {
    id: 5,
    slug: "ai-legal-intake-triage",
    title: "AI That Helps Law Firms Save Time and Money on Client Intake",
    excerpt:
      "AI Legal Intake & Triage Pro acts as a digital paralegal, using Google Search Grounding to dynamically find and ask the most relevant legal questions for every unique case.",
    content: `AI that helps law firms save both time and money on client intake.

**AI Legal Intake & Triage Pro** acts as a digital paralegal, using Google Search Grounding to dynamically find and ask the most relevant legal questions for every unique case.

What used to take a paralegal 2-3 hours now takes minutes.`,
    category: "Legal Tech",
    tags: ["Legal Tech", "AI", "Google Grounding", "Automation", "SaaS"],
    readTime: "4 min read",
    date: "2 days ago",
    dateISO: "2026-03-27",
    color: "from-blue-500/15 to-indigo-600/5",
    borderColor: "border-blue-500/25",
    accentColor: "text-blue-400",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
  {
    id: 6,
    slug: "latency-ultimate-firewall",
    title: "Latency Is the Ultimate Firewall: Active Deception in Cybersecurity",
    excerpt:
      "Security isn't just about blocking access — it's about wasting the attacker's time. Working on a large-scale Biometrics & ZKP project, I realized the only way to make a system truly resilient is to 'cheat the cheater.'",
    content: `Security isn't just about blocking access. It's about wasting the attacker's time.

**Firewalls are standard. But Active Deception is the game-changer.**

**Latency is the ultimate firewall.**`,
    category: "Security",
    tags: ["Cybersecurity", "ZKP", "Active Deception", "Security Design", "GDPR"],
    readTime: "3 min read",
    date: "1 month ago",
    dateISO: "2026-02-20",
    color: "from-rose-500/15 to-red-600/5",
    borderColor: "border-rose-500/25",
    accentColor: "text-rose-400",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    linkedInUrl: "https://www.linkedin.com/in/sakis-athan/",
  },
];

export type BlogPost = typeof BLOG_POSTS[0];

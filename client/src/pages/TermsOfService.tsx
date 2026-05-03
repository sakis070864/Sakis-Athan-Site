import { ArrowLeft, FileText, Scale, AlertTriangle, Globe, Shield, Gavel } from "lucide-react";
import { Link } from "wouter";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using this website (sakis-athan.com), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use this site.

These Terms apply to all visitors, users, and others who access or use the website and its services, including the AI-powered chatbot assistant.`,
    icon: Scale,
  },
  {
    title: "2. Description of Services",
    content: `This website serves as a professional portfolio and communication platform for Athanasios Athanasopoulos (\"Sakis Athan\"). The services provided include:

• **Portfolio showcase**: Display of professional work, skills, and case studies.
• **Contact form**: A means to send inquiries via email.
• **AI chatbot assistant**: An AI-powered assistant (powered by Google Gemini) that can answer questions about professional services and background.
• **Blog/Articles**: Insights and articles on AI, security, and technology.

All services are provided \"as is\" without warranties of any kind, either express or implied.`,
    icon: Globe,
  },
  {
    title: "3. AI-Powered Features Disclaimer",
    content: `This website uses Google Gemini AI to power the chatbot assistant feature. By using the chatbot, you acknowledge and agree that:

• **AI-generated responses** are provided for informational purposes only and may not always be accurate, complete, or up-to-date.
• **No professional advice**: AI responses do not constitute professional, legal, financial, or technical advice.
• **Data processing**: Your chat messages are sent to Google's Gemini API for processing. See our Privacy Policy for details on data handling.
• **No guarantees**: We do not guarantee the availability, accuracy, or reliability of AI-generated content.
• **Human review**: For critical decisions, always consult with a qualified professional directly.`,
    icon: AlertTriangle,
  },
  {
    title: "4. Intellectual Property",
    content: `The content, design, logos, code samples, blog articles, and all other materials on this website are the intellectual property of Athanasios Athanasopoulos unless otherwise stated.

You may not reproduce, distribute, modify, or create derivative works from any content on this website without prior written consent.

Open-source code referenced in blog posts or projects may be subject to their own respective licenses.`,
    icon: Shield,
  },
  {
    title: "5. User Conduct",
    content: `When using this website, you agree not to:

• Submit false, misleading, or harmful information through the contact form.
• Attempt to exploit, hack, or interfere with the website's security or functionality.
• Use the AI chatbot to generate harmful, abusive, or illegal content.
• Scrape, crawl, or automatically harvest data from this website.
• Impersonate another person or entity when communicating through this site.

We reserve the right to restrict access to any user who violates these terms.`,
    icon: Gavel,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the fullest extent permitted by applicable law:

• Athanasios Athanasopoulos shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.
• We are not responsible for any errors, omissions, or inaccuracies in the content provided, including AI-generated responses.
• We do not warrant that the website will be available uninterrupted, secure, or free of errors.
• Total liability for any claim arising from these terms shall not exceed the amount paid by you (if any) for accessing the services.`,
    icon: AlertTriangle,
  },
  {
    title: "7. Third-Party Services",
    content: `This website integrates with third-party services:

• **Google Gemini API** — Powers the AI chatbot. Subject to Google's Terms of Service and Privacy Policy.
• **Vercel** — Hosting platform. Subject to Vercel's Terms of Service.
• **LinkedIn** — Social media links and potential tracking. Subject to LinkedIn's Privacy Policy.
• **Google Maps** — Map integration. Subject to Google Maps Terms of Service.

We are not responsible for the practices or policies of these third-party services.`,
    icon: Globe,
  },
  {
    title: "8. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Hellenic Republic (Greece) and applicable European Union regulations.

For users in the United States, applicable federal and state laws (including but not limited to the California Consumer Privacy Act) will also apply where relevant.

Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Athens, Greece.`,
    icon: Scale,
  },
  {
    title: "9. Changes to Terms",
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page.

Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.

Last updated: May 2026.`,
    icon: FileText,
  },
  {
    title: "10. Contact Information",
    content: `If you have questions about these Terms of Service, please contact:

**Athanasios Athanasopoulos**
Email: sakis@sakis-athan.com
Website: sakis-athan.com`,
    icon: FileText,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Terms of Service
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Last updated: May 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-20">
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            const paragraphs = section.content.split("\n\n").filter(Boolean);

            return (
              <section
                key={i}
                className="glass rounded-2xl p-6 border border-border/60"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h2
                    className="text-lg font-bold text-foreground"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {section.title}
                  </h2>
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
                  {paragraphs.map((para, j) => {
                    const parts = para.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <p key={j}>
                        {parts.map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k} className="text-foreground font-semibold">
                              {part.slice(2, -2)}
                            </strong>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

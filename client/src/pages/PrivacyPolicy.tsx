import { ArrowLeft, Shield, Cookie, Eye, UserCheck, Mail, Bot, Globe, Baby, Scale, FileText } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LAST_UPDATED = "May 3, 2026";

const sections = [
  {
    icon: Eye,
    title: "Data Controller",
    content: `The data controller responsible for the processing of your personal data on this website is:

• **Name**: Athanasios Athanasopoulos
• **Email**: sakis@sakis-athan.com
• **Website**: sakis-athan.com
• **Location**: Athens, Greece (European Union)

If you have any questions about data processing, please contact us using the details above.`,
  },
  {
    icon: Eye,
    title: "Information We Collect",
    content: `When you visit this website, we may collect certain information automatically through the use of cookies and similar tracking technologies. This includes:

• **Device & browser information** — such as your browser type, operating system, screen resolution, and language preferences.
• **Usage data** — pages visited, time spent on site, referring URL, and click interactions.
• **IP address** — used for approximate geographic location (country/region level only).
• **Contact form submissions** — when you use our contact form, we collect your name, email address, subject, and message content to respond to your inquiry.
• **AI chatbot conversations** — messages you send through our AI chatbot assistant are processed by Google's Gemini API to generate responses.`,
  },
  {
    icon: Scale,
    title: "Legal Basis for Processing (GDPR Art. 6)",
    content: `We process your personal data under the following legal bases:

• **Consent (Art. 6(1)(a))** — for cookies, analytics, and marketing tracking. You provide consent through our cookie consent banner.
• **Legitimate interest (Art. 6(1)(f))** — for website security, fraud prevention, and improving our services.
• **Contract performance (Art. 6(1)(b))** — when you contact us through the contact form, we process your data to respond to your inquiry.
• **Legal obligation (Art. 6(1)(c))** — where required to comply with applicable laws.

You may withdraw your consent at any time by clicking "Do Not Sell My Info" in the footer or managing your cookie preferences.`,
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking Technologies",
    content: `This website uses cookies and similar technologies to enhance your browsing experience and to measure site performance. Specifically:

• **Essential cookies** — used to maintain your browsing session, authentication, and security preferences. These are strictly necessary for the site to function and cannot be disabled.
• **Functional cookies** — enable features like chat history persistence and theme preferences.
• **Analytics cookies** — help us understand how visitors interact with the website to improve performance and content.
• **Marketing cookies** — used for targeted advertising and tracking (if enabled through consent).

You can manage your cookie preferences at any time through the cookie banner (accessible via the "Do Not Sell My Info" link in the footer). Disabling cookies may affect some site functionality.`,
  },
  {
    icon: Bot,
    title: "AI & Automated Processing (GDPR Art. 22)",
    content: `This website features an AI-powered chatbot assistant that uses Google's Gemini API for generating responses. When you use the chatbot:

• **Data sent**: Your chat messages are sent to Google's servers for processing.
• **Purpose**: To provide helpful, automated responses about professional services and background.
• **Third-party**: Google processes this data according to their [Google Cloud Privacy Policy](https://cloud.google.com/terms/cloud-privacy-notice) and [Terms of Service](https://cloud.google.com/terms).
• **No profiling**: We do not use AI to make automated decisions that have legal or similarly significant effects on you.
• **Data retention**: Chat conversations are not stored on our servers. They exist only during your browser session.

You have the right not to be subject to automated decision-making. The chatbot is provided for informational purposes only and does not constitute professional advice.`,
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: `We use the information collected to:

• **Respond to inquiries** — process and reply to messages sent through the contact form.
• **Improve our website** — understand how visitors interact with our content to enhance the user experience.
• **Ensure security** — protect against unauthorized access, fraud, and abuse.
• **Provide AI assistance** — power the chatbot with relevant, helpful responses.

We do **not** sell, trade, or rent your personal information to third parties.`,
  },
  {
    icon: Globe,
    title: "International Data Transfers",
    content: `Your data may be transferred to and processed in countries outside the European Economic Area (EEA), specifically:

• **Google (USA)** — AI chatbot data is processed by Google's Gemini API servers, which may be located in the United States.
• **Vercel (USA)** — our hosting platform, which processes server-side requests.

These transfers are protected by appropriate safeguards, including Standard Contractual Clauses (SCCs) approved by the European Commission, and the EU-US Data Privacy Framework where applicable.

For more information about how these companies protect your data, please refer to their respective privacy policies.`,
  },
  {
    icon: Shield,
    title: "Data Retention & Security",
    content: `We retain collected data only for as long as necessary to fulfill the purposes outlined in this policy:

• **Contact form data** — retained for up to 12 months to manage ongoing correspondence.
• **Session cookies** — expire when you close your browser or log out.
• **Analytics data** — retained for up to 26 months in anonymized/aggregated form.
• **AI chatbot data** — not retained; exists only during your active browser session.

We implement reasonable technical and organizational measures to protect the information collected through this website against unauthorized access, alteration, or destruction, including HTTPS encryption, secure HTTP headers, and access controls.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights:

• **Right to access (GDPR Art. 15)** — request a copy of the data we hold about you.
• **Right to rectification (Art. 16)** — request correction of inaccurate data.
• **Right to erasure (Art. 17)** — request deletion of your personal data ("right to be forgotten").
• **Right to restrict processing (Art. 18)** — request limitation of how we process your data.
• **Right to data portability (Art. 20)** — receive your data in a structured, machine-readable format.
• **Right to object (Art. 21)** — object to processing based on legitimate interests.
• **Right to withdraw consent** — withdraw previously given consent at any time.
• **CCPA rights** — California residents may request disclosure of collected data categories and opt out of data sales.

To exercise any of these rights, please contact us at sakis@sakis-athan.com. We will respond within 30 days.

You also have the right to lodge a complaint with your local Data Protection Authority (DPA). In Greece, this is the Hellenic Data Protection Authority (HDPA): [www.dpa.gr](https://www.dpa.gr).`,
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    content: `This website is not directed at children under the age of 16 (or 13 in certain jurisdictions). We do not knowingly collect personal data from children.

If you are a parent or guardian and believe your child has provided personal data through this website, please contact us at sakis@sakis-athan.com, and we will promptly delete such information.`,
  },
];

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => setLocation("/")}
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-foreground"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Privacy <span className="text-gradient-cyan">Policy</span>
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-base mt-3 leading-relaxed max-w-2xl">
              This Privacy Policy explains how{" "}
              <strong className="text-foreground">sakis-athan.com</strong>{" "}
              collects, uses, and protects your information when you visit this
              website.
            </p>
            <p className="text-muted-foreground/70 text-sm mt-2">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Policy sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section
                key={index}
                className="glass rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h2
                      className="text-xl font-semibold text-foreground mb-4"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-3 privacy-content">
                      {section.content.split("\n\n").map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          dangerouslySetInnerHTML={{
                            __html: paragraph
                              // Bold
                              .replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-foreground font-medium">$1</strong>'
                              )
                              // Links
                              .replace(
                                /\[(.*?)\]\((.*?)\)/g,
                                '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline underline-offset-2">$1</a>'
                              )
                              // Line breaks for bullet points
                              .replace(
                                /\n•/g,
                                '<br/>•'
                              ),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Contact section */}
            <section className="glass rounded-2xl p-6 sm:p-8 border-primary/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2
                    className="text-xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    If you have any questions about this Privacy Policy or wish
                    to exercise your data rights, please contact us at:
                  </p>
                  <a
                    href="mailto:sakis@sakis-athan.com"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    sakis@sakis-athan.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

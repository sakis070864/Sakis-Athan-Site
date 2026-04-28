import { ArrowLeft, Shield, Cookie, Eye, UserCheck, Mail } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LAST_UPDATED = "April 28, 2026";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `When you visit this website, we may collect certain information automatically through the use of cookies and similar tracking technologies. This includes:

• **Device & browser information** — such as your browser type, operating system, screen resolution, and language preferences.
• **Usage data** — pages visited, time spent on site, referring URL, and click interactions.
• **IP address** — used for approximate geographic location (country/region level only).
• **LinkedIn Insight Tag data** — we use the LinkedIn Insight Tag to understand how visitors interact with our site after viewing or clicking on our LinkedIn content. This tag may collect URL, referrer, IP address, device and browser characteristics, and timestamp.`,
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking Technologies",
    content: `This website uses cookies and similar technologies to enhance your browsing experience and to measure site performance. Specifically:

• **Session cookies** — used to maintain your browsing session and preferences (e.g., theme selection). These are strictly necessary for the site to function.
• **LinkedIn Insight Tag** — this is a lightweight JavaScript tag that enables LinkedIn conversion tracking, website audience retargeting, and website demographics insights. The tag places a cookie on your browser when you visit this site.
• **Analytics** — we may use basic analytics to understand traffic patterns and improve the site.

You can manage or delete cookies through your browser settings at any time. Disabling cookies may affect some site functionality.`,
  },
  {
    icon: UserCheck,
    title: "LinkedIn Insight Tag & Third-Party Data Sharing",
    content: `The LinkedIn Insight Tag is provided by LinkedIn Corporation. When you visit this website, the Insight Tag enables the collection of data regarding your visit, including the URL, referrer, IP address, device and browser characteristics, and timestamp. This data is encrypted, anonymized within seven days, and the anonymized data is deleted within 90 days.

LinkedIn does not share the personal data with us — it only provides aggregated, anonymized reports about website audiences and ad performance. We do not have access to any personally identifiable information through the LinkedIn Insight Tag.

You can opt out of LinkedIn's data collection by visiting: [LinkedIn Ad Preferences](https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out).

For more details, please review [LinkedIn's Cookie Policy](https://www.linkedin.com/legal/cookie-policy) and [LinkedIn's Privacy Policy](https://www.linkedin.com/legal/privacy-policy).`,
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: `We use the information collected to:

• **Improve our website** — understand how visitors interact with our content to enhance the user experience.
• **Measure ad effectiveness** — evaluate the performance of LinkedIn ad campaigns.
• **Retargeting** — serve relevant ads to website visitors on the LinkedIn platform.
• **Website demographics** — gain insights into the professional demographics of our site visitors through LinkedIn's anonymized, aggregated reporting.

We do **not** sell, trade, or rent your personal information to third parties.`,
  },
  {
    icon: Shield,
    title: "Data Retention & Security",
    content: `We retain collected data only for as long as necessary to fulfill the purposes outlined in this policy. LinkedIn retains Insight Tag data as described in their privacy policy.

We implement reasonable technical and organizational measures to protect the information collected through this website against unauthorized access, alteration, or destruction.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights:

• **Right to access** — request a copy of the data we hold about you.
• **Right to deletion** — request deletion of your personal data.
• **Right to opt out** — opt out of tracking and targeted advertising.
• **Right to rectification** — request correction of inaccurate data.

To exercise any of these rights, please contact us at the email address below.`,
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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cookie, ChevronDown, ChevronUp, X } from "lucide-react";
import { Link } from "wouter";

/**
 * GDPR / ePrivacy Directive compliant cookie consent banner.
 *
 * Consent state is persisted to localStorage under key "cookie_consent".
 * The banner appears on first visit and remains until the user makes a choice.
 *
 * Three choices:
 *  - "Accept All" → sets all categories to true
 *  - "Essential Only" → only essential (always true)
 *  - "Save Preferences" → user picks granular categories
 *
 * Other components can check consent via:
 *   getCookieConsent(): Record<string, boolean> | null
 */

const CONSENT_KEY = "cookie_consent";

export interface CookieConsentState {
  essential: boolean;      // Always true — session, auth
  analytics: boolean;      // Google Analytics, etc.
  marketing: boolean;      // LinkedIn Insight Tag, ads
  functional: boolean;     // Preferences, chat history
  consentedAt: string;     // ISO timestamp
}

/**
 * Read current consent state. Returns null if no consent given yet.
 */
export function getCookieConsent(): CookieConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentState;
  } catch {
    return null;
  }
}

/**
 * Check if a specific cookie category is consented to.
 */
export function hasConsent(category: keyof Omit<CookieConsentState, "consentedAt">): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[category] ?? false;
}

const CATEGORIES = [
  {
    key: "essential" as const,
    label: "Essential",
    description: "Required for the website to function. Includes session cookies and authentication. These cannot be disabled.",
    locked: true,
  },
  {
    key: "functional" as const,
    label: "Functional",
    description: "Enable features like chat history and preference persistence to improve your experience.",
    locked: false,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description: "Help us understand how visitors interact with the website to improve performance and content.",
    locked: false,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description: "Used for targeted advertising and tracking across sites (e.g., LinkedIn Insight Tag).",
    locked: false,
  },
];

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Show banner only if no consent has been recorded
    const existing = getCookieConsent();
    if (!existing) {
      // Slight delay so the page loads first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (state: Omit<CookieConsentState, "consentedAt">) => {
    const consent: CookieConsentState = {
      ...state,
      essential: true, // Always true
      consentedAt: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const essentialOnly = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  const toggleCategory = (key: keyof typeof preferences) => {
    if (key === "essential") return; // Can't disable essential
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div
            className="mx-auto max-w-2xl rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            style={{
              background: "oklch(0.14 0.015 260 / 0.95)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              boxShadow: "0 -8px 40px oklch(0 0 0 / 0.4), 0 0 80px oklch(0.72 0.18 200 / 0.08)",
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 p-5 pb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "linear-gradient(145deg, oklch(0.72 0.18 200 / 0.25), oklch(0.65 0.20 280 / 0.15))",
                  border: "1px solid oklch(0.72 0.18 200 / 0.3)",
                }}
              >
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-base font-bold text-foreground mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to ensure the website functions properly and to improve your experience.
                  You can choose which categories to allow.{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-2 space-y-2">
                    {CATEGORIES.map((cat) => (
                      <div
                        key={cat.key}
                        className="flex items-start gap-3 p-3 rounded-xl border border-border/40 bg-white/[0.03]"
                      >
                        {/* Toggle */}
                        <button
                          onClick={() => toggleCategory(cat.key)}
                          disabled={cat.locked}
                          className={`mt-0.5 w-10 h-5 rounded-full flex-shrink-0 relative transition-colors duration-200 ${
                            preferences[cat.key]
                              ? "bg-primary"
                              : "bg-muted-foreground/30"
                          } ${cat.locked ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                          aria-label={`Toggle ${cat.label} cookies`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                              preferences[cat.key] ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                            {cat.locked && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-5 pt-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                {showDetails ? "Hide" : "Customize"}
                {showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              <div className="flex gap-2 flex-1 sm:justify-end">
                {showDetails ? (
                  <button
                    onClick={saveCustom}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    Save Preferences
                  </button>
                ) : (
                  <>
                    <button
                      onClick={essentialOnly}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={acceptAll}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-cyan"
                    >
                      Accept All
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

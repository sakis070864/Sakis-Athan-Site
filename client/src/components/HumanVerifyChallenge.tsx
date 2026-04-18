/**
 * HumanVerifyChallenge
 * ---------------------
 * A lightweight, bot-resistant verification modal that presents a random
 * human-friendly question (math, logic, or common-sense) before allowing
 * the contact form to submit. No external service required.
 *
 * Design: glassmorphism dark modal, animated entrance, inline feedback.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// ─── Challenge Question Pool ──────────────────────────────────────────────────
// Each question has a `question` string and an array of accepted `answers`
// (lowercased, trimmed). Math answers are exact; word answers accept variants.

export interface Challenge {
  id: number;
  question: string;
  answers: string[]; // all accepted correct answers (lowercase)
  hint?: string;
}

export const CHALLENGE_POOL: Challenge[] = [
  // ── Simple Math ──
  { id: 1,  question: "What is 7 + 5?",                         answers: ["12"],          hint: "A basic addition" },
  { id: 2,  question: "What is 15 − 8?",                        answers: ["7"],           hint: "A basic subtraction" },
  { id: 3,  question: "What is 4 × 3?",                         answers: ["12"],          hint: "Multiplication" },
  { id: 4,  question: "What is 36 ÷ 6?",                        answers: ["6"],           hint: "Division" },
  { id: 5,  question: "What is 9 + 13?",                        answers: ["22"],          hint: "Addition" },
  { id: 6,  question: "What is 100 − 37?",                      answers: ["63"],          hint: "Subtraction" },
  { id: 7,  question: "What is 6 × 7?",                         answers: ["42"],          hint: "Multiplication" },
  { id: 8,  question: "What is 81 ÷ 9?",                        answers: ["9"],           hint: "Division" },
  { id: 9,  question: "What is 3² (3 squared)?",                answers: ["9"],           hint: "Power of 3" },
  { id: 10, question: "What is 2³ (2 cubed)?",                  answers: ["8"],           hint: "Power of 2" },

  // ── Logic / Sequence ──
  { id: 11, question: "What comes next: 2, 4, 6, 8, ___?",      answers: ["10"],          hint: "Even numbers" },
  { id: 12, question: "What comes next: 1, 3, 5, 7, ___?",      answers: ["9"],           hint: "Odd numbers" },
  { id: 13, question: "What comes next: 5, 10, 15, 20, ___?",   answers: ["25"],          hint: "Multiples of 5" },
  { id: 14, question: "What comes next: 1, 1, 2, 3, 5, ___?",   answers: ["8"],           hint: "Fibonacci sequence" },
  { id: 15, question: "What comes next: 100, 90, 80, 70, ___?", answers: ["60"],          hint: "Counting down by 10" },

  // ── Common Sense / General Knowledge ──
  { id: 16, question: "How many days are in a week?",            answers: ["7", "seven"],  hint: "Calendar basics" },
  { id: 17, question: "How many months are in a year?",          answers: ["12", "twelve"],hint: "Calendar basics" },
  { id: 18, question: "How many hours are in a day?",            answers: ["24", "twenty-four", "twenty four"], hint: "Time" },
  { id: 19, question: "How many sides does a triangle have?",    answers: ["3", "three"],  hint: "Geometry" },
  { id: 20, question: "How many sides does a square have?",      answers: ["4", "four"],   hint: "Geometry" },
  { id: 21, question: "How many minutes are in an hour?",        answers: ["60", "sixty"], hint: "Time" },
  { id: 22, question: "How many seconds are in a minute?",       answers: ["60", "sixty"], hint: "Time" },
  { id: 23, question: "What color do you get mixing red and blue?", answers: ["purple", "violet", "magenta"], hint: "Color mixing" },
  { id: 24, question: "What is the opposite of 'hot'?",          answers: ["cold", "cool", "freezing"], hint: "Antonyms" },
  { id: 25, question: "If today is Monday, what day is tomorrow?", answers: ["tuesday"],   hint: "Days of the week" },
  { id: 26, question: "What is the first letter of the alphabet?", answers: ["a"],         hint: "Alphabet" },
  { id: 27, question: "How many wheels does a bicycle have?",    answers: ["2", "two"],    hint: "Vehicles" },
  { id: 28, question: "How many fingers are on one hand?",       answers: ["5", "five"],   hint: "Human body" },
  { id: 29, question: "What planet do we live on?",              answers: ["earth"],       hint: "Solar system" },
  { id: 30, question: "How many zeros are in one thousand?",     answers: ["3", "three"],  hint: "Numbers" },
];

/** Pick a random challenge from the pool */
export function getRandomChallenge(): Challenge {
  return CHALLENGE_POOL[Math.floor(Math.random() * CHALLENGE_POOL.length)];
}

/** Validate a user answer against accepted answers */
export function validateAnswer(userAnswer: string, challenge: Challenge): boolean {
  const normalized = userAnswer.trim().toLowerCase();
  return challenge.answers.includes(normalized);
}

// ─── Component Props ──────────────────────────────────────────────────────────
interface HumanVerifyChallengeProps {
  isOpen: boolean;
  onVerified: () => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HumanVerifyChallenge({
  isOpen,
  onVerified,
  onClose,
}: HumanVerifyChallengeProps) {
  const [challenge, setChallenge] = useState<Challenge>(() => getRandomChallenge());
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Reset state whenever modal opens with a fresh random question
  useEffect(() => {
    if (isOpen) {
      setChallenge(getRandomChallenge());
      setAnswer("");
      setStatus("idle");
      setAttempts(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const refreshChallenge = () => {
    // Pick a different question than the current one
    let next = getRandomChallenge();
    while (next.id === challenge.id && CHALLENGE_POOL.length > 1) {
      next = getRandomChallenge();
    }
    setChallenge(next);
    setAnswer("");
    setStatus("idle");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;

    if (validateAnswer(answer, challenge)) {
      setStatus("success");
      setTimeout(() => {
        onVerified();
      }, 600);
    } else {
      setAttempts((a) => a + 1);
      setStatus("error");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      // After 3 wrong attempts, auto-refresh the question
      if (attempts >= 2) {
        setTimeout(() => refreshChallenge(), 800);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={
              shaking
                ? { opacity: 1, scale: 1, y: 0, x: [0, -10, 10, -8, 8, -4, 4, 0] }
                : { opacity: 1, scale: 1, y: 0, x: 0 }
            }
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-sm pointer-events-auto rounded-2xl border border-primary/25 p-6 shadow-2xl"
              style={{
                background: isDark ? "rgba(10, 18, 28, 0.92)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(20px)",
                boxShadow: isDark
                  ? "0 0 0 1px rgba(0,229,229,0.08), 0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(0,229,229,0.08)"
                  : "0 0 0 1px rgba(0,120,120,0.12), 0 24px 64px rgba(0,0,0,0.15), 0 0 40px rgba(0,120,120,0.06)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark
                        ? "linear-gradient(145deg, #00e5e5 0%, #007e7e 100%)"
                        : "linear-gradient(145deg, #007e7e 0%, #005a5a 100%)",
                      boxShadow: isDark
                        ? "0 4px 14px rgba(0,229,229,0.4)"
                        : "0 4px 14px rgba(0,90,90,0.35)",
                    }}
                  >
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Human Verification</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Quick check to keep bots out
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-black/10"}`}
                  aria-label="Close verification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-5" />

              {/* Question */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{
                  background: isDark ? "rgba(0,229,229,0.06)" : "rgba(0,120,120,0.07)",
                  border: isDark ? "1px solid rgba(0,229,229,0.15)" : "1px solid rgba(0,120,120,0.18)",
                }}
              >
                <p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-1.5">
                  Answer this question:
                </p>
                <p className="text-lg font-semibold text-foreground leading-snug">
                  {challenge.question}
                </p>
                {challenge.hint && (
                  <p className="text-xs text-muted-foreground mt-1.5 italic">
                    Hint: {challenge.hint}
                  </p>
                )}
              </div>

              {/* Answer input */}
              <div className="relative mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer here..."
                  className={`w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm border transition-all focus:outline-none focus:ring-2 ${
                    status === "error"
                      ? "border-red-500/60 focus:ring-red-500/40"
                      : status === "success"
                      ? "border-emerald-500/60 focus:ring-emerald-500/40"
                      : "border-border/60 focus:ring-primary/50 focus:border-primary/50"
                  }`}
                  disabled={status === "success"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>

              {/* Error / success feedback */}
              <AnimatePresence mode="wait">
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-xs mb-3"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>
                      {attempts >= 3
                        ? "Too many wrong attempts — loading a new question…"
                        : "That's not quite right. Try again!"}
                    </span>
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-400 text-xs mb-3"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Verified! Sending your message…</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || status === "success"}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background:
                      status === "success"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : isDark
                        ? "linear-gradient(135deg, #00e5e5 0%, #00a0a0 100%)"
                        : "linear-gradient(135deg, #007e7e 0%, #005a5a 100%)",
                    color: isDark ? "#000" : "#fff",
                    boxShadow:
                      status === "success"
                        ? "0 4px 16px rgba(16,185,129,0.4)"
                        : isDark
                        ? "0 4px 16px rgba(0,229,229,0.35)"
                        : "0 4px 16px rgba(0,90,90,0.25)",
                  }}
                >
                  {status === "success" ? "✓ Verified!" : "Verify & Send"}
                </button>

                <button
                  onClick={refreshChallenge}
                  disabled={status === "success"}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/50 disabled:opacity-40"
                  aria-label="Get a different question"
                  title="Try a different question"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-xs text-muted-foreground/50 mt-3">
                Protected by Neural AI Bouncer · No cookies · No tracking
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

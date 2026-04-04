import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock, ExternalLink, Tag, X } from "lucide-react";
import { BLOG_POSTS } from "../../../shared/blogData";

export { BLOG_POSTS };

const BLOG_CATEGORIES = ["All", "AI Agents", "Security", "AI Security", "Legal Tech"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// ─── Blog Post Modal ─────────────────────────────────────────────────────────
function BlogModal({ post, onClose }: { post: typeof BLOG_POSTS[0]; onClose: () => void }) {
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass rounded-2xl border border-border/60 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg glass border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${post.tagColor}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-xl sm:text-2xl font-bold text-foreground mb-6 leading-tight pr-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {post.title}
        </h2>

        {/* Content */}
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          {paragraphs.map((para, i) => {
            // Render bold text
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i}>
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="text-foreground font-semibold">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-6 border-t border-border/40">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border bg-white/5 border-white/10 text-muted-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* LinkedIn link */}
        <div className="mt-4">
          <a
            href={post.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${post.accentColor} hover:underline`}
          >
            <ExternalLink className="w-3 h-3" />
            View original on LinkedIn
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({
  post,
  index,
  inView,
  onClick,
}: {
  post: typeof BLOG_POSTS[0];
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.08}
      className={`glass rounded-2xl p-6 border ${post.borderColor} card-hover group bg-gradient-to-br ${post.color} cursor-pointer flex flex-col h-full`}
      onClick={onClick}
    >
      {/* Category + meta */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${post.tagColor}`}>
          {post.category}
        </span>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {post.tags.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      {/* Read more */}
      <div className={`flex items-center gap-1.5 text-xs font-semibold ${post.accentColor} mt-auto`}>
        <BookOpen className="w-3.5 h-3.5" />
        Read article
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.article>
  );
}

// ─── Main Blog Section ────────────────────────────────────────────────────────
export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="blog" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />

        <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Insights & Articles
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Thoughts on{" "}
              <span className="text-gradient-cyan">AI & Technology</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Deep dives into AI orchestration, cybersecurity, and the future of intelligent software — drawn from
              real-world projects and 40+ years of engineering experience.
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
            {BLOG_CATEGORIES.map((cat) => (
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

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={i}
                  inView={inView}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* LinkedIn CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.6}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4 text-sm">
              Follow me on LinkedIn for more insights on AI, automation, and cybersecurity.
            </p>
            <a
              href="https://www.linkedin.com/in/sakis-athan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-primary/40 text-foreground font-semibold text-sm hover:bg-primary/10 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              Follow on LinkedIn
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </section>

      {/* Blog post modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

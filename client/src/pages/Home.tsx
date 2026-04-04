import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

/**
 * Main portfolio page — assembles all sections in order.
 * Each section is independently animated and lazy-revealed on scroll.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating AI chatbot */}
      <ChatbotWidget />
    </div>
  );
}

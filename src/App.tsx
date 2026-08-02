import { useState } from "react";
import { CertificatesModal } from "./components/CertificatesModal";
import { BackgroundVideo } from "./components/layout/BackgroundVideo";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StacksSection } from "./components/sections/StacksSection";

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="site-video-page min-h-screen w-full text-white font-sans">
      <BackgroundVideo />
      <Navbar />

      <main className="pt-32 md:pt-24 space-y-20">
        <HeroSection />
        <AboutSection onOpenCertificates={() => setIsPopupOpen(true)} />
        <ProjectsSection />
        <StacksSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <CertificatesModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <Footer />
    </div>
  );
}

import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import ServicesShowcase from "@/components/ServicesShowcase";
import AboutSection from "@/components/AboutSection";
import VisualBreak from "@/components/VisualBreak";
import HowItWorks from "@/components/HowItWorks";
import EmergencyCTA from "@/components/EmergencyCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Header />
      <main className="relative">
        <Hero />
        <BrandStatement />
        <ServicesShowcase />
        <AboutSection />
        <VisualBreak />
        <HowItWorks />
        <EmergencyCTA />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

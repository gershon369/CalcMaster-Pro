import Navbar from "../components/Navbar";
import AIAssistant from "../components/AIAssistant";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import CalculatorGrid from "../components/CalculatorGrid";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import MobileBottomNav from "../components/MobileBottomNav";
import BottomNav from "../components/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-r from-purple-900 via-black to-purple-900">

      <Navbar />

      <Hero />

      <Stats />

      <CalculatorGrid />

      <AIAssistant />

      <MobileBottomNav />

      <FAQ />

      <Testimonials />

      <Pricing />

      <Footer />

      <BottomNav />

    </div>
  );
}
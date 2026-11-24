
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

const floatingCalculators = [
  { display: "123.45", className: "calc-one" },
  { display: "98.20", className: "calc-two" },
  { display: "456.78", className: "calc-three" },
  { display: "2026", className: "calc-four" },
  { display: "789.10", className: "calc-five" },
  { display: "3.1415", className: "calc-six" },
  { display: "12.50", className: "calc-seven" },
  { display: "999.99", className: "calc-eight" },
];

export default function Home() {
  return (
    <div className="home-animated-bg relative isolate min-h-screen pb-24 text-white overflow-hidden">

      {/* Animated Calculator Background */}
      <div className="home-bg-effects" aria-hidden="true">

        {floatingCalculators.map((calc) => (
          <div
            key={calc.className}
            className={`floating-calculator ${calc.className}`}
          >
            <div className="calc-top">
              <span />
              <span />
              <span />
            </div>

            <div className="calc-screen">{calc.display}</div>

            <div className="calc-buttons">
              {[
                "AC", "±", "%", "÷",
                "7", "8", "9", "×",
                "4", "5", "6", "−",
                "1", "2", "3", "+",
                "0", ".", "="
              ].map((btn, index) => (
                <span
                  key={index}
                  className={index % 4 === 3 ? "operator" : ""}
                >
                  {btn}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Floating Mathematical Symbols */}
        <span className="math-symbol symbol-one">+</span>
        <span className="math-symbol symbol-two">×</span>
        <span className="math-symbol symbol-three">÷</span>
        <span className="math-symbol symbol-four">−</span>
        <span className="math-symbol symbol-five">%</span>

      </div>

      {/* Main Website Content */}
      <div className="relative z-10">
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
      </div>

    </div>
  );
}

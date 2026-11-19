
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-violet-400/15 bg-gradient-to-b from-[#101025] to-[#070b16]">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-extrabold text-white">
              Calc<span className="text-violet-400">Master</span>
              <span className="text-blue-400"> Pro</span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Smart calculators and intelligent tools to make your
              everyday calculations easier and faster.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
              >
                <FaGithub />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-violet-400 transition">Home</a></li>
              <li><a href="#calculators" className="hover:text-violet-400 transition">Calculators</a></li>
              <li><a href="#ai" className="hover:text-violet-400 transition">AI Assistant</a></li>
              <li><a href="#pricing" className="hover:text-violet-400 transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-violet-400 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Popular Tools
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#calculators" className="hover:text-violet-400 transition">Basic Calculator</a></li>
              <li><a href="#calculators" className="hover:text-violet-400 transition">Scientific Calculator</a></li>
              <li><a href="#calculators" className="hover:text-violet-400 transition">Loan EMI Calculator</a></li>
              <li><a href="#calculators" className="hover:text-violet-400 transition">BMI Calculator</a></li>
              <li><a href="#calculators" className="hover:text-violet-400 transition">GST Calculator</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Support
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#faq" className="hover:text-violet-400 transition">Help Center</a></li>
              <li><a href="#faq" className="hover:text-violet-400 transition">FAQs</a></li>
              <li><a href="#pricing" className="hover:text-violet-400 transition">Plans & Pricing</a></li>
              <li><a href="#ai" className="hover:text-violet-400 transition">AI Assistance</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-7">

          <p className="text-center text-xs md:text-sm text-slate-500">
            © {year} CalcMaster Pro. All rights reserved.
          </p>

          <p className="text-xs md:text-sm text-slate-500">
            Designed with <span className="text-violet-400">♥</span> for smarter calculations.
          </p>

          {/* Back To Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 transition hover:bg-violet-500/20 hover:text-white"
          >
            Back to Top
            <FaArrowUp />
          </button>

        </div>

      </div>
    </footer>
  );
}

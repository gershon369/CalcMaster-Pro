
import { useState } from "react";

const questions = [
  {
    question: "Is it free?",
    answer: "Yes! You can use our basic calculators for free. No payment is required.",
  },
  {
    question: "What is Premium?",
    answer: "Premium includes advanced financial calculators and additional AI-powered tools.",
  },
  {
    question: "Can I use it on mobile?",
    answer: "Absolutely! CalcMaster Pro is designed to work on mobile phones, tablets and desktop devices.",
  },
  {
    question: "Do I need to create an account?",
    answer: "You can explore available tools, while creating an account can provide access to personalized features.",
  },
  {
    question: "How accurate are the calculations?",
    answer: "Calculations depend on the formulas and values entered. Always verify important financial results before making decisions.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative px-4 md:px-8 py-16 md:py-24">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
            ✦ GOT QUESTIONS?
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-400">
            Find answers to commonly asked questions about CalcMaster Pro.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">

          {questions.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-400/40 bg-gradient-to-r from-violet-500/10 to-blue-500/5 shadow-lg shadow-violet-500/5"
                    : "border-white/10 bg-white/[0.04] hover:border-violet-400/30"
                }`}
              >

                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left"
                >
                  <span className="text-sm md:text-lg font-semibold text-white">
                    {item.question}
                  </span>

                  <span
                      className={`grid h-9 w-9 shrink-0 place-items-center self-center rounded-full text-[22px] leading-none transition-all duration-300 ${
                          isOpen
                          ? "rotate-45 bg-violet-500 text-white"
                          : "bg-white/10 text-violet-300"
                        }`}
                       >
                        <span className="-translate-y-px">+</span>
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-5 md:px-6 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm md:text-base leading-relaxed text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

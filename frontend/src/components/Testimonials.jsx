
const reviews = [
  {
    name: "Rahul Sharma",
    text: "Best calculator platform I have used.",
    initials: "RS",
  },
  {
    name: "Priya Jain",
    text: "Clean UI and very useful tools.",
    initials: "PJ",
  },
  {
    name: "Amit Patel",
    text: "AI assistant saves a lot of time.",
    initials: "AP",
  },
];

export default function Testimonials() {
  return (
    <section className="relative px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
            ✦ TESTIMONIALS
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            What Users{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-400">
            See what people think about CalcMaster Pro.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">

          {reviews.map((item) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#19172e] via-[#111326] to-[#0b1020] p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-500/10"
            >

              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

              {/* Quote Icon */}
              <div className="relative mb-6 text-5xl font-serif text-violet-400/60">
                “
              </div>

              {/* Review */}
              <p className="relative min-h-16 text-base leading-relaxed text-slate-300">
                {item.text}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />

              {/* User Profile */}
              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    CalcMaster Pro User
                  </p>
                </div>

              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-hover:w-full" />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

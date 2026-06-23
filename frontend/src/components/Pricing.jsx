export default function Pricing() {
  return (
    <section
      id="pricing"
      className="px-4 md:px-8 py-20"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
        Pricing Plans
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Free */}
        <div className="bg-white/5 backdrop-blur-xl  rounded-3xl p-8 text-white  backdrop-blur-xl border border-white/10 hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300 shadow-2xl">

          <h3 className="text-2xl font-bold">
            Free
          </h3>

          <p className="text-5xl font-bold mt-6">
            $0/mo
          </p>

          <button className="w-full mt-8 bg-purple-600 py-3 rounded-xl">
            Get Started
          </button>

        </div>

        {/* PRO */}
        <div className="bg-white/5 backdrop-blur-xl  rounded-3xl p-8 text-white  backdrop-blur-xl border border-white/10 hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300 shadow-2xl">

          <div className="bg-purple-600 inline-block px-3 py-1 rounded-full text-sm mb-4">
            MOST POPULAR ⭐
          </div>

          <h3 className="text-2xl font-bold">
            Pro
          </h3>

          <p className="text-5xl font-bold mt-6">
            $9/mo
          </p>

          <button className="w-full mt-8 bg-purple-600 py-3 rounded-xl">
            Get Started
          </button>

        </div>

        {/* Enterprise */}
        <div className="bg-white/5 backdrop-blur-xl  rounded-3xl p-8 text-white  backdrop-blur-xl border border-white/10 hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300 shadow-2xl">

          <h3 className="text-2xl font-bold">
            Enterprise
          </h3>

          <p className="text-5xl font-bold mt-6">
            $29/mo
          </p>

          <button className="w-full mt-8 bg-purple-600 py-3 rounded-xl">
            Get Started
          </button>

        </div>

      </div>
    </section>
  );
}
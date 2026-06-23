export default function FAQ() {
  return (
    <section className="px-4 md:px-8 py-16">

      <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">

        <div className="bg-white/10 p-5 rounded-2xl">
          <h3 className="text-white font-semibold">
            Is it free?
          </h3>

          <p className="text-gray-400 mt-2">
            Yes, basic calculators are free.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <h3 className="text-white font-semibold">
            What is premium?
          </h3>

          <p className="text-gray-400 mt-2">
            Advanced finance and AI tools.
          </p>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl">
          <h3 className="text-white font-semibold">
            Can I use it on mobile?
          </h3>

          <p className="text-gray-400 mt-2">
            Yes, fully mobile responsive.
          </p>
        </div>

      </div>

    </section>
  );
}
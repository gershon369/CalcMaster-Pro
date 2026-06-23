export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      text: "Best calculator platform I have used."
    },
    {
      name: "Priya Jain",
      text: "Clean UI and very useful tools."
    },
    {
      name: "Amit Patel",
      text: "AI assistant saves a lot of time."
    }
  ];

  return (
    <section className="px-4 md:px-8 py-16">

      <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
        What Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10"
          >
            <h3 className="text-white font-semibold mb-3">
              {item.name}
            </h3>

            <p className="text-gray-400">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}
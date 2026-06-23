export default function SecuritySection() {

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Security
      </h2>

      <div className="space-y-3">

        <button className="w-full bg-white/10 py-3 rounded-xl">
          Change Password
        </button>

        <button className="w-full bg-white/10 py-3 rounded-xl">
          Login Activity
        </button>

        <button className="w-full bg-white/10 py-3 rounded-xl">
          Two Step Verification
        </button>

      </div>

    </div>
  );
}
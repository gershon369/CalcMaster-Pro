export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* Left Title */}
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center bg-purple-500/10 text-purple-300">
          👤
        </div>

        <div>
          <h1 className="text-white text-[44px] font-bold leading-none">
            My Profile
          </h1>

          <p className="text-[#b9b9d7] mt-1 text-lg">
            Manage your account and activity
          </p>
        </div>

      </div>

      {/* Right Button */}
      <button
        className="
          px-8 py-4 rounded-2xl
          bg-gradient-to-r
          from-[#7c3aed]
          to-[#a855f7]
          text-white
          font-semibold
          hover:scale-[1.02]
          transition
        "
      >
        ✏ Edit Profile
      </button>

    </div>
  );
}
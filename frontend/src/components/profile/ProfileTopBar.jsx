
export default function ProfileTopBar() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const profileImage = localStorage.getItem("profileImage");

  const initials = (user.name || "User")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mb-6 flex items-center justify-between">

      {/* Left Profile Title */}
      <div className="flex items-center gap-4">

        {/* Profile Image */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.25)]">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-purple-300">
              {initials}
            </div>
          )}

        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-[44px]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-[#b9b9d7] md:text-lg">
            Manage your account and activity
          </p>
        </div>

      </div>

    </div>
  );
}

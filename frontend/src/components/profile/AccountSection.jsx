export default function AccountSection() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex justify-center mb-5">

<img
src={
localStorage.getItem("profileImage") ||
"https://ui-avatars.com/api/?name=User"
}
className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover"
/>

</div>

      <h2 className="text-2xl font-bold mb-5">
        Account
      </h2>

      <div className="space-y-3">

        <p>
          Username:
          <span className="text-purple-400 ml-2">
            {user?.userId}
          </span>
        </p>

        <p>
          Name:
          <span className="text-purple-400 ml-2">
            {user?.name}
          </span>
        </p>

        <p>
          Email:
          <span className="text-purple-400 ml-2">
            {user?.email}
          </span>
        </p>
        <p>
  Phone :
  <span className="text-purple-400 ml-2">
    {user.phone || "Not Added"}
  </span>
</p>

<p>
  Bio :
  <span className="text-purple-400 ml-2">
    {user.bio || "No Bio"}
  </span>
</p>

<p>
  Member Since :
  <span className="text-purple-400 ml-2">
    June 2026
  </span>
</p>

<p>
  Status :
  <span className="text-green-400 ml-2">
    Verified
  </span>
</p>

      </div>
      <button
className="mt-6 w-full bg-purple-600 py-3 rounded-xl"
>
✏ Edit Profile
</button>

    </div>
  );
}
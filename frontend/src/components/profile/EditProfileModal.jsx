import { useState } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
}) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState(user.bio || "");

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      phone,
      bio,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated Successfully");

    onClose();

    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#161616] w-full max-w-lg rounded-3xl p-8 border border-white/10">

        <h2 className="text-3xl font-bold text-white mb-8">
          Edit Profile
        </h2>

        <div className="space-y-5">

          <div>
            <label className="text-gray-400">
              Name
            </label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full mt-2 bg-white/10 rounded-xl p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400">
              Email
            </label>

            <input
              value={user.email}
              disabled
              className="w-full mt-2 bg-white/5 rounded-xl p-3 text-gray-400"
            />
          </div>

          <div>
            <label className="text-gray-400">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full mt-2 bg-white/10 rounded-xl p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400">
              Bio
            </label>

            <textarea
              rows="4"
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
              className="w-full mt-2 bg-white/10 rounded-xl p-3 text-white outline-none"
            />
          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 py-3 rounded-xl text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-purple-600 py-3 rounded-xl text-white"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}
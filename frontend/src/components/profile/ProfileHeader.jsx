import { useRef, useState } from "react";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaCrown,
  FaCheckCircle,
  FaEdit,
  FaIdBadge,
  FaTimes,
  FaSave,
  FaTrash,
  FaImage,
  FaUserCircle,
} from "react-icons/fa";

export default function ProfileHeader() {
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  };

  const [user, setUser] = useState(getUser);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );
  const [showEdit, setShowEdit] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [zoom, setZoom] = useState(1);
  const [form, setForm] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  const fileRef = useRef(null);

  const isPremium = Boolean(user.premium);
  const isVerified = Boolean(user.isVerified || user.emailVerified);

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const initials = (user.name || "User")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handlePhotoSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be below 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhotoPreview(reader.result);
      setZoom(1);
      setShowPhoto(true);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const savePhoto = () => {
    if (!photoPreview) return;

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 500;
      const context = canvas.getContext("2d");

      canvas.width = size;
      canvas.height = size;

      const baseSize = Math.min(image.width, image.height);
      const cropSize = baseSize / zoom;
      const sx = (image.width - cropSize) / 2;
      const sy = (image.height - cropSize) / 2;

      context.drawImage(
        image,
        sx,
        sy,
        cropSize,
        cropSize,
        0,
        0,
        size,
        size
      );

      const croppedImage = canvas.toDataURL("image/jpeg", 0.85);

      try {
        localStorage.setItem("profileImage", croppedImage);
        setProfileImage(croppedImage);
        setShowPhoto(false);
        setPhotoPreview("");
      } catch {
        alert("Image storage limit reached. Please choose a smaller image.");
      }
    };

    image.src = photoPreview;
  };

  const removePhoto = () => {
    localStorage.removeItem("profileImage");
    setProfileImage("");
    setShowPhoto(false);
  };

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name: form.name.trim(),
      username: form.username.trim(),
      bio: form.bio.trim(),
    };

    // UI preview only. Backend profile update will be connected later.
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEdit(false);
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-[28px] border border-purple-400/20 bg-gradient-to-br from-[#17102e] via-[#100c23] to-[#090817] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] md:p-8">

        {/* Background effects */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 rounded-full bg-indigo-600/10 blur-[90px]" />

        <div className="relative">

          {/* Top heading */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-purple-300">
                Personal Workspace
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                Profile Overview
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Manage your personal information and account identity.
              </p>
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/15 px-5 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/30"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* Profile identity */}
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">

            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">

              
{/* Profile Photo */}
<div className="flex w-32 shrink-0 flex-col items-center">

  {/* Clickable Profile Image */}
  <div className="relative h-32 w-32">

    <button
      type="button"
      onClick={() => fileRef.current?.click()}
      aria-label="Choose profile photo"
      className="h-full w-full overflow-hidden rounded-full border-2 border-purple-500/80 bg-[#17112d] shadow-[0_0_18px_rgba(139,92,246,0.18)] transition hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#100c23]"
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-purple-200">
          {initials}
        </span>
      )}
    </button>

    {/* Camera Button */}
    <button
      type="button"
      onClick={() => fileRef.current?.click()}
      aria-label="Change profile photo"
      title="Change profile photo"
      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#100c23] bg-purple-600 text-white shadow-lg transition hover:scale-110 hover:bg-purple-500"
    >
      <FaCamera size={14} />
    </button>

  </div>

  {/* Hidden File Input */}
  <input
    ref={fileRef}
    type="file"
    accept="image/png,image/jpeg,image/webp"
    onChange={handlePhotoSelect}
    className="hidden"
  />

  {/* Manage Photo */}
  <button
    type="button"
    onClick={() => setShowPhoto(true)}
    className="mt-3 text-center text-xs font-semibold text-purple-300 transition hover:text-white"
  >
    Manage Photo
  </button>

</div>


              {/* User information */}
              <div>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h1 className="text-3xl font-bold text-white">
                    {user.name || "Your Name"}
                  </h1>

                  {isVerified && (
                    <FaCheckCircle
                      className="text-blue-400"
                      title="Verified account"
                    />
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  {user.email || "Email not available"}
                </p>

                <p className="mt-1 text-sm text-purple-300">
                  @{user.username || "username"}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs font-semibold text-green-300">
                    <FaCheckCircle className="mr-1 inline" />
                    Account Active
                  </span>

                  <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                    <FaShieldAlt className="mr-1 inline" />
                    {isVerified ? "Verified" : "Verification Pending"}
                  </span>

                  <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    isPremium
                      ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                      : "border-purple-400/20 bg-purple-400/10 text-purple-300"
                  }`}>
                    <FaCrown className="mr-1 inline" />
                    {isPremium ? "Premium Member" : "Free Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Account ID card */}
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 xl:min-w-[260px]">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Account ID
              </p>

              <p className="mt-2 break-all font-mono text-lg font-bold text-purple-200">
                {user.userId || "Not assigned"}
              </p>

              <div className="my-4 h-px bg-white/10" />

              <p className="text-xs text-gray-500">Member Since</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-200">
                <FaCalendarAlt className="text-purple-400" />
                {memberSince}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

          {/* Account details */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                icon: <FaUser />,
                label: "Full Name",
                value: user.name || "Not provided",
              },
              {
                icon: <FaIdBadge />,
                label: "Username",
                value: user.username ? `@${user.username}` : "Not set",
              },
              {
                icon: <FaEnvelope />,
                label: "Email Address",
                value: user.email || "Not provided",
              },
              {
                icon: <FaShieldAlt />,
                label: "Account Type",
                value: isPremium ? "Premium" : "Free Plan",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 transition hover:border-purple-400/30 hover:bg-purple-500/[0.06]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  {item.icon}
                </div>

                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-200">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-purple-300">
              About Me
            </p>
            <p className="text-sm leading-6 text-gray-300">
              {user.bio || "Add a short introduction about yourself."}
            </p>
          </div>
        </div>
      </section>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-3xl border border-purple-400/20 bg-[#110d24] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Update your personal information.
                </p>
              </div>

              <button
                onClick={() => setShowEdit(false)}
                className="rounded-xl bg-white/5 p-3 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Full Name", key: "name", icon: <FaUser /> },
                { label: "Username", key: "username", icon: <FaIdBadge /> },
                { label: "Email Address", key: "email", icon: <FaEnvelope /> },
              ].map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-300">
                    {field.label}
                  </span>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-purple-400/60">
                    <span className="text-purple-300">{field.icon}</span>
                    <input
                      value={form[field.key]}
                      disabled={field.key === "email"}
                      onChange={(e) =>
                        setForm({ ...form, [field.key]: e.target.value })
                      }
                      className="w-full bg-transparent py-3 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {field.key === "email" && (
                    <span className="mt-1 block text-xs text-gray-500">
                      Email changes require verification and backend support.
                    </span>
                  )}
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-300">
                  Bio
                </span>
                <textarea
                  rows="3"
                  maxLength="160"
                  value={form.bio}
                  onChange={(e) =>
                    setForm({ ...form, bio: e.target.value })
                  }
                  placeholder="Write something about yourself..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-purple-400/60"
                />
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setShowEdit(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-500"
              >
                <FaSave />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO MANAGEMENT MODAL */}
      {showPhoto && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-md rounded-3xl border border-purple-400/20 bg-[#110d24] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Profile Photo</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Upload and adjust your picture.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowPhoto(false);
                  setPhotoPreview("");
                }}
                className="rounded-xl bg-white/5 p-3 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-center rounded-2xl border border-white/10 bg-black/20 py-8">
              <div className="h-44 w-44 overflow-hidden rounded-full border-4 border-purple-500/60 bg-[#21183d]">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo preview"
                    className="h-full w-full object-cover"
                    style={{ transform: `scale(${zoom})` }}
                  />
                ) : profileImage ? (
                  <img
                    src={profileImage}
                    alt="Current profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl text-purple-300">
                    <FaUserCircle />
                  </div>
                )}
              </div>
            </div>

            {photoPreview && (
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-300">Zoom / Crop</span>
                  <span className="text-purple-300">{zoom.toFixed(1)}x</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-200 hover:bg-purple-500/20"
              >
                <FaImage />
                Choose Photo
              </button>

              {profileImage && (
                <button
                  onClick={removePhoto}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20"
                >
                  <FaTrash />
                  Remove Photo
                </button>
              )}
            </div>

            {photoPreview && (
              <button
                onClick={savePhoto}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-500"
              >
                <FaSave />
                Save Profile Photo
              </button>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Supported image formats: JPG, PNG, WEBP. Maximum file size: 5MB.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AccountInformation() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          <FaUser className="text-white" />
        </div>

        <h2 className="text-2xl font-bold">
          Account Information
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 text-gray-400">
            <FaIdBadge />
            Username
          </div>

          <span className="font-semibold">
            {user?.userId}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 text-gray-400">
            <FaUser />
            Display Name
          </div>

          <span className="font-semibold">
            {user?.name}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 text-gray-400">
            <FaEnvelope />
            Email
          </div>

          <span className="font-semibold">
            {user?.email}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 text-gray-400">
            <FaPhone />
            Phone
          </div>

          <span className="font-semibold">
            +91 98765 43210
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3 text-gray-400">
            <FaCalendarAlt />
            Member Since
          </div>

          <span className="font-semibold">
            June 2026
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="text-gray-400">
            Account Status
          </span>

          <span className="bg-green-600 px-4 py-1 rounded-full">
            Active
          </span>

        </div>

      </div>

      <button className="mt-8 w-full bg-white/10 hover:bg-purple-600 transition rounded-xl py-3">
        View Full Details →
      </button>

    </div>
  );
}
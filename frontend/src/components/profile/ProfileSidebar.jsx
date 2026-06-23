export default function ProfileSidebar({

  activeTab,
  setActiveTab

}) {

  return (

    <aside className="w-72 border-r border-white/10 p-6">

      <h2 className="text-3xl font-bold mb-8">
        My Profile
      </h2>

      <button
        onClick={() => setActiveTab("account")}
        className={`w-full text-left p-4 rounded-xl mb-3 ${
          activeTab === "account"
            ? "bg-purple-600"
            : "bg-white/5"
        }`}
      >
        👤 Account Information
      </button>

      <button
        onClick={() => setActiveTab("notifications")}
        className={`w-full text-left p-4 rounded-xl mb-3 ${
          activeTab === "notifications"
            ? "bg-purple-600"
            : "bg-white/5"
        }`}
      >
        🔔 Notification Settings
      </button>

      <button
        onClick={() => setActiveTab("security")}
        className={`w-full text-left p-4 rounded-xl ${
          activeTab === "security"
            ? "bg-purple-600"
            : "bg-white/5"
        }`}
      >
        🔒 Security
      </button>

    </aside>

  );

}
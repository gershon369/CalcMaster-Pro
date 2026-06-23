import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import AIChat from "../components/AIChat";

export default function Dashboard() {
  return (
    <div className="flex bg-black min-h-screen">

      <DashboardSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome to CalcMaster Pro
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white">
    Recent Calculations
  </div>

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white">
    Favorites
  </div>

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white">
    AI Assistant
  </div>

</div>
      </div>
<AIChat />
    </div>
  );
}
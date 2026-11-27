import { Link } from "react-router-dom";
import {
  FaCalculator,
  FaFire,
  FaHeart,
  FaRobot,
  FaGraduationCap,
  FaArrowUp,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";

export default function Dashboard() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const userName = user.name || user.fullName || "User";
  const isPremium = user.premium === true;

  const stats = [
    {
      title: "Total Calculations",
      value: "1,284",
      subtitle: "+12.5% this month",
      icon: <FaCalculator />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Daily Activity",
      value: "48",
      subtitle: "Calculations today",
      icon: <FaFire />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Favorites",
      value: "12",
      subtitle: "Saved calculators",
      icon: <FaHeart />,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      title: "AI Tutor Sessions",
      value: "36",
      subtitle: "Learning sessions",
      icon: <FaRobot />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  const calculators = [
    {
      name: "Scientific Calculator",
      category: "Mathematics",
      path: "/calculator/scientific",
      icon: "🧮",
    },
    {
      name: "Loan EMI Calculator",
      category: "Finance",
      path: "/calculator/loan-emi",
      icon: "💰",
    },
    {
      name: "BMI Calculator",
      category: "Health",
      path: "/calculator/bmi",
      icon: "⚖️",
    },
    {
      name: "GST Calculator",
      category: "Finance",
      path: "/calculator/gst",
      icon: "📊",
    },
  ];

  const activity = [
    { day: "Mon", height: "45%" },
    { day: "Tue", height: "75%" },
    { day: "Wed", height: "55%" },
    { day: "Thu", height: "90%" },
    { day: "Fri", height: "65%" },
    { day: "Sat", height: "100%" },
    { day: "Sun", height: "35%" },
  ];

  return (
    <div className="min-h-full w-full bg-[#080610] text-white">

      {/* MAIN DASHBOARD */}
      <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

        <div className="max-w-[1600px] mx-auto space-y-8">

          {/* HEADER */}
          <header className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-400 mt-2">
                Welcome back, {userName} 👋
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">

              <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-sm">{userName}</p>

                <p className="text-xs text-purple-400">
                  {isPremium ? "Premium Member" : "Free Member"}
                </p>
              </div>

            </div>
          </header>

          {/* WELCOME BANNER */}
          <section className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-r from-[#321263] via-[#241044] to-[#151025] p-6 sm:p-8">

            <div className="relative z-10 max-w-2xl">

              <p className="text-purple-300 text-sm font-semibold tracking-widest">
                YOUR PERSONAL WORKSPACE
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-4">
                Welcome back,
                <br />
                {userName}!
              </h2>

              <p className="text-gray-300 mt-4 leading-7">
                Keep learning, explore calculators and track your progress
                with CalcMaster Pro.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <Link
                  to="/calculators"
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold text-sm"
                >
                  Explore Calculators
                  <FaArrowRight className="inline ml-2" />
                </Link>

                <Link
                  to="/ai"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition font-semibold text-sm"
                >
                  Open AI Tutor
                  <FaRobot className="inline ml-2" />
                </Link>

              </div>
            </div>

            <div className="absolute -right-16 -bottom-32 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />

          </section>

          {/* STATISTICS */}
          <section>

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Account Overview
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Your activity at a glance
                </p>
              </div>

              <FaChartLine className="text-purple-400 text-2xl" />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {stats.map((item) => (
                <div
                  key={item.title}
                  className="min-w-0 rounded-2xl bg-[#15111F] border border-white/10 p-5 hover:border-purple-500/40 transition"
                >

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-gray-400 text-sm">
                      {item.title}
                    </p>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}
                    >
                      {item.icon}
                    </div>

                  </div>

                  <h3 className="text-3xl font-bold mt-5">
                    {item.value}
                  </h3>

                  <p className={`text-xs mt-2 ${item.color}`}>
                    <FaArrowUp className="inline mr-1" />
                    {item.subtitle}
                  </p>

                </div>
              ))}

            </div>
          </section>

          {/* ACTIVITY + LEARNING */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* WEEKLY ACTIVITY */}
            <div className="rounded-2xl bg-[#15111F] border border-white/10 p-5 sm:p-6">

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-bold">
                    Weekly Activity
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Your calculation activity
                  </p>
                </div>

                <FaChartLine className="text-purple-400 text-xl" />

              </div>

              <div className="h-48 flex items-end justify-between gap-3 mt-8">

                {activity.map((item) => (
                  <div
                    key={item.day}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                  >

                    <div className="w-full h-full flex items-end">

                      <div
                        style={{ height: item.height }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-purple-700 to-purple-400 hover:from-purple-500 hover:to-pink-400 transition"
                      />

                    </div>

                    <span className="text-xs text-gray-400">
                      {item.day}
                    </span>

                  </div>
                ))}

              </div>
            </div>

            {/* LEARNING PROGRESS */}
            <div className="rounded-2xl bg-[#15111F] border border-white/10 p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <FaGraduationCap size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Learning Progress
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Your learning journey
                  </p>
                </div>

              </div>

              <div className="flex justify-between items-end mt-8">

                <span className="text-gray-400 text-sm">
                  Overall Progress
                </span>

                <span className="text-3xl font-bold text-purple-400">
                  68%
                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-2xl font-bold">17/25</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Topics Completed
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-2xl font-bold">32</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Study Sessions
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* RECENT CALCULATORS + AI TUTOR */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">

            {/* RECENT CALCULATORS */}
            <div className="xl:col-span-2 rounded-2xl bg-[#15111F] border border-white/10 p-5 sm:p-6">

              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-xl font-bold">
                    Recently Used Calculators
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Quick access to your tools
                  </p>
                </div>

                <Link
                  to="/calculators"
                  className="text-purple-400 text-sm hover:text-purple-300"
                >
                  View All
                </Link>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {calculators.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 transition"
                  >

                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.category}
                      </p>
                    </div>

                    <FaArrowRight className="text-gray-500 text-sm" />

                  </Link>
                ))}

              </div>
            </div>

            {/* AI TUTOR CARD */}
            <div className="rounded-2xl bg-gradient-to-br from-[#281044] to-[#15111F] border border-purple-500/20 p-6 flex flex-col">

              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <FaRobot size={24} />
              </div>

              <h2 className="text-xl font-bold mt-5">
                AI Mathematics Tutor
              </h2>

              <p className="text-gray-400 text-sm leading-6 mt-2">
                Ask questions, solve equations and understand mathematics step by step.
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">AI Sessions</span>
                  <span className="font-semibold">36</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Questions Asked</span>
                  <span className="font-semibold">124</span>
                </div>

              </div>

              <Link to="/ai" className="mt-auto pt-6">

                <span className="flex items-center justify-center gap-2 w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 font-semibold text-sm transition">
                  Open AI Tutor
                  <FaArrowRight />
                </span>

              </Link>

            </div>
          </section>

          {/* ACCOUNT STATUS */}
          <section className="rounded-2xl bg-[#15111F] border border-white/10 p-5 sm:p-6">

            <h2 className="text-xl font-bold mb-5">
              Account Activity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <div>
                <p className="text-gray-400 text-sm">
                  Account Status
                </p>

                <p className="text-green-400 font-semibold mt-2">
                  ● Active
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Membership
                </p>

                <p className="font-semibold mt-2">
                  {isPremium ? "Premium" : "Free"}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  User ID
                </p>

                <p className="font-semibold mt-2 break-all">
                  {user.userId || "Not available"}
                </p>
              </div>

            </div>
          </section>

          <p className="text-center text-xs text-gray-600 pb-4">
            CalcMaster Pro • Your Personal Calculation Workspace
          </p>

        </div>
      </main>
    </div>
  );
}
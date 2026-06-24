export default function ProfileSidebar({

activeTab="profile",
setActiveTab=()=>{}

}) {

const menu=[

["dashboard","🏠","Dashboard"],
["calculators","🧮","Calculators"],
["memory","🧠","AI Memory"],
["learning","✏️","Learning Lab"],

];

const settings=[

["profile","👤","Profile"],
["settings","⚙️","Settings"],
["language","🌐","Language"],

];

return(

<aside className="w-[280px] h-screen bg-[#050022] text-white border-r border-purple-900 flex flex-col overflow-hidden">

{/* TOP */}
<div>
  <div className="p-8">
    <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 scale-150 object-contain"
          />
    <h1 className="text-3xl font-bold">
      Calc<span className="text-purple-400">Master</span>
    </h1>
  </div>

  <div className="px-5">
    {menu.map(([id, icon, name]) => (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        className={`
          w-full mb-3 p-4 rounded-2xl
          ${activeTab === id ? "bg-purple-700" : "bg-white/5"}
        `}
      >
        <div className="flex gap-3">
          <span>{icon}</span>
          {name}
        </div>
      </button>
    ))}
  </div>

  <div className="border-t border-purple-900 my-4" />

  <div className="px-5">
    {settings.map(([id, icon, name]) => (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        className={`
          w-full mb-3 p-4 rounded-2xl
          ${activeTab === id ? "bg-purple-700" : "bg-white/5"}
        `}
      >
        <div className="flex gap-3">
          <span>{icon}</span>
          {name}
        </div>
      </button>
    ))}
  </div>
</div>

{/* BOTTOM FIXED AREA */}
<div className="mt-auto p-5">
  <div className="bg-white/5 p-4 rounded-3xl">
    <div className="flex gap-3 items-center">
      <img
        src="https://i.pravatar.cc/100"
        className="w-14 h-14 rounded-full"
      />

      <div className="overflow-hidden">
        <div className="truncate">Gershon Son</div>
        <div className="text-sm text-gray-400 truncate">
          gershonson369@gmail.com
        </div>
      </div>
    </div>
  </div>

  <button className="
    mt-5 w-full p-4 rounded-2xl bg-red-500/10
  ">
    🚪 Logout
  </button>
</div>

</aside>
);

}
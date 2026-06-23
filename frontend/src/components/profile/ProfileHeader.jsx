import { useState } from "react";

export default function ProfileHeader() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profileImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://ui-avatars.com/api/?name=User"
  );

  return (
       
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

<div className="flex flex-col lg:flex-row justify-between items-center gap-10">
  

{/* LEFT */}

<div className="flex items-center gap-6">

<div className="relative">

<img
src={profileImage}
alt=""
className="w-36 h-36 rounded-full object-cover border-4 border-purple-500"
/>

<button
className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-purple-600 text-white"
>
📷
</button>

</div>

<div>

<h1 className="text-4xl font-bold">
{user?.name}
</h1>

<p className="text-gray-400 mt-1">
{user?.email}
</p>

<p className="text-gray-400">
+91 98765 43210
</p>

<div className="mt-4 inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full">

✔ Verified Account

</div>

</div>

</div>

{/* RIGHT */}

<div className="grid grid-cols-2 gap-x-10 gap-y-5">

<div>
<p className="text-gray-400">
Username
</p>

<p className="font-bold">
{user?.userId}
</p>
</div>

<div>
<p className="text-gray-400">
Member Since
</p>

<p className="font-bold">
June 2026
</p>
</div>

<div>
<p className="text-gray-400">
Account Status
</p>

<span className="bg-green-600 px-3 py-1 rounded-full">
Active
</span>
</div>

</div>

</div>

</div>

  );

}
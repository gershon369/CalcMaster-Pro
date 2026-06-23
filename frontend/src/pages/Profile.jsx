import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileHeader from "../components/profile/ProfileHeader";
import AccountInformation from "../components/profile/AccountInformation";
import CalculatorActivity from "../components/profile/CalculatorActivity";
import Favorites from "../components/profile/Favorites";
import Statistics from "../components/profile/Statistics";
import Achievements from "../components/profile/Achievements";
import ProfileTopBar from "../components/profile/ProfileTopBar";
import QuickActions from "../components/profile/QuickActions";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#060617] text-white flex">

      <ProfileSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div>
         <ProfileTopBar />
        
        </div>

        <ProfileHeader />

        <div className="grid grid-cols-2 gap-6 mt-8">

          <AccountInformation />
          

          <CalculatorActivity />

          <Favorites />

          <QuickActions />

          <Statistics />

          <Achievements />

        </div>

      </main>

    </div>
  );
}
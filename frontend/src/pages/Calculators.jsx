
import DashboardSidebar from "../components/DashboardSidebar";
import CalculatorGrid from "../components/CalculatorGrid";

export default function Calculators() {
  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebar />

      <main className="flex-1 min-w-0">
        <CalculatorGrid />
      </main>
    </div>
  );
}

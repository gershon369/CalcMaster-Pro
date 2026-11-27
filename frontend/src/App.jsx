
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Calculators from "./pages/Calculators";
import CalculationHistory from "./pages/CalculationHistory";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardSidebar from "./components/DashboardSidebar";
import AIChat from "./components/AIChat";

// Calculator Pages
import BasicCalculator from "./pages/BasicCalculator";
import ScientificCalculator from "./pages/ScientificCalculator";
import LoanEMICalculator from "./pages/LoanEMICalculator";
import BMICalculator from "./pages/BMICalculator";
import GSTCalculator from "./pages/GSTCalculator";
import SIPCalculator from "./pages/SIPCalculator";
import CryptoCalculator from "./pages/CryptoCalculator";
import RetirementCalculator from "./pages/RetirementCalculator";

// =====================================
// GLOBAL APP LAYOUT
// =====================================

function AppLayout({ children }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#080611] text-white">

      {/* FIXED GLOBAL SIDEBAR */}
      <DashboardSidebar />

      {/* RIGHT CONTENT AREA */}
      <main
        className="
          ml-64
          flex h-dvh min-w-0 flex-1
          flex-col
          overflow-y-auto overflow-x-hidden
          hide-scrollbar
          bg-[#080611]
        "
      >
        {children}
      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AppLayout>
          }
        />

        {/* CALCULATOR DIRECTORY */}
        <Route
          path="/calculators"
          element={
            <AppLayout>
              <ProtectedRoute>
                <Calculators />
              </ProtectedRoute>
            </AppLayout>
          }
        />

        {/* CALCULATOR PAGES */}
        <Route
          path="/calculator/basic"
          element={<AppLayout><BasicCalculator /></AppLayout>}
        />

        <Route
          path="/calculator/scientific"
          element={<AppLayout><ScientificCalculator /></AppLayout>}
        />

        <Route
          path="/calculator/loan-emi"
          element={<AppLayout><LoanEMICalculator /></AppLayout>}
        />

        <Route
          path="/calculator/bmi"
          element={<AppLayout><BMICalculator /></AppLayout>}
        />

        <Route
          path="/calculator/gst"
          element={<AppLayout><GSTCalculator /></AppLayout>}
        />

        <Route
          path="/calculator/sip"
          element={<AppLayout><SIPCalculator /></AppLayout>}
        />

        <Route
          path="/calculator/crypto"
          element={<AppLayout><CryptoCalculator /></AppLayout>}
        />

        <Route
          path="/calculator/retirement"
          element={<AppLayout><RetirementCalculator /></AppLayout>}
        />

        {/* AI ASSISTANT */}
        <Route
          path="/ai"
          element={
            <AppLayout>
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            </AppLayout>
          }
        />
        {/* CALCULATION HISTORY */}
<Route
  path="/calculation-history"
  element={
    <AppLayout>
      <ProtectedRoute>
        <CalculationHistory />
      </ProtectedRoute>
    </AppLayout>
  }
/>
        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <AppLayout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </AppLayout>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <AppLayout>
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </AppLayout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

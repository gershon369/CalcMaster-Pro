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
import ProtectedRoute from "./components/ProtectedRoute";
import Calculators from "./pages/Calculators";

// Calculator Pages
import BasicCalculator from "./pages/BasicCalculator";
import ScientificCalculator from "./pages/ScientificCalculator";
import LoanEMICalculator from "./pages/LoanEMICalculator";
import BMICalculator from "./pages/BMICalculator";
import GSTCalculator from "./pages/GSTCalculator";
import SIPCalculator from "./pages/SIPCalculator";
import CryptoCalculator from "./pages/CryptoCalculator";
import RetirementCalculator from "./pages/RetirementCalculator";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Basic Calculator */}
        <Route
          path="/calculator/basic"
          element={<BasicCalculator />}
        />

        {/* Scientific Calculator */}
        <Route
          path="/calculator/scientific"
          element={<ScientificCalculator />}
        />

        {/* Loan EMI Calculator */}
        <Route
          path="/calculator/loan-emi"
          element={<LoanEMICalculator />}
        />
        {/* BMI Calculator */}
        <Route
          path="/calculator/bmi"
          element={<BMICalculator />}
        />
        {/* GST Calculator */}
        <Route
          path="/calculator/gst"
          element={<GSTCalculator />}
        />
        {/* SIP Calculator */}
        <Route
          path="/calculator/sip"
          element={<SIPCalculator />}
        />
        {/* Crypto Calculator */}
        <Route
          path="/calculator/crypto"
          element={<CryptoCalculator />}
        />
        {/* Retirement Calculator */}
        <Route
          path="/calculator/retirement"
          element={<RetirementCalculator />}
        />  
        {/* User Dashboard Enter */} 
        <Route
           path="/calculators"
           element={
           <ProtectedRoute>
             <Calculators  />
          </ProtectedRoute>
          }
        /> 
        {/* User Dashboard Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
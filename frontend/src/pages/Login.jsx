
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/API.js";
import { FaHome } from "react-icons/fa";
import {
  FaCalculator,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const saveLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password) {
      setFormError("Please enter your email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      saveLogin(response.data);
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setFormError("");

    try {
      const response = await API.post("/auth/google-login", {
        credential: credentialResponse.credential,
      });

      saveLogin(response.data);
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Google login failed."
      );
    }
  };

  return (
    
    <div className="min-h-screen bg-[#080611] text-white flex items-center justify-center p-4 md:p-8">
      
      <div className="w-full max-w-6xl min-h-[650px] grid md:grid-cols-2 overflow-hidden rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-950/40">

        {/* LEFT BRANDING SECTION */}

        <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#32106f] via-[#190b38] to-[#090612] p-12">

          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <FaCalculator className="text-2xl text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-wide">
                  CalcMaster <span className="text-purple-300">Pro</span>
                </h1>
                <p className="text-xs text-purple-200">
                  Smart Calculations. Smarter Decisions.
                </p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <span className="inline-block px-4 py-2 rounded-full border border-purple-300/30 bg-purple-400/10 text-purple-200 text-sm mb-6">
              Your Smart Calculation Platform
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Everything You Need,
              <span className="block text-purple-300">
                In One Place.
              </span>
            </h2>

            <p className="text-gray-300 mt-6 leading-7">
              Make calculations easier with powerful tools,
              smart features and a simple experience.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Powerful Scientific Calculator",
                "Financial & Investment Calculators",
                "Smart Tools and AI Assistance",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <FaCheckCircle className="text-purple-300" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-sm text-purple-200/60">
            © 2026 CalcMaster Pro. All rights reserved.
          </div>
        </div>

        {/* RIGHT LOGIN SECTION */}
          
        <div className="flex items-center justify-center bg-[#0d0a18] px-6 py-12 sm:px-12">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
<Link
  to="/"
  className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-600 hover:text-white transition"
>
  <FaHome />
  Back to Home
</Link>
            <Link to="/" className="md:hidden flex items-center justify-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
                <FaCalculator className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold">
                CalcMaster <span className="text-purple-400">Pro</span>
              </h1>
            </Link>

            <div className="mb-8">
              <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Sign in to your account
              </h2>

              <p className="text-gray-400 mt-3">
                Enter your details to access your account.
              </p>
            </div>

            {/* ERROR MESSAGE */}

            {formError && (
              <div className="mb-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                {formError}
              </div>
            )}

            {/* LOGIN FORM */}
            
            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full bg-[#171226] border border-purple-500/20 rounded-xl py-3.5 pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full bg-[#171226] border border-purple-500/20 rounded-xl py-3.5 pl-12 pr-12 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-purple-700 to-violet-500 hover:from-purple-600 hover:to-violet-400 transition shadow-lg shadow-purple-900/30 disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
                {!loading && <FaArrowRight />}
              </button>

            </form>

            {/* DIVIDER */}

            <div className="flex items-center gap-4 my-7">
              <div className="h-px flex-1 bg-purple-500/20" />
              <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-purple-500/20" />
            </div>

            {/* GOOGLE LOGIN */}

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setFormError("Google login was unsuccessful.")}
                theme="filled_black"
                shape="rectangular"
                size="large"
                text="signin_with"
                width="320"
              />
            </div>

            {/* REGISTER LINK */}

            <p className="text-center text-gray-400 text-sm mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 font-semibold hover:text-purple-300"
              >
                Create Account
              </Link>
            </p>

            <p className="text-center text-gray-600 text-xs mt-8">
              Secure Login • Protected Account
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

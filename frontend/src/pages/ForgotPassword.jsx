
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import {
  FaCalculator,
  FaEnvelope,
  FaArrowRight,
  FaHome,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password", {
        email: email.trim(),
      });

      localStorage.setItem("resetEmail", email.trim());

      alert(res.data.message || "Password reset request successful!");
      navigate("/reset-password");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
                <FaCalculator className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
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
              Account Recovery
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Forgot Your Password?
              <span className="block text-purple-300">
                We Can Help.
              </span>
            </h2>

            <p className="text-gray-300 mt-6 leading-7">
              Enter your registered email address to continue
              the password recovery process.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Simple account recovery",
                "Email-based verification",
                "Secure password reset process",
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

        {/* RIGHT FORGOT PASSWORD SECTION */}

        <div className="flex items-center justify-center bg-[#0d0a18] px-6 py-12 sm:px-12">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

            <Link to="/" className="md:hidden flex items-center justify-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
                <FaCalculator className="text-xl" />
              </div>

              <h1 className="text-2xl font-bold">
                CalcMaster <span className="text-purple-400">Pro</span>
              </h1>
            </Link>

            {/* HOME BUTTON */}

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-600 hover:text-white transition"
            >
              <FaHome />
              Back to login
            </Link>

            {/* HEADING */}

            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-6">
                <FaLock className="text-2xl text-purple-400" />
              </div>

              <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
                Account Recovery
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Forgot Password?
              </h2>

              <p className="text-gray-400 mt-3 leading-6">
                Don't worry! Enter your registered email address
                to continue resetting your password.
              </p>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="mb-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* EMAIL FORM */}

            <form onSubmit={handleForgotPassword} className="space-y-5">

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
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    className="w-full bg-[#171226] border border-purple-500/20 rounded-xl py-3.5 pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-purple-700 to-violet-500 hover:from-purple-600 hover:to-violet-400 transition shadow-lg shadow-purple-900/30 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Send Reset Link"}
                {!loading && <FaArrowRight />}
              </button>

            </form>

            {/* LOGIN LINK */}

            <p className="text-center text-gray-400 text-sm mt-8">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-purple-400 font-semibold hover:text-purple-300"
              >
                Sign In
              </Link>
            </p>

            <p className="text-center text-gray-600 text-xs mt-8">
              Secure Account Recovery • CalcMaster Pro
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

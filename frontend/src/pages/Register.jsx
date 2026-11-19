
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import { FaHome } from "react-icons/fa";
import {
  FaCalculator,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaIdBadge,
  FaCalendarAlt,
  FaPhone,
  FaCheckCircle,
} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [UserID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [DateofBirth, setDateofBirth] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full h-12 pl-11 pr-4 rounded-xl bg-[#171226] border border-purple-500/20 text-white outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-600";

  const validateForm = () => {
    const newErrors = {};

    if (!UserID.trim()) {
      newErrors.userId = "User ID is required";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!DateofBirth) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!MobileNumber) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(MobileNumber)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        userId: UserID.trim(),
        name: name.trim(),
        email: email.trim(),
        password,
      });

      alert(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080611] text-white flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-6xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-950/40">

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
              Join CalcMaster Pro
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Start Your Journey
              <span className="block text-purple-300">
                With Smarter Tools.
              </span>
            </h2>

            <p className="text-gray-300 mt-6 leading-7">
              Create your account and explore powerful calculators
              and smart tools in one place.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Access useful calculation tools",
                "Explore financial calculators",
                "Enjoy a simple user experience",
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

        {/* RIGHT REGISTER SECTION */}

        <div className="bg-[#0d0a18] px-6 py-10 sm:px-10 md:px-12 flex items-center justify-center">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}

            <Link to="/" className="md:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
                <FaCalculator className="text-xl" />
              </div>

              <h1 className="text-2xl font-bold">
                CalcMaster <span className="text-purple-400">Pro</span>
              </h1>
            </Link>
<Link
  to="/"
  className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-600 hover:text-white transition"
>
  <FaHome />
  Back to Home
</Link>
            <div className="mb-7">
              <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase">
                Create Account
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Get Started Today
              </h2>

              <p className="text-gray-400 mt-2">
                Fill in your details to create your account.
              </p>
            </div>

            {formError && (
              <div className="mb-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              {/* USER ID */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  User ID
                </label>

                <div className="relative">
                  <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type="text"
                    value={UserID}
                    onChange={(e) => setUserID(e.target.value)}
                    placeholder="Create your User ID"
                    autoComplete="username"
                    className={inputClass}
                  />
                </div>

                {errors.userId && (
                  <p className="text-red-400 text-xs mt-1">{errors.userId}</p>
                )}
              </div>

              {/* NAME */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>

                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}

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
                    className={inputClass}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* DATE OF BIRTH */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Date of Birth
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />

                  <input
                    type="date"
                    value={DateofBirth}
                    onChange={(e) => setDateofBirth(e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                {errors.dob && (
                  <p className="text-red-400 text-xs mt-1">{errors.dob}</p>
                )}
              </div>

              {/* MOBILE NUMBER */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Mobile Number
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type="tel"
                    value={MobileNumber}
                    onChange={(e) =>
                      setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Enter 10-digit mobile number"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>

                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* PASSWORD */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-700 to-violet-500 hover:from-purple-600 hover:to-violet-400 transition text-white font-semibold shadow-lg shadow-purple-900/30 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            <p className="text-gray-400 text-center mt-7 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 font-semibold hover:text-purple-300"
              >
                Sign In
              </Link>
            </p>

            <p className="text-center text-gray-600 text-xs mt-6">
              Secure Registration • CalcMaster Pro
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

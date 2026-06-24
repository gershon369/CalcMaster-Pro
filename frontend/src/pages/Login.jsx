import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";



export default function Login() {
  const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);  

const handleLogin = async () => {
  
  const newErrors = {};

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email =
      "Invalid Username. Please verify again";
  }

  if (!password) {
    newErrors.password =
      "Password is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0)
    return;

  try {

    const res = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
     if (res.data.user.role === "admin") {
         navigate("/admin");
        } else {
          navigate("/dashboard");
      }
        
    console.log(res.data);

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-6">

      <form
        onSubmit={(e) => {
           e.preventDefault();
           handleLogin();
         }}
        className="w-full max-w-[420px] bg-[#1a1a1d] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

        <Link
           to="/"
           className="inline-flex items-center px-4 py-2 rounded-lg border border-purple-500 bg-purple-500/20 text-purple-300 hover:bg-purple-600 hover:text-white transition">
           ← Back
        </Link>

        <h1 className="text-4xl font-bold text-center text-white mt-5 mb-7">
          Welcome Back
        </h1>

        <div className="mb-4">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
   className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white focus:border-purple-500 outline-none"
  />

  {errors.email && (
    <p className="text-red-500 text-sm mt-1">
      {errors.email}
    </p>
  )}
</div>

      <div className="mb-4">
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white focus:border-purple-500 outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password}
    </p>
  )}
</div>

        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-purple-400 text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <button  type="submit"  className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold">
          Login
        </button>
        <div className="mt-6">

  <div className="flex items-center gap-4 mb-4">
    <div className="flex-1 h-px bg-gray-700"></div>
    <span className="text-gray-400 text-sm">
      Or register with
    </span>
    <div className="flex-1 h-px bg-gray-700"></div>
  </div>

  <div className="mt-6">
    <div className="grid grid-cols-2 gap-4">

    <div
  className="flex items-center justify-center gap-3 h-12 border border-gray-600 rounded-xl cursor-pointer hover:bg-white/10 transition"
  onClick={() => {
    document.querySelector('[role="button"]')?.click();
  }}
>
  <img
    src="/google.png"
    alt="Google"
    className="w-6 h-6"
  />
  <span className="text-white">
    Google
  </span>
</div>

<div style={{ display: "none" }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const res = await API.post(
          "/auth/google-login",
          {
            credential: credentialResponse.credential,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }}
    onError={() => {
      console.log("Login Failed");
    }}
  />
</div>

    <button
      className="flex items-center justify-center gap-3 h-12 border border-gray-600 rounded-xl text-white hover:bg-white/10 transition"
    >
      <img
        src="/apple.png"
        alt="Apple"
        className="w-6 h-6"
      />
      Apple
    </button>

  </div>

</div>

</div>

        <p className="text-gray-400 text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400"
          >
            Create Account
          </Link>
        </p>

      </form>

    </div>
    
  );
}

  
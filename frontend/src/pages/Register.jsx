import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

export default function Register() {
 const navigate = useNavigate();

const [errors, setErrors] = useState({});
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [UserID, setUserID] = useState("");
const [DateofBirth, setDateofBirth] = useState("");
const [MobileNumber, setMobileNumber] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleRegister = async () => {
  const newErrors = {};

  if (!UserID)
    newErrors.userId =
      "User ID is required";

  if (!name)
    newErrors.name =
      "Name is required";

  if (!email) {
    newErrors.email =
      "Email is required";
  } else if (
    !/\S+@\S+\.\S+/.test(email)
  ) {
    newErrors.email =
      "Invalid Username. Please verify again";
  }

  if (!DateofBirth)
    newErrors.dob =
      "Date of Birth is required";

  if (!MobileNumber) {
    newErrors.mobile =
      "Mobile Number is required";
  } else if (
    !/^[0-9]{10}$/.test(MobileNumber)
  ) {
    newErrors.mobile =
      "Enter valid Mobile Number";
  }

  if (!password)
    newErrors.password =
      "Password is required";

  if (!confirmPassword)
    newErrors.confirmPassword =
      "Confirm Password is required";

  if (
    password &&
    confirmPassword &&
    password !== confirmPassword
  ) {
    newErrors.confirmPassword =
      "Passwords do not match";
  }

  setErrors(newErrors);

  if (
    Object.keys(newErrors).length > 0
  )
    return;
    
  try {

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await API.post("/auth/register", {
       userId: UserID,
       name,
       email,
       password,
      });

    alert(res.data.message);

    navigate("/login");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Register Failed"
    );
  }
 };
  return (
    <div  className="min-h-screen bg-black flex justify-center py-8 px-4">

      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
         }}
            className="w-full max-w-[430px] bg-[#1a1a1d] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-lg border border-purple-500 bg-purple-500/20 text-purple-300 hover:bg-purple-600 hover:text-white transition"
        >
          ← Back
        </Link>

        <h1 className="text-4xl font-bold text-center text-white mt-5 mb-7">
          Create Account
        </h1>
        <div className="mb-4">
  <input
    type="text"
    placeholder="User ID"
    value={UserID}
    onChange={(e) => setUserID(e.target.value)}
    className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
  />

  {errors.userId && (
    <p className="text-red-500 text-sm mt-1">
      {errors.userId}
    </p>
  )}
</div>      
 <div className="mb-4">
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
  />

  {errors.name && (
    <p className="text-red-500 text-sm mt-1">
      {errors.name}
    </p>
  )}
</div>
        <div className="mb-4">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
  />

  {errors.email && (
    <p className="text-red-500 text-sm mt-1">
      {errors.email}
    </p>
  )}
</div>
        <div className="mb-4">
  <input
    type="date"
    value={DateofBirth}
    onChange={(e) => setDateofBirth(e.target.value)}
    className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
  />

  {errors.dob && (
    <p className="text-red-500 text-sm mt-1">
      {errors.dob}
    </p>
  )}
</div> 
        <div className="mb-4">
  <input
    type="tel"
    placeholder="Mobile Number"
    value={MobileNumber}
    onChange={(e) => setMobileNumber(e.target.value)}
    className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
  />

  {errors.mobile && (
    <p className="text-red-500 text-sm mt-1">
      {errors.mobile}
    </p>
  )}
</div>
    <div/>
        
 <div className="mb-4">
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
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

 <div className="mb-4">
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500 transition"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
    >
      {showConfirmPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
      {errors.confirmPassword}
    </p>
  )}
</div>
        <button  type="submit"  className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold">
         Register
        </button>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}; 
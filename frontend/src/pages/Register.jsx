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
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
         }}
            className="w-[95%] max-w-md bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/10">

        <Link
          to="/"
          className="inline-block px-5 py-2 rounded-lg bg-purple-500/20 border border-purple-500 text-purple-300 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/30"
        >
          ← Back
        </Link>

        <h1 className="text-3xl font-bold text-white mt-4 mb-6">
          Create Account
        </h1>
        <div className="mb-4">
  <input
    type="text"
    placeholder="User ID"
    value={UserID}
    onChange={(e) => setUserID(e.target.value)}
    className="w-full p-4 rounded-xl bg-black/30 text-white"
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
    className="w-full p-4 rounded-xl bg-black/30 text-white"
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
    className="w-full p-4 rounded-xl bg-black/30 text-white"
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
    className="w-full p-4 rounded-xl bg-black/30 text-white"
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
    className="w-full p-4 rounded-xl bg-black/30 text-white"
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
      className="w-full p-4 rounded-xl bg-black/30 text-white"
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

 <div className="mb-4">
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full p-4 rounded-xl bg-black/30 text-white"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
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
        <button  type="submit"  className="w-full bg-purple-600 py-4 rounded-xl text-white">
         Register
        </button>

        <p className="text-gray-400 text-center mt-5">
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
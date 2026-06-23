import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      const email = localStorage.getItem("resetEmail");

      const res = await API.post(
        "/auth/reset-password",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Reset Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-slate-900 mb-3">
          Change Password
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Please set a new password
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-purple-600 text-white py-4 rounded-xl"
        >
          Change Password
        </button>

        <div className="flex justify-between mt-6">
          <Link to="/login">Back to Login</Link>
          <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
}
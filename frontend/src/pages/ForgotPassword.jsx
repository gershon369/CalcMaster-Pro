import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {

      const res = await API.post(
        "/auth/forgot-password",
        { email }
      );

      localStorage.setItem(
      "resetEmail",
       email
      );
       navigate("/reset-password");
    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-white/10 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl mb-4">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/30 mb-4"
        />

        <button
          onClick={handleForgotPassword}
          className="w-full bg-purple-600 p-3 rounded-xl"
        >
          Send
        </button>

        <Link
          to="/login"
          className="block mt-4 text-purple-400"
        >
          Back
        </Link>

      </div>

    </div>
  );
}
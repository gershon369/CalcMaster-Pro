import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requirePremium = false,
}) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Login Protection
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Premium verification will be connected
  // with backend in the next step.

  return children;
}
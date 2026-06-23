import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId="289138175477-qcvffsjiq2j7o521ak853omptn9h2q5m.apps.googleusercontent.com"
  >
    <App />
  </GoogleOAuthProvider>
);
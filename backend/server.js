const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/loan", require("./routes/loanRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 CalcMaster API Running");
});

// Server Start
app.listen(5000, () => {
  console.log("✅ Server Running on Port 5000");
});

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);
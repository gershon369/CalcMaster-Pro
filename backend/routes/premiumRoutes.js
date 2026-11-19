const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const premiumMiddleware = require("../middleware/premiumMiddleware");

// Check Premium Access
router.get("/check", protect, premiumMiddleware, (req, res) => {
  res.json({
    success: true,
    isPremium: true,
    message: "Premium access granted.",
    subscriptionPlan: req.userRecord.subscriptionPlan,
    subscriptionExpiry: req.userRecord.subscriptionExpiry,
  });
});

module.exports = router;
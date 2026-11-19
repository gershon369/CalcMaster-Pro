
const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
  getUsers,
  activatePremium,
  deactivatePremium,
} = require("../controllers/adminController");

// Admin: Get all users
router.get("/users", protect, admin, getUsers);

// Admin: Activate Premium
router.put("/premium/activate", protect, admin, activatePremium);

// Admin: Deactivate Premium
router.put("/premium/deactivate", protect, admin, deactivatePremium);

module.exports = router;

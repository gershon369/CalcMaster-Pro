
const User = require("../models/User");

// Get all users (without password)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
    });
  }
};

// Activate Premium
exports.activatePremium = async (req, res) => {
  try {
    const { userId, plan, expiry } = req.body;

    if (!userId || !["Pro", "Enterprise"].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Valid userId and Premium plan are required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const expiryDate = new Date(expiry);

    if (!expiry || Number.isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "A future expiry date is required.",
      });
    }

    user.premium = true;
    user.subscriptionPlan = plan;
    user.subscriptionExpiry = expiryDate;

    await user.save();

    res.json({
      success: true,
      message: "Premium activated successfully.",
    });
  } catch (error) {
    console.error("Activate Premium Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to activate Premium.",
    });
  }
};

// Deactivate Premium
exports.deactivatePremium = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.premium = false;
    user.subscriptionPlan = "Free";
    user.subscriptionExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Premium deactivated successfully.",
    });
  } catch (error) {
    console.error("Deactivate Premium Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deactivate Premium.",
    });
  }
};

const User = require("../models/User");

const premiumMiddleware = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isPremiumActive =
      user.premium === true &&
      (
        !user.subscriptionExpiry ||
        new Date(user.subscriptionExpiry) > new Date()
      );

    if (!isPremiumActive) {
      return res.status(403).json({
        success: false,
        message: "Premium subscription required.",
      });
    }

    req.userRecord = user;

    next();
  } catch (error) {
    console.error("Premium Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while checking premium access.",
    });
  }
};

module.exports = premiumMiddleware;
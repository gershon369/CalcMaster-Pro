const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    // Premium Access
    premium: {
      type: Boolean,
      default: false,
    },

    // Subscription Plan
    subscriptionPlan: {
      type: String,
      enum: ["Free", "Pro", "Enterprise"],
      default: "Free",
    },

    // Subscription Expiry
    subscriptionExpiry: {
      type: Date,
      default: null,
    },

    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
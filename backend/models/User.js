const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    default: "user"
  },

  premium: {
    type: Boolean,
    default: false
  },
  userId: {
  type: String,
  required: true,
  unique: true,
},

  //resetPasswordToken: String,
  //resetPasswordExpire: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

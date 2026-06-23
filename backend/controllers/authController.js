const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const crypto = require("crypto");
//const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("289138175477-qcvffsjiq2j7o521ak853omptn9h2q5m.apps.googleusercontent.com");

// REGISTER
exports.register = async (req, res) => {
  try {
    const {  userId,  name,  email,  password} = req.body;

    const userIdExists = await User.findOne({
        userId
      });

       if (userIdExists) {
          return res.status(400).json({
             message: "User ID already exists"
         });
       }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userId,
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found"
      });
    }

    res.json({
  success: true,
  message: "Email Verified Successfully",
  email
   });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// RESET PASSWORD

exports.resetPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password Updated Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Google Login Controller
exports.googleLogin = async (req, res) => {
  try {

    const { credential } = req.body;

    const ticket =
      await client.verifyIdToken({
        idToken: credential,
        audience:
          "289138175477-qcvffsjiq2j7o521ak853omptn9h2q5m.apps.googleusercontent.com",
      });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({
      email,
    });

    if (!user) {

      user = await User.create({
        name,
        email,
        password: "google-login",
        userId:
          "GOOGLE" + Date.now(),
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
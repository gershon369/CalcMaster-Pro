const express = require("express");

const router = express.Router();

const {
  protect,
  admin
} = require("../middleware/authMiddleware");

const {
  getUsers
} = require("../controllers/adminController");

router.get(
  "/users",
  protect,
  admin,
  getUsers
);

module.exports = router;
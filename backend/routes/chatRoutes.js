
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createChat,
  getChats,
  getChat,
  deleteChat,
  deleteAllChats,
  addMessage,
} = require("../controllers/chatController");

// All routes require login
router.use(protect);

// Create new chat
router.post("/", createChat);

// Get all chat history
router.get("/", getChats);

// Get one chat
router.get("/:id", getChat);

// Add message
router.post("/:id/messages", addMessage);

// Delete one chat
router.delete("/:id", deleteChat);

// Delete all chats
router.delete("/", deleteAllChats);

module.exports = router;

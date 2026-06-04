const express = require("express");
const router = express.Router();

const { generateQuestions } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Protected route
router.post("/questions", authMiddleware, generateQuestions);

module.exports = router;
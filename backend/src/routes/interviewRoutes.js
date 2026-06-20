const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
  getInterviewHistory,
  saveAnswers
} = require("../controllers/interviewController");



// Get interview history

router.get(

  "/history",

  authMiddleware,

  getInterviewHistory

);



// Save interview answers

router.post(

  "/answers",

  authMiddleware,

  saveAnswers

);



module.exports = router;
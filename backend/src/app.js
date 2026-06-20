const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes =
require("./routes/analyticsRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const userRoutes = require("./routes/userRoutes");




const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use(
"/api/analytics",
analyticsRoutes
);
app.use(
"/api/interviews",
interviewRoutes
);
app.use(
"/api/user",
userRoutes
);

// Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
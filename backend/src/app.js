const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://n8n.raigrc.com", "https://portfolio.raigrc.com"],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/messages", require("./routes/messages"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5010;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

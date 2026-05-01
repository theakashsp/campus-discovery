require("dotenv").config();
const express = require("express");
const cors = require("cors");

const collegeRoutes = require("./routes/colleges");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — allow configurable CORS origin for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/colleges", collegeRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Campus Compare API is running" });
});

// Search shorthand
app.get("/search", (req, res) => {
  req.query.query = req.query.query || "";
  const { getAllColleges } = require("./controllers/collegeController");
  getAllColleges(req, res);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err.message);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

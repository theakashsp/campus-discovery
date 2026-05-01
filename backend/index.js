require("dotenv").config();

const express = require("express");
const cors = require("cors");
const collegeRoutes = require("./routes/colleges");
const authRoutes = require("./routes/auth");
const { getAllColleges } = require("./controllers/collegeController");

const app = express();

// Middleware — allow configurable CORS origin for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Routes
app.use("/colleges", collegeRoutes);
app.use("/auth", authRoutes);

// Search endpoint (delegates to the colleges controller)
app.get("/search", (req, res) => {
  req.query.query = req.query.query || "";
  getAllColleges(req, res);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
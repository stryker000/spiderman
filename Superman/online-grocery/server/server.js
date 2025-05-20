const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");

const app = express();

// Middleware
app.use(cors());                // Allows frontend to call backend
app.use(bodyParser.json());    // Parses JSON bodies in requests

// Mount route handlers
app.use("/api/auth", authRoutes);     // All auth requests start with /api/auth
app.use("/api/items", itemRoutes);    // All item requests start with /api/items

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

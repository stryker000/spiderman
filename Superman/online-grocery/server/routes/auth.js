const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query("INSERT INTO consumers (name, email, password) VALUES (?, ?, ?)", [name, email, hash], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email already exists" });
      return res.status(500).json(err);
    }
    res.status(201).json({ message: "Registration successful" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM consumers WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  });
});

module.exports = router;

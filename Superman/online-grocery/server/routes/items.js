const express = require("express");
const db = require("../db");
const router = express.Router();

// --------------------- READ ---------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// --------------------- CREATE ---------------------
router.post("/", (req, res) => {
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO items (name, image, price) VALUES (?, ?, ?)",
    [name, image, price],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Item created", itemId: result.insertId });
    }
  );
});

// --------------------- UPDATE ---------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  db.query(
    "UPDATE items SET name = ?, image = ?, price = ? WHERE id = ?",
    [name, image, price, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Item updated successfully" });
    }
  );
});

// --------------------- DELETE ---------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM items WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  });
});

module.exports = router;

// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Hardcoded users
const users = [
  { username: "alice", password: "alice123" },
  { username: "bob", password: "bob456" }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});


// Get all books (Catalogue Page)
app.get('/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a new book (for admin/demo)
app.post('/books', (req, res) => {
  const { title, author, description, price, cover } = req.body;
  db.query(
    'INSERT INTO Books (title, author, description, price, cover) VALUES (?, ?, ?, ?, ?)',
    [title, author, description, price, cover],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, title, author, description, price, cover });
    }
  );
});

// (Optional) User registration and login endpoints would go here

app.listen(5000, () => console.log('Server running on port 5000'));

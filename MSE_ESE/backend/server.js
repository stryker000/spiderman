const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection settings for XAMPP
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default is empty
  database: 'students' // change this to your actual database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Example: Get all students with their MSE and ESE marks
app.get('/results', (req, res) => {
  const query = `
    SELECT s.id, s.name, s.registration_number, s.semester,
      GROUP_CONCAT(DISTINCT m.subject_name, ':', m.marks) as mse_marks,
      GROUP_CONCAT(DISTINCT e.subject_name, ':', e.marks) as ese_marks
    FROM Students s
    LEFT JOIN MSE m ON s.id = m.student_id
    LEFT JOIN ESE e ON s.id = e.student_id
    GROUP BY s.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Example: Add a new student
app.post('/students', (req, res) => {
  const { name, registration_number, semester } = req.body;
  const query = 'INSERT INTO Students (name, registration_number, semester) VALUES (?, ?, ?)';
  db.query(query, [name, registration_number, semester], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, registration_number, semester });
  });
});

// Example: Add MSE marks
app.post('/mse', (req, res) => {
  const { student_id, subject_name, marks } = req.body;
  const query = 'INSERT INTO MSE (student_id, subject_name, marks) VALUES (?, ?, ?)';
  db.query(query, [student_id, subject_name, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, student_id, subject_name, marks });
  });
});

// Example: Add ESE marks
app.post('/ese', (req, res) => {
  const { student_id, subject_name, marks } = req.body;
  const query = 'INSERT INTO ESE (student_id, subject_name, marks) VALUES (?, ?, ?)';
  db.query(query, [student_id, subject_name, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, student_id, subject_name, marks });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

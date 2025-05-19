// backend/db.js
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default
  database: 'students'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});
module.exports = db;

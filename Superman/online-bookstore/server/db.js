const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',       // since using XAMPP locally
  user: 'root',            // default XAMPP user
  password: '',            // empty by default in XAMPP
  database: 'bookstore',   // the DB you created in phpMyAdmin
});

conn.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database!');
});

module.exports = conn;

// db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default is empty
    database: 'electricity_db'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
module.exports = connection;

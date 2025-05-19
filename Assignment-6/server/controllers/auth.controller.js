// server/controllers/auth.controller.js
const pool     = require('../config/db');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // simple existence check
    const [existing] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
    if (existing.length) return res.status(409).json({ msg: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hash]);
    res.status(201).json({ msg: 'User registered' });
  } catch (err) { res.status(500).json({ err }); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ msg: 'Invalid credentials' });

    const user = rows[0];
    const ok   = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Invalid credentials' });

    // issue short JWT (or just return 200 for class demo)
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, name: user.name });
  } catch (err) { res.status(500).json({ err }); }
};

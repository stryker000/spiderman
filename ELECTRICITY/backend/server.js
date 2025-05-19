// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const calculateBill = require('./billCalculator');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add a consumer (for demo)
app.post('/api/consumer', (req, res) => {
    const { name, address } = req.body;
    db.query('INSERT INTO Consumer (name, address) VALUES (?, ?)', [name, address], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ consumer_id: result.insertId });
    });
});

// Calculate and store bill
app.post('/api/bill', (req, res) => {
    const { consumer_id, previous_reading, current_reading } = req.body;
    const units = current_reading - previous_reading;
    const bill_amount = calculateBill(units);

    db.query(
        'INSERT INTO Billing (consumer_id, previous_reading, current_reading, units_consumed, bill_amount) VALUES (?, ?, ?, ?, ?)',
        [consumer_id, previous_reading, current_reading, units, bill_amount],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ bill_id: result.insertId, bill_amount });
        }
    );
});

// Get bills for a consumer
app.get('/api/bills/:consumer_id', (req, res) => {
    db.query('SELECT * FROM Billing WHERE consumer_id = ?', [req.params.consumer_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',     require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

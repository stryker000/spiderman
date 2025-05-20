const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});

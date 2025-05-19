// server/routes/product.routes.js
const router = require('express').Router();
const { getAll, updatePrice } = require('../controllers/product.controller');

// GET  /api/products          -> full catalogue
router.get('/', getAll);

// PUT  /api/products/:id/price -> update only the price field
router.put('/:id/price', updatePrice);

module.exports = router;

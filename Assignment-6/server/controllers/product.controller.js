// server/controllers/product.controller.js
const pool = require('../config/db');

/**
 * GET /api/products
 * Return every product (catalogue view).
 */
exports.getAll = async (_req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

/**
 * PUT /api/products/:id/price
 * Body: { "price": 19.99 }
 * Update the price of a single product.
 */
exports.updatePrice = async (req, res) => {
  const { id }    = req.params;           // product ID from URL
  const { price } = req.body;             // new price from JSON body

  if (price === undefined || isNaN(price)) {
    return res.status(400).json({ msg: 'Valid price is required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE products SET price = ? WHERE id = ?',
      [parseFloat(price), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json({ msg: 'Price updated', id, price: parseFloat(price) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

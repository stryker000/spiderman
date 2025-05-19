import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Catalogue() {
  const [items, setItems] = useState([]);

  /* ───────────────────────────── FETCH ALL PRODUCTS ───────────────────────────── */
  const loadProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const normalized = res.data.map(p => ({
          ...p,
          price: parseFloat(p.price)
        }));
        setItems(normalized);
      })
      .catch(() => alert('Unable to load catalogue'));
  };

  useEffect(loadProducts, []);

  /* ───────────────────────────── UPDATE PRICE ───────────────────────────── */
  const updatePrice = (id, newPrice) => {
    axios.put(`http://localhost:5000/api/products/${id}/price`, { price: newPrice })
      .then(() => {
        // reflect change in local state
        setItems(items.map(p => (
          p.id === id ? { ...p, price: newPrice } : p
        )));
        alert('Price updated!');
      })
      .catch(() => alert('Failed to update price'));
  };

  return (
    <>
      <h3 className="mb-4 text-center">Our Products</h3>
      <div className="row g-4">
        {items.length
          ? items.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onPriceUpdate={updatePrice}   /* ← new prop */
              />
            ))
          : <p className="text-muted text-center">No products found.</p>
        }
      </div>
    </>
  );
}

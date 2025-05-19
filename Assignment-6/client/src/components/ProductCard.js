export default function ProductCard({ product, onPriceUpdate }) {
  const priceNum = typeof product.price === 'string'
    ? parseFloat(product.price)
    : product.price;

  /* prompt for new price, then call parent handler */
  const handleEdit = () => {
    const input = prompt(`Set new price for "${product.name}"`, priceNum);
    if (!input) return;                      // cancelled
    const newPrice = parseFloat(input);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid number');
      return;
    }
    onPriceUpdate(product.id, newPrice);
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 d-flex">
      <div className="card shadow-sm w-100">
        <div className="ratio ratio-1x1">
          <img
            src={product.image_url}
            alt={product.name}
            className="card-img-top product-img"
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.name}</h6>

          {/* PRICE + edit button */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">₹{priceNum.toFixed(2)}</span>
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-outline-secondary"
              title="Edit price"
            >
              ✎
            </button>
          </div>

          <button className="btn btn-outline-success btn-sm w-100 mt-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

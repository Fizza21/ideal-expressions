import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

export default function ProductCard({ product }) {
  const { add } = React.useContext(CartContext);
  const [added, setAdded] = React.useState(false); // for feedback

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop link navigation
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // reset after 1.5 sec
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      {/* Clickable link to details */}
      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={{ height: 200, width: '100%', objectFit: 'cover' }}
        />
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 700, minHeight: 48 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: '#555', minHeight: 40 }}>
            {product.description}
          </div>
          <div className="price" style={{ margin: '8px 0' }}>
            PKR {product.price.toLocaleString()}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button with feedback */}
      <div style={{ padding: '0 12px 12px 12px' }}>
        <button
          className="btn btn-primary btn-block"
          onClick={handleAddToCart}
          style={{
            backgroundColor: added ? '#c44dffff' : '#de369dff',
            border: 'none',
            transition: '0.3s',
            fontWeight: 600
          }}
        >
          {added ? '✅ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { CartContext } from '../App';

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = React.useContext(CartContext);
  const [added, setAdded] = React.useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // 1.5s baad wapas normal
  };

  return (
    <div className="container" style={{ marginTop: 24, maxWidth: 800 }}>
      {/* Image Full Width */}
      <div style={{ marginBottom: 24 }}>
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          style={{
            width: '100%',
            height: 400,
            objectFit: 'contain', // ✅ full image without crop
            borderRadius: 12,
            backgroundColor: '#FFDDE2' // light background for empty space
  }}
/>
</div>
      {/* Product Details */}
      <div>
        <h2 style={{ marginTop: 0, fontSize: 30 }}>{product.name}</h2>
        <div className="price" style={{ margin: '12px 0', fontSize: 30, fontWeight: 'bold' }}>
          PKR {product.price.toLocaleString()}
        </div>
        <p style={{ color: '#555', fontSize: 20 }}>{product.description}</p>

        {/* Add to Cart Button */}
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          style={{
            backgroundColor: added ? '#c44dffff' : '',
            borderColor: added ? '#c44dffff' : '',
            transition: '0.3s'
          }}
        >
          {added ? 'Added! ✅' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

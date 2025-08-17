import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ products }) {
  return (
    <div className="container">
      <h1 style={{ color: 'var(--pink-600)', margin: '20px 0' }}>
        Featured Products
      </h1>

      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}
      >
        {products.slice(0, 3).map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={`/images/${p.image}`}
              alt={p.name}
              style={{ height: 200, width: '100%', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
              <h3>{p.name}</h3>
              <p className="price">PKR {p.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/products" className="btn btn-primary">
          View More Products
        </Link>
      </div>
    </div>
  );
}

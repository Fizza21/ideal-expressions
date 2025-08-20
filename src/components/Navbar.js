import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

export default function Navbar() {
  const { cart } = React.useContext(CartContext);
  const count = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <nav className="nav">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand name bigger */}
        <Link
          className="brand"
          to="/"
          style={{
            fontSize: '28px', // Brand ka size bada
            fontWeight: '900'
          }}
        >
          IDEAL EXPRESSIONS
        </Link>

        {/* Links spaced out */}
        <div
          className="navlinks"
          style={{
            display: 'flex',
            gap: '28px', // Links ke beech gap
            marginLeft: '20px' // Brand se distance
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link> {/* ← NEW LINK */}
          <Link to="/cart">
            Cart <span className="badge">{count}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

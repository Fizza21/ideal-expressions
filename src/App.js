import React, { createContext, useMemo, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import products from './data/products';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';

// -------------------- About Page --------------------
function About() {
  return (
    <div className="container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Ideal Expressions</strong> — your trusted destination
        for authentic beauty products. We pride ourselves on delivering only
        original items, ensuring the highest quality for our customers.
        Thousands of satisfied buyers trust us for our commitment to excellence
        and quick delivery. Shop with confidence and experience the Ideal
        Expressions difference!
      </p>
    </div>
  );
}

// -------------------- Home Page --------------------
function Home() {
  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>Ideal Expressions</h1>
          <p>Modern beauty store — Quick checkout via PayPal or Cash on Delivery.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Link to="/products" className="btn btn-primary">Shop Products</Link>
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="btn btn-outline">Free Hosting</a>
          </div>
        </div>
      </div>

      {/* Best Sellers Heading */}
      <div style={{ textAlign: 'center', padding: '30px 0 10px 0' }}>
        <h2>Best Sellers</h2>
      </div>

      {/* Best Seller Products */}
      <div className="container">
        <div 
          className="grid" 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            flexWrap: 'wrap'
          }}
        >
          {products.slice(0, 3).map(p => (
            <div 
              key={p.id} 
              style={{
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* View More */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/products" className="btn btn-primary">
            View More Products
          </Link>
        </div>
      </div>
    </div>
  );
}

// -------------------- Products Page --------------------
function ProductsPage() {
  const [q, setQ] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <div className="container">
      <h2>All Products</h2>
      <input
        className="input"
        placeholder="Search products..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ margin: '12px 0' }}
      />
      <div className="grid" style={{ gap: '20px' }}> 
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// -------------------- Context --------------------
export const CartContext = createContext();

// -------------------- Main App --------------------
export default function App() {
  const [cart, setCart] = useState([]);

  const add = (item) =>
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });

  const remove = (id) => setCart((prev) => prev.filter((x) => x.id !== id));
  const inc = (id) =>
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  const dec = (id) =>
    setCart((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      )
    );
  const clear = () => setCart([]);
  const total = useMemo(
    () => cart.reduce((s, x) => s + x.price * x.qty, 0),
    [cart]
  );

  const ctx = { cart, add, remove, inc, dec, clear, total };

  return (
    <CartContext.Provider value={ctx}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <footer className="footer">
        © {new Date().getFullYear()} Ideal Expressions — Built with ❤️
      </footer>
    </CartContext.Provider>
  );
}

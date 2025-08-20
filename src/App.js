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
        {/* Welcome to <strong>Ideal Expressions</strong>  */}
      <div class="about">
  <p>At Ideal Expressions, we believe luxury is not just a choice — it’s a lifestyle.</p>
  
  <p>As a trusted destination for imported high-end cosmetics, premium fashion, and exclusive lifestyle essentials, we handpick only the best to match your taste for elegance.</p>
  
  <p>Every product we offer is 100% genuine, authentic, and sourced from world-renowned brands, ensuring you get the quality you deserve.</p>
  
  <p>Whether you’re searching for the latest luxury makeup trends, timeless skincare formulas, or fashion pieces that make a statement, Ideal Expressions brings it all together under one roof.</p>
  
  <p>We don’t just sell products — we deliver confidence, sophistication, and a seamless shopping experience that redefines what it means to express yourself.</p>
  
  <p>Because here, it’s more than shopping. It’s about embracing your individuality, celebrating your style, and living your best iconic life.</p>
  
  <p class="tagline">✨ Ideal Expressions — Be Iconic, Be You.</p>
</div>

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
          <h1>Hi Everyone!</h1>
          <p>
            Welcome to <strong>Ideal Expressions</strong>, where style meets authenticity. We specialize in importing 100% genuine high-end cosmetics, fashion apparel, and lifestyle products, offering you the best of global brands under one roof. 
            With us, you’re not just shopping — you’re investing in quality, elegance, and timeless expression. 
            Discover luxury. Celebrate your uniqueness. <strong>Be Iconic, Be You!</strong>
            </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Link to="/products" className="btn btn-primary">Shop Products</Link>
            {/* <a href="https://vercel.com" target="_blank" rel="noreferrer" className="btn btn-outline">Free Hosting</a> */}
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

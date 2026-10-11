import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (page === 'products') {
    return (
      <div className="app-shell">
        <header className="site-header">
          <button className="brand-button" onClick={() => setPage('home')}>🌿 Paradise Nursery</button>
          <nav>
            <button onClick={() => setPage('about')}>About Us</button>
            <button onClick={() => setPage('cart')}>Cart ({cartCount})</button>
          </nav>
        </header>
        <ProductList onOpenCart={() => setPage('cart')} />
      </div>
    );
  }

  if (page === 'cart') {
    return (
      <div className="app-shell">
        <header className="site-header">
          <button className="brand-button" onClick={() => setPage('home')}>🌿 Paradise Nursery</button>
          <nav>
            <button onClick={() => setPage('products')}>Continue Shopping</button>
            <button onClick={() => setPage('about')}>About Us</button>
          </nav>
        </header>
        <CartItem onContinueShopping={() => setPage('products')} />
      </div>
    );
  }

  if (page === 'about') {
    return (
      <div className="app-shell">
        <header className="site-header">
          <button className="brand-button" onClick={() => setPage('home')}>🌿 Paradise Nursery</button>
          <nav><button onClick={() => setPage('products')}>Shop Plants</button></nav>
        </header>
        <AboutUs onBack={() => setPage('products')} />
      </div>
    );
  }

  return (
    <main className="landing-page">
      <div className="landing-overlay">
        <header className="landing-header">
          <div className="landing-brand">🌿 Paradise Nursery</div>
          <button className="outline-button" onClick={() => setPage('about')}>About Us</button>
        </header>
        <section className="hero-copy">
          <p className="eyebrow">BRING NATURE HOME</p>
          <h1>Find your little<br />piece of paradise.</h1>
          <p className="hero-description">
            Discover beautiful plants that bring calm, colour, and life into your space.
          </p>
          <button className="primary-button" onClick={() => setPage('products')}>
            Get Started <span aria-hidden="true">→</span>
          </button>
        </section>
        <p className="landing-footer">A greener home starts with one plant.</p>
      </div>
    </main>
  );
}

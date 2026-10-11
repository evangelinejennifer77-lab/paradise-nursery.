import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const products = [
  { id: 1, name: 'Snake Plant', category: 'Air-Purifying Plants', price: 18, description: 'A resilient plant with upright, patterned leaves.', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Peace Lily', category: 'Air-Purifying Plants', price: 22, description: 'Elegant green leaves with graceful white blooms.', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Spider Plant', category: 'Air-Purifying Plants', price: 14, description: 'An easy-care favourite with arching leaves.', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Monstera', category: 'Decorative Plants', price: 28, description: 'Bold split leaves make a statement indoors.', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80' },
  { id: 5, name: 'Rubber Plant', category: 'Decorative Plants', price: 25, description: 'Glossy foliage adds a modern natural touch.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80' },
  { id: 6, name: 'Calathea', category: 'Decorative Plants', price: 21, description: 'Striking leaf patterns for a cosy corner.', image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=700&q=80' },
  { id: 7, name: 'Aloe Vera', category: 'Succulents', price: 12, description: 'A sculptural succulent that prefers bright light.', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80' },
  { id: 8, name: 'Echeveria', category: 'Succulents', price: 10, description: 'A compact rosette succulent for desks and shelves.', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=700&q=80' },
  { id: 9, name: 'Jade Plant', category: 'Succulents', price: 16, description: 'A charming, low-maintenance succulent.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80' }
];

export default function ProductList({ onOpenCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <main className="content-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE PLANT COLLECTION</p>
          <h1>Find your new favourite</h1>
          <p className="muted">Thoughtfully selected greenery for every corner.</p>
        </div>
        <button className="primary-button compact" onClick={onOpenCart}>View Cart ({cartCount})</button>
      </div>

      {categories.map((category) => (
        <section className="product-section" key={category}>
          <h2>{category}</h2>
          <div className="product-grid">
            {products.filter((product) => product.category === category).map((product) => {
              const inCart = cartItems.some((item) => item.id === product.id);
              return (
                <article className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-card-body">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-card-bottom">
                      <strong>${product.price.toFixed(2)}</strong>
                      <button
                        className="primary-button compact"
                        onClick={() => dispatch(addItem(product))}
                        disabled={inCart}
                      >
                        {inCart ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="content-page cart-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Cart</h1>
          <p className="muted">{totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'} in your cart</p>
        </div>
        <button className="secondary-button" onClick={onContinueShopping}>← Continue Shopping</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🪴</div>
          <h2>Your cart is ready to grow</h2>
          <p className="muted">You have not added any plants yet.</p>
          <button className="primary-button" onClick={onContinueShopping}>Explore Plants</button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list" aria-label="Items in shopping cart">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-product-info">
                  <h3>{item.name}</h3>
                  <p className="muted">${item.price.toFixed(2)} each</p>
                  <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-line"><span>Items</span><span>{totalQuantity}</span></div>
            <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Free</span></div>
            <div className="summary-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
            <button className="primary-button full-width" onClick={() => window.alert('Thank you! Checkout is a demo for this coursework project.')}>Checkout</button>
            <p className="summary-note">Checkout is a demonstration and does not process payments.</p>
          </aside>
        </div>
      )}
    </main>
  );
}

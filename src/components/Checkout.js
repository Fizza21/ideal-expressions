import React, { useState, useRef } from 'react';
import { CartContext } from '../App';

export default function Checkout() {
  const { cart, total, clear } = React.useContext(CartContext);
  const [form, setForm] = useState({ name: '', phone: '', address: '', txnId: '' });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const disabledCustomer = cart.length === 0 || !form.name || !form.phone || !form.address;

  const FORMSPREE_URL = 'https://formspree.io/f/myzpadgj'; 

  const submitOrder = async (method = 'Cash on Delivery') => {
    if (disabledCustomer || loading) return;
    setLoading(true);
    try {
      const fd = new FormData(formRef.current);
      fd.append('method', method);
      fd.append('total', `PKR ${total.toLocaleString()}`);
      fd.append('items', JSON.stringify(cart));

      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (res.ok) {
        const order = {
          items: cart,
          total,
          customer: form,
          method,
          placedAt: new Date().toISOString(),
        };
        localStorage.setItem('lastOrder', JSON.stringify(order));
        clear();

        // ✅ Reset all fields after order placed
        setForm({ name: '', phone: '', address: '', txnId: '' });
        alert('✨ Order placed! We will contact you soon. (Email sent)');
      } else {
        alert('⚠️ Order send failed (email). Please try again or contact us on WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network error while sending order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const easypaisaNumber = "03351337794";
  const copyNumber = () => {
    navigator.clipboard.writeText(easypaisaNumber);
    alert("📋 Easypaisa number copied: " + easypaisaNumber);
  };

  const handleEasypaisa = async () => {
    const txnPattern = /^[0-9]{10,14}$/;
    if (!txnPattern.test(form.txnId)) {
      return alert("⚠️ Please enter a valid Easypaisa Transaction ID (10–14 digits only).");
    }
    await submitOrder(`Easypaisa Payment (Txn: ${form.txnId})`);
  };

  return (
    <div className="checkout-container">
      <h2> Checkout </h2>

      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
        
        {/* Customer Details */}
        <div className="card customer-card">
          <h3>👤 Customer Details</h3>
          <div className="customer-grid">
            <input
              className="input"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Phone (WhatsApp)"
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <textarea
            className="input"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={4}
            required
          />
        </div>

        {/* Payment */}
        <div className="card payment-card">
          <h3>💳 Choose Payment Method</h3>
          <p>
            Total Amount: <span className="price">💰 PKR {total.toLocaleString()}</span>
          </p>

          <div className="payment-grid">
            {/* Easypaisa */}
            <div className="payment-box">
              <h4>💚 Easypaisa</h4>
              <p>Send payment to: <strong>{easypaisaNumber}</strong></p>
              <button type="button" onClick={copyNumber} className="btn btn-outline">
                📋 Copy Number
              </button>
              <input
                className="input"
                placeholder="📝 Enter Txn ID / Screenshot Link"
                name="txnId"
                value={form.txnId}
                onChange={(e) => setForm({ ...form, txnId: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-success btn-block"
                disabled={disabledCustomer || loading}
                onClick={handleEasypaisa}
              >
                ✅ Confirm Easypaisa Payment
              </button>
            </div>

            {/* COD */}
            <div className="payment-box">
              <h4>❤️ Cash on Delivery</h4>
              <p>Pay cash when your order arrives 🏠</p>
              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={disabledCustomer || loading}
                onClick={() => submitOrder("Cash on Delivery")}
              >
                🚚 Confirm COD Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

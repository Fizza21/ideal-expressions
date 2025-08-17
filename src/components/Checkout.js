import React, { useState } from 'react';
import { CartContext } from '../App';

export default function Checkout(){
  const { cart, total, clear } = React.useContext(CartContext);
  const [form, setForm] = useState({name:'', phone:'', address:''});
  const disabled = cart.length===0;

  const handlePayPal = () => {
    // Demo redirect: replace business email in real use
    const amount = total.toFixed(2);
    const business = 'idealexpressions21@hotmail.com'; // TODO: replace with your PayPal business email
    const url = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(business)}&item_name=Ideal%20Expressions%20Order&amount=${amount}&currency_code=PKR`;
    window.location.href = url;
  };

  const handleCOD = () => {
    const order = {
      items: cart,
      total,
      customer: form,
      method: 'Cash on Delivery',
      placedAt: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    clear();
    alert('Order placed with Cash on Delivery! We will contact you soon.');
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Customer Details</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <input className="input" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input className="input" placeholder="Phone (WhatsApp)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        </div>
        <textarea className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} style={{marginTop:12}} rows={4}/>
      </div>

      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Payment</h3>
        <p>Total Amount: <span className="price">PKR {total.toLocaleString()}</span></p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <button className="btn btn-outline btn-block" disabled={disabled} onClick={handlePayPal}>Pay with PayPal (Sandbox)</button>
          <button className="btn btn-primary btn-block" disabled={disabled || !form.name || !form.phone || !form.address} onClick={handleCOD}>Cash on Delivery</button>
        </div>
        <p style={{fontSize:12, color:'#666', marginTop:8}}>
          Tip: Replace PayPal business email in <code>src/components/Checkout.js</code> for live payments.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

export default function Cart(){
  const { cart, inc, dec, remove, total } = React.useContext(CartContext);
  const navigate = useNavigate();
  if(cart.length===0){
    return (
      <div className="container">
        <h2>Your Cart is Empty</h2>
        <p>Browse products and add your favorites.</p>
        <Link className="btn btn-primary" to="/products">Shop Now</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="card" style={{display:'grid', gridTemplateColumns:'80px 1fr auto', gap:12, padding:12, margin:'12px 0'}}>
          <img src={`/images/${item.image}`} alt={item.name} style={{width:80, height:80, objectFit:'cover', borderRadius:8}}/>
          <div>
            <div style={{fontWeight:700}}>{item.name}</div>
            <div style={{fontSize:12, color:'#666'}}>PKR {item.price.toLocaleString()}</div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
              <button className="btn" onClick={()=>dec(item.id)}>-</button>
              <span>{item.qty}</span>
              <button className="btn" onClick={()=>inc(item.id)}>+</button>
              <button className="btn btn-outline" onClick={()=>remove(item.id)} style={{marginLeft:8}}>Remove</button>
            </div>
          </div>
          <div className="price">PKR {(item.price*item.qty).toLocaleString()}</div>
        </div>
      ))}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontWeight:800}}>Total: <span className="price">PKR {total.toLocaleString()}</span></div>
        <button className="btn btn-primary" onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { CartContext } from "../App";


export default function Checkout(){

const {
cart,
total,
clear
}=React.useContext(CartContext);


const deliveryCharges = 200;

const finalTotal = total + deliveryCharges;



const [form,setForm]=useState({
name:"",
phone:"",
address:"",
txnId:""
});


const [loading,setLoading]=useState(false);

const [success,setSuccess]=useState(false);


const formRef=useRef(null);



const disabled =
cart.length===0 ||
!form.name ||
!form.phone ||
!form.address;



const FORMSPREE_URL =
"https://formspree.io/f/myzpadgj";



const submitOrder = async(method)=>{


if(disabled || loading) return;


setLoading(true);


try{


const fd=new FormData(formRef.current);


fd.append(
"method",
method
);


fd.append(
"total",
`PKR ${finalTotal.toLocaleString()}`
);


fd.append(
"items",
JSON.stringify(cart)
);



const res=await fetch(
FORMSPREE_URL,
{
method:"POST",
headers:{
Accept:"application/json"
},
body:fd
}
);



if(res.ok){


clear();


setForm({
name:"",
phone:"",
address:"",
txnId:""
});


setSuccess(true);



}

else{

alert("Order failed");

}


}

catch{

alert("Network error");

}

finally{

setLoading(false);

}


};




const copyNumber=()=>{

navigator.clipboard.writeText(
"03351337794"
);

alert(
"Easypaisa number copied"
);

};




return(

<div className="container checkout-page">



<h1 className="checkout-heading">
Checkout
</h1>




<div className="checkout-layout-new">



<div>




<div className="checkout-box">


<h2>
Customer Details
</h2>



<form ref={formRef}>


<input
className="checkout-input"
placeholder="Full Name"
value={form.name}
onChange={
e=>setForm({
...form,
name:e.target.value
})
}
/>



<input
className="checkout-input"
placeholder="Phone Number"
value={form.phone}
onChange={
e=>setForm({
...form,
phone:e.target.value
})
}
/>



<textarea

className="checkout-input"

placeholder="Delivery Address"

value={form.address}

onChange={
e=>setForm({
...form,
address:e.target.value
})
}

/>



</form>


</div>







<div className="checkout-box">


<h2>
Payment
</h2>



<h3>
Easypaisa
</h3>



<p>
Send payment to:
<br/>

<strong>
03351337794
</strong>

</p>




<button

className="copy-payment"

onClick={copyNumber}

>

Copy Number

</button>





<input

className="checkout-input"

placeholder="Transaction ID"

value={form.txnId}

onChange={
e=>setForm({
...form,
txnId:e.target.value
})
}

/>




<button

className="checkout-submit"

disabled={disabled || loading}

onClick={()=>submitOrder("Easypaisa")}

>

{
loading ? "Processing..." : "Confirm Payment"
}

</button>






<h3>
Cash On Delivery
</h3>



<p>
Pay when your order arrives.
</p>



<button

className="checkout-submit"

disabled={disabled || loading}

onClick={()=>submitOrder("Cash On Delivery")}

>

{
loading ? "Processing..." : "Place COD Order"
}

</button>




</div>


</div>









<div className="checkout-summary">



<h2>
Order Summary
</h2>




{
cart.map(item=>(


<div

className="checkout-product"

key={item.id}

>


<img

src={`/images/${item.image}`}

alt={item.name}

/>


<div>

<p>
{item.name}
</p>

<span>
Qty: {item.qty}
</span>


</div>



<b>
PKR {(item.price*item.qty).toLocaleString()}
</b>



</div>


))

}





<hr/>




<div className="checkout-row">

<span>
Subtotal
</span>


<b>
PKR {total.toLocaleString()}
</b>


</div>





<div className="checkout-row">

<span>
Delivery Charges
</span>


<b>
PKR 200
</b>


</div>





<div className="checkout-final">

<span>
Total
</span>


<strong>
PKR {finalTotal.toLocaleString()}
</strong>


</div>




</div>



</div>


{
success && (

<div className="success-overlay">

<div className="success-modal">


<div className="success-icon">
✓
</div>


<h2>
Order Placed Successfully!
</h2>


<p>
Thank you for shopping with Ideal Expressions.
Your order has been received.
</p>



<div className="success-status">

<div className="status-icon">
📦
</div>


<div>

<small>
ORDER STATUS
</small>

<br/>

<b>
You will receive a confirmation soon.
</b>

</div>


</div>



<button
onClick={()=>setSuccess(false)}
>

Continue Shopping

</button>



</div>

</div>

)
}




</div>


);


}
import React, { useState, useRef } from "react";
import { CartContext } from "../App";


export default function Checkout(){

const {
cart,
total,
clear
}=React.useContext(CartContext);


const [form,setForm]=useState({
name:"",
phone:"",
address:"",
txnId:""
});


const [loading,setLoading]=useState(false);


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
`PKR ${total.toLocaleString()}`
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


localStorage.setItem(
"lastOrder",
JSON.stringify({
cart,
total,
form,
method
})
);


clear();


setForm({
name:"",
phone:"",
address:"",
txnId:""
});


alert(
"Order placed successfully"
);


}else{

alert(
"Order failed"
);

}



}

catch(error){

alert(
"Network error"
);

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


<h1>
Checkout
</h1>



<div className="checkout-grid">



<div className="checkout-card">


<h2>
Customer Details
</h2>



<form ref={formRef}>


<input
className="input"
placeholder="Full Name"
name="name"
value={form.name}
onChange={
e=>setForm({
...form,
name:e.target.value
})
}
/>



<input
className="input"
placeholder="Phone Number"
name="phone"
value={form.phone}
onChange={
e=>setForm({
...form,
phone:e.target.value
})
}
/>



<textarea
className="input"
placeholder="Delivery Address"
name="address"
rows="5"
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






<div className="checkout-card payment">


<h2>
Payment
</h2>



<div className="payment-option">


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
className="btn btn-outline"
onClick={copyNumber}
>
Copy Number
</button>



<input
className="input"
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
className="btn btn-primary btn-block"
disabled={disabled}
onClick={()=>
submitOrder(
"Easypaisa"
)
}
>

Confirm Payment

</button>


</div>





<div className="payment-option">


<h3>
Cash On Delivery
</h3>


<p>
Pay when your order arrives.
</p>



<button
className="btn btn-primary btn-block"
disabled={disabled}
onClick={()=>
submitOrder(
"Cash On Delivery"
)
}
>

Place COD Order

</button>


</div>



</div>



</div>




<div className="checkout-total">

Total:
<span>
PKR {total.toLocaleString()}
</span>

</div>



</div>


);

}
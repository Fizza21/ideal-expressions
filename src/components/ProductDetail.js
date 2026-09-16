import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../App";


export default function ProductDetail(){

const { id } = useParams();

const { add } = useContext(CartContext);

const [added,setAdded] = useState(false);


const product = products.find(
  p => p.id === Number(id)
);


if(!product){

  return(
    <div className="container">
      <h2>
        Product not found
      </h2>
    </div>
  );

}



const handleAdd = ()=>{

  add(product);

  setAdded(true);

  setTimeout(()=>{
    setAdded(false);
  },1500);

};



return(

  <div className="container">


    <div className="detail-page">


      <div className="detail-image">

        <img
          src={`/images/${product.image}`}
          alt={product.name}
        />

      </div>




      <div className="detail-info">


        <h1>
          {product.name}
        </h1>


        <div className="detail-price">

          PKR {product.price.toLocaleString()}

        </div>



        <p>

          {product.description}

        </p>



        <button
          className="add-button detail-button"
          onClick={handleAdd}
        >

        {added ? "Added" : "Add to Bag"}

        </button>


        <div className="trust-badges">

<div className="trust-item">
  <div className="trust-icon">
    ✓
  </div>
  <span>
    Authentic<br/>Product
  </span>
</div>


<div className="trust-divider"></div>


<div className="trust-item">
  <div className="trust-icon">
    ★
  </div>
  <span>
    Premium<br/>Quality
  </span>
</div>


<div className="trust-divider"></div>


<div className="trust-item">
  <div className="trust-icon">
    🔒
  </div>
  <span>
    Secure<br/>Shopping
  </span>
</div>

</div>



      </div>



    </div>


  </div>

);

}
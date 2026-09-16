import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function ProductCard({ product }) {

  const { add } = useContext(CartContext);

  const [added, setAdded] = useState(false);


  const handleAdd = (e) => {

    e.preventDefault();

    add(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    },1500);

  };


  return (

    <div className="product-card">


      <Link 
        to={`/product/${product.id}`}
        className="product-link"
      >


        <div className="product-image">

          <img
            src={`/images/${product.image}`}
            alt={product.name}
          />

        </div>



        <div className="product-info">


          <h3>
            {product.name}
          </h3>


          <p className="description">
            {product.description}
          </p>


          <div className="price">
            PKR {product.price.toLocaleString()}
          </div>


        </div>


      </Link>



      <button
        className="add-button"
        onClick={handleAdd}
      >

        {added ? "Added" : "Add to Bag"}

      </button>


    </div>

  );

}
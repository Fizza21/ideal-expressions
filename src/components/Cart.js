import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../App";


export default function Cart(){

  const {
    cart,
    inc,
    dec,
    remove,
    total
  } = React.useContext(CartContext);


  const navigate = useNavigate();



  if(cart.length === 0){

    return (

      <div className="container empty-cart">

        <h2>
          Your Shopping Bag is Empty
        </h2>

        <p>
          Discover our luxury beauty collection.
        </p>


        <Link
          to="/products"
          className="btn btn-primary"
        >
          Explore Products
        </Link>


      </div>

    );

  }



  return (

    <div className="container">


      <h1 className="cart-title">
        Shopping Bag
      </h1>



      <div className="cart-layout">



        <div>


        {
          cart.map(item=>(

            <div
              className="cart-item"
              key={item.id}
            >


              <img
                src={`/images/${item.image}`}
                alt={item.name}
              />



              <div className="cart-info">


                <h3>
                  {item.name}
                </h3>


                <p>
                  PKR {item.price.toLocaleString()}
                </p>



                <div className="quantity">


                  <button onClick={()=>dec(item.id)}>
                    -
                  </button>


                  <span>
                    {item.qty}
                  </span>


                  <button onClick={()=>inc(item.id)}>
                    +
                  </button>


                </div>


              </div>




              <button
                className="remove-btn"
                onClick={()=>remove(item.id)}
              >
                Remove
              </button>



            </div>


          ))
        }


        </div>





        <div className="cart-summary">


          <h2>
            Order Summary
          </h2>


          <div className="summary-total">

            PKR {total.toLocaleString()}

          </div>



          <button
            className="btn btn-primary btn-block"
            onClick={()=>navigate("/checkout")}
          >

            Proceed To Checkout

          </button>


        </div>



      </div>



    </div>

  );

}
import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function Navbar() {

  const { cart } = React.useContext(CartContext);

  const count = cart.reduce((s, x) => s + x.qty, 0);


  return (

    <nav className="nav">

      {/* TOP LOGO */}
      <div className="top-logo">

        <Link to="/">
          <img
            src="/images/logo.jpg"
            alt="Ideal Expressions"
            className="main-logo"
          />
        </Link>

      </div>



      {/* NAV LINKS */}

      <div className="nav-container">


        <div className="navlinks">


          <Link to="/">
            Home
          </Link>


          <div className="shop-menu">

            <span>
              Shop
            </span>


            <div className="dropdown">

              <Link to="/products">
                All Products
              </Link>

              <Link to="/products/lips">
                Lips
              </Link>

              <Link to="/products/face">
                Face
              </Link>

              <Link to="/products/eyes">
                Eyes
              </Link>

              <Link to="/products/body">
                Body
              </Link>

            </div>

          </div>



          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/cart">

            Cart 
            <span className="badge">
              {count}
            </span>

          </Link>


        </div>


      </div>


    </nav>

  );

}
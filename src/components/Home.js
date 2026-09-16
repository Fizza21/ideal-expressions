import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../data/products";

export default function Home() {

  const categories = [
    {
      name:"Lips",
      image:"/images/21.jpeg"
    },
    {
      name:"Face",
      image:"/images/9.png"
    },
    {
      name:"Eyes",
      image:"/images/6.png"
    },
    {
      name:"Body",
      image:"/images/8.png"
    }
  ];


  return (

    <div>


      {/* LUXURY HERO SECTION */}

<section className="luxury-hero">


  <div className="hero-text">


    <p className="hero-small">
      PREMIUM BEAUTY COLLECTION
    </p>


    <h1>
      Beauty That
      <br/>
      Defines You
    </h1>


    <p className="hero-description">

      Discover authentic luxury cosmetics
      and premium beauty essentials from
      your favourite global brands.

    </p>


    <Link
      to="/products"
      className="btn btn-primary"
    >
      Shop Collection
    </Link>


  </div>



  <div className="hero-image">

    <img
      src="/images/21.jpeg"
      alt="Luxury Beauty"
    />

  </div>


</section>



      {/* CATEGORY SECTION */}

      <section className="container">

        <h2 className="section-title">
          Shop By Category
        </h2>


        <div className="category-grid">


        {categories.map((cat)=>(

          <Link
            to="/products"
            key={cat.name}
            className="category-card"
          >

            <img
              src={cat.image}
              alt={cat.name}
            />

            <h3>
              {cat.name}
            </h3>


          </Link>

        ))}


        </div>


      </section>




      {/* BEST SELLERS */}

      <section className="container">


        <h2 className="section-title">
          Best Sellers
        </h2>


        <div className="grid">

        {
          products.slice(0,4).map((p)=>(
            
            <ProductCard
              key={p.id}
              product={p}
            />

          ))
        }


        </div>


        <div className="center">

          <Link 
          to="/products"
          className="btn btn-primary"
          >

          View All Products

          </Link>

        </div>


      </section>




      {/* BRAND SECTION */}

      <section className="brand-section">


        <h2>
          Why Choose Ideal Expressions?
        </h2>


        <p>
          Authentic luxury products, carefully selected
          to bring confidence, elegance and timeless beauty.
        </p>


        <div className="benefits">


          <div>
            Authentic Products
          </div>


          <div>
            Premium Quality
          </div>


          <div>
            Trusted Shopping
          </div>


        </div>


      </section>



    </div>

  );

}
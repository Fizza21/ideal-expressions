import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "./ProductCard";


export default function CategoryPage(){

  const { category } = useParams();


  const filteredProducts = useMemo(()=>{

    return products.filter(
      (p)=>
        p.category.toLowerCase() === category.toLowerCase()
    );

  },[category]);



  return (

    <div className="container">


      <h1 className="category-title">
        {category}
      </h1>


      <div className="grid">

        {
          filteredProducts.map((product)=>(

            <ProductCard
              key={product.id}
              product={product}
            />

          ))
        }


      </div>



      {
        filteredProducts.length===0 && (

          <p style={{textAlign:"center"}}>
            No products available.
          </p>

        )
      }



    </div>

  );

}
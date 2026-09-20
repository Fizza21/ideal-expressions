import React from "react";

export default function Contact(){

  return (

    <div className="container">

      <div className="contact-page">

        <h1>Contact Us</h1>

        <p>
          We would love to hear from you. Connect with Ideal Expressions
          for orders, queries and beauty recommendations.
        </p>


        <div className="contact-buttons">


          <a
            href="https://wa.me/923351337794"
            target="_blank"
            rel="noreferrer"
            className="contact-btn whatsapp"
          >
            WhatsApp
          </a>


          <a
            href="https://www.instagram.com/ideal.expressions"
            target="_blank"
            rel="noreferrer"
            className="contact-btn instagram"
          >
            Instagram
          </a>


        </div>



        <div className="contact-info">

          <h3>
            Contact Details
          </h3>


          <p>
            WhatsApp: +92 335 1337794
          </p>


          <p>
            Instagram: @ideal.expressions
          </p>


        </div>


      </div>

    </div>

  );

}
import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "../../images/Image 2.png";
import image2 from "../../images/Group 37.png";
import { Store } from "../../context/StoreContext";
import "./Home.css";

const indes = () => {
  const { token } = Store();
  return (
    <div className="" style={{ paddingBottom: "100px" }}>
      <div
        className="home text-center"
        style={{ width: "100%", height: "98vh", zIndex: "0" }}
      >
        <div className="main-list">
          <ul className="list mt-2 text-center">
            <li className="ml-0 logo-li text-left">
              <a href="http://tilt-entreprise.com/">
                {" "}
                <img className="home-logo img-fluid w-75" src={image} alt="" />
              </a>
            </li>
            <li className="ml-0 nest-ul">
              <ul className="inner-ul mt-5 text-center ">
                <li className="">
                  <a href="#operation"> Fonctionnement </a>
                </li>
                <li className="">
                  <a href="#features"> Fonctionnalités </a>
                </li>
                <li className="">
                  <a href="#download"> Télécharger </a>
                </li>
                {!token && (
                  <li className="">
                    <Link to="/signup"> S’inscrire </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
        <h1
          className="home-heading text-white text-center mt-1"
          style={{ fontFamily: "Arial", fontWeight: "bold" }}
        >
          {" "}
          Livraison de repas au travail, en Martinique !
        </h1>
        <div className="d-flex justify-content-center">
          <p
            className=" home-text text-white text-center mt-2   w-50"
            style={{ fontFamily: "Arial", fontSize: "24px " }}
          >
            Grâce à TILT, soyez livré directement sur votre lieu de travail, et
            à partir des restaurants que vous aimez !
          </p>
        </div>

        <div
          className="home-image d-flex justify-content-center"
          style={{ zIndex: "100" }}
        >
          <img
            className="mt-5"
            style={{ width: "30%", height: "30%" }}
            src={image2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default indes;

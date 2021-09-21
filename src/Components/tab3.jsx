import React from "react";
import "./Features/Feature.css";
import image from "../images/Group135.png";
export default function Tab1() {
  return (
    <div className="row-main" style={{ height: "70vh" }}>
      <div className="row mt-5 ">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
          <img
            className="tab-image"
            style={{ width: "50%", height: "100%", marginLeft: "20px" }}
            src={image}
            alt=""
          />
        </div>
        <div className="col-12 tab3 col-sm-12 col-md-6 col-lg-6  d-flex flex-column justify-content-center">
          <h3 className=" feature-tab-heading text-white font-weight-bold text-left">
            Soyez livrés directement au travail !
          </h3>
          <p
            className="feature-tab-para    text-white  text-left w-75"
            style={{ fontSize: "18px" }}
          >
            commander un repas devient maintenant un instant de plaisir !
            Choisissez parmi les plats proposés et soyez livrés au travail.{" "}
          </p>
          <p
            className="feature-tab-para    text-white  text-left w-75"
            style={{ fontSize: "18px" }}
          >
            Bénéficiez de réduction en choisissant des packs de livraison à la
            semaine.{" "}
          </p>

          <p
            className="feature-tab-para    text-white  text-left w-75"
            style={{ fontSize: "18px" }}
          >
            Commandez chez plusieurs restaurateurs à travers une seule et même
            commande.
          </p>
        </div>
      </div>
    </div>
  );
}

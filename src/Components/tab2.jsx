import React from "react";
import "./Features/Feature.css";
import image from "../images/Group95.png";
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
        <div className="col-12 tab2 col-sm-12 col-md-6 col-lg-6  d-flex flex-column justify-content-center">
          <h3 className=" feature-tab-heading text-white font-weight-bold text-left">
            Un moment de convivialité au bureau
          </h3>
          <p
            className="feature-tab-para    text-white  text-left w-75"
            style={{ fontSize: "18px" }}
          >
            Donnez l’opportunité à chacun de vos employés de profiter de manger
            des plats variés et équilibrés à des prix attractifs soit via :{" "}
            <br /> <br /> Un partenariat avec Tilt sous forme d’abonnement
            annuel <br /> <br />
            L’utilisation du Titre restaurant dématérialisé (carte restaurant) a
            plusieurs avantages pour les salariés, les entreprises et les
            commerçants : Possibilité de régler au centime près une somme due
            (pas de perte d'argent) Pas de livraison de carnets à attendre.
            Rechargement automatique chaque mois
          </p>
        </div>
      </div>
    </div>
  );
}

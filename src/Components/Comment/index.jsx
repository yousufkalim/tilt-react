import React from "react";
import "./Commnet.css";
import video from "../../images/TILTvideo.mp4";

const index = () => {
  return (
    <div
      className="text-center"
      style={{
        width: "100%",
        marginBottom: "-50px",
        marginTop: "-100px",
      }}
      id="operation"
    >
      <h2 className=" heaging-comment font-weight-bold mt-5">
        Comment ça marche ?
      </h2>
      <div
        className="container-fluid "
        style={{ width: "80%", marginTop: "50px" }}
      >
        <div className=" row mt-5 mt-sm-0">
          <div
            className=" col-sm-12 col-md-6 col-lg-5  d-flex flex-column justify-content-center"
            style={{ fontFamily: "Arial" }}
          >
            <h3 className=" com-text text-left font-weight-bold">
              Avec TILT, profitez sereinement d’un service de livraison de repas
              sur votre lieu de travail.
            </h3>
            <p
              className=" com-para text-left mt-4"
              style={{ fontSize: "20px" }}
            >
              Que vous soyez un propriétaire de restaurant, un employé
              d’entreprise ou un livreur, découvrez pourquoi TILT est fait pour
              vous !
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-7 ml-sm-0 mb-sm-4">
            <div
              className=" video-box "
              style={{
                background: "#fff",
                height: "50vh",
                width: "100%",
                marginLeft: "100px",
              }}
            >
              <video style={{ width: "100%" }} autoPlay muted controls>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

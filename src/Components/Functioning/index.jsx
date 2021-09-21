import React from "react";
import "./Functioning.css";
import video from "../../images/functioning.mp4";

const index = () => {
  return (
    <div className="text-center" id="operationf">
      <h2 className=" heaging-comment font-weight-bold">Fonctionnement</h2>
      <div
        className="container-fluid functioncontainer"
        style={{ width: "80%", marginTop: "70px" }}
      >
        <div className=" row  mt-sm-0 mb-5">
          <div
            className=" col-sm-12 col-md-6 col-lg-5  d-flex flex-column justify-content-center "
            style={{ fontFamily: "Arial" }}
          >
             <h3 className=" com-text text-left font-weight-bold">
             Une application simple d’utilisation, vous permettant de commander en quelques cliques.
            </h3>
            <p
              className=" com-para text-left mt-4"
              style={{ fontSize: "20px" }}
            >
            Retrouvez les principales fonctionnalités de l'application dans la vidéo suivante. 
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
              <video
                style={{ height: "49vh", width: "100%" }}
                autoPlay
                muted
                controls
              >
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

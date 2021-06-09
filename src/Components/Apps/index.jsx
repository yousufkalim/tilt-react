import React from "react";
import appStore from "../../images/Image 3.png";
import googleApp from "../../images/Image 4.png";
import "./Apps.css";
const index = () => {
  return (
    <div
      className=" app-main text-center "
      style={{ width: "100%", height: "70vh" }}
      id="download"
    >
      <h2 className=" app-heading mb-5" style={{ fontSize: "" }}>
        Téléchargez l’application dès maintenant !
      </h2>

      <div className="container">
        <div className="row mt-5">
          <div className="col-6 col-lg-6">
            <a href="https://apps.apple.com/pk/app/tilt/id1548875909">
              <img style={{ width: "80%" }} src={appStore} alt="appStore" />
            </a>
          </div>
          <div className="col-6 col-lg-6">
            <a href="https://play.google.com/store/apps/details?id=com.falconit.tiltapp">
              <img
                style={{ width: "80%" }}
                src={googleApp}
                alt="googleAppStore"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

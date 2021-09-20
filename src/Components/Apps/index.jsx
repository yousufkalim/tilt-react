import React from "react";
import appStore from "../../images/Image 3.png";
import googleApp from "../../images/Image 4.png";
import "./Apps.css";
const index = () => {
  return (
    <div
      className=" app-main text-center "
      style={{ width: "100%", height: "400px" }}
      id="download"
    >
      <h2 className=" app-heading" style={{ fontSize: "" }}>
        Téléchargez l’application dès maintenant !
      </h2>

      <div className="container">
        <div className="row mt-5">
          <div className="col-6 col-lg-6">
            <a
              target="_blank"
              href="https://apps.apple.com/us/app/tilt/id1548875909"
              className="d-flex justify-content-end"
            >
              <img style={{ width: "50%" }} src={appStore} alt="appStore" />
            </a>
          </div>
          <div className="col-6 col-lg-6">
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.falconit.tiltapp"
              className="d-flex justify-content-start"
            >
              <img
                style={{ width: "50%" }}
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

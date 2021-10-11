import React from "react";
import CGV from "../../assets/CGV.pdf";
import "./Footer.css";

const index = () => {
  return (
    <div className="tilt-footer text-center ">
      <div className="container mt-1">
        <div className="tempFooter">
          <p className="tilt-footer-heading">
            41 lotissement les Frangipaniers 97228 Saint Luce
          </p>
          <div
            style={{ margin: "0 auto" }}
            className="tilt-footer-link d-flex justify-content-between w-50  mb-3 mt-2"
          >
            <p>
              <a className="text-white" href="http://tilt-entreprise.com/">
                Accueil
              </a>
            </p>
            <p>
              <div
                className="text-white footerLink"
                target="_blank"
                onClick={() => (window.location = "/cgu")}
              >
                CGU
              </div>
            </p>
            <p>
              <div
                className="text-white footerLink"
                target="_blank"
                onClick={() => window.open(CGV)}
              >
                CGV
              </div>
            </p>
          </div>
          <p className="tilt-footer-para">
            &copy; {new Date().getFullYear()}{" "}
            <a target="blank" href="https://falconconsulting.fr/">
              <span style={{ color: "#fff", textDecoration: "underline" }}>
                Falcon Consulting
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;

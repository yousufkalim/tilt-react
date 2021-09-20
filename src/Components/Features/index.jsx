import React, { useState } from "react";
import "./Feature.css";
import Tab1 from "../tab1";
import Tab2 from "../tab2";
import Tab3 from "../tab3";

export default function Index() {
  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(true);

  const ActiveTab1 = () => {
    setTab1(true);
    setTab2(false);
    setTab3(false);
  };
  const ActiveTab2 = () => {
    setTab1(false);
    setTab2(true);
    setTab3(false);
  };
  const ActiveTab3 = () => {
    setTab1(false);
    setTab2(false);
    setTab3(true);
  };
  return (
    <div
      className=" main-feature "
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="main" style={{ position: "relative", height: "1000px" }}>
        <svg
          className="svgIcon1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 195"
        >
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,160C160,128,320,64,480,69.3C640,75,800,149,960,149.3C1120,149,1280,75,1360,37.3L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div
          className="text-center"
          style={{ height: "50vh", position: "relative" }}
          id="features"
        >
          <h2 className="feature-heading text-white h1">
            Découvrez nos fonctionnalités
          </h2>
          <div className="d-flex justify-content-center">
            <ul className=" linkList text-white">
              <li>
                <a
                  onClick={ActiveTab3}
                  className={tab3 === true ? "font-weight-bold" : null}
                >
                  Utilisateurs
                </a>
              </li>
              <li>
                <a
                  onClick={ActiveTab2}
                  className={tab2 === true ? "font-weight-bold" : null}
                >
                  Entreprises
                </a>{" "}
              </li>
              <li>
                <a
                  onClick={ActiveTab1}
                  className={tab1 === true ? "font-weight-bold" : null}
                >
                  Restaurateurs
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            {tab1 === true ? (
              <Tab1 />
            ) : tab2 === true ? (
              <Tab2 />
            ) : tab3 === true ? (
              <Tab3 />
            ) : (
              ""
            )}
          </div>
        </div>

        <svg
          className="svgIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,160C160,128,320,64,480,69.3C640,75,800,149,960,149.3C1120,149,1280,75,1360,37.3L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320"
          ></path>
        </svg>
      </div>
    </div>
  );
}

import React from "react";
import CGU from "../../assets/CGU.pdf";
import CGV from "../../assets/CGV.pdf";
import "./Footer.css";

const index = () => {
  return (
    // <div className="back text-center pt-3" style={{width:"100%",height:"25vh" ,color:"#fff",position:'relative'}}>

    //     <div className="container mt-1">
    //         <p className="footer-heading">Adresse de l’entreprise, Martinique</p>
    //         <div style={{margin:"0 auto"}} className= " footer-link d-flex justify-content-between w-50  mb-3 mt-2">
    //             <p>Accueil</p>
    //             <p>CGU </p>
    //             <p>CGV</p>
    //         </div>
    //         {/* <img className="" src={background} alt="backk"/> */}
    //         <p className="footer-para" >2020 Copyrights & Protected</p>
    //     </div>

    // </div>

    // Disabled this because it was included mistakenly in the latest commit and the new code got omtted

    // <div className="tilt-footer text-center ">
    //   <div className="container mt-1">
    //     <div className="tempFooter">
    //       <p className="tilt-footer-heading">
    //         Adresse de l’entreprise, Martinique
    //       </p>
    //       <div
    //         style={{ margin: "0 auto" }}
    //         className="tilt-footer-link d-flex justify-content-between w-50  mb-3 mt-2"
    //       >
    //         <p>
    //           <a className="text-white" href="http://tilt-entreprise.com/">
    //             Accueil
    //           </a>
    //         </p>
    //         <p>CGU </p>
    //         <p>CGV</p>
    //       </div>
    //       {/* <img className="" src={background} alt="backk"/> */}
    //       <p className="tilt-footer-para">
    //         {" "}
    //         &copy; {new Date().getFullYear()}{" "}
    //         <a target="blank" href="https://falconconsulting.fr/">
    //           <span style={{ color: "#fff", textDecoration: "underline" }}>
    //             Falcon Consulting
    //           </span>
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>

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
                onClick={() => window.open(CGU)}
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
          {/* <img className="" src={background} alt="backk"/> */}
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

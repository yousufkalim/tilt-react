import React from 'react'
import './Features/Feature.css'
import image from '../images/Group 51.png'
export default function Tab1(){
    return(
        <div className="row-main" style={{height:"70vh"}}>
        <div className="row mt-5 ">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
             <img className="tab-image" style={{width:"50%" ,marginLeft:"20px"}} src={image} alt=""/>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6  d-flex flex-column justify-content-center">
              <h3 className=" feature-tab-heading text-white font-weight-bold text-left">Atteignez une nouvelle clientèle</h3>
           <p className="feature-tab-para    text-white  text-left w-75" style={{fontSize:'22px'}}>Notre service de livraison de plats en 
entreprise vous permet de profiter 
pleinement de votre potentiel de vente
auprès de tous les clients aux alentours !</p>
   
            </div>
        </div>
    </div>
    )
}
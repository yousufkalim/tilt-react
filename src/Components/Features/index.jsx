import React from 'react'
import './Feature.css'
import image from '../../images/Group 51.png'
const index = () => {
    return (
       <div className="pb-3  main-feature  " style={{overflowX:"hidden"}}> 
           
            <div className="main" style={{ height:"175vh"}}>
                
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,224C672,224,768,224,864,192C960,160,1056,96,1152,69.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>


            <div className="text-center" style={{height:"50vh"}}>
             <h2  className="feature-heading text-white h1">Découvrez nos fonctionnalités</h2>
             <div className="d-flex justify-content-center">
             <ul className=" linkList text-white">
                 <li ><a href="#">Pour les restaurants</a></li>
                 <li><a href="#">Pour les livreurs</a> </li>
                 <li><a href="#">Pour les utilisateurs</a></li>

             </ul>
             </div>
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
            </div>
            
            
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:"218px"}} viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,96L48,117.3C96,139,192,181,288,186.7C384,192,480,160,576,122.7C672,85,768,43,864,21.3C960,0,1056,0,1152,48C1248,96,1344,192,1392,240L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            {/* <img className="image" src={back} alt=""/> */}
                
        </div>
       </div>
    )
}
   
export default index

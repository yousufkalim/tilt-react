import React from 'react'
import background from '../../images/Shape 1.jpg'
import './Footer.css'
const index = () => {
    return (
        <div className="back text-center pt-3" style={{width:"100%",height:"25vh" ,color:"#fff",}}>
            <div className="container mt-1">
                <p className="footer-heading">Adresse de l’entreprise, Martinique</p>
                <div style={{margin:"0 auto"}} className= " footer-link d-flex justify-content-between w-50  mb-3 mt-2">
                    <p>Accueil</p>
                    <p>CGU </p>
                    <p>CGV</p>
                    

                </div>
                {/* <img className="" src={background} alt="backk"/> */}
                <p className="footer-para" >2020 Copyrights & Protected</p>
            </div>
                
        </div>
    )
}

export default index

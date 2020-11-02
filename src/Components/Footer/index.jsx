import React from 'react'
import background from '../../images/Shape 1.png'
const index = () => {
    return (
        <div className="text-center pt-3" style={{background:`url${background}` ,backgroundPosition:"center" ,width:"100%",height:"40vh" ,color:"#fff",borderRadius:"50% 50% 0% 0%"}}>
            <div className="container mt-5">
                <p>Adresse de l’entreprise, Martinique</p>
                <div style={{margin:"0 auto"}} className="d-flex justify-content-between w-50  mb-3 mt-2">
                    <p>Accueil</p>
                    <p>CGU </p>
                    <p>CGV</p>

                </div>
                <p>2020 Copyrights & Protected</p>
            </div>
                
        </div>
    )
}

export default index

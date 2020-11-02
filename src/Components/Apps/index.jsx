import React from 'react'
import appStore from '../../images/Image 3.png'
import googleApp from '../../images/Image 4.png'
const index = () => {
    return (
        <div className="text-center pt-4" style={{width:"100%",height:"70vh"}}>
                <h2 className="mb-5"  style={{fontSize:""}}>Téléchargez l’application dès maintenant !</h2>

               ,<div className="container">
               <div className="row mt-5"  >
                    <div className="col-6">
                      <img style={{width:"80%"}}  src={appStore} alt="appStore"/>
                    </div>
                    <div className="col-6">
                    <img style={{width:"80%"}} src={googleApp} alt="googleAppStore"/>


                    </div>
                </div>
               </div>
        </div>
    )
}

export default index

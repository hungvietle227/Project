import React from 'react'

function Banner() {
  return (
    <div>
     <section className="banner" style={{backgroundimage:'url(https://via.placeholder.com/1920x470)'}}>
   <div className="container">
      <div className="row align-items-center">
         <div className="col-lg-7">
            <div className="title-area-data">
               <h2>Shop Cart</h2>
               <p>A magical combination that sent aromas to the taste buds</p>
            </div>
            <ol className="breadcrumb">
               <li className="breadcrumb-item">
                 <a href="index.html"><i className="fa-solid fa-house"></i> Home</a>
               </li>
               <li className="breadcrumb-item active" aria-current="page">Shop</li>
               <li className="breadcrumb-item active" aria-current="page">Shop Cart</li>
            </ol>
         </div>
         <div className="col-lg-5">
            <div className="row">
               <div className="col-6">
                  <div className="title-area-img">
                     <img alt="title-area-img" src="../../src/assets/img/anhticket1-2.jpeg"/>
                     <img alt="pata" className="pata" src="../../src/assets/img/pata.png"/>
                  </div>
               </div>
               <div className="col-6">
                  <div className="title-area-img two">
                     <img alt="title-area-img" src="../../src/assets/img/anhticket2-2.jpeg"/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
    </div>
  )
}

export default Banner
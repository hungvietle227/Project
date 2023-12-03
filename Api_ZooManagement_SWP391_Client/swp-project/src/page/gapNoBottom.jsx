import React from 'react'

function GapNoBottom() {
  return (
    <div>
        <section className="gap no-bottom app-foods" style={{backgroundColor :'#f5f8fd'}}>
   <div className="container">
      <div className="row">
         <div className="col-xl-6">
            <div className="heading">
               <span>Best App For Foods Ordering</span>
               <h3>Manage Your Restaurant Anytime! Anywhere!</h3>
            </div>
            <ul className="higher-reach">
               <li><div className="bol"></div>Higher Reach - Minimal Effort</li>
               <li><div className="bol"></div>Showcase your Brand</li>
               <li><div className="bol"></div>Exclusive offers & discounts</li>
            </ul>
            <div className="d-sm-flex mt-5">
                <a href="#">
                   <div className="download-from">
                     <i className="fa-brands fa-google-play"></i>
                      <div>
                         <span>Download From</span>
                        <h5>Google Play</h5>
                      </div>
                   </div>
                </a>
                <a href="#">
                   <div className="download-from apple">
                     <i className="fa-brands fa-apple"></i>
                      <div>
                         <span>Download From</span>
                         <h5>App Store</h5>
                      </div>
                   </div>
                </a>
            </div>
         </div>
         <div className="col-xl-6">
            <div className="manage-your-img">
               <img alt="manage-your" src="https://via.placeholder.com/649x559"/>
            </div>
         </div>
      </div>
   </div>
</section>
    </div>
  )
}

export default GapNoBottom
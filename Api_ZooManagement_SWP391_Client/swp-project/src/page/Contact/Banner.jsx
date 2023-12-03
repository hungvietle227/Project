import React from "react";

function Banner() {
  return (
    <div>
      {" "}
      <section
        className="banner"
        style={{
          backgroundImage: "",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="title-area-data">
                <h2>Contact Us</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa-solid fa-house"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact Us
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;

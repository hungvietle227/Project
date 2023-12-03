import React from "react";
import { Link } from "react-router-dom/dist";

function Banner() {
  return (
    <div>
      <section
        className="banner"
        style={{ backgroundImage: "url(/anhthuvat1.jpg)", height: "470px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="title-area-data">
                <h2 style={{ color: "white" }}>New</h2>
                <p style={{ color: "white" }}>
                  Celebrating daily updates on Our News Page.
                </p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="fa-solid fa-house"></i> Home
                  </Link>
                </li>
              </ol>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;

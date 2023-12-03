import React from "react";
import { Link } from "react-router-dom";
const socialMediaLinks = [
  { id: 1, text: "Gmail", url: "mapmapzoofpt@gmail.com" },
];
function Footer() {
  return (
    <div>
      <footer style={{ backgroundColor: "#f5f8fd" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6">
              <div className="logo-white">
                <a href="index.html">
                  <img
                    alt="logo"
                    src="../../src/assets/img/logo.png"
                    height="200px"
                    width="200px"
                  />
                </a>
                <p>
                  <span>Monday - Friday: 8:00am - 6:00pm</span>
                  <br />
                  <span> Closed on Saturday and Sunday</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-3 col-md-6">
              <div className="link-about">
                <h3>About</h3>
                <ul>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                    <a href="about.html">Ticket</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                    <a href="#">Special Species</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                    <a href="#">Expert</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                    <a href="#">News</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-xl-2 col-lg-3 col-md-6">
            <div className="link-about">
               <h3>menu</h3>
               <ul>
                  <li><i className="fa-solid fa-angle-right"></i><a href="menu-1.html">Steaks</a></li>
                  <li><i className="fa-solid fa-angle-right"></i><a href="menu-1.html">Burgers</a></li>
                  <li><i className="fa-solid fa-angle-right"></i><a href="menu-1.html">Coctails</a></li>
                  <li><i className="fa-solid fa-angle-right"></i><a href="menu-1.html">Bar B Q</a></li>
                  <li><i className="fa-solid fa-angle-right"></i><a href="menu-1.html">Desserts</a></li>
               </ul>
            </div>
         </div> */}
            <div className="col-xl-4 col-lg-6">
              <div className="link-about">
                <h3>Support us</h3>
                <p>Questione with us</p>
                <form className="footer-form">
                  <button className="button">
                    <Link style={{ color: "white" }} to="/contact">
                      Contact
                    </Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bootem">
            <h6>
              <span>© 2023 MapMap Zoo</span> | Animal World.
            </h6>
            <div className="header-social-media">
              {socialMediaLinks.map((i) => (
                <p key={i.id}>
                  {i.text}:
                  <span>
                    <a
                      style={{ textDecoration: "none" }}
                      href="mailto:mapmapzoofpt@gmail.com"
                    >
                      {i.url}
                    </a>
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useShopping from "../hooks/useShopping";
import { Link as ScrollLink } from "react-scroll";

const renderSubMenuItems = (subMenuItems) => {
  if (!subMenuItems) {
    return null;
  }
  return subMenuItems.map((item, index) => (
    <ScrollLink
      key={item.id}
      to={item.id}
      spy={true}
      smooth={true}
      offset={-200} // Điều chỉnh khoảng cách scroll nếu có header cố định
      duration={500} // Thời gian cuộn (milliseconds)
    >
      <p>{item.text}</p>
    </ScrollLink>
  ));
};

const renderMenuItems = (menuItems) => {
  return menuItems.map((menuItem, index) => (
    <li key={index} className="navbar-dropdown">
      <Link to={menuItem.link}>{menuItem.text}</Link>
      <div className="dropdown">
        {renderSubMenuItems(menuItem.subMenuItems)}
      </div>
    </li>
  ));
};

function Header(props) {
  const { shoppingCart, countTotal } = useShopping();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [fix, setFix] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <header className={fix ? "one sticky-header" : "one"}>
        {/* <div className="top-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6">
                <div className="d-flex align-items-center">
                  <div className="content-header me-5">
                    <i>
                      <svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_16-Smartphone" data-name="16-Smartphone"><path d="m23 2h-14a3 3 0 0 0 -3 3v22a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3zm-5.39 2-.33 1h-2.56l-.33-1zm6.39 23a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1-1v-22a1 1 0 0 1 1-1h3.28l.54 1.63a2 2 0 0 0 1.9 1.37h2.56a2 2 0 0 0 1.9-1.37l.54-1.63h3.28a1 1 0 0 1 1 1z" /><path d="m17 24h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2z" /></g></svg>
                    </i><h4>Phone:<a style ={ {textDecoration:"none"} } href="callto:+1(850)344066">+1 (850) 344 0 66</a></h4>
                  </div>
                  <div className="content-header">
                    <i>
                      <svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_01-Email" data-name="01-Email"><path d="m29.61 12.21-13-10a1 1 0 0 0 -1.22 0l-13 10a1 1 0 0 0 -.39.79v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-14a1 1 0 0 0 -.39-.79zm-13.61-7.95 11.36 8.74-11.36 8.74-11.36-8.74zm11 23.74h-22a1 1 0 0 1 -1-1v-12l11.39 8.76a1 1 0 0 0 1.22 0l11.39-8.76v12a1 1 0 0 1 -1 1z" /></g></svg>
                    </i><h4>Email:<a style ={ {textDecoration:"none"} } href="mailto:+1(850)344066">info@domain.com</a></h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="d-flex align-items-center login">
                  <div className="header-social-media">
                    {renderSocialMediaLinks()}
                  </div>
                  <div className="register">
                    <i>
                      <svg clipRule="evenodd" fillRule="evenodd" height="512" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Approved-User"><path d="m10.105 22.3c.21-.482.511-.926.89-1.305.797-.797 1.878-1.245 3.005-1.245h4c1.127 0 2.208.448 3.005 1.245.379.379.68.823.89 1.305.166.379.608.553.988.387.379-.165.553-.608.387-.987-.285-.653-.691-1.253-1.204-1.766-1.078-1.078-2.541-1.684-4.066-1.684-1.3 0-2.7 0-4 0-1.525 0-2.988.606-4.066 1.684-.513.513-.919 1.113-1.204 1.766-.166.379.008.822.387.987.38.166.822-.008.988-.387z" /><path d="m16 8.25c-3.174 0-5.75 2.576-5.75 5.75s2.576 5.75 5.75 5.75 5.75-2.576 5.75-5.75-2.576-5.75-5.75-5.75zm0 1.5c2.346 0 4.25 1.904 4.25 4.25s-1.904 4.25-4.25 4.25-4.25-1.904-4.25-4.25 1.904-4.25 4.25-4.25z" /><path d="m26.609 12.25c.415 1.173.641 2.435.641 3.75 0 6.209-5.041 11.25-11.25 11.25s-11.25-5.041-11.25-11.25 5.041-11.25 11.25-11.25c1.315 0 2.577.226 3.75.641.39.138.819-.067.957-.457s-.067-.819-.457-.957c-1.329-.471-2.76-.727-4.25-.727-7.037 0-12.75 5.713-12.75 12.75s5.713 12.75 12.75 12.75 12.75-5.713 12.75-12.75c0-1.49-.256-2.921-.727-4.25-.138-.39-.567-.595-.957-.457s-.595.567-.457.957z" /><path d="m21.47 8.53 2 2c.293.293.767.293 1.06 0l4-4c.293-.292.293-.768 0-1.06-.292-.293-.768-.293-1.06 0l-3.47 3.469s-1.47-1.469-1.47-1.469c-.292-.293-.768-.293-1.06 0-.293.292-.293.768 0 1.06z" /></g></svg>
                    </i><a  style ={ {textDecoration:"none"} }href="/login">Login / Register</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="bottom-bar " style={{ backgroundColor: "#f2f4f6" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logo">
                    <Link to="/">
                      <img
                        alt="logo"
                        src="../../src/assets/img/logo.png"
                        width="160px"
                        height="160px"
                      />
                    </Link>
                  </div>
                  <div className="d-flex cart-checkout">
                    <a href="cart-checkout.html">
                      <i>
                        <svg
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m452 120h-60.946c-7.945-67.478-65.477-120-135.054-120s-127.109 52.522-135.054 120h-60.946c-11.046 0-20 8.954-20 20v352c0 11.046 8.954 20 20 20h392c11.046 0 20-8.954 20-20v-352c0-11.046-8.954-20-20-20zm-196-80c47.484 0 87.019 34.655 94.659 80h-189.318c7.64-45.345 47.175-80 94.659-80zm176 432h-352v-312h40v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h192v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h40z"></path>
                          </g>
                        </svg>
                      </i>
                    </a>
                    <div className="bar-menu">
                      <i className="fa-solid fa-bars"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <nav className="navbar">
                  <ul className="navbar-links" style={{ cursor: "pointer" }}>
                    {renderMenuItems(props.menuItems)}
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3">
                <div className="hamburger-icon">
                  <div
                    className="donation"
                    style={{ content: `${countTotal}` }}
                  >
                    <span
                      onMouseEnter={() => setIsPopupVisible(true)}
                      onMouseLeave={() => setIsPopupVisible(false)}
                    >
                      <Link to="/cart" className="pr-cart">
                        <svg
                          id="Shoping-bags"
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m452 120h-60.946c-7.945-67.478-65.477-120-135.054-120s-127.109 52.522-135.054 120h-60.946c-11.046 0-20 8.954-20 20v352c0 11.046 8.954 20 20 20h392c11.046 0 20-8.954 20-20v-352c0-11.046-8.954-20-20-20zm-196-80c47.484 0 87.019 34.655 94.659 80h-189.318c7.64-45.345 47.175-80 94.659-80zm176 432h-352v-312h40v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h192v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-60h40z"></path>
                          </g>
                        </svg>
                      </Link>
                    </span>

                    {isPopupVisible && (
                      <div className="cart-popup show-cart">
                        <ul>
                          {shoppingCart.length > 0 && shoppingCart !== null ? (
                            shoppingCart.map((product) => (
                              <li
                                key={product.id}
                                className="d-flex align-items-center position-relative"
                              >
                                <div className="p-img light-bg">
                                  <img
                                    src="../../public/Adult_Ticket.png"
                                    alt="Product Image"
                                  />
                                </div>
                                <div className="p-data">
                                  <h3 className="font-semi-bold">
                                    {product.name}
                                  </h3>
                                  <p className="theme-clr font-semi-bold">
                                    {product.quantity} x {product.price}
                                  </p>
                                </div>
                                <a href="" id={`cross${product.id}`}></a>
                              </li>
                            ))
                          ) : (
                            <li
                              style={{
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "25px",
                                marginTop: "15px",
                              }}
                            >
                              nothing here
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="register">
                    <a
                      style={{ textDecoration: "none" }}
                      href="/login"
                      className="button"
                    >
                      <i>
                        <svg
                          clipRule="evenodd"
                          fill="white"
                          fillRule="evenodd"
                          height="512"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 32 32"
                          width="512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Approved-User">
                            <path d="m10.105 22.3c.21-.482.511-.926.89-1.305.797-.797 1.878-1.245 3.005-1.245h4c1.127 0 2.208.448 3.005 1.245.379.379.68.823.89 1.305.166.379.608.553.988.387.379-.165.553-.608.387-.987-.285-.653-.691-1.253-1.204-1.766-1.078-1.078-2.541-1.684-4.066-1.684-1.3 0-2.7 0-4 0-1.525 0-2.988.606-4.066 1.684-.513.513-.919 1.113-1.204 1.766-.166.379.008.822.387.987.38.166.822-.008.988-.387z" />
                            <path d="m16 8.25c-3.174 0-5.75 2.576-5.75 5.75s2.576 5.75 5.75 5.75 5.75-2.576 5.75-5.75-2.576-5.75-5.75-5.75zm0 1.5c2.346 0 4.25 1.904 4.25 4.25s-1.904 4.25-4.25 4.25-4.25-1.904-4.25-4.25 1.904-4.25 4.25-4.25z" />
                            <path d="m26.609 12.25c.415 1.173.641 2.435.641 3.75 0 6.209-5.041 11.25-11.25 11.25s-11.25-5.041-11.25-11.25 5.041-11.25 11.25-11.25c1.315 0 2.577.226 3.75.641.39.138.819-.067.957-.457s-.067-.819-.457-.957c-1.329-.471-2.76-.727-4.25-.727-7.037 0-12.75 5.713-12.75 12.75s5.713 12.75 12.75 12.75 12.75-5.713 12.75-12.75c0-1.49-.256-2.921-.727-4.25-.138-.39-.567-.595-.957-.457s-.595.567-.457.957z" />
                            <path d="m21.47 8.53 2 2c.293.293.767.293 1.06 0l4-4c.293-.292.293-.768 0-1.06-.292-.293-.768-.293-1.06 0l-3.47 3.469s-1.47-1.469-1.47-1.469c-.292-.293-.768-.293-1.06 0-.293.292-.293.768 0 1.06z" />
                          </g>
                        </svg>
                      </i>
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*

  //reponsive

  */}
        {/* <div className="mobile-nav hmburger-menu" id="mobile-nav" style={{display:'block'}}>
      <div className="res-log">
        <a href="index.html">
          <img src="" alt="Responsive Logo" className="white-logo"/>
        </a>
      </div>
        <ul>

          <li className="menu-item-has-children"><a href="">Home</a>
            <ul className="sub-menu">

              <li><a href="index.html">home page 1</a></li>
              <li><a href="index-2.html">home page 2</a></li>
              <li><a href="index-3.html">home page 3</a></li>
            </ul>
          </li>
          <li className="menu-item-has-children"><a href="">menus</a>
            <ul className="sub-menu">
              <li><a href="menu-1.html">menu 1</a></li>
              <li><a href="menu-2.html">menu 2</a></li>
              <li><a href="menu-3.html">menu 3</a></li>
            </ul>
          </li>

          
          <li className="menu-item-has-children"><a href="">shop</a>

          <ul className="sub-menu">
            <li><a href="shop.html">our product</a></li>
            <li><a href="product-details.html">product details</a></li>
            <li><a href="shop-cart.html">shop cart</a></li>
            <li><a href="cart-checkout.html">cart checkout</a></li>
          </ul>

          </li>
          <li className="menu-item-has-children"><a href="">News</a>

          <ul className="sub-menu">

           <li><a href="our-blog.html">our blog</a></li>
                    <li><a href="blog-details.html">blog details</a></li>
          </ul>

          </li>
          <li className="menu-item-has-children"><a href="">Pages</a>

          <ul className="sub-menu">

            <li><a href="about.html">about</a></li>
            <li><a href="our-services.html">our services</a></li>
            <li><a href="chef-details.html">chef details</a></li>
            <li><a href="login.html">login</a></li>
          </ul>

          </li>

          <li><a href="contact.html">contacts</a></li>

          </ul>

          <a href="" id="res-cross"></a>
  </div> */}
      </header>
    </div>
  );
}

export default Header;

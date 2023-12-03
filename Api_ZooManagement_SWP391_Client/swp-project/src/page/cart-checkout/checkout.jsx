import React, { useState } from "react";
import Footer from "../footer";
import Header from "../header";
import { redirect, useNavigate } from "react-router-dom";
const menuItems = [
  {
    text: "Home",
    link: "/",
    // subMenuItems: [
    //   { text: 'Home 1', link: 'index.html' },
    //   { text: 'Home 2', link: 'index-2.html' },
    //   { text: 'Home 3', link: 'index-3.html' },
    // ],
  },
  {
    text: "News",
    link: "/new",
    // subMenuItems: [
    //   { text: 'Our Blog', link: 'our-blog.html' },
    //   { text: 'Blog Details', link: 'blog-details.html' },
    // ],
  },
  {
    text: "Pages",
    subMenuItems: [
      // { text: 'Ticket',id:"1"  },
      // { text: 'Info Animails', id:"2" },
      // { text: 'Zoo Trainer',id:"3"},
    ],
  },
  { text: "Feedback", link: "/contact" },
];

function Checkout() {
  const navigate = useNavigate();
  const cartDataJSON = localStorage.getItem("shoppingCart");
  const shoppingCart = JSON.parse(cartDataJSON);
  const totalPrice = shoppingCart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;

    return total + productTotal;
  }, 0);
  // tách object
  const newObject = shoppingCart.map((product) => {
    const newDay = shoppingCart[0].day;
    return {
      type: product.name,
      Amount: product.quantity,
      startDate: newDay,
    };
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    totalPrice: totalPrice,
    tickets: newObject,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    localStorage.setItem("orderItem", JSON.stringify(formData));
    // Here, you can make an HTTP request to send the formData to your API
    try {
      const response = await fetch("https://localhost:44352/api/Payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        const responseData = await response.json();
        window.location.replace(responseData.url);
        console.log("API Response Data:", responseData);
      } else {
        // Handle errors, e.g., display an error message
      }
    } catch (error) {
      // Handle network errors
      console.log("error");
    }
  };
  const updateDay = () => {};
  return (
    <div>
      <Header menuItems={menuItems} />
      <section
        className="banner"
        style={{ backgroundImage: "url(https://via.placeholder.com/1920x470)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="title-area-data">
                <h2>Cart Checkout</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa-solid fa-house"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shop Cart
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Cart Checkout
                </li>
              </ol>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-6">
                  <div className="title-area-img">
                    <img
                      alt="title-area-img"
                      src="https://via.placeholder.com/230x376"
                    />
                    <img
                      alt="pata"
                      className="pata"
                      src="../../src/assets/img/pata.png"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="title-area-img two">
                    <img
                      alt="title-area-img"
                      src="https://via.placeholder.com/230x376"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gap">
        <div className="container">
          <form className="checkout-meta donate-page" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <h3 className="pb-3">Billing details</h3>
                <div className="col-lg-12">
                  <input
                    type="text"
                    required
                    className="input-text "
                    name="fullName"
                    placeholder="Complete Name"
                    onChange={handleChange}
                  />
                  <input
                    required
                    type="email"
                    className="input-text "
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />

                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        required
                        type="tel"
                        className="input-text "
                        name="phoneNumber"
                        placeholder="Phone"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* <div className="ship-address">
                                        <div className="d-flex">
                                            <input type="radio" id="Create" name="Create" value="Create" />
                                            <label htmlFor="Create">
                                                Create an account for later use
                                            </label>
                                        </div>
                                        <div className="d-flex">
                                            <input type="radio" id="ShipAddress" name="Create" value="ShipAddress" />
                                            <label htmlFor="ShipAddress">
                                                Ship to same Address
                                            </label>
                                        </div>
                                    </div> */}
                </div>
                <div className="woocommerce-additional-fields">
                  <textarea
                    name="order_comments"
                    className="input-text "
                    placeholder="Order Note"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="cart_totals-checkout"
                  style={{
                    backgroundImage: "url(../../src/assets/img/patron.jpg)",
                  }}
                >
                  <div className="cart_totals cart-Total">
                    <h4>Cart Total</h4>
                    <table className="shop_table_responsive">
                      <tbody>
                        <tr className="cart-subtotal">
                          <th>Subtotal:</th>
                          <td>
                            <span className="woocommerce-Price-amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol"></span>
                                {totalPrice}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                        <tr className="Total">
                          <th>Total:</th>
                          <td>
                            <span className="woocommerce-Price-amount">
                              <bdi>{totalPrice}</bdi>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="checkout-side">
                    <h3>Payment Method</h3>
                    <ul>
                      <li>
                        <input
                          checked
                          type="radio"
                          id="Bank_Payment"
                          name="Bank_Payment"
                          value="Bank_Payment"
                        />
                        <label htmlFor="Bank_Payment">Vnpay</label>
                      </li>
                    </ul>
                    <button type="submit" className="button">
                      <span>Place Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Checkout;

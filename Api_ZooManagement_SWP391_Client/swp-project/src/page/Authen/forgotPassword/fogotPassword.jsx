import React, { useState } from "react";
import Footer from "../../footer";
import Header from "../../header";
import Banner from "../loginPage/banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Forget() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Confirm password doesn't match with password");
      return;
    }

    try {
      const response = await axios.post(
        `https://localhost:44352/api/Login/reset-password?Token=${token}&Password=${password}&PasswordConfirmation=${confirmPassword}`
      );
      console.log("Reset password success:", response.data);
      navigator("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
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
        { text: "Ticket", id: "1" },
        { text: "Info Animails", id: "2" },
        { text: "Zoo Trainer", id: "3" },
      ],
    },
    { text: "Contact", link: "/contact" },
  ];
  return (
    <div>
      <Header menuItems={menuItems} />
      <Banner name="FORGET PASSWORD" />
      <div>
        <section className="gap">
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-center">
                <div className="box login">
                  <h3>RESET PASSWORD</h3>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="token"
                      placeholder="Your token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div style={{ color: "red" }}>{errorMessage}</div>
                    <button type="submit" className="button">
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Forget;

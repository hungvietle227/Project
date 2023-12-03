import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useShopping from "../../../hooks/useShopping";
import jwt_decode from "jwt-decode";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loadingApi, setLoadingApi] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decoded = jwt_decode(token);
  //     setUserObject(decoded);
  //   }
  // }, []);
  //   console.log(userObject);
  // // useEffect(()=>{
  //   let token =localStorage.getItem("token");
  //   if (token) {

  //   }
  // })
  const { shoppingCart } = useShopping();
  {
    console.log("discover", shoppingCart);
  }
  function setItemToLocalStorage(key, value) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, value);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoadingApi(true);
      const res = await axios.post("https://localhost:44352/api/Login/login", {
        email,
        password,
      });
      console.log(res);
      if (res && res.status === 200) {
        const token = res.data;
        console.log(res);
        const decoded = jwt_decode(token);
        console.log(decoded);
        setUserObject(decoded);
        localStorage.setItem("token", token);
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        const name =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        if (role === "STAFF") {
          setTimeout(() => {
            navigate("/staff/profile");
          }, 1000);
        } else if (role === "ZOOTRAINER") {
          setTimeout(() => {
            navigate("/ZooTrainer/profile");
          }, 1000);
        } else if (role === "ADMIN") {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
        console.log(role);
        // Xử lý dữ liệu người dùng ở đây (userResponse.data).
        // console.log('Thông tin người dùng:', userResponse.data);
        // await setItemToLocalStorage("dataUser", JSON.stringify(userResponse.data));
      } else if (res && res.status === 400) {
        setError(res.data.error);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoadingApi(false);
    }
  };
  const handleForgotPassword = async () => {
    console.log(email);

    if (email) {
      try {
        setLoadingApi(true);
        const response = await axios.post(
          `https://localhost:44352/api/Login/forgot-password?email=${email}`
        );

        if (response.status === 200) {
          localStorage.setItem("tokenEmail", response.data.token);
          setTimeout(() => {
            navigate("/reset");
          }, 2000);
        } else {
          toast.error("Failed to send password reset email.");
        }
      } catch (error) {
        toast.error("Failed to send password reset email.");
      } finally {
        setLoadingApi(false);
      }
    }
  };
  return (
    <div>
      <section className="gap">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center">
              <div className="box login">
                <h3>Log In Your Account</h3>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Username or email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="remember">
                    <div className="first">
                      <input type="checkbox" name="checkbox" id="checkbox" />
                      <label htmlFor="checkbox">Remember me</label>
                    </div>
                    <div style={{ cursor: "pointer" }} className="second">
                      <a onClick={handleForgotPassword}>Forget a Password?</a>
                    </div>
                  </div>
                  <button type="submit" className="button">
                    {loadingApi && <i className="fas fa-sync fa-spin"></i>}
                    &nbsp; Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;

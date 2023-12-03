import React, { useState, useEffect } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Alert, Space } from "antd";
function Loading() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const apiUrl1 = "https://localhost:44352/api/Order";
  let status = "fail";

  // Lấy tham số truy vấn (query parameters) từ URL
  const queryParams = window.location.search;

  // Loại bỏ ký tự "?" ở đầu chuỗi nếu có
  const cleanQuery = queryParams.replace("?", "");

  // Tạo một đối tượng chứa thông tin từ tham số truy vấn
  const urlParams = new URLSearchParams(cleanQuery);

  // Trích xuất các giá trị từ tham số truy vấn
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
  const vnp_CardType = urlParams.get("vnp_CardType");
  const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
  const vnp_TmnCode = urlParams.get("vnp_TmnCode");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  const vnp_SecureHash = urlParams.get("vnp_SecureHash");

  // In ra các giá trị
  console.log("vnp_Amount: " + vnp_Amount);
  console.log("vnp_BankCode: " + vnp_BankCode);
  console.log("vnp_BankTranNo: " + vnp_BankTranNo);
  console.log("vnp_CardType: " + vnp_CardType);
  console.log("vnp_OrderInfo: " + vnp_OrderInfo);
  console.log("vnp_PayDate: " + vnp_PayDate);
  console.log("vnp_ResponseCode: " + vnp_ResponseCode);
  console.log("vnp_TmnCode: " + vnp_TmnCode);
  console.log("vnp_TransactionNo: " + vnp_TransactionNo);
  console.log("vnp_TransactionStatus: " + vnp_TransactionStatus);
  console.log("vnp_TxnRef: " + vnp_TxnRef);
  console.log("vnp_SecureHash: " + vnp_SecureHash);

  if (vnp_ResponseCode == "00") {
    const orderDetail = JSON.parse(localStorage.getItem("orderItem"));
    localStorage.removeItem("shoppingCart");
    console.log(orderDetail);
    status = "success";

    const data = {
      Success: status,
      PaymentMethod: "VNPay",
      TransactionInfo: vnp_OrderInfo,
      TransactionId: vnp_TransactionNo,
      Token: vnp_SecureHash,
      VnPayResponseCode: vnp_ResponseCode,
      OrderCreate: orderDetail,
    };

    const postData = async () => {
      try {
        const postMethod = await axios.post(apiUrl1, data);
        console.log(postMethod.data);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  }

  // useEffect(() => {
  //   const countdownTimer = setTimeout(() => {
  //     navigate("/");
  //   }, 1000);

  //   return () => {
  //     clearTimeout(countdownTimer);
  //   };
  // }, [navigate]);
  // useEffect(() => {
  //   const countdownTimer = setTimeout(() => {
  //     navigate("/");
  //   }, countdown * 1000);

  //   const countdownInterval = setInterval(() => {
  //     setCountdown((prevCountdown) => prevCountdown - 1);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(countdownTimer);
  //     clearInterval(countdownInterval);
  //   };
  // }, [navigate, countdown]);
  return (
    <div className="container-loading" style={{ textAlign: "center" }}>
      <div className="status-payment">
        <Space
          direction="vertical"
          style={{ width: "100%", fontSize: "100px" }}
        >
          {status == "success" ? (
            <Alert
              message="Payment success"
              style={{ fontSize: "30px" }}
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message="Payment fail"
              style={{ fontSize: "30px" }}
              type="error"
              showIcon
            />
          )}
        </Space>
      </div>

      <div className="buttonLoading">
        <div className="buttonItem">
          <Link to="/">
            <Button variant="contained">Back Home</Button>{" "}
          </Link>
        </div>

        <div className="buttonItem">
          {" "}
          <Link to="/cart">
            {" "}
            <Button variant="contained">Go to cart</Button>{" "}
          </Link>
        </div>
      </div>

      <div className="spinner">
        <div className="blob blob-0"></div>
      </div>
    </div>
  );
}

export default Loading;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import useShopping from "../hooks/useShopping";
import shoppingCart from "../redux/slices/shoppingCart";
import childTicket from "../assets/img/Child_Ticket.png";
import adultTicket from "../assets/img/Adult_Ticket.png";

function SectionGapType() {
  // Thêm các đối tượng khác nếu cần

  const [dataList, setDataList] = useState([]);
  const { handleAddItem } = useShopping();
  const { shoppingCart } = useShopping();
  const onSubmit = (item) => {
    handleAddItem(item);
  };
  const itemExistsInCart = (item) => {
    return shoppingCart.some((cartItem) => cartItem.id === item.ticketId);
  };

  useEffect(() => {
    // Gọi API và lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:44352/api/Ticket"); // Thay 'URL_CUA_API' bằng URL thực tế của API
        const data = response.data; // Lấy danh sách dữ liệu từ phản hồi API
        setDataList(data); // Lưu danh sách dữ liệu vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataList]);
  return (
    <div>
      <section className="gap" id="1">
        <div className="heading-two">
          <h2>Ticket</h2>
          <div className="line"></div>
        </div>
        <div className="container">
          <div className="row">
            {dataList.map((item, index) => (
              <div key={index} className="col-sm-4 mb-4">
                {index == 0 ? (
                  <div
                    className="bbq"
                    style={{ backgroundImage: `url(${adultTicket})` }}
                  >
                    <h2>{item.type}</h2>
                    <p>{item.price}</p>
                    <Button
                      onClick={() => onSubmit(item)}
                      className="bbr-price"
                    >
                      {itemExistsInCart(item) ? (
                        <span
                          style={{
                            textAlign: "center",
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                          size="large"
                        >
                          Exists in cart
                        </span>
                      ) : (
                        <span
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "23px",
                          }}
                          size="large"
                        >
                          Buy
                        </span>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div
                    className="bbq"
                    style={{ backgroundImage: `url(${childTicket})` }}
                  >
                    <h2>{item.type}</h2>
                    <p>{item.price}</p>
                    <Button
                      onClick={() => onSubmit(item)}
                      className="bbr-price"
                    >
                      {itemExistsInCart(item) ? (
                        <span
                          style={{
                            textAlign: "center",
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                          size="large"
                        >
                          Exists in cart
                        </span>
                      ) : (
                        <span
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "23px",
                          }}
                          size="large"
                        >
                          Buy
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionGapType;

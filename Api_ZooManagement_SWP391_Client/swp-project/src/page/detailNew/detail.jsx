import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function Detail() {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [listPages, setListPages] = useState([]);
  console.log(id);
  useEffect(() => {
    const getPages = async (page) => {
      let res = await axios.get(
        `https://localhost:44352/api/News/pages/${page}`
      );
      if (res && res.data) {
        console.log(res.data);
        setListPages(res.data.news.filter((n) => n.checked === true));
      }
    };

    getPages(0);
  }, []);
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
  const editDay = (dayNews) => {
    if (dayNews) {
      const releaseDate = new Date(dayNews);
      const day = releaseDate.getDate();
      const month = releaseDate.getMonth() + 1; // Cộng thêm 1 vào tháng
      const year = releaseDate.getFullYear();
      const formattedDate = day + "/" + month + "/" + year;
      return formattedDate;
    }
  };
  const editImg = (img) => {
    if (img) {
      const path = img;
      const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
      const substring = path.substring(secondSlashIndex + 1);
      return substring;
    }
  };
  useEffect(() => {
    const getData = async (id) => {
      let res = await axios.get(`https://localhost:44352/api/News/${id}`);
      if (res && res.data) {
        setData(res.data);
      }
    };
    getData(id);
  }, [id]);
  useEffect(() => {}, [id]);
  console.log(editImg(data.newsImage));
  console.log(data);
  console.log();
  return (
    <div>
      <Header menuItems={menuItems} />
      <div style={{ marginTop: "50px", marginLeft: "25px" }}>
        <Button variant="contained">
          <Link to="/new" className="button-back">
            Back to news page
          </Link>
        </Button>
      </div>
      <div className="container-detail">
        <div className="new-img" style={{ height: "600px", width: "1000px" }}>
          <img src={"../../../public/" + editImg(data.newsImage)} alt="" />
        </div>

        <div className="new-content" style={{ width: "100%" }}>
          <div
            style={{
              alignItems: "center",
              width: "100%",
              marginLeft: "0px",
            }}
          >
            <div
              className="posts recent-posts"
              style={{ width: "100%", marginLeft: "0px" }}
            >
              <h3 style={{ textAlign: "center" }}>Recent Posts</h3>
              <ul
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {listPages.map((item) => (
                  <li
                    style={{
                      alignItems: "center",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      //   gridGap: "20px",
                    }}
                    key={item.id}
                  >
                    <div
                      style={{
                        // margin: "10px",
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        alt="img"
                        src={"../../../public/" + editImg(item.newsImage)}
                      />
                    </div>

                    <div>
                      <h6>
                        {" "}
                        <Link
                          to={`/detail/${item.newsId}`}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          {item.newsTitle}
                        </Link>
                      </h6>
                      <p>{editDay(item.releaseDate)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ color: "#ff8ba7" }}>{data.newsTitle}</h1>
          <p>
            <span style={{ fontWeight: "bolder", fontSize: "20px" }}>
              Author :
            </span>{" "}
            {data.authorName}
          </p>
          <p>
            <span style={{ fontWeight: "bolder", fontSize: "20px" }}>
              Posting date :
            </span>{" "}
            {editDay(data.releaseDate)}
          </p>
          <p style={{ textAlign: "justify" }}>{data.newsContent}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Detail;

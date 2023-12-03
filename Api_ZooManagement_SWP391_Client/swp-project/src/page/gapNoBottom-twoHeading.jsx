import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Đảm bảo bạn import axios

function GapNoBottomTwoHeading() {
  const [listPages, setListPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getPages = async (page) => {
      try {
        const res = await axios.get(
          `https://localhost:44352/api/News/pages/${page}`
        );
        if (res && res.data) {
          setTotalPages(res.data.pages);
          setListPages(res.data.news);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPages(0);
  }, []);
  const editImg = (img) => {
    const path = img;
    const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
    const substring = path.substring(secondSlashIndex + 1);
    return substring;
  };
  const editDay = (dayNews) => {
    const releaseDate = new Date(dayNews);
    const day = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1; // Cộng thêm 1 vào tháng
    const year = releaseDate.getFullYear();
    const formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  };
  return (
    <div>
      <section className="gap" id="4">
        <div className="container">
          <div className="heading-two">
            <h2>Recent News</h2>
            <div className="line"></div>
          </div>
          <div className="row">
            {listPages.slice(0, 2).map((news) => (
              <div key={news.newsId} className="col-xl-6">
                <div className="recent-news">
                  <img alt="recent-news" src={editImg(news.newsImage)} />
                  <div>
                    <Link to={`/new/${news.newsId}`}>
                      <span>{editDay(news.releaseDate)}</span>
                    </Link>
                    <Link
                      to={`/detail/${news.newsId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h3>{news.newsTitle}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GapNoBottomTwoHeading;

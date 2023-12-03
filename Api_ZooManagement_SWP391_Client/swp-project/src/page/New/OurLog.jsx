import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Link } from "react-router-dom";
function OurLog() {
  const [listPages, setListPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [listSpecies, setListSpecies] = useState([]);
  // phân trang api
  const getPages = async (page) => {
    let res = await axios.get(`https://localhost:44352/api/News/pages/${page}`);
    if (res && res.data) {
      console.log(res);
      setTotalPages(res.data.pages);
      setListPages(res.data.news.filter(news => news.checked === true));
    }
  };

  //render đầu trang
  useEffect(() => {
    const getPages = async (page) => {
      let res = await axios.get(
        `https://localhost:44352/api/News/pages/${page}`
      );
      if (res && res.data) {
        console.log(res.data);
        setTotalPages(res.data.pages);
        setListPages(res.data.news.filter((n) => n.checked === true));
      }
    };
    getPages(0);
  }, []);
  const a = listPages.sort((a, b) => {
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  });
  const customPrevious = (
    <li style={{ top: "-30px" }} className="prev">
      <i className="fa-solid fa-angles-left"></i>
    </li>
  );

  const customNext = (
    <li style={{ top: "-30px", padding: "0" }} className="next">
      <i className="fa-solid fa-angles-right"></i>
    </li>
  );
  const handlePageClick = (event) => {
    getPages(+event.selected + 1);
  };
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
  useEffect(() => {
    const getSpeciesList = () => {
      return fetch("https://localhost:44352/api/AnimalSpecies").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getSpeciesList().then((items) => {
      if (mounted) {
        setListSpecies(items);
      }
    });
    return () => (mounted = false);
  }, []);

  console.log(editImg("C:\\fakepath\\caheo.jpg"));
  return (
    <div>
      <style>
        {`
          a {
            text-decoration: none;
          }
        `}
      </style>
      <section className="gap our-blog">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {listPages.map((news) => (
                <div key={news.newsId} className="recent-news-two">
                  <div style={{ height: "200px", width: "200px" }}>
                    <img
                      alt="recent-news-img"
                      style={{ height: "100%", width: "100%" }}
                      src={editImg(news.newsImage)}
                    />
                  </div>

                  <div className="recent-news mt-3" style={{ width: "2000px" }}>
                    <div>
                      <Link to={`/detail/${news.newsId}`}>
                        <h3 style={{ color: "#ff8ba7" }}>{news.newsTitle}</h3>
                      </Link>
                      <span>
                        <span style={{ fontWeight: "bold" }}>
                          Release date:
                        </span>{" "}
                        {editDay(news.releaseDate)}
                      </span>

                      <div
                        className="d-flex align-items-center fix-img"
                        style={{ marginTop: "10px" }}
                      >
                        <h6 style={{ fontSize: "20px" }}>
                          by {news.authorName}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xl-4">
              <div className="posts recent-posts">
                <h3 style={{ textAlign: "center" }}>Recent Posts</h3>
                <ul>
                  {listPages.slice(0, 3).map((item) => (
                    <li
                      key={item.id}
                      style={{
                        alignItems: "center",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "20px",
                        height: "200px",
                        width: "400px",
                      }}
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
                          <Link
                            to={`/detail/${item.newsId}`}
                            style={{
                              fontWeight: "bolder",
                              fontSize: "20px",
                              color: "black",
                              marginBottom: "0",
                            }}
                          >
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
        </div>
      </section>

      <ReactPaginate
        nextLabel={customNext}
        previousLabel={customPrevious}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default OurLog;

import React, { useEffect, useState } from "react";
import axios from "axios";

function SectionGap() {
  const [listPages, setListPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [listZootrainer, setListZootrainer] = useState([]);
  // phân trang api
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

  const editImg = (img) => {
    const path = img;
    const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
    const substring = path.substring(secondSlashIndex + 1);
    return substring;
  };
  useEffect(() => {
    const getPages = async (page) => {
      try {
        const res = await axios.get(
          `https://localhost:44352/api/User/users/active`
        );
        if (res && res.data) {
          setListZootrainer(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPages(0);
  }, []);
  return (
    <div>
      <section className="gap">
        <div className="container">
          {listPages.slice(0, 1).map((i) => (
            <div key={i.newsId} className="row">
              <div className="col-xl-6">
                <div className="heading">
                  <span>Newest information about MapMap Zoo</span>
                  <h2>{i.newsTitle}</h2>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="about-text">
                  {listZootrainer.slice(0, 1).map((z) => (
                    <div
                      key={z.userId}
                      className="mt-4 d-flex align-items-center"
                    >
                      <img
                        alt="girl"
                        style={{ width: "80px", height: "80px" }}
                        src={editImg(z.userImage)}
                      />
                      <div>
                        <h4>{z.firstname + " " + z.lastname}</h4>

                        <p>Staff of MapMap Zoo</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6">
              <div className="restaurant-card">
                <img
                  alt="Restaurant-img"
                  className="w-100"
                  src="../../src/assets/img/baotuyet.jpg"
                />
                <div className="restaurant-span">
                  <span>Snow Leopard</span>
                </div>
                <div className="coctail-bar">
                  <h5>Snow Leopard</h5>
                  <p>
                    The snow leopard, commonly known as the ounce, is a species
                    of large cat in the genus Panthera of the family Felidae.
                    The species is native to the mountain ranges of Central and
                    South Asia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="restaurant-card coctail">
                <img
                  alt="Restaurant-img"
                  className="w-100"
                  src="../../src/assets/img/tuanloc.jpg"
                />
                <div className="restaurant-span">
                  <span>Deer</span>
                </div>
                <div className="coctail-bar">
                  <h5>Deer</h5>
                  <p>
                    A quite large animal with four legs that eats grass and
                    leaves. The male has antlers (= wide horns like branches) .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="restaurant-card">
                <img
                  alt="Restaurant-img"
                  className="w-100"
                  src="../../src/assets/img/tegiac.jpg"
                />
                <div className="restaurant-span">
                  <span>Rhinoceros</span>
                </div>
                <div className="coctail-bar">
                  <h5>Rhinoceros</h5>
                  <p>
                    A rhinoceros, commonly abbreviated to rhino, is a member of
                    any of the five extant species of odd-toed ungulates in the
                    family Rhinocerotidae
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionGap;

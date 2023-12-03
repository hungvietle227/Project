import React, { useEffect, useState } from "react";
import axios from "axios";

function SectionNoTop() {
  const [listZootrainer, setListZootrainer] = useState([]);
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
  console.log(listZootrainer);
  return (
    <div>
      <section className="gap no-top" id="3">
        <div className="container">
          <div className="heading-two">
            <h2>Meet Our Experts</h2>
            <div className="line"></div>
          </div>
          <div className="row">
            {listZootrainer.slice(0, 3).map((i) => (
              <div className="col-xl-4 col-lg-6" key={i.userId}>
                <div className="chef">
                  <img alt="cook chef" src={editImg(i.userImage)} />
                  <div className="chef-text">
                    <div>
                      <span>Zoo Trainer</span>
                      <p style={{ textDecoration: "none", color: "green" }}>
                        <h3>{i.firstname + " " + i.lastname}</h3>
                      </p>
                    </div>
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

export default SectionNoTop;

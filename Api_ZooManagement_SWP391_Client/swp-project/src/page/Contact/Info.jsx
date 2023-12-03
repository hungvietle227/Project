import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Info() {
  const [formData, setFormData] = useState({
    email: "",
    completeName: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://localhost:44352/api/Review",
        formData
      );
      if (res.status == 200) {
        toast("submit success");
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <div>
      <section className="gap">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="mapouter">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62689.04328388562!2d106.7515543017772!3d10.88264523201883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1698130899073!5m2!1sen!2s"
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="align-items-center d-flex mt-3">
                <i className="fa-solid fa-location-dot me-3"></i>
                <p>
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh 700000
                </p>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="get-in-touch">
                <h2>Send Feedback</h2>
                <p>
                  For all enquires, please contact us and one of our delightful
                  team will be be happy to help.
                </p>
              </div>

              <form
                role="form"
                id="contact-form"
                onSubmit={handleSubmit}
                className="add-review leave-comment mt-4"
              >
                <input
                  type="text"
                  name="completeName"
                  id="Complete_Name"
                  placeholder="Full Name"
                  required
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  id="email_address"
                  required
                  onChange={handleChange}
                />
                <textarea
                  placeholder="Message"
                  name="message"
                  required
                  onChange={handleChange}
                ></textarea>
                <button className="button" type="submit" value="submit">
                  <span>send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Info;

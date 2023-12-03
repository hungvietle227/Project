import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import '../../assets/css/dashboard.css';
import { validationNews } from "./ValidationNews"
export default function AddNews(pros) {
  const email = localStorage.getItem('email');
  const [staticModal, setStaticModal] = useState(false);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const { show, handleClose } = pros;
  const navigate = useNavigate();
  const getUserList = () => {
    return fetch("https://localhost:44352/api/User/users").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getUserList().then((items) => {
      if (mounted) {
        setUser(items.filter(user => user.email === email));
      }
    });
    return () => (mounted = false);
  }, []);
  console.log(user);
  let a = {}
  a = user[0];
  const submitForm = async (values) => {

    console.log(formik.errors);
    console.log(values);
    const userStaff = a;
    console.log(userStaff.userId);
    const news = {
      newsTitle: values.newsTitle,
      newsContent: values.newsContent,
      newsImage: values.newsImage
    };
    console.log(news);
    const url = `https://localhost:44352/api/News?userId=${userStaff.userId}`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      handleClose();
      toast.success("Create Success");
    } else {
      toast.error("Error");
    }
  };
  const formik = useFormik({
    initialValues: {
      newsTitle: "",
      newsContent: "",
      newsImage: ""
    },
    validationSchema: validationNews,
    onSubmit: (values) => {
      submitForm(values);
    },
  });
  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-container-1">
                <div className="form-header">
                  <p className="fw-bold fs-2">Add News</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Title of News</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="newsTitle"
                          placeholder="newsTitle"
                          aria-describedby="inputGroupPrepend"
                          name="newsTitle"
                          value={formik.values.newsTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.newsTitle && formik.touched.newsTitle
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.newsTitle}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Write the content</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="newsContent"
                          placeholder="newsContent"
                          aria-describedby="inputGroupPrepend"
                          name="newsContent"
                          value={formik.values.newsContent}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.newsContent && formik.touched.newsContent
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.newsContent}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Choose Image for News</label>
                        <Form.Control
                          type="file"
                          id="newsImage"
                          placeholder="newsImage"
                          aria-describedby="inputGroupPrepend"
                          name="newsImage"
                          style={{ height: "44px" }}
                          value={formik.values.newsImage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.newsImage && formik.touched.newsImage
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.newsImage}
                        </Form.Control.Feedback>
                      </div>
                      <MDBModalFooter style={{ paddingRight: "0px" }}>
                        <Button
                          style={{ background: "blue", color: "white", marginRight: "20px" }}
                          variant="primary"
                          type="submit"
                          active
                        >
                          Create
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          active
                          style={{
                            width: "80px",
                            background: "red",
                            color: "white"
                          }}
                        >
                          Close
                        </Button>
                      </MDBModalFooter>
                    </div>
                  </div>
                </Form>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

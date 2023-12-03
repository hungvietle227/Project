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
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";

export default function EditNews(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataNewsEdit } = pros;

  const [newsId, setNewsId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");
  useEffect(() => {
    if (show) {
      setNewsId(dataNewsEdit.newsId);
      setAuthorName(dataNewsEdit.authorName);
      setReleaseDate(dataNewsEdit.releaseDate.slice(0, 10));
      setNewsTitle(dataNewsEdit.newsTitle);
      setNewsContent(dataNewsEdit.newsContent);
      setNewsImage(dataNewsEdit.newsImage);
    }
  }, [dataNewsEdit]);
  console.log(dataNewsEdit);
  const handleSave = () => {
    console.log("haha");
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const news = {
      newsId: newsId,
      releaseDate: releaseDate,
      newsTitle: newsTitle,
      newsContent: newsContent,
      newsImage: newsImage,
      status: true,
      checked: false,
    }
    console.log(news);
    const response = await fetch(`https://localhost:44352/api/News/${newsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    });
    if (response.ok) {
      console.log("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      handleClose();
      toast.success("Update Success");
      // navigate("/staff/1")
    }else{
      toast.error("Update Error");
    }
  };
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
                  <p className="fw-bold fs-2">Edit News</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Edit Title of News</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="newsTitle"
                          placeholder="newsTitle"
                          aria-describedby="inputGroupPrepend"
                          name="newsTitle"
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                        //   isInvalid={
                        //     formik.errors.fName && formik.touched.fName
                        //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Edit the content</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="newsContent"
                          placeholder="newsContent"
                          aria-describedby="inputGroupPrepend"
                          name="newsContent"
                          value={newsContent}
                          onChange={(e) => setNewsContent(e.target.value)}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        //   isInvalid={
                        //     formik.errors.category && formik.touched.category
                        //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.category}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Edit Image for News</label>
                        <Form.Control
                          type="file"
                          id="newsImage"
                          placeholder="newsImage"
                          aria-describedby="inputGroupPrepend"
                          name="newsImage"
                          style={{ height: "56px" }}
                          onChange={(e) => setNewsImage(e.target.value)}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        //   isInvalid={
                        //     formik.errors.quantity && formik.touched.quantity
                        //   }
                        />
                        {newsImage && <p>{newsImage}</p>}
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.quantity}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Author of News</label>
                        <Form.Control
                          type="input"
                          id="newsImage"
                          placeholder="newsImage"
                          aria-describedby="inputGroupPrepend"
                          name="newsImage"
                          style={{ height: "56px" }}
                          value={authorName}
                          disabled
                          readonly
                          onChange={(e) => setAuthorName(e.target.value)}

                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        //   isInvalid={
                        //     formik.errors.quantity && formik.touched.quantity
                        //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.quantity}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Release Date</label>
                        <Form.Control
                          type="date"
                          id="newsImage"
                          placeholder="newsImage"
                          aria-describedby="inputGroupPrepend"
                          name="newsImage"
                          style={{ height: "56px" }}
                          value={releaseDate}
                          disabled
                          onChange={(e) => setReleaseDate(e.target.value)}

                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        //   isInvalid={
                        //     formik.errors.quantity && formik.touched.quantity
                        //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.quantity}
                        </Form.Control.Feedback> */}
                      </div>
                      <MDBModalFooter style={{ paddingRight: "0px" }}>
                        <Button
                          style={{ background: "blue", color: "white", marginRight: "20px" }}
                          variant="primary"
                          type="submit"
                          active
                        >
                          Edit News
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

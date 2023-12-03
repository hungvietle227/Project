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
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";

export default function ViewNews(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataNewsView } = pros;
  const [newsID, setNewsID] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [releaseDay, setReleaseDay] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (show) {
      setNewsID(dataNewsView.newsId);
      setNewsTitle(dataNewsView.newsTitle);
      setContent(dataNewsView.newsContent);
      setAuthorName(dataNewsView.authorName);
      const path = dataNewsView.newsImage;
      const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
      const substring = path.substring(secondSlashIndex + 1);
      setNewsImage(substring);
      setReleaseDay(dataNewsView.releaseDate.slice(0, 10));
      setStatus(dataNewsView.checked);
    }
  }, [dataNewsView]);
  const handleSave = () => {
    console.log("haha");
  };

  return (
    <>
      <MDBModal show={show} onHide={handleClose}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header text-white d-flex justify-content-center"
              style={{ background: "cadetblue" }}
            >
              <MDBModalTitle style={{ fontSize: "xx-large" }}>
                News Information
              </MDBModalTitle>
              {/* <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-container-1">
                <Form noValidate>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          ID:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {newsID}
                        </MDBCardText>
                      </div>
                      <hr></hr>
                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Title:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {newsTitle}
                        </MDBCardText>
                      </div>
                      <hr></hr>

                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Author Name:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {authorName}
                        </MDBCardText>
                      </div>
                      <hr></hr>

                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Content:
                        </label>
                        <MDBCardText
                          className="text-muted mt-2"
                          style={{ textAlign: "justify" }}
                        >
                          {content}
                        </MDBCardText>
                      </div>
                      <hr></hr>

                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Release Date:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {releaseDay}
                        </MDBCardText>
                      </div>
                      <hr></hr>

                      <div className="mb-3 mt-3" style={{ width: "100%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Status:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {status === true ? (
                            <><span style={{color: "green"}}>Approve</span><MDBIcon fas icon="check" /></>
                          ) : (
                            <><span style={{color: "#FFBC00"}}>Pending</span><MDBIcon fas icon="times" /></>
                          )}
                        </MDBCardText>
                      </div>
                      <hr></hr>

                      <div className="mb-3">
                        <div>
                          <img
                            style={{ width: "100%" }}
                            src={"/" + newsImage}
                          />
                        </div>
                      </div>
                      <MDBModalFooter style={{ paddingRight: "0px" }}>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          active
                          style={{
                            width: "80px",
                            background: "red",
                            color: "white",
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

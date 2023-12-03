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
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AddExperience(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose } = pros;
  const [listArea, setListArea] = useState([]);
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("haha");
  };

  const submitForm = async (values) => {
    console.log(values);
    console.log(formik.errors);
    const experience = {
      position: values.position,
    };
    const url = "https://localhost:44352/api/Experience";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      navigate("/staff/species");
      window.location.reload();
    }
  };
  const formik = useFormik({
    initialValues: {
      position: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
  });
  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog>
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
                  <p className="fw-bold fs-2">Add Experience</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Position</label>
                        <Form.Control
                          type="text"
                          style={{ width: "100%", height: "50px" }}
                          id="position"
                          placeholder="position"
                          aria-describedby="inputGroupPrepend"
                          name="position"
                          value={formik.values.position}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // isInvalid={
                          //     formik.errors.category && formik.touched.category
                          // }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                                                    {formik.errors.category}
                                                </Form.Control.Feedback> */}
                      </div>
                      <MDBModalFooter
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          style={{
                            background: "blue",
                            color: "white",
                            marginRight: "34px",
                          }}
                          variant="primary"
                          type="submit"
                          onClick={() => {
                            handleSave();
                          }}
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
                            color: "white",
                          }}
                        >
                          Close
                        </Button>
                      </MDBModalFooter>
                    </div>
                  </div>
                </Form>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {/* Same as */}
                <ToastContainer />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

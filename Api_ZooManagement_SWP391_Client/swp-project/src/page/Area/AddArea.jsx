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
import { toast } from "react-toastify";
import { validationArea } from "./validationArea";

export default function AddArea(pros) {
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
    const area = {
      areaName: values.areaName,
      description: values.description,
    };
    const url = "https://localhost:44352/api/Area";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(area),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      navigate("/staff/area");
      window.location.reload();
    } else {
      toast.error("Area Name exist or Wrong somthing");
    }
  };
  const formik = useFormik({
    initialValues: {
      areaName: "",
      description: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
    validationSchema: validationArea,
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
                  <p className="fw-bold fs-2">Add Area</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Area Name</label>
                        <Form.Control
                          type="text"
                          style={{ width: "100%", height: "50px" }}
                          id="areaName"
                          placeholder="Area Name"
                          aria-describedby="inputGroupPrepend"
                          name="areaName"
                          value={formik.values.areaName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.areaName && formik.touched.areaName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.areaName}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enter Description</label>
                        <Form.Control
                          type="text"
                          id="description"
                          placeholder="Description"
                          aria-describedby="inputGroupPrepend"
                          name="description"
                          style={{ width: "100%", height: "50px" }}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.description &&
                            formik.touched.description
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.description}
                        </Form.Control.Feedback>
                      </div>
                      <MDBModalFooter style={{ paddingRight: "0px" }}>
                        <Button
                          style={{
                            background: "blue",
                            color: "white",
                            marginRight: "20px",
                          }}
                          variant="primary"
                          type="submit"
                          onClick={() => {
                            handleSave();
                          }}
                          active
                        >
                          Create New Area
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
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

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
import { useNavigate } from "react-router-dom";

export default function AddSpecies(pros) {
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
    const species = {
      speciesName: values.speciesName,
    };
    const url = "https://localhost:44352/api/AnimalSpecies";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(species),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      handleClose();
      toast.success("Create Successfully");
    }else{
      toast.error("Create Error Name Existed Or Blank")
    }
  };
  const formik = useFormik({
    initialValues: {
      speciesName: "",
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
                  <p className="fw-bold fs-2">Add Species</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Species Name</label>
                        <Form.Control
                          type="text"
                          style={{ width: "100%", height: "50px" }}
                          id="speciesName"
                          placeholder="speciesName"
                          aria-describedby="inputGroupPrepend"
                          name="speciesName"
                          value={formik.values.speciesName}
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
                      <MDBModalFooter style={{display: "flex", justifyContent: "center"}}>
                        <Button
                          style={{ background: "blue", color: "white",marginRight: "34px" }}
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
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

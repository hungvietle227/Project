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

export default function EditArea(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataAreaEdit } = pros;

  const [areaId, setAreaId] = useState("");
  const [description, setDescription] = useState("");
  const [areaName, setAreaName] = useState("");
  useEffect(() => {
    if (show) {
      setAreaId(dataAreaEdit.areaId);
      setDescription(dataAreaEdit.description);
      setAreaName(dataAreaEdit.areaName);
    }
  }, [dataAreaEdit]);
  console.log(dataAreaEdit);
  const handleSave = () => {
    console.log("haha");
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const Area = {
      areaId: areaId,
      description: description,
    };
    const response = await fetch(`https://localhost:44352/api/Area/${areaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Area),
    });
    if (response.ok) {
      console.log("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      window.location.reload();
      // navigate("/staff/1")
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
                  <p className="fw-bold fs-2">Edit Area</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Area ID</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="areaId"
                          placeholder="Area Id"
                          aria-describedby="inputGroupPrepend"
                          name="areaId"
                          value={areaId}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Area Name</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="areaName"
                          placeholder="Area Name"
                          aria-describedby="inputGroupPrepend"
                          name="areaName"
                          value={areaName}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Edit Description of Area
                        </label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="description"
                          placeholder="description"
                          aria-describedby="inputGroupPrepend"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          //   isInvalid={
                          //     formik.errors.fName && formik.touched.fName
                          //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                      </div>
                      <MDBModalFooter>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          active
                          style={{
                            width: "80px",
                            marginRight: "20px",
                            background: "red",
                            color: "white",
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          style={{ background: "blue", color: "white" }}
                          variant="primary"
                          type="submit"
                          active
                        >
                          Edit Area
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

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

export default function EditCage(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataCageEdit } = pros;

  const [cId, setCId] = useState("");
  const [name, setName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [animalQuantity, setAnimalQuantity] = useState("");
  useEffect(() => {
    if (show) {
        setCId(dataCageEdit.cId);
        setName(dataCageEdit.name);
        setMaxCapacity(dataCageEdit.maxCapacity);
        setAnimalQuantity(dataCageEdit.animalQuantity);
    }
  }, [dataCageEdit]);
  console.log(dataCageEdit);
  const handleSave = () => {
    console.log("haha");
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const Cage = {
        cId: cId,
        name: name,
        maxCapacity: maxCapacity,
    };
    const response = await fetch(`https://localhost:44352/api/Cage/${cId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cage),
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
                  <p className="fw-bold fs-2">Edit Cage</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Cage ID</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="cId"
                          placeholder="Cage Id"
                          aria-describedby="inputGroupPrepend"
                          name="cId"
                          value={cId}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cage Name</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="name"
                          placeholder="Name"
                          aria-describedby="inputGroupPrepend"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Edit Max Capacity of Cage</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="maxCapacity"
                          placeholder="Max Capacity"
                          aria-describedby="inputGroupPrepend"
                          name="maxCapacity"
                          value={maxCapacity}
                          onChange={(e) => setMaxCapacity(e.target.value)}
                        //   isInvalid={
                        //     formik.errors.fName && formik.touched.fName
                        //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Animal Quantity in Cage</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="animalQuantity"
                          placeholder="Animal Quantity"
                          aria-describedby="inputGroupPrepend"
                          name="animalQuantity"
                          value={animalQuantity}
                          disabled
                       
                        />
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
                          Edit
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

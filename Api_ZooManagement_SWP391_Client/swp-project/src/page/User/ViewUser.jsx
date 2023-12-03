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
} from "mdb-react-ui-kit";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";

export default function ViewUser(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataUserView } = pros;

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [userImage, setUserImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [experienceOption, setExperienceOption] = useState([]);
  useEffect(() => {
    if (show) {
      setUserId(dataUserView.userId);
      setEmail(dataUserView.email);
      setFirstName(dataUserView.firstname);
      setLastName(dataUserView.lastname);
      setAddress(dataUserView.address);
      setPhone(dataUserView.phone);
      setSex(dataUserView.sex === true ? "male" : "female");
      const path = dataUserView.userImage;
      const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
      const substring = path.substring(secondSlashIndex + 1);
      setUserImage(substring);
      setRole(dataUserView.role === 2 ? "Staff" : "ZooTrainer");
      setStartDate(dataUserView.startDate.slice(0, 10));
      setEndDate(
        dataUserView.endDate === null ? null : dataUserView.endDate.slice(0, 10)
      );
      setStatus(dataUserView.status);
      setExperienceOption(dataUserView.experiences);
    }
  }, [dataUserView]);
  const handleSave = () => {
    console.log("haha");
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(dataAnimalView);
  };
  return (
    <>
      <MDBModal show={show} onHide={handleClose}>
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
                  <p className="fw-bold fs-2">View Employee</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="row mb-3">
                        <div className="mb-3" style={{ textAlign: "center" }}>
                          <div>
                            <img
                              style={{ height: "259px" }}
                              src={"/" + userImage}
                            />
                          </div>
                        </div>
                        <div className="mb-3 mt-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            User Id:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {userId}
                          </MDBCardText>
                        </div>
                        <div className="mb-3 mt-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Email:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {email}
                          </MDBCardText>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row mb-3">
                        <div className="mb-3 mt-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Full Name:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {firstName + " " + lastName}
                          </MDBCardText>
                        </div>
                        <div className="mb-3 mt-2" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Address:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {address}
                          </MDBCardText>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row mb-3">
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Phone:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {phone}
                          </MDBCardText>
                        </div>
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Role:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {role}
                          </MDBCardText>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row mb-3">
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Sex:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {sex}
                          </MDBCardText>
                        </div>
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Start Date:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {startDate}
                          </MDBCardText>
                        </div>
                      </div>

                      {endDate && (
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            End Date:
                          </label>
                          <MDBCardText className="text-muted mt-2">
                            {endDate}
                          </MDBCardText>
                        </div>
                      )}
                      <div className="mb-3" style={{ width: "33%" }}>
                        <label
                          className="form-label"
                          style={{ color: "#813528", fontWeight: "bolder" }}
                        >
                          Status:
                        </label>
                        <MDBCardText className="text-muted mt-2">
                          {status === true ? "On Working" : "Out Work"}
                        </MDBCardText>
                      </div>
                      <hr></hr>
                      <div className="label-info mb-2">
                        <label style={{ color: "#813528" }}>
                          Experience Information
                        </label>
                      </div>
                      <div
                        className="Food-Information mb-4"
                        style={{ width: "100%" }}
                      >
                        <div className="mb-3" style={{ paddingRight: "25px" }}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Experience ID</th>
                                <th>Position</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {experienceOption &&
                                experienceOption.length > 0 &&
                                experienceOption.map((value) => {
                                  return (
                                    <tr>
                                      <td>{value.experienceId}</td>
                                      <td>{value.position}</td>
                                      <td>{value.company}</td>
                                    </tr>
                                  );
                                })}
                              {experienceOption.length === 0 && (
                                <tr>
                                  <td colSpan={3}>Empty</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>

                      <div className="btn-footer">
                        <div
                          style={{
                            background: "gainsboro",
                          }}
                        >
                          <Button
                            variant="secondary"
                            onClick={handleClose}
                            active
                            style={{ width: "80px" }}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
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

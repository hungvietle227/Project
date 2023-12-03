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
import "../../assets/css/dashboard.css";
export default function EditProfile(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataUserEdit } = pros;

  const [phone, setPhone] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [endDate, setEndDate] = useState("");
  const emailInfo = localStorage.getItem("email");
  const [staffProfile, setStaffProfile] = useState([]);
  useEffect(() => {
    const getList = () => {
      return fetch("https://localhost:44352/api/User/users").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setStaffProfile(items.filter((user) => user.email === emailInfo));
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    if (show) {
      console.log(dataUserEdit);
      setUserId(dataUserEdit.userId);
      setAddress(dataUserEdit.address);
      setRole(dataUserEdit.role);
      setPhone(dataUserEdit.phone);
      setFirstName(dataUserEdit.firstname);
      setLastName(dataUserEdit.lastname);
      setEndDate(
        dataUserEdit.endDate === null ? null : dataUserEdit.endDate.slice(0, 10)
      );
    }
  }, [dataUserEdit]);
  const handleSave = () => {
    console.log("haha");
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      role: role,
      endDate: endDate,
    };
    console.log(userInfo);
    const response = await fetch(`https://localhost:44352/api/User/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (response.ok) {
      console.log("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      window.location.href = "/staff/profile";
      // navigate("/staff/1")
    }
  };
  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader className="modal-header text-white d-flex justify-content-center"
              style={{ background: "cadetblue" }}>
              <MDBModalTitle style={{ fontSize: "xx-large" }}>Edit Profile</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <Form noValidate onSubmit={handleFormSubmit}>
                <div className="form-content">
                  <div className="form">
                    <div className="mb-3">
                      <label className="form-label">Edit First Name</label>
                      <Form.Control
                        type="text"
                        style={{ height: "56px" }}
                        id="firstname"
                        placeholder="First Name"
                        aria-describedby="inputGroupPrepend"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      //   isInvalid={
                      //     formik.errors.fName && formik.touched.fName
                      //   }
                      />
                      {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Edit Last Name</label>
                      <Form.Control
                        type="text"
                        style={{ height: "56px" }}
                        id="newsContent"
                        placeholder="Last Name"
                        aria-describedby="inputGroupPrepend"
                        name="newsContent"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
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
                      <label className="form-label">Edit Phone</label>
                      <Form.Control
                        type="input"
                        id="newsImage"
                        placeholder="Phone"
                        aria-describedby="inputGroupPrepend"
                        name="newsImage"
                        style={{ height: "56px" }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        readonly
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
                      <label className="form-label">Edit Address</label>
                      <Form.Control
                        type="input"
                        id="newsImage"
                        placeholder="Address"
                        aria-describedby="inputGroupPrepend"
                        name="newsImage"
                        style={{ height: "56px" }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                        variant="secondary"
                        onClick={handleClose}
                        active
                        style={{
                          width: "80px",
                          marginRight: "20px",
                          color: "white",
                          background: "red",
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
                        Edit Profile
                      </Button>
                    </MDBModalFooter>
                  </div>
                </div>
              </Form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

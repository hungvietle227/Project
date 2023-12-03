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
import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import Button from "react-bootstrap/Button";
import Password from "antd/es/input/Password";
import { DatePicker, Radio, Select, Space } from "antd";
const { RangePicker } = DatePicker;
import { Formik, useFormik } from "formik";
import FormList from "antd/es/form/FormList";
import { basicSchema } from "./validateForm";
import "../../assets/css/dashboard.css";
import Form from "react-bootstrap/Form";
import { Email, EventNoteTwoTone, TouchAppRounded } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { creatNewUser } from "../../service/UserService";
import { Navigate, useNavigate } from "react-router-dom";
const onOk = (value) => {
  console.log("onOk: ", value);
};
const onSubmit = () => {
  console.log("submit");
};

export default function EditPage(pros) {
  const { show, handleClose, dataUserEdit } = pros;
  const { Show, setShow } = useState(false);
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Submit");
  };
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [Sex, setSex] = useState("");
  const [company, setCompany] = useState("");
  const [uID, setUID] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(true);
  const [wID, setWID] = useState("2");
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  useEffect(() => {
    if (show) {
      setUID(dataUserEdit.userId);
      setFirstName(dataUserEdit.firstname);
      setLastName(dataUserEdit.lastname);
      setPhone(dataUserEdit.phone);
      setEmail(dataUserEdit.email);
      setPassword(dataUserEdit.password);
      setAddress(dataUserEdit.address);
      setRole(dataUserEdit.role);
      setSex(dataUserEdit.sex);
      setEndDate(
        dataUserEdit.endDate === null ? null : dataUserEdit.endDate.slice(0, 10)
      ),
        setStatus(dataUserEdit.status);
      setWID(dataUserEdit.wID === null ? "2" : `${wID}`);
    }
  }, [dataUserEdit]);
  // console.log(dataUserEdit);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let end = null;
    if (endDate != "") {
      end = endDate;
    } else {
      end = date;
    }
    const formData = {
      userId: event.target.elements.firstname.value,
    };
    const user = {
      userId: uID,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      role: Role,
      endDate: end,
    };
    console.log(user.firstname === dataUserEdit.firstname);
    console.log("OK");
    console.log(user);
    const response = await fetch(`https://localhost:44352/api/User/${uID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      console.log("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      const role = localStorage.getItem("role");
      if (role === "ADMIN") {
        //window.location.href = "/admin/1";
        handleClose();
        toast.success("Update successful");
      } else if (role === "STAFF") {
        //window.location.href = "/staff/1";
        handleClose();
        toast.success("Update successful");
      }
      // navigate("/staff/1")
    }
  };
  const [Role, setRole] = useState(null);
  const handleRadioChange = (value) => {
    setSex(value.target.value);
  };
  const handleRoleChange = (value) => {
    // console.log(`selected ${value}`);
    setRole(value.target.value);
  };
  const handleChange1 = (value) => {
    // console.log(`selected ${value}`);
    // setRole(value);
    setWID(value.target.value);
  };
  const handleRadioChange2 = (value) => {
    setStatus(value.target.value);
  };
  const handlePhoneChange = (value) => {
    if (value.target.value == null) {
      console.log("not enter");
    }
    if (value.target.value === phone) {
      console.log("exist");
    }
    setPhone(value.target.value);
  };
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };
  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-container-1">
                <div className="form-header">
                  <p className="fw-bold fs-2">Edit User</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="row mb-3">
                        {error && (
                          <div
                            className="mb-3"
                            style={{
                              textAlign: "center",
                              fontWeight: "bolder",
                              color: "red",
                              fontSize: "30px",
                            }}
                          >
                            {error}
                          </div>
                        )}

                        <div className="mb-3 row-content">
                          <label className="form-label">Enter FirstName</label>
                          <Form.Control
                            id="firstname"
                            type="text"
                            placeholder="firstname"
                            aria-describedby="inputGroupPrepend"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                          // onBlur={formik.handleBlur}
                          // isInvalid={
                          //   formik.errors.first_name &&
                          //   formik.touched.first_name
                          // }
                          />
                          {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.first_name}
                          </Form.Control.Feedback> */}
                        </div>
                        <div className="mb-3 row-content">
                          <label className="form-label">Enter LastName</label>
                          <Form.Control
                            type="text"
                            id="lastname"
                            placeholder="lastname"
                            aria-describedby="inputGroupPrepend"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // isInvalid={
                          //   formik.errors.last_name &&
                          //   formik.touched.last_name
                          // }
                          />
                          {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.last_name}
                          </Form.Control.Feedback> */}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="mb-3 row-content">
                          <label className="form-label">Enter Email</label>
                          <Form.Control
                            type="email"
                            disabled
                            id="email"
                            placeholder="email"
                            aria-describedby="inputGroupPrepend"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // isInvalid={
                          //   formik.errors.email && formik.touched.email
                          // }
                          />
                          {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback> */}
                        </div>
                        <div className="mb-3 row-content">
                          <label className="form-label">Role</label>
                          <br />
                          <Radio.Group
                            id="role"
                            name="role"
                            onChange={(e) => {
                              handleRoleChange(e);
                            }}
                            value={Role}
                            buttonStyle="solid"
                          >
                            {role === 'ADMIN' && (
                              <Radio
                                style={{
                                  textAlign: "center",
                                }}
                                value={2}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  Staff
                                </span>
                              </Radio>
                            )}
                            {role === 'STAFF' && (
                              <Radio
                                style={{
                                  textAlign: "center ",
                                }}
                                value={3}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  ZooTrainer
                                </span>
                              </Radio>
                            )}
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="mb-3 row-content">
                          <label className="form-label">Enter Phone</label>
                          <Form.Control
                            type="number"
                            id="phone"
                            placeholder="phone"
                            aria-describedby="inputGroupPrepend"
                            name="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            isInvalid={phone == null}
                          />
                          <Form.Control.Feedback type="invalid">
                            Haha
                          </Form.Control.Feedback>
                        </div>
                        <div className="mb-3 row-content">
                          <label className="form-label">Gender</label>
                          <br />
                          <Radio.Group
                            id="sex"
                            name="sex"
                            onChange={handleRadioChange}
                            value={Sex}
                            disabled
                            buttonStyle="solid"
                          >
                            <Radio value={true}>Male</Radio>
                            <Radio value={false}>Female</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      {/* <div className="mb-3">
              <label className="form-label">Enter PhoneNumber</label>
              <input
                type="number"
                className="form-control"
                value={Job}
                onChange={(event) => {
                  setJob(event.target.value);
                }}
              />
            </div> */}
                      <div className="mb-3">
                        <label className="form-label">Enter Address</label>
                        <Form.Control
                          type="text"
                          style={{ width: '97%' }}
                          id="address"
                          placeholder="address"
                          aria-describedby="inputGroupPrepend"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // isInvalid={
                        //   formik.errors.address && formik.touched.address
                        // }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.address}
                        </Form.Control.Feedback> */}
                      </div>
                      {/* <div className="row mb-3 mt-5">
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label className="form-label">Enter EndDate</label>
                          <br />
                          <Form.Control
                            type="date"
                            id="endDate"
                            placeholder="address"
                            aria-describedby="inputGroupPrepend"
                            name="endDate"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                          // onBlur={formik.handleBlur}
                          />
                        </div>
                      </div> */}
                      <div className="btn-footer">
                        <div style={{ marginRight: "20px" }}>
                          <Button
                            variant="secondary"
                            onClick={handleClose}
                            active
                            style={{ width: "80px" }}
                          >
                            Close
                          </Button>
                        </div>
                        <div>
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={show}
                            active
                          >
                            Edit user
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

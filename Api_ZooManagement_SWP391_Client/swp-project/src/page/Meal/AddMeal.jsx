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
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, Radio, Select, Space } from "antd";
import { Formik, useFormik, Field, useFormikContext } from "formik";
import { ListGroup, Form } from "react-bootstrap";
import { Navigate, json, useNavigate } from "react-router-dom";
import moment from "moment";
import { South } from "@mui/icons-material";

export default function AddMeal(pros) {
  const { show, handleClose } = pros;
  const [staticModal, setStaticModal] = useState(false);
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [animalList, setAnimalList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [fields, setFields] = useState([
    {
      foodId: "",
      quantity: "",
      unit: "",
    },
  ]);
  const addField = () => {
    setFields([...fields, { foodId: "", quantity: "", unit: "" }]);
  };
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  const handleFoodSelect = (event, field, form) => {
    const selectedFoodId = event.target.value;
    setSelectedFoodIds((prevSelectedFoodIds) => [
      ...prevSelectedFoodIds,
      selectedFoodId,
    ]);
    form.setFieldValue(field.name, selectedFoodId);
  };
  const handleFoodSelect2 = (event, field, form) => {
    const selectedFoodId = event.target.value;
    form.setFieldValue(field.name, selectedFoodId);
  };
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("haha");
  };



  useEffect(() => {
    const getFoodList = () => {
      return fetch("https://localhost:44352/api/Food").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getFoodList().then((items) => {
      if (mounted) {
        setFoodList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const submitForm = async (values) => {
    const date = new Date();
    console.log(values);
    const meal = {
      mealName: values.mealName,
      foodMeals: values.fields,
    };
    console.log(meal);
    // const time = '8:30';
    // const datetime = moment(time, 'HH:mm').toISOString();
    // console.log(datetime);
    const url = `https://localhost:44352/api/Meal`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      // navigate("/staff/2");
      toast.success("Create Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1250)
    } else {
      toast.error("Meal Existed");
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
                  <p className="fw-bold fs-2">Add Meal</p>
                </div>
                <Formik
                  initialValues={{
                    mealName: "",
                    fields,
                  }}
                  //   validationSchema={validationSchedule}
                  onSubmit={(values) => {
                    submitForm(values);
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="form-content">
                        <div className="form">
                          <div className="Food-Information">
                            <div className="mb-3">
                              <div className="mb-5">
                                <label
                                  className="form-label"
                                  style={{ fontWeight: "bolder" }}
                                >
                                  Enter Name of Meal
                                </label>
                                <Form.Control
                                  // size="lg"
                                  placeholder="Name of Meal"
                                  id="mealName"
                                  name="mealName"
                                  style={{ width: "73%" }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.mealName && touched.mealName
                                  }
                                >
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors.mealName}
                                </Form.Control.Feedback>
                              </div>

                              {fields.map((field, index) => (
                                <div
                                  key={index}
                                  style={{
                                    justifyContent: "space-between",
                                    width: "90%",
                                  }}
                                  className="mb-3"
                                >
                                  <label
                                    className="form-label"
                                    style={{ fontWeight: "bolder" }}
                                  >
                                    Food For Animal
                                  </label>
                                  <Field
                                    name={`fields[${index}].foodId`}
                                    // as="select"
                                    // onChange={(e) => handleChange(e.target.value)}
                                  >
                                    {({ field, form }) => (
                                      <Form.Select
                                        {...field}
                                        placeholder="Chọn món ăn"
                                        style={{
                                          width: "80%",
                                          marginBottom: "30px",
                                        }}
                                        onChange={(event) =>
                                          handleFoodSelect(event, field, form)
                                        }
                                      >
                                        <option value="">
                                          Choose Food for animal
                                        </option>
                                        {/* Render các option từ API */}
                                        {foodList.map((option) => (
                                          <option
                                            key={option.foodId}
                                            value={option.foodId}
                                            disabled={selectedFoodIds.includes(
                                              option.foodId
                                            )}
                                          >
                                            {option.fName}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    )}
                                  </Field>
                                  <Field
                                    placeholder="Enter Quantity"
                                    name={`fields[${index}].quantity`}
                                    component="input"
                                    style={{
                                      width: "80%",
                                      marginBottom: "30px",
                                    }}
                                    className="control-field"
                                  />
                                  <Field
                                    name={`fields[${index}].unit`}
                                    // as="select"
                                    // onChange={(e) => handleChange(e.target.value)}
                                  >
                                    {({ field, form }) => (
                                      <Form.Select
                                        {...field}
                                        placeholder="Chọn món ăn"
                                        style={{
                                          width: "80%",
                                          marginBottom: "30px",
                                        }}
                                        onChange={(event) =>
                                          handleFoodSelect2(event, field, form)
                                        }
                                      >
                                      <option value="">
                                          Choose Unit
                                        </option>
                                        <option value="Kg">
                                          Kg
                                        </option>
                                        <option value="L">
                                          L
                                        </option>
                                      </Form.Select>
                                    )}
                                  </Field>
                                  <div
                                    style={{ display: "block", width: "80%" }}
                                  >
                                    <Button onClick={() => removeField(index)}>
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              {errors.fields && (
                                <div style={{ color: "red" }}>
                                  Choose Schedule and Time
                                </div>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button onClick={addField}>More Food</Button>
                            </div>
                          </div>
                          <MDBModalFooter>
                            <Button
                              variant="secondary"
                              onClick={handleClose}
                              active
                              style={{
                                width: "80px",
                                marginRight: "20px",
                                background: "gainsboro",
                              }}
                            >
                              Close
                            </Button>
                            <Button
                              style={{ background: "blue", color: "white" }}
                              variant="primary"
                              type="submit"
                              onClick={() => {
                                handleSave();
                              }}
                              active
                            >
                              Create
                            </Button>
                          </MDBModalFooter>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

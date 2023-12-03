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
import { validationSchedule } from "./validationSchedule";

export default function ScheduleAnimal(pros) {
  const { show, handleClose } = pros;
  const [staticModal, setStaticModal] = useState(false);
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [animalList, setAnimalList] = useState([]);
  const [expList, setExpList] = useState([]);
  const [fields, setFields] = useState([
    {
      scheduleId: "",
      time: "",
      description: "",
      isDone: false,
    },
  ]);
  const addField = () => {
    setFields([
      ...fields,
      { scheduleId: "", time: "", description: "", isDone: false },
    ]);
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
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("haha");
  };

  const getAnimalList = () => {
    return fetch("https://localhost:44352/api/Animal/allMeal").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getAnimalList().then((items) => {
      if (mounted) {
        setAnimalList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const getExpList = () => {
    return fetch("https://localhost:44352/api/Schedule").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getExpList().then((items) => {
      if (mounted) {
        setExpList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const submitForm = async (values) => {
    const date = new Date();
    console.log(values);
    const schedule = {
      animalId: values.animalId,
      animalSchedules: values.fields,
    };
    console.log(schedule);
    // const time = '8:30';
    // const datetime = moment(time, 'HH:mm').toISOString();
    // console.log(datetime);
    const url = `https://localhost:44352/api/Animal/AnimalSchedule?animalId=${values.animalId}`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
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
      toast.error("Schedule Existed");
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
                  <p className="fw-bold fs-2">Add Schedule</p>
                </div>
                <Formik
                  initialValues={{
                    animalId: "",
                    fields,
                  }}
                  validationSchema={validationSchedule}
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
                                <label className="form-label" style={{ fontWeight: "bolder" }}>Choose Animal</label>
                                <Form.Select
                                  // size="lg"
                                  placeholder="Chọn món ăn"
                                  id="animalId"
                                  name="animalId"
                                  style={{ width: "73%" }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={errors.animalId && touched.animalId}
                                >
                                  <option value={null}>Choose AnimalId</option>
                                  {/* Render các option từ API */}
                                  {animalList.map((value) => (
                                    <option
                                      key={value.animalId}
                                      value={value.animalId}
                                    >
                                      {value.animalId} - Name : {value.name} -
                                      CageId : {value.cId}
                                    </option>
                                  ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {errors.animalId}
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
                                  <label className="form-label" style={{ fontWeight: "bolder" }}>
                                    Schedule For Animal
                                  </label>
                                  <Field
                                    name={`fields[${index}].scheduleId`}
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
                                          Choose Schedule for animal
                                        </option>
                                        {/* Render các option từ API */}
                                        {expList.map((option) => (
                                          <option
                                            key={option.scheduleId}
                                            value={option.scheduleId}
                                            disabled={selectedFoodIds.includes(
                                              option.scheduleId
                                            )}
                                          >
                                            {option.scheduleName}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    )}
                                  </Field>
                                  <Field
                                    placeholder="Enter Time"
                                    type="time"
                                    name={`fields[${index}].time`}
                                    component="input"
                                    style={{
                                      width: "80%",
                                      marginBottom: "30px",
                                    }}
                                    className="control-field"
                                  />
                                  <Field
                                    placeholder="Enter Description"
                                    name={`fields[${index}].description`}
                                    component="input"
                                    style={{
                                      width: "80%",
                                      marginBottom: "30px",
                                    }}
                                    className="control-field"
                                  />
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
                              <Button onClick={addField}>More Schedule</Button>
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
                              Create Schedule
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

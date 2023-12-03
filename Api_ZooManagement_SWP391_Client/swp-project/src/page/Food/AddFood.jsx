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
import { schema } from "./validationFood";
import { useNavigate } from "react-router-dom";

export default function AddFood(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose } = pros;
  const [listCategory, setListCategory] = useState([]);
  const getCategory = () => {
    return fetch("https://localhost:44352/api/FoodCategory").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getCategory().then((items) => {
      if (mounted) {
        setListCategory(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const navigate = useNavigate();
  const handleSave = () => {
    console.log(formik.errors);
    console.log("haha");
  };
  const submitForm = async (values) => {
    console.log(values);
    console.log(formik.errors);
    const food = {
      fName: values.fName,
      quantity: values.quantity,
      unit: values.unit,
      importDate: values.importDate,
      expiredDate: values.expiredDate,
      categoryName: values.categoryName,
    };

    const url = "https://localhost:44352/api/Food";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    };
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      handleClose();
      toast.success("Create Success");
    } else {
      toast.error("Error creating");
    }
  };
  const formik = useFormik({
    initialValues: {
      fName: "",
      quantity: "",
      unit: "KG",
      importDate: "",
      expiredDate: "",
      categoryName: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });
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
                  <p className="fw-bold fs-2">Add food</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Food Name</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="fName"
                          placeholder="Food Name"
                          aria-describedby="inputGroupPrepend"
                          name="fName"
                          value={formik.values.fName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.fName && formik.touched.fName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Choose Category</label>
                        <Form.Select
                          size="lg"
                          id="categoryName"
                          name="categoryName"
                          placeholder="Chọn món ăn"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.categoryName &&
                            formik.touched.categoryName
                          }
                        >
                          <option value={null}>Choose Category Name</option>
                          {/* Render các option từ API */}
                          {listCategory.map((option) => (
                            <option
                              key={option.categoryName}
                              value={option.categoryName}
                            >
                              <div style={{ height: "50px" }}>
                                {option.categoryName}
                              </div>
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.categoryName}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enter The Quantity</label>
                        <Form.Control
                          type="Number"
                          id="quantity"
                          placeholder="Quantity"
                          aria-describedby="inputGroupPrepend"
                          name="quantity"
                          style={{ height: "56px" }}
                          value={formik.values.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.quantity && formik.touched.quantity
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.quantity}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Choose Unit</label>
                        <Form.Select
                          size="lg"
                          id="unit"
                          name="unit"
                          placeholder="Chọn món ăn"
                          style={{ width: "46%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // isInvalid={formik.errors.unit && formik.touched.categoryName}
                        >
                          <option value="KG">KG</option>
                          <option value="L">L</option>
                        </Form.Select>
                      </div>
                      <div className="row mb-5 mt-4">
                        <div className="mb-3" style={{ width: "50%" }}>
                          <div>
                            <label className="form-label">
                              Choose ImportDate
                            </label>
                            <br />
                            <Form.Control
                              type="date"
                              id="importDate"
                              name="importDate"
                              value={formik.values.importDate}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.errors.importDate &&
                                formik.touched.importDate
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.importDate}
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "50%" }}>
                          <label className="form-label">
                            Choose ExpiredDate
                          </label>
                          <br />
                          <Form.Control
                            type="date"
                            id="expiredDate"
                            name="expiredDate"
                            value={formik.values.expiredDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.expiredDate &&
                              formik.touched.expiredDate
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.expiredDate}
                          </Form.Control.Feedback>
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
                          Create Food
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

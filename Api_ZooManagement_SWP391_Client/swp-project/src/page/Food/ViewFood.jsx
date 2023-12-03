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
import { schema } from "./validationFood";

export default function ViewFood(pros) {
  const [staticModal, setStaticModal] = useState(false);
  const { show, handleClose, dataFoodView } = pros;

  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [importDate, setImportDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [category, setCategory] = useState("");
  const [animalFood, setAnimalFood] = useState("");

  useEffect(() => {
    if (show) {
      setFoodId(dataFoodView.foodId);
      setFoodName(dataFoodView.fName);
      setQuantity(dataFoodView.quantity);
      setImportDate(dataFoodView.importDate.slice(0, 10));
      setExpiredDate(dataFoodView.expiredDate.slice(0, 10));
      setCategory(dataFoodView.categoryName);
      setUnit(dataFoodView.unit);
    }
  }, [dataFoodView]);

  const handleSave = () => {
    console.log("haha");
  };
  return (
    <>
      <MDBModal  show={show} onHide={handleClose}>
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
                  <p className="fw-bold fs-2">View food</p>
                </div>
                <Form noValidate>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Food Name</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="fName"
                          placeholder="fName"
                          aria-describedby="inputGroupPrepend"
                          name="fName"
                          value={foodName}
                          disabled
                          onChange={(e) => setFoodName(e.target.value)}
                          //   isInvalid={
                          //     formik.errors.fName && formik.touched.fName
                          //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="category"
                          placeholder="category"
                          aria-describedby="inputGroupPrepend"
                          name="category"
                          disabled
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
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
                        <label className="form-label">The Quantity</label>
                        <Form.Control
                          type="Number"
                          id="quantity"
                          placeholder="quantity"
                          aria-describedby="inputGroupPrepend"
                          name="quantity"
                          disabled
                          style={{ height: "56px" }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Unit</label>
                        <Form.Control
                          type="Number"
                          id="unit"
                          placeholder="unit"
                          aria-describedby="inputGroupPrepend"
                          name="unit"
                          disabled
                          style={{ height: "56px" }}
                          value={unit}
                        />
                      </div>
                      <div className="row mb-5 mt-4" style={{width: "104%"}}>
                        <div className="mb-3" style={{ width: "50%" }}>
                          <div>
                            <label className="form-label">
                               ImportDate
                            </label>
                            <br />
                            <Space
                              direction="vertical"
                              size={20}
                              style={{ width: "100%" }}
                            >
                              <Form.Control
                                type="date"
                                id="importDate"
                                name="importDate"
                                disabled
                                value={importDate}
                                onChange={(e) => setImportDate(e.target.value)}
                              />
                            </Space>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "48%",marginLeft: "10px" }}>
                          <label className="form-label">
                             ExpiredDate
                          </label>
                          <br />
                          <Space
                            direction="vertical"
                            size={20}
                            style={{ width: "100%" }}
                          >
                            <Form.Control
                              type="date"
                              id="expiredDate"
                              disabled
                              name="expiredDate"
                              value={expiredDate}
                              onChange={(e) => setExpiredDate(e.target.value)}
                            />
                          </Space>
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
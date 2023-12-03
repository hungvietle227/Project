import React, { useState } from "react";
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
import { useFormik, FieldArray } from "formik";
import { Formik, Field, ErrorMessage } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";
import { schemaAnimal } from "./validationAnimal";
// import { schema } from "./validationFood";

export default function AddAnimalFood(pros) {
  const [staticModal, setStaticModal] = useState(false);

  const { show, handleClose } = pros;

  const handleSave = () => {
    // console.log(formik.errors);
    console.log("haha");
  };
  const submitForm = (values) => {
    console.log(values);
    //   const url1 =
    //   "https://localhost:44352/api/Animal?userId=Z0003&StartDate=2023-09-01&EndDate=2023-09-10&cageId=C0001&EntryDate=2023-09-19&OutDate=2023-09-28&foodId=F0001&Amount=4&speciesId=SA001";
    //   const request = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(animal),
    // };
    // // request.body = JSON.stringify(animal)
    // const response = await fetch(url1, request);
    // if (response.ok) {
    //   console.log("Success");
    // }
  };
  // Khai báo state để quản lý mảng foods
  const [foods, setFoods] = useState([
    {
      foodID: "",
      quantity: "",
    },
  ]);
  // Hàm xử lý khi click nút +
  // const handleAdd = () => {
  //   // Tạo mảng mới bằng cách spread ra mảng cũ
  //   // Sau đó thêm phần tử mới vào cuối
  //   const newFoods = [...foods];

  //   newFoods.push(
  //       {
  //           foodID:"",
  //           quantity: ""
  //       });
  //   // Cập nhật lại state với mảng mới
  //   setFoods(newFoods);
  //   console.log(foods)
  //   formik.values.foods = foods;
  // };
  const handleAdd = (push) => {
    push({
      foodID: "",
      quantity: "",
    });
  };

  const handleFoodIDChange = (e, index) => {
    const newFoods = [...foods];
    newFoods[index].foodID = e.target.value;
    setFoods(newFoods);
    console.log(foods);
  };

  // Hàm xử lý thay đổi quantity
  const handleQuantityChange = (e, index) => {
    const newFoods = [...foods];
    newFoods[index].quantity = e.target.value;
    setFoods(newFoods);
  };

  const formik = useFormik({
    initialValues: {
      animalId: "",
      // foodId: "",
      // quantity: "",
      foods: [
        {
          foodID: "",
          quantity: "",
        },
      ],
    },
    // validationSchema: schemaAnimal,
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
                  <p className="fw-bold fs-2">Add Animal Food</p>
                </div>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="mb-3">
                        <label className="form-label">Enter Animal ID</label>
                        <Form.Control
                          type="text"
                          style={{ height: "56px" }}
                          id="animalId"
                          placeholder="animalId"
                          aria-describedby="inputGroupPrepend"
                          name="animalId"
                          value={formik.values.animalId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          //   isInvalid={
                          //     formik.errors.fName && formik.touched.fName
                          //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.fName}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        <Form.Label>Món ăn</Form.Label>
                        <Form.Control
                          as="select"
                          name="foodId"
                          value={formik.values.foodId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={
                            formik.touched.foodId && formik.errors.foodId
                          }
                        >
                          <option value="">Chọn món ăn</option>
                          {foodOptions.map((food) => (
                            <option key={food.id} value={food.id}>
                              {food.name}
                            </option>
                          ))}
                        </Form.Control>
                        {/* {formik.touched.foodId && formik.errors.foodId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.foodId}
                          </Form.Control.Feedback>
                        )} */}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enter The Quantity</label>
                        <Form.Control
                          type="Number"
                          id="quantity"
                          placeholder="quantity"
                          aria-describedby="inputGroupPrepend"
                          name="quantity"
                          style={{ height: "56px" }}
                          value={formik.values.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          //   isInvalid={
                          //     formik.errors.quantity && formik.touched.quantity
                          //   }
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {formik.errors.quantity}
                        </Form.Control.Feedback> */}
                      </div>
                      <div className="mb-3">
                        {/* Lặp qua mảng foods và render từng phần tử */}
                        {/* {foods.map((food, index) => (
                          <div style={{display: "flex"}} key={index}>
                          <Form.Control
                              type="text"
                              // value={food.foodID}
                              name={`foods[${index}].foodID`}
                              style={{width: "45%",marginRight: "34px"}}
                              // onChange={(e) => handleFoodIDChange(e, index)}
                            />
                            <Form.Control
                              type="number"
                              // value={food.quantity}
                              name={`foods[${index}].quantity`}
                              style={{width: "45%"}}
                              // onChange={(e) => handleQuantityChange(e, index)}
                            />
                            </div>
                        ))} */}
                        {/* onClick={handleAdd} */}
                        {/* <Button onClick={() => handleAdd(push)}>More</Button> */}
                        <FieldArray name="foods">
                          {({ push }) => (
                            <div>
                              {foods.map((food, index) => (
                                <div key={index}>
                                  <Form.Control
                                    type="text"
                                    name={`foods[${index}].foodID`}
                                    placeholder="ID món ăn"
                                  />
                                  <Form.Control
                                    type="text"
                                    name={`foods[${index}].quantity`}
                                    placeholder="Số lượng"
                                  />
                                </div>
                              ))}
                              <Button
                                type="button"
                                onClick={() => handleAdd(push)}
                              >
                                +
                              </Button>
                            </div>
                          )}
                        </FieldArray>
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
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div className="row mb-3">
                        <div className="mb-3 row-content">
                          <label className="form-label">
                            Enter Name Animal
                          </label>
                          <Form.Control
                            id="name"
                            type="text"
                            placeholder="name of the animal"
                            aria-describedby="inputGroupPrepend"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.name && formik.touched.name
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        </div>
                        <div className="mb-3 row-content">
                          <label className="form-label">Enter Country</label>
                          <Form.Control
                            type="text"
                            id="region"
                            placeholder="Country"
                            aria-describedby="inputGroupPrepend"
                            name="region"
                            value={formik.values.region}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.region && formik.touched.region
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.region}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="mb-3" style={{ width: "33%" }}>
                          <div>
                            <label
                              className="form-label"
                              style={{ verticalAlign: "middle" }}
                            >
                              Choose Gender
                            </label>
                            <br />
                            <Radio.Group
                              id="gender"
                              name="gender"
                              style={{ height: "33%", width: "100%" }}
                              // onChange={(e) => {
                              //   handleRoleChange(e);
                              // }}
                              value={formik.values.gender}
                              buttonStyle="solid"
                              defaultValue={formik.values.gender}
                              onChange={formik.handleChange}
                            >
                              <Radio.Button
                                style={{
                                  width: "34%",
                                  textAlign: "center",
                                  height: "37px",
                                }}
                                value={true}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  Male
                                </span>
                              </Radio.Button>
                              <Radio.Button
                                style={{
                                  width: "34%",
                                  textAlign: "center ",
                                  height: "37px",
                                }}
                                value={false}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  FeMale
                                </span>
                              </Radio.Button>
                            </Radio.Group>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "33%" }}>
                          <div>
                            <label
                              className="form-label"
                              style={{ verticalAlign: "middle" }}
                            >
                              Is Animal Rarity
                            </label>
                            <br />
                            <Radio.Group
                              id="rarity"
                              name="rarity"
                              style={{ height: "33%", width: "100%" }}
                              // onChange={(e) => {
                              //   handleRoleChange(e);
                              // }}
                              buttonStyle="solid"
                              value={formik.values.rarity}
                              defaultValue={formik.values.rarity}
                              onChange={formik.handleChange}
                            >
                              <Radio.Button
                                style={{
                                  width: "34%",
                                  textAlign: "center",
                                  height: "37px",
                                }}
                                value={true}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  Danger
                                </span>
                              </Radio.Button>
                              <Radio.Button
                                style={{
                                  width: "34%",
                                  textAlign: "center ",
                                  height: "37px",
                                }}
                                value={false}
                              >
                                <span style={{ verticalAlign: "middle" }}>
                                  Normal
                                </span>
                              </Radio.Button>
                            </Radio.Group>
                          </div>
                        </div>
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label className="form-label">
                            Choose Animal Birthday
                          </label>
                          <Form.Control
                            type="date"
                            id="entryDate"
                            aria-describedby="inputGroupPrepend"
                            name="entryDate"
                            value={formik.values.entryDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.entryDate &&
                              formik.touched.entryDate
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {a}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enter healthCheck</label>
                        <Form.Control
                          as="textarea"
                          style={{ height: "100px" }}
                          id="healthCheck"
                          placeholder="healthCheck"
                          aria-describedby="inputGroupPrepend"
                          name="healthCheck"
                          value={formik.values.healthCheck}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.healthCheck &&
                            formik.touched.healthCheck
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.healthCheck}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Enter Description</label>
                        <Form.Control
                          as="textarea"
                          id="description"
                          placeholder="description"
                          aria-describedby="inputGroupPrepend"
                          name="description"
                          style={{ height: "100px" }}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          isInvalid={
                            formik.errors.description &&
                            formik.touched.description
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.description}
                        </Form.Control.Feedback>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Choose Cage for Animal
                        </label>
                        <Form.Select
                          size="lg"
                          placeholder="Chọn món ăn"
                          // style={{ width: "45%" }}
                          onChange={(event) => handleCageSelect(event)}
                        >
                          <option value="">Choose Cage</option>
                          {/* Render các option từ API */}
                          {listCage.map((option) => (
                            <option key={option.cId} value={option.cId}>
                              {option.cId} - MaxCapacity : {option.maxCapacity}{" "}
                              - AnimalQuantity : {option.animalQuantity}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="mb-3" style={{ width: "33%" }}>
                        <div>
                          <label className="form-label">
                            Choose Entry Cage
                          </label>
                          <br />

                          <Form.Control
                            type="date"
                            name="entryCageDate"
                            value={formik.values.entryCageDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.entryCageDate &&
                              formik.touched.entryCageDate
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.entryCageDate}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Choose ZooTrainer for Animal
                        </label>
                        <Form.Select
                          size="lg"
                          placeholder="Chọn món ăn"
                          style={{ width: "85%" }}
                          onChange={(event) => handleTrainerSelect(event)}
                        >
                          <option value="">Choose ZooTrainer</option>
                          {/* Render các option từ API */}
                          {ZooTrainerList.map((option) => (
                            <option key={option.userId} value={option.userId}>
                              <div style={{ height: "50px" }}>
                                {option.email} - MaxCapacity :{" "}
                                {option.firstname} - AnimalQuantity :{" "}
                                {option.lastname}
                              </div>
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="row mb-5 mt-4">
                        <div className="mb-3" style={{ width: "33%" }}>
                          <label className="form-label">
                            Choose Start Train
                          </label>
                          <br />

                          <Form.Control
                            type="date"
                            id="startTrainDate"
                            placeholder="address"
                            aria-describedby="inputGroupPrepend"
                            name="startTrainDate"
                            value={formik.values.startTrainDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.errors.startTrainDate &&
                              formik.touched.startTrainDate
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.startTrainDate}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                      <div className="mb-5" style={{ textAlign: "center" }}>
                        <Form.Label>Enter Animal ID</Form.Label>
                        <Form.Control
                          type="text"
                          id="animalId"
                          name="animalId"
                          // value={values.animalId}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                        />
                      </div>
                      {formik.values.fields.map((field, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          className="mb-3"
                        >
                          <Field
                            name={`fields[${index}].id`}
                            // as="select"
                            // onChange={(e) => handleChange(e.target.value)}
                          >
                            {({ field, form }) => (
                              <Form.Control
                                as="select"
                                {...field}
                                placeholder="Chọn món ăn"
                                style={{ width: "45%" }}
                                onChange={(event) =>
                                  handleFoodSelect(event, field, form)
                                }
                              >
                                <option value="">Chọn món ăn</option>
                                {/* Render các option từ API */}
                                {options.map((option) => (
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
                              </Form.Control>
                            )}
                          </Field>
                          <Field
                            name={`fields[${index}].quantity`}
                            component={Form.Control}
                            style={{ width: "45%" }}
                            className="control-field"
                          />
                          {/* <button onClick={() => removeField(index)}>
        Remove
      </button> */}
                        </div>
                      ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button onClick={addField}>Add</Button>
                        <Button type="submit">Submit</Button>
                      </div>
                      <div className="btn-footer">
                        <div
                          style={{
                            marginRight: "20px",
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
                        <div>
                          <Button
                            style={{ background: "gainsboro" }}
                            variant="primary"
                            type="submit"
                            onClick={submitForm}
                            active
                          >
                            Create animal
                          </Button>
                        </div>
                      </div>
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

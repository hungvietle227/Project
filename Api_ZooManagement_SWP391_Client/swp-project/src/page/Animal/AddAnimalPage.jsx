import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import Password from "antd/es/input/Password";
import { DatePicker, Empty, Radio, Space } from "antd";
import Select from "react-select";
const { RangePicker } = DatePicker;
import { Formik, useFormik, Field, useFormikContext } from "formik";
import FormList from "antd/es/form/FormList";
import { ListGroup, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { EventNoteTwoTone, TouchAppRounded } from "@mui/icons-material";
// import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { creatNewUser } from "../../service/UserService";
import { Navigate, json, useNavigate } from "react-router-dom";
import { MDBCollapse } from "mdb-react-ui-kit";
import { schemaAnimal } from "./validationAnimal";
function AddAnimal(pros) {
  const [options, setOptions] = useState([]);
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorFood, setErrorFood] = useState("");
  const [fields, setFields] = useState([
    {
      mealId: "",
      startEat: "",
      endEat: "",
    },
  ]);
  const getList = () => {
    return fetch("https://localhost:44352/api/Meal/meal").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setOptions(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("North America");
  const [selectedHealthCheck, setSelectedHealthCheck] = useState("Good");
  const [selectedCage, setSelectedCage] = useState();
  const addField = () => {
    setFields([...fields, { mealId: "", startEat: "", endEat: "" }]);
  };
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (value) => {
    // console.log(value)
    setSelectedValues((prev) => [...prev, value]);
  };
  const handleFoodSelect = (event, field, form) => {
    const selectedFoodId = event.target.value;
    setSelectedFoodIds((prevSelectedFoodIds) => [
      ...prevSelectedFoodIds,
      selectedFoodId,
    ]);
    form.setFieldValue(field.name, selectedFoodId);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [listCage, setListCage] = useState([]);
  const [listZooTrainer, setListZooTrainer] = useState([]);
  const [listSpecies, setListSpecies] = useState([]);

  const [selectedAnimalId, setSelectedAnimalId] = useState("");
  const handleCageSelect = (event) => {
    console.log(event.target.value);
  };
  const handleTrainerSelect = (event) => {
    console.log(event.target.value);
  };
  const getCageList = () => {
    return fetch("https://localhost:44352/api/Cage/AvailableCage").then(
      (data) => data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getCageList().then((items) => {
      if (mounted) {
        setListCage(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const getZooTrainerList = () => {
    return fetch("https://localhost:44352/api/User/AvailableTrainers").then(
      (data) => data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getZooTrainerList().then((items) => {
      if (mounted) {
        setListZooTrainer(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const getSpeciesList = () => {
    return fetch("https://localhost:44352/api/AnimalSpecies").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getSpeciesList().then((items) => {
      if (mounted) {
        setListSpecies(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const ZooTrainerList = listZooTrainer.filter((user) => user.role === 3);
  const CageListFilter = listCage.filter((cage) =>
    cage.name.toUpperCase().includes(selectedSpecies.toUpperCase())
  );
  const handleClick = () => {
    setShowmodalAdd(true);
    setAnchorEl(null);
  };

  const handleClick4 = (value) => {
    console.log(value);
  };
  const [selectedEnclosure, setSelectedEnclosure] = useState("");

  //-----------------------------------
  // const [test, setTest] = useState(species);
  //----------------------------------
  const handleSelect = (e) => {
    setSelectedCage(e.target.value);
  };
  const { show, handleClose } = pros;
  const navigator = useNavigate();
  const submitForm = async (values) => {
    // values.fields.forEach(field => {
    //   if (!field.id) {
    //     setErrorFood('Food ID is required');
    //   } else if (field.id) {
    //     setErrorFood(null);
    //   } if (!field.quantity) {
    //     setErrorQuantity('Quantity is required');
    //   } else if (field.quantity) {
    //     setErrorQuantity(null);
    //   }
    //   return;
    // })
    console.log(values);
    const userId = values.userId;
    const cageId = values.cageId;
    let img = "";
    if (values.animalImage != "") {
      img = values.animalImage;
    }
    const date = new Date();
    const animal = {
      name: values.name,
      description: values.description,
      sex: values.gender,
      region: values.region,
      healthCheck: values.healthCheck,
      birthday: values.birthday,
      rarity: values.rarity,
      entryCageDate: date,
      startTrainDate: date,
      animalImage: img,
      speciesName: values.species,
      animalMeals: values.fields,
    };
    const params = {
      userId: values.userId,
      cageId: values.cageId,
    };
    console.log(params);
    console.log(animal);
    const url = `https://localhost:44352/api/Animal/Animal?${new URLSearchParams(
      params
    )}`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    };
    // const response = await fetch(
    //   `https://localhost:44352/api/Animal/Animal?userId=${values.userId}&cageId=${values.cageId}`,
    //   request
    // );
    if (values.userId != undefined && values.cageId != undefined) {
      const response = await fetch(url, request);
      if (response.ok) {
        toast.success("Create successfully");
        navigator("/staff/2");
        window.location.reload();
      } else {
        toast.error("Create fail");
      }
    }
  };
  const a = "huhu";
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog size="xl">
          {/* style={{ height: "890px" }} */}
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Animal</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-container-1">
                <div className="form-header">
                  <p className="fw-bold fs-2">Create Animal</p>
                </div>
                <Formik
                  initialValues={{
                    name: "",
                    region: "North America",
                    description: "",
                    gender: true,
                    healthCheck: "Good",
                    birthday: "",
                    startTrainDate: "",
                    cageId: "",
                    species: "",
                    entryCageDate: "",
                    rarity: true,
                    fields,
                    animalImage: "",
                    userId: "",
                  }}
                  validationSchema={schemaAnimal}
                  onSubmit={(values, errors) => {
                    submitForm(values, errors);
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
                    <Form onSubmit={handleSubmit}>
                      <div className="form-content mb-3">
                        <div className="form">
                          <div className="label-info">
                            <label>Animal Information Basic</label>
                          </div>
                          <div className="mb-3 Animal_Infomation">
                            <div className="row mb-3">
                              <div className="mb-3" style={{ width: "33%" }}>
                                <label className="form-label">
                                  Enter Name Animal
                                </label>
                                <Form.Control
                                  id="name"
                                  type="text"
                                  placeholder="Name of the animal"
                                  aria-describedby="inputGroupPrepend"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={errors.name && touched.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.name}
                                </Form.Control.Feedback>
                              </div>
                              <div className="mb-3" style={{ width: "33%" }}>
                                <label className="form-label">
                                  Choose Region
                                </label>
                                <Field name="region">
                                  {() => (
                                    <Form.Select
                                      value={values.region}
                                      onChange={(e) => {
                                        setFieldValue("region", e.target.value);
                                        setSelectedRegion(e.target.value);
                                      }}
                                    >
                                      <option value="North America">
                                        North America
                                      </option>
                                      <option value="South America">
                                        South America
                                      </option>
                                      <option value="Central America">
                                        Central America
                                      </option>
                                      <option value="Caribbean">
                                        Caribbean
                                      </option>
                                      <option value="Central & South Asia">
                                        Central & South Asia
                                      </option>
                                      <option value="Northeastern Asia">
                                        Northeastern Asia
                                      </option>
                                      <option value="Australia and Oceania">
                                        Australia and Oceania
                                      </option>
                                      <option value="Northern Europe">
                                        Northern Europe
                                      </option>
                                      <option value="Southern Europe">
                                        Southern Europe
                                      </option>
                                      <option value="Eastern Europe">
                                        Eastern Europe
                                      </option>
                                      <option value="Western Europe">
                                        Western Europe
                                      </option>
                                      <option value="Middle East">
                                        Middle East
                                      </option>
                                      <option value="Northern Africa">
                                        Northern Africa
                                      </option>
                                      <option value="Southern Africa">
                                        Southern Africa
                                      </option>
                                    </Form.Select>
                                  )}
                                </Field>
                              </div>
                              <div className="mb-3" style={{ width: "33%" }}>
                                <label className="form-label">
                                  Choose species
                                </label>
                                <Field name="species">
                                  {() => (
                                    <div>
                                      <Form.Select
                                        value={values.species}
                                        id="species"
                                        name="species"
                                        onBlur={handleBlur}
                                        isInvalid={
                                          errors.species && touched.species
                                        }
                                        onChange={(e) => {
                                          setFieldValue(
                                            "species",
                                            e.target.value
                                          );
                                          setSelectedSpecies(e.target.value);
                                        }}
                                      >
                                        <option value={null}>
                                          Choose Species
                                        </option>
                                        {/* Render các option từ API */}
                                        {listSpecies.map((option) => (
                                          <option
                                            key={option.speciesName}
                                            value={option.speciesName}
                                          >
                                            <div style={{ height: "50px" }}>
                                              {option.speciesName}
                                            </div>
                                          </option>
                                        ))}
                                      </Form.Select>
                                      <Form.Control.Feedback type="invalid">
                                        {errors.species}
                                      </Form.Control.Feedback>
                                    </div>
                                  )}
                                </Field>
                              </div>
                            </div>
                            <div className="row mb-2">
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
                                    value={values.gender}
                                    buttonStyle="solid"
                                    defaultValue={values.gender}
                                    onChange={handleChange}
                                  >
                                    <Radio
                                      style={{
                                        width: "34%",
                                      }}
                                      value={true}
                                    >
                                      <span style={{ verticalAlign: "middle" }}>
                                        Male
                                      </span>
                                    </Radio>
                                    <Radio
                                      style={{
                                        width: "34%",
                                      }}
                                      value={false}
                                    >
                                      FeMale
                                    </Radio>
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
                                    value={values.rarity}
                                    defaultValue={values.rarity}
                                    onChange={handleChange}
                                  >
                                    <Radio
                                      style={{
                                        width: "34%",
                                      }}
                                      value={true}
                                    >
                                      Danger
                                    </Radio>
                                    <Radio
                                      style={{
                                        width: "34%",
                                      }}
                                      value={false}
                                    >
                                      Normal
                                    </Radio>
                                  </Radio.Group>
                                </div>
                              </div>
                              <div className="mb-3" style={{ width: "33%" }}>
                                <label className="form-label">
                                  Choose Animal Birthday
                                </label>
                                <Form.Control
                                  type="date"
                                  id="birthday"
                                  aria-describedby="inputGroupPrepend"
                                  name="birthday"
                                  value={values.birthday}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.birthday && touched.birthday
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.birthday}
                                </Form.Control.Feedback>
                              </div>
                            </div>
                            <div
                              className="mb-3"
                              style={{ marginRight: "20px" }}
                            >
                              <label className="form-label">
                                Choose Health Check
                              </label>
                              <Field name="healthCheck">
                                {() => (
                                  <Form.Select
                                    value={values.healthCheck}
                                    style={{ height: "45px", width: "28%" }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "healthCheck",
                                        e.target.value
                                      );
                                      setSelectedHealthCheck(e.target.value);
                                    }}
                                  >
                                    <option value="Good">
                                      <div style={{ height: "50px" }}>Good</div>
                                    </option>
                                    <option value="Sickness">
                                      <div style={{ height: "50px" }}>
                                        Sickness
                                      </div>
                                    </option>
                                  </Form.Select>
                                )}
                              </Field>
                            </div>
                            <div
                              className="mb-2"
                              style={{ marginRight: "20px" }}
                            >
                              <label className="form-label">
                                Enter Description
                              </label>
                              <Form.Control
                                as="textarea"
                                id="description"
                                placeholder="Description"
                                aria-describedby="inputGroupPrepend"
                                name="description"
                                style={{ height: "100px" }}
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={
                                  errors.description && touched.description
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.description}
                              </Form.Control.Feedback>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Choose Image</label>
                              <Form.Control
                                type="file"
                                id="animalImage"
                                placeholder="animalImage"
                                aria-describedby="inputGroupPrepend"
                                name="animalImage"
                                value={values.animalImage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                          <div className="label-info">
                            <label>Cage Information</label>
                          </div>
                          <div className="mb-3 Cage_Infomation">
                            <div className="mb-3">
                              <label className="form-label">
                                Choose Cage for Animal
                              </label>
                              <Form.Select
                                size="lg"
                                placeholder="Chọn món ăn"
                                id="cageId"
                                name="cageId"
                                style={{ width: "85%" }}
                                // onChange={(event) => handleCageSelect(event)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.cageId && touched.cageId}
                              >
                                <option value={null}>Choose Cage</option>
                                {/* Render các option từ API */}
                                {CageListFilter.map((option) => (
                                  <option key={option.cId} value={option.cId}>
                                    {option.cId} - Cage Name : {option.name} -
                                    MaxCapacity : {option.maxCapacity} -
                                    AnimalQuantity : {option.animalQuantity}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.cageId}
                              </Form.Control.Feedback>
                            </div>
                            {/* <div className="mb-3" style={{ width: "33%" }}>
                              <div>
                                <label className="form-label">
                                  Choose Entry Cage
                                </label>
                                <br />
                                <Form.Control
                                  type="date"
                                  name="entryCageDate"
                                  value={values.entryCageDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.entryCageDate &&
                                    touched.entryCageDate
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.entryCageDate}
                                </Form.Control.Feedback>
                              </div>
                            </div> */}
                          </div>
                          <div className="label-info">
                            <label>Zoo Trainer Information</label>
                          </div>
                          <div className="mb-3 ZooTrainer-Information">
                            <div className="mb-3">
                              <label className="form-label">
                                Choose Zoo Trainer for Animal
                              </label>
                              <Form.Select
                                size="lg"
                                id="userId"
                                name="userId"
                                placeholder="Chọn món ăn"
                                style={{ width: "85%" }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.userId && touched.userId}
                              >
                                <option value={null}>Choose Zoo Trainer</option>
                                {/* Render các option từ API */}
                                {ZooTrainerList.map((option) => (
                                  <option
                                    key={option.userId}
                                    value={option.userId}
                                  >
                                    <div style={{ height: "50px" }}>
                                      ZooTrainerID : {option.userId} - FullName
                                      :{" "}
                                      {option.firstname + " " + option.lastname}{" "}
                                      - Training Animal: {option.countAnimal}
                                    </div>
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.userId}
                              </Form.Control.Feedback>
                              {values.userId && console.log(values.userId)}
                            </div>
                            {/* <div className="row mb-3 mt-4">
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
                                  value={values.startTrainDate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.startTrainDate &&
                                    touched.startTrainDate
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.startTrainDate}
                                </Form.Control.Feedback>
                              </div>
                            </div> */}
                          </div>
                          <div className="label-info">
                            <label>Meal Information</label>
                          </div>
                          <div className="Food-Information">
                            <div className="mb-3">
                              {fields.map((field, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                  className="mb-3"
                                >
                                  <div
                                    style={{
                                      width: "45%",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <label className="form-label">
                                      Choose Meal For Animal
                                    </label>
                                    <div style={{ display: "flex" }}>
                                      <div
                                        className="mb-2"
                                        style={{
                                          width: "40%",
                                          marginRight: "15px",
                                        }}
                                      >
                                        <Form.Control
                                          value={searchValue}
                                          onChange={handleSearch}
                                        />
                                      </div>
                                      <div style={{ width: "60%" }}>
                                        <Field
                                          name={`fields[${index}].mealId`}
                                          // as="select"
                                          // onChange={(e) => handleChange(e.target.value)}
                                        >
                                          {({ field, form }) => (
                                            <Form.Select
                                              {...field}
                                              value={field.foodId}
                                              placeholder="Chọn món ăn"
                                              onChange={(event) =>
                                                handleFoodSelect(
                                                  event,
                                                  field,
                                                  form
                                                )
                                              }
                                            >
                                              <option value={null}>
                                                Choose Meal
                                              </option>
                                              {options
                                                .filter((option) =>
                                                  option.mealName
                                                    .toUpperCase()
                                                    .includes(
                                                      searchValue.toUpperCase()
                                                    )
                                                )
                                                .map((option) => (
                                                  <option
                                                    key={option.mealId}
                                                    value={option.mealId}
                                                    disabled={selectedFoodIds.includes(
                                                      option.mealId
                                                    )}
                                                  >
                                                    {option.mealName}
                                                  </option>
                                                ))}
                                            </Form.Select>
                                          )}
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: "25%",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <label className="form-label">
                                      Choose Start Eat
                                    </label>
                                    <Field
                                      name={`fields[${index}].startEat`}
                                      component="input"
                                      style={{ width: "80%" }}
                                      type="date"
                                      placeholder="Enter time to feed animal"
                                      className="control-field"
                                      // `style={{
                                      //   width: "30%",
                                      //   marginRight: "20px",
                                      // }}`
                                    />
                                  </div>
                                  <div
                                    style={{
                                      width: "25%",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <label className="form-label">
                                      Choose End Eat
                                    </label>
                                    <Field
                                      style={{ width: "80%" }}
                                      name={`fields[${index}].endEat`}
                                      component="input"
                                      type="date"
                                      placeholder="Enter time to feed animal"
                                      className="control-field"
                                    />
                                  </div>
                                  {/* <button onClick={() => removeField(index)}>
                          Remove
                        </button> */}
                                </div>
                              ))}
                              {errors.fields && (
                                <>
                                  <div style={{ color: "red" }}>
                                    Choose Meal ID
                                  </div>
                                  <div style={{ color: "red" }}>
                                    Start Eat must be after or equal Day Now
                                  </div>
                                  <div style={{ color: "red" }}>
                                    End Eat must be after Start Eat Date
                                  </div>
                                  {console.log(errors.fields)}
                                </>
                              )}
                            </div>
                            {fields.length < options.length && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button onClick={addField}>More</Button>
                              </div>
                            )}
                          </div>
                        </div>
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
                            style={{
                              width: "80px",
                              color: "white",
                              backgroundColor: "red",
                            }}
                          >
                            Close
                          </Button>
                        </div>
                        <div>
                          <Button
                            style={{
                              background: "blue",
                              color: "white",
                              marginRight: "60px",
                            }}
                            variant="primary"
                            type="submit"
                            onClick={submitForm}
                            active
                          >
                            Create animal
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
export default AddAnimal;

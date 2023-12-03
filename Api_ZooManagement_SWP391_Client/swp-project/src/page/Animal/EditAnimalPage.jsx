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
import { Navigate, json, useNavigate } from "react-router-dom";
import { DatePicker, Radio, Select, Space } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/css/dashboard.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { MDBIcon } from "mdb-react-ui-kit";
export default function EditAnimal(pros) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { show, handleClose, dataAnimalEdit } = pros;
  const [isNew, setIsNew] = useState(false);
  const [isNew2, setIsNew2] = useState(false);
  const [region, setRegion] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [name, setName] = useState("");
  const [cageID, setCageID] = useState("");
  const [userID, setUserID] = useState("");
  const [gender, setGender] = useState("");
  const [healthCheck, setHealthCheck] = useState("");
  const [description, setDescription] = useState("");
  const [birthday, setBirthday] = useState("");
  const [entryCage, setEntryCage] = useState("");
  const [startTrain, setStartTrain] = useState("");
  const [species, setSpecies] = useState("");
  const [rarity, setRarity] = useState(true);
  const [entryAnimal, setEntryAnimal] = useState("");
  const [endTraining, setEndTraining] = useState("");
  const [outCage, setOutCage] = useState(null);
  const [listCage, setListCage] = useState([]);
  const [listZooTrainer, setListZooTrainer] = useState([]);
  const [options, setOptions] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [status, setStatus] = useState(true);
  const [foods, setFoods] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [error, setErros] = useState("");
  const [isValidOutCage, setIsValidOutCage] = useState(true);
  const [isValidTrainerDate, setIsValidTrainerDate] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidStartEat, setIsValidStartEat] = useState(true);
  const [isValidEndEat, setIsValidEndEat] = useState(true);
  // const [selectedFoodId, setSelectedFoodId] = useState("");
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const [selectedScheduleIds, setSelectedScheduleIds] = useState([]);
  const [listTrainerOld, setListTrainerOld] = useState([]);
  const [listCageOld, setListCageOld] = useState([]);
  const [list3, setList3] = useState([]);
  const [availableTrainer, setAvailableTrainer] = useState([]);
  const [availableCage, setAvailableCage] = useState([]);

  const validateOutCageDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Kiểm tra nếu selectedDate là một ngày hợp lệ và không lớn hơn currentDate
    if (
      selectedDate instanceof Date &&
      !isNaN(selectedDate) &&
      selectedDate <= currentDate
    ) {
      setIsValidOutCage(true);
      // Xử lý logic khi ngày hợp lệ
    } else {
      setIsValidOutCage(false);
      // Xử lý logic khi ngày không hợp lệ
    }
  };
  const handle = () => {
    handleClose();
    // window.location.reload();
  };
  const validateTrainerDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Kiểm tra nếu selectedDate là một ngày hợp lệ và không lớn hơn currentDate
    if (
      selectedDate instanceof Date &&
      !isNaN(selectedDate) &&
      selectedDate <= currentDate
    ) {
      setIsValidTrainerDate(true);
      // Xử lý logic khi ngày hợp lệ
    } else {
      setIsValidTrainerDate(false);
      // Xử lý logic khi ngày không hợp lệ
    }
  };
  const validateAmountFood = (value) => {
    const amout = Number(value);
    if (!isNaN(amout) && amout >= 1) {
      setIsValidAmount(true);
    } else {
      setIsValidAmount(false);
    }
  };
  const validateStartEat = (value) => {
    const startEatDate = new Date(value);
    const entryCageDate = new Date(entryCage);
    entryCageDate.setDate(entryCageDate.getDate() - 1)
    if (startEatDate > entryCageDate) {
      // valid
      setIsValidStartEat(true)
    } else {
      setIsValidStartEat(false)
    }
  };
  const validateEndEat = (value) => {
    const EndEatDate = new Date(value);
    foods.forEach(food => {
      const startEatDate = new Date(food.startEat);
      if (!(EndEatDate >= startEatDate)) {
        setIsValidEndEat(false)
      } else {
        setIsValidEndEat(true)
      }
    })
  };
  const validateDescription = (value) => {
    const description = String(value);
    if (description.trim().length === 0 && description.length <= 2) {
      setIsValidDescription(false);
    } else {
      setIsValidDescription(true);
    }
  };
  const handleOutCageChange = (event) => {
    setOutCage(event.target.value);
    validateOutCageDate(event.target.value);
  };
  const handleEndTrainingDate = (event) => {
    setEndTraining(event.target.value);
    validateTrainerDate(event.target.value);
  };
  const handleFoodChange = (id, event) => {
    validateAmountFood(event.target.value);
    const newFood = foods.map((food) => {
      if (food.mealId === id) {
        food.amount = Number(event.target.value);
      }
      return food;
    });
    setFoods(newFood);
  };
  const handleStartEatDateChange = (id, event) => {
    validateStartEat(event.target.value);
    const newFood = foods.map((food) => {
      if (food.mealId === id) {
        food.startEat = event.target.value;
      }
      return food;
    });
    setFoods(newFood);
  };
  const handleEndEatDateChange = (id, event) => {
    validateEndEat(event.target.value);
    const newFood = foods.map((food) => {
      if (food.mealId === id) {
        food.endEat = event.target.value;
      }
      return food;
    });
    setFoods(newFood);
  };
  const handleTimeEatChange = (id, event) => {
    const newSchedule = schedules.map((schedule) => {
      if (schedule.scheduleId === id) {
        schedule.time = event.target.value;
      }
      return schedule;
    });
    setSchedules(newSchedule);
  };
  const handleDescriptionChange = (id, event) => {
    validateDescription(event.target.value);
    const newSchedule = schedules.map((schedule) => {
      if (schedule.scheduleId === id) {
        schedule.description = event.target.value;
      }
      return schedule;
    });
    setSchedules(newSchedule);
  };
  useEffect(() => {
    const array = [];
    const foodIds1 = foods.map((food) => food.mealId);
    array.push(foodIds1);
    console.log(array);
    setSelectedFoodIds(foodIds1);
    console.log(foodIds1);
    console.log(selectedFoodIds);
  }, [dataAnimalEdit, foods]);

  useEffect(() => {
    const array = [];
    const scheduleIds1 = schedules.map((schedule) => schedule.scheduleId);
    array.push(scheduleIds1);
    console.log(array);
    setSelectedScheduleIds(scheduleIds1);
  }, [dataAnimalEdit, schedules]);
  const handleFoodSelect = (e, index) => {
    // setSelectedFoodId(e.target.value);
    console.log(e.target.value);
    // Lấy ra food object từ options
    const selectedFoodId = e.target.value;
    // setSelectedFoodIds((prevSelectedFoodIds) => [
    //   ...prevSelectedFoodIds,
    //   selectedFoodId,
    // ]);
    setSelectedFoodIds([...selectedFoodIds, e.target.value]);
    console.log(selectedFoodIds);

    const selectedFood = options.find((o) => o.mealId === e.target.value);
    console.log(selectedFood.mealId);
    console.log(e.target.value);
    console.log(index);
    // Cập nhật lại cho food hiện tại
    const currentFood = foods[index];
    currentFood.mealId = selectedFood.mealId;
    console.log(currentFood);
    setFoods([...foods]);
  };

  const handleScheduleSelect = (e, index) => {
    // setSelectedFoodId(e.target.value);
    console.log(e.target.value);
    // Lấy ra food object từ options
    const selectedFoodId = e.target.value;
    // setSelectedFoodIds((prevSelectedFoodIds) => [
    //   ...prevSelectedFoodIds,
    //   selectedFoodId,
    // ]);
    setSelectedScheduleIds([...selectedScheduleIds, e.target.value]);
    console.log(selectedScheduleIds);

    const selectedSchedule = scheduleList.find((o) => o.scheduleId === e.target.value);
    console.log(selectedSchedule.scheduleId);
    console.log(e.target.value);
    console.log(index);
    // Cập nhật lại cho food hiện tại
    const currentFood = schedules[index];
    currentFood.scheduleId = selectedSchedule.scheduleId;
    console.log(currentFood);
    setSchedules([...schedules]);
  };

  const handleAdd = () => {
    setIsNew(true);
    // Thêm mới object vào cuối mảng
    setFoods([
      ...foods,
      {
        mealId: "",
        startEat: "",
        endEat: "",
      },
    ]);
  };
  const handleAdd2 = () => {
    setIsNew2(true);
    // Thêm mới object vào cuối mảng
    setSchedules([
      ...schedules,
      {
        scheduleId: "",
        time: "",
        description: "",
      },
    ]);
  };
  const removeField = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };
  const removeField2 = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };
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

  useEffect(() => {
    const getScheduleList = () => {
      return fetch("https://localhost:44352/api/Schedule").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getScheduleList().then((items) => {
      if (mounted) {
        setScheduleList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    if (show) {
      setRegion(dataAnimalEdit.region),
        setName(dataAnimalEdit.name),
        setAnimalId(dataAnimalEdit.animalId),
        setCageID(dataAnimalEdit.cId),
        setUserID(dataAnimalEdit.userId),
        setGender(dataAnimalEdit.sex === true ? "male" : "female"),
        setHealthCheck(dataAnimalEdit.healthCheck),
        setDescription(dataAnimalEdit.description),
        setBirthday(dataAnimalEdit.birthday.slice(0, 10)),
        setEntryCage(dataAnimalEdit.entryCageDate.slice(0, 10)),
        setStartTrain(dataAnimalEdit.startTrainDate.slice(0, 10)),
        setEndTraining(
          dataAnimalEdit.endTrainDate === null
            ? null
            : dataAnimalEdit.endTrainDate.slice(0, 10)
        ),
        setOutCage(
          dataAnimalEdit.outCageDate === null
            ? null
            : dataAnimalEdit.outCageDate.slice(0, 10)
        ),
        setSpecies(dataAnimalEdit.speciesName),
        setRarity(dataAnimalEdit.rarity);
      setFoods(dataAnimalEdit.meals);
      setSchedules(dataAnimalEdit.schedules);
    }
  }, [dataAnimalEdit]);

  useEffect(() => {
    const list3 = [];
    const foodIds1 = foods.map((food) => food.foodId);
    options.forEach((food) => {
      if (!foodIds1.includes(food.foodId)) {
        list3.push(food);
      }
    });
    console.log(list3);
    setList3(list3);
  }, [dataAnimalEdit, foods]);
  const getCageList = () => {
    return fetch("https://localhost:44352/api/Cage/AvailableCage").then((data) =>
      data.json()
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
    return fetch("https://localhost:44352/api/User/AvailableTrainers").then((data) =>
      data.json()
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:44352/api/Animal/${animalId}/oldtrainers`
      );
      const data = await response.json();
      setListTrainerOld(data);
    };
    if (animalId) {
      fetchData();
    }
  }, [animalId, userID, show]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:44352/api/Animal/${animalId}/oldcages`
      );
      const data = await response.json();
      setListCageOld(data);
    };
    if (animalId) {
      fetchData();
    }
  }, [animalId, cageID, show]);

  useEffect(() => {
    const ZooTrainerList = listZooTrainer.filter((user) => user.role === 3);
    const oldTrainerId = listTrainerOld.map((user) => user.userId);
    const test1 = [];
    const test = ZooTrainerList.map((value) => {
      if (!oldTrainerId.includes(value.userId)) {
        test1.push(value);
        setAvailableTrainer(test1);
      }
    });
  }, [listZooTrainer, listTrainerOld, userID, show]);
  console.log(availableTrainer);
  useEffect(() => {
    const oldCageId = listCageOld.map((cage) => cage.cId);
    const test2 = [];
    const test = listCage.map((value) => {
      if (!oldCageId.includes(value.cId)) {
        test2.push(value);
        setAvailableCage(test2);
      }
    });
  }, [listCage, listCageOld, cageID, show]);
  console.log(availableCage);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (healthCheck === "") {
      setErros("HealthCheck can't be null");
      return;
    } else if (healthCheck != "") {
      setErros(null);
    }
    if (description === "") {
      setErros("Description can't be null");
      return;
    } else if (description != "") {
      setErros(null);
    } else if (isValidOutCage === false) {
      return;
    } else if (isValidTrainerDate === false) {
      return;
    } else if (isValidAmount === false) {
      return;
    } else if (isValidDescription === false) {
      return;
    } else if (isValidStartEat === false) {
      return;
    } else if (isValidEndEat === false) {
      return;
    }

    const formattedMeals = foods.map(meal => {
      return {
        mealId: meal.mealId,
        startEat: meal.startEat,
        endEat: meal.endEat
      }
    });
    const animalEdit = {
      animalId: animalId,
      userId: userID,
      cageId: cageID,
      description: description,
      healthCheck: healthCheck,
      status: status,
      rarity: rarity,
      endTrainDate: null,
      outCageDate: null,
      animalMeals: formattedMeals,
      animalSchedules: schedules,
    };
    console.log("OK");
    console.log(animalEdit);
    const response = await fetch(
      `https://localhost:44352/api/Animal/${animalId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalEdit),
      }
    );
    if (response.ok) {
      console.log("Success");
      toast.success("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      // window.location.href = "/staff/2";
      // if (role === "ZOOTRAINER") {
      //   navigate("/ZooTrainer/2");
      // } else {
      //   navigate("/staff/2");
      // }
      // window.location.reload();
    } else {
      toast.error("Error")
    }
  };
  return (
    <>
      <MDBModal show={show} onHide={handleClose}>
        <MDBModalDialog size="xl">
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
                  <p className="fw-bold fs-2">Edit Animal</p>
                </div>
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      {error && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "30px",
                            textAlign: "center",
                          }}
                        >
                          {error}
                        </div>
                      )}
                      <div className="label-info">
                        <label>Animal Information Basic</label>
                      </div>
                      <div className="mb-3 Animal_Infomation">
                        <div className="row mb-3">
                          <div className="mb-3" style={{ width: "33%" }}>
                            <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Name Animal</label>
                            <Form.Control
                              id="name"
                              type="text"
                              placeholder="name of the animal"
                              disabled
                              aria-describedby="inputGroupPrepend"
                              name="name"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                            // isInvalid={
                            //   formik.errors.first_name &&
                            //   formik.touched.first_name
                            // }
                            />
                            {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.first_name}
                          </Form.Control.Feedback> */}
                          </div>
                          <div className="mb-3" style={{ width: "33%" }}>
                            <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Region</label>
                            <Form.Control
                              type="text"
                              id="region"
                              placeholder="region"
                              aria-describedby="inputGroupPrepend"
                              disabled
                              name="region"
                              value={region}
                              onChange={(event) =>
                                setRegion(event.target.value)
                              }
                            // isInvalid={
                            //   formik.errors.last_name &&
                            //   formik.touched.last_name
                            // }
                            />
                            {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.last_name}
                          </Form.Control.Feedback> */}
                          </div>
                          <div className="mb-3" style={{ width: "33%" }}>
                            <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Species Animal</label>
                            <Form.Control
                              type="string"
                              id="species"
                              disabled
                              placeholder="Species Animal"
                              aria-describedby="inputGroupPrepend"
                              name="species"
                              value={species}
                            // value={formik.values.species}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // isInvalid={phone == nul}
                            />
                            <Form.Control.Feedback type="invalid">
                              Haha
                            </Form.Control.Feedback>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="mb-3" style={{ width: "25%" }}>
                            <div>
                              <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Gender</label>
                              <br />
                              <Radio.Group
                                id="gender"
                                name="gender"
                                style={{ height: "33%", width: "100%" }}
                                // onChange={(e) => {
                                //   handleRoleChange(e);
                                // }}
                                value={gender}
                                buttonStyle="solid"
                                disabled
                              >
                                {gender === "male" && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value="male"
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      Male
                                    </span>
                                  </Radio>
                                )}
                                {gender === "female" && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value="female"
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      Female
                                    </span>
                                  </Radio>
                                )}
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="mb-3" style={{ width: "25%" }}>
                            <div>
                              <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Status</label>
                              <br />
                              <Radio.Group
                                id="status"
                                name="status"
                                disabled
                                style={{ height: "33%", width: "100%" }}
                                onChange={(e) => {
                                  setStatus(e.target.value);
                                }}
                                value={status}
                                buttonStyle="solid"
                              >
                                {status === true && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value={true}
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      Available
                                    </span>
                                  </Radio>
                                )}
                                {status === false && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value={false}
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      Deadth
                                    </span>
                                  </Radio>
                                )}
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="mb-3" style={{ width: "25%" }}>
                            <div>
                              <label
                                className="form-label"
                                style={{ color: "#813528", fontWeight: "bolder", verticalAlign: "middle" }}
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
                                value={rarity}
                                buttonStyle="solid"
                                disabled
                                onChange={(event) =>
                                  setRarity(event.target.value)
                                }
                              >
                                {rarity === true && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value={true}
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      Rarity
                                    </span>
                                  </Radio>
                                )}
                                {rarity === false && (
                                  <Radio
                                    style={{
                                      width: "40%",
                                    }}
                                    value={false}
                                  >
                                    <span style={{ verticalAlign: "middle", fontWeight: "bolder" }}>
                                      None
                                    </span>
                                  </Radio>
                                )}
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="mb-3" style={{ width: "25%" }}>
                            <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Birthday</label>
                            <br />
                            <Space
                              direction="vertical"
                              size={20}
                              style={{ width: "100%" }}
                            >
                              <Form.Control
                                type="date"
                                name="birthDay"
                                value={birthday}
                                disabled
                                onChange={(event) =>
                                  setBirthday(event.target.value)
                                }
                              />
                            </Space>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Health Check</label>
                          {/* <Form.Control
                            as="textarea"
                            style={{ height: "90px", width: "98%" }}
                            id="healthCheck"
                            placeholder="healthCheck"
                            aria-describedby="inputGroupPrepend"
                            name="healthCheck"
                            value={healthCheck}
                            onChange={(event) =>
                              setHealthCheck(event.target.value)
                            }
                          /> */}
                          <Form.Select
                            className="mt-3"
                            value={healthCheck}
                            style={{ height: "40px", width: "28%" }}
                            onChange={(e) => {
                              setHealthCheck(e.target.value)
                            }}
                          >
                            <option value="Good">
                              <div style={{ height: "50px" }}>Good</div>
                            </option>
                            <option value="Sickness">
                              <div style={{ height: "50px" }}>Sickness</div>
                            </option>
                            <option value="Being treatment">
                              <div style={{ height: "50px" }}>Being treatment</div>
                            </option>
                          </Form.Select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>Description</label>
                          <Form.Control
                            as="textarea"
                            id="description"
                            placeholder="description"
                            aria-describedby="inputGroupPrepend"
                            name="description"
                            style={{ height: "90px", width: "98%" }}
                            value={description}
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
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
                        <div style={{ textAlign: "end" }}>
                          <Button
                            type="submit"
                            variant="text"
                            style={{ padding: 0, marginRight: "18px" }}
                          >
                            <MDBIcon fas icon="edit" size="2x" />
                          </Button>
                        </div>
                      </div>

                      <div className="label-info">
                        <label>Cage Information</label>
                      </div>
                      <div
                        className="mb-3 Cage_Infomation"
                        style={{ paddingRight: "25px" }}
                      >
                        <div className="mb-3">
                          <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                            Choose Cage for Animal
                          </label>
                          <Form.Select
                            size="lg"
                            placeholder="Chọn món ăn"
                            id="cageId"
                            name="cageId"
                            style={{ width: "85%" }}
                            onChange={(event) => setCageID(event.target.value)}
                          // onChange={handleChange}
                          >
                            {/* <option value="">Choose Cage</option> */}
                            {/* Render các option từ API */}
                            {availableCage.map((option) => (
                              <option
                                key={option.cId}
                                value={option.cId}
                                selected={option.cId === cageID}
                              >
                                {option.cId} - Cage Name : {option.name} -
                                MaxCapacity : {option.maxCapacity} -
                                AnimalQuantity : {option.animalQuantity}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <div
                          className="mb-3"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ width: "40%" }}>
                            <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                              Entry Cage
                            </label>
                            <br />
                            <Form.Control
                              type="date"
                              name="entryCageDate"
                              value={entryCage}
                              disabled
                              onChange={(event) =>
                                setEntryCage(event.target.value)
                              }
                            // isInvalid={
                            //   formik.errors.entryCageDate &&
                            //   formik.touched.entryCageDate
                            // }
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                {formik.errors.entryCageDate}
                              </Form.Control.Feedback> */}
                          </div>
                          {/* <div className="mb-3" style={{ width: "40%" }}>
                            <label className="form-label">
                              Choose Out Cage
                            </label>
                            <Form.Control
                              type="date"
                              id="outCage"
                              aria-describedby="inputGroupPrepend"
                              name="outCage"
                              value={outCage}
                              // onChange={(event) =>
                              //   setOutCage(event.target.value)
                              // }
                              onChange={handleOutCageChange}
                              isInvalid={!isValidOutCage}
                            // isInvalid={
                            //   formik.errors.last_name &&
                            //   formik.touched.last_name
                            // }
                            />
                            <Form.Control.Feedback type="invalid">
                              Ngày không hợp lệ hoặc lớn hơn ngày hiện tại.
                            </Form.Control.Feedback>
                          </div> */}
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <Button
                            type="submit"
                            variant="text"
                            style={{ padding: 0 }}
                          >
                            <MDBIcon fas icon="edit" size="2x" />
                          </Button>
                        </div>
                      </div>
                      <div className="label-info">
                        <label>ZooTrainer Information</label>
                      </div>
                      <div className="mb-3 ZooTrainer-Information">
                        <div className="mb-3">
                          <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                            Choose ZooTrainer for Animal
                          </label>
                          <Form.Select
                            size="lg"
                            id="userId"
                            name="userId"
                            placeholder="Chọn món ăn"
                            style={{ width: "85%" }}
                            onChange={(evnet) => setUserID(evnet.target.value)}
                          >
                            {/* Render các option từ API */}
                            {availableTrainer.map((option) => (
                              <option
                                key={option.userId}
                                value={option.userId}
                                selected={option.userId === userID}
                              >
                                ZooTrainerID : {option.userId} - FullName :{" "}
                                {option.firstname + " " + option.lastname} -
                                Training Animal: {option.countAnimal}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="row mb-3 mt-4">
                          <div
                            className="mb-3"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ width: "40%" }}>
                              <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                                Start Train
                              </label>
                              <br />
                              <Form.Control
                                type="date"
                                id="startTrainDate"
                                disabled
                                placeholder="address"
                                aria-describedby="inputGroupPrepend"
                                name="startTrainDate"
                                value={startTrain}
                                onChange={(event) =>
                                  setStartTrain(event.target.value)
                                }
                              // isInvalid={
                              //   formik.errors.startTrainDate &&
                              //   formik.touched.startTrainDate
                              // }
                              />
                            </div>
                            {/* <Form.Control.Feedback type="invalid">
                                {formik.errors.startTrainDate}
                              </Form.Control.Feedback> */}
                            {/* <div style={{ width: "40%" }}>
                              <label className="form-label">
                                Choose End Training
                              </label>
                              <Form.Control
                                id="endTraining"
                                type="date"
                                aria-describedby="inputGroupPrepend"
                                name="endTraining"
                                value={endTraining}
                                onChange={handleEndTrainingDate}
                                isInvalid={!isValidTrainerDate}
                              // isInvalid={
                              //   formik.errors.first_name &&
                              //   formik.touched.first_name
                              // }
                              />
                              <Form.Control.Feedback type="invalid">
                                Ngày không hợp lệ hoặc lớn hơn ngày hiện tại.
                              </Form.Control.Feedback>
                            </div> */}
                          </div>
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <Button
                            type="submit"
                            variant="text"
                            style={{ padding: 0, marginRight: "24px" }}
                          >
                            <MDBIcon fas icon="edit" size="2x" />
                          </Button>
                        </div>
                      </div>
                      <div className="label-info">
                        <label>Meal Information</label>
                      </div>
                      <div className="mb-3 Food-Information">
                        <div className="mb-1">
                          {foods.map((food, index) => (
                            <div
                              key={food.mealId}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                              }}
                            >
                              {/* <div style={{ width: "30%" }}>
                                <label className="form-label">
                                  ID Food Of Animal
                                </label>
                                <Form.Control
                                  type="text"
                                  className="mb-3"
                                  aria-describedby="inputGroupPrepend"
                                  disabled
                                  style={{ width: "90%" }}
                                  value={food.foodId}
                                />
                              </div> */}
                              <div style={{ width: "25%" }}>
                                <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                                  Edit Meal For Animal
                                </label>
                                <Form.Control
                                  as="select"
                                  style={{
                                    width: "95%",
                                    marginRight: "20px",
                                  }}
                                  value={food.mealId}
                                  onChange={
                                    isNew
                                      ? (e) => handleFoodSelect(e, index)
                                      : null
                                  }
                                  placeholder="Choose Meals"
                                >
                                  <option value="">Choose Meals</option>
                                  {/* Render các option từ API */}
                                  {options.map((option) => (
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
                                </Form.Control>
                              </div>
                              <div style={{ width: "25%" }}>
                                <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                                  Edit Start Eat Date
                                </label>
                                <Form.Control
                                  type="date"
                                  className="mb-3"
                                  aria-describedby="inputGroupPrepend"
                                  isInvalid={!isValidStartEat}
                                  style={{ width: "90%" }}
                                  value={food.startEat != null ? food.startEat.slice(0, 10) : null}
                                  onChange={(e) =>
                                    handleStartEatDateChange(food.mealId, e)
                                  }
                                />
                              </div>
                              <div style={{ width: "25%" }}>
                                <label className="form-label" style={{ color: "#813528", fontWeight: "bolder" }}>
                                  Edit End Eat Date
                                </label>
                                <Form.Control
                                  type="date"
                                  className="mb-3"
                                  isInvalid={!isValidEndEat}
                                  aria-describedby="inputGroupPrepend"
                                  style={{ width: "90%" }}
                                  value={food.endEat != null ? food.endEat.slice(0, 10) : null}
                                  onChange={(e) =>
                                    handleEndEatDateChange(food.mealId, e)
                                  }
                                />
                              </div>
                              <div style={{ paddingTop: "40px" }}>
                                <button onClick={() => removeField2(index)}>
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                          ))}
                          {!isValidStartEat &&
                            <div className="mb-3" style={{ color: "red" }}>Start Eat Date must be after Entry Cage Date</div>
                          }
                          {!isValidEndEat &&
                            <div className="mb-3" style={{ color: "red" }}>End Eat Date must be after Start Eat Date</div>
                          }

                          {foods.length && foods.length < options.length && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button onClick={handleAdd}>Add</Button>
                            </div>
                          )}

                        </div>
                        <div style={{ textAlign: "end" }}>
                          <Button
                            type="submit"
                            variant="text"
                            style={{ padding: 0, marginRight: "24px" }}
                          >
                            <MDBIcon fas icon="edit" size="2x" />
                          </Button>
                        </div>
                      </div>
                      {schedules.length > 0 &&
                        <div className="label-info">
                          <label>Schedule Information</label>
                        </div>
                      }
                      {schedules.length > 0 && (
                        <div className="mb-3 Schedule-Information">
                          <div className="mb-1">
                            {schedules && schedules.map((schedule, index) => (
                              <div
                                key={schedule.scheduleId}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "95%",
                                }}
                              >
                                {/* <div style={{ width: "30%" }}>
                                <label className="form-label">
                                  ID Food Of Animal
                                </label>
                                <Form.Control
                                  type="text"
                                  className="mb-3"
                                  aria-describedby="inputGroupPrepend"
                                  disabled
                                  style={{ width: "90%" }}
                                  value={food.foodId}
                                />
                              </div> */}
                                <div style={{ width: "30%" }}>
                                  <label className="form-label">
                                    Edit Schedule For Animal
                                  </label>
                                  <Form.Control
                                    as="select"
                                    style={{
                                      width: "95%",
                                      marginRight: "20px",
                                    }}
                                    value={schedule.scheduleId}
                                    onChange={
                                      isNew2
                                        ? (e) => handleScheduleSelect(e, index)
                                        : null
                                    }
                                    placeholder="Chọn món ăn"
                                  >
                                    <option value="">Choose Schedule</option>
                                    {/* Render các option từ API */}
                                    {scheduleList.map((option) => (
                                      <option
                                        key={option.scheduleId}
                                        value={option.scheduleId}
                                        disabled={selectedScheduleIds.includes(
                                          option.scheduleId
                                        )}
                                      >
                                        {option.scheduleName}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </div>
                                <div style={{ width: "30%" }}>
                                  <label className="form-label">
                                    Edit Time Eat
                                  </label>
                                  <Form.Control
                                    type="time"
                                    className="mb-3"
                                    aria-describedby="inputGroupPrepend"
                                    style={{ width: "90%" }}
                                    value={schedule.time}
                                    onChange={(e) =>
                                      handleTimeEatChange(schedule.scheduleId, e)
                                    }
                                  />
                                </div>
                                <div style={{ width: "30%" }}>
                                  <label className="form-label">
                                    Edit Description
                                  </label>
                                  <Form.Control
                                    type="text"
                                    className="mb-3"
                                    aria-describedby="inputGroupPrepend"
                                    style={{ width: "90%" }}
                                    value={schedule.description}
                                    isInvalid={!isValidDescription}
                                    onChange={(e) =>
                                      handleDescriptionChange(schedule.scheduleId, e)
                                    }
                                  />

                                </div>
                                <div style={{ paddingTop: "40px" }}>
                                  <button onClick={() => removeField(index)}>
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {!isValidDescription &&
                              <div className="mb-3" style={{ color: "red" }}>Description must be 2 characters</div>
                            }
                            {schedules.length && schedules.length < scheduleList.length && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button onClick={handleAdd2}>Add</Button>
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: "end" }}>
                            <Button
                              type="submit"
                              variant="text"
                              style={{ padding: 0, marginRight: "24px" }}
                            >
                              <MDBIcon fas icon="edit" size="2x" />
                            </Button>
                          </div>

                        </div>
                      )}
                      {schedules.length === 0 && scheduleList.length > 0 && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button onClick={handleAdd2}>Add Schedule for Animal</Button>
                          </div>
                        </>
                      )}

                      <div className="btn-footer" style={{ marginRight: "0px" }}>
                        <div
                          style={{
                            background: "gainsboro",
                          }}
                        >
                          <Button
                            variant="secondary"
                            onClick={handle}
                            active
                            style={{ width: "80px", color: "white", backgroundColor: "red" }}
                          >
                            Close
                          </Button>
                        </div>
                        {/* <div>
                          <Button
                            style={{ background: "blue" }}
                            variant="primary"
                            type="submit"
                            active
                          >
                            Edit animal
                          </Button>
                        </div> */}
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

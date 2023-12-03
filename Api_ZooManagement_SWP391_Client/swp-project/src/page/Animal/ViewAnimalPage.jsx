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
import { DatePicker, Radio, Select, Space, Image } from "antd";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../assets/css/dashboard.css";
import { ToastContainer } from "react-toastify";
import ListGroup from "react-bootstrap/ListGroup";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function ViewAnimal(pros) {
  const { show, handleClose, dataAnimalView } = pros;
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [cageID, setCageID] = useState("");
  // const [userID, setUserID] = useState([]);
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
  const [outCage, setOutCage] = useState("");
  const [listCage, setListCage] = useState([]);
  const [listZooTrainer, setListZooTrainer] = useState([]);
  const [showListTrainer, setShowListTrainer] = useState(false);
  const [showList, setShowList] = useState(false);
  const [listCageOld, setListCageOld] = useState([]);
  const [listTrainerOld, setListTrainerOld] = useState([]);
  const [animalID, setAnimalID] = useState("");
  const [listFoods, setListFoods] = useState([]);
  const [foodId, setFoodID] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [listMealNow, setListMealNow] = useState([]);
  const [listFoodsFilter, setListFoodsFilter] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [listScheduleFilter, setListScheduleFilter] = useState([]);
  const [animalImage, setAnimalImage] = useState("");

  useEffect(() => {
    if (show) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      setAnimalID(dataAnimalView.animalId),
        setRegion(dataAnimalView.region),
        setName(dataAnimalView.name),
        setCageID(dataAnimalView.cId),
        setUserID(dataAnimalView.userId),
        setGender(dataAnimalView.sex === true ? "male" : "female"),
        setHealthCheck(dataAnimalView.healthCheck),
        setDescription(dataAnimalView.description),
        setBirthday(
          dataAnimalView.birthday === null
            ? null
            : dataAnimalView.birthday.slice(0, 10)
        ),
        console.log(date);
      console.log(dataAnimalView.birthday.slice(0, 10));
      // setEntryAnimal();
      setEntryCage(
        dataAnimalView.entryCageDate === null
          ? null
          : dataAnimalView.entryCageDate.slice(0, 10)
      ),
        setStartTrain(
          dataAnimalView.startTrainDate === null
            ? null
            : dataAnimalView.startTrainDate.slice(0, 10)
        ),
        setEndTraining(
          dataAnimalView.endTrainDate === null
            ? null
            : dataAnimalView.endTrainDate.slice(0, 10)
        ),
        setOutCage(
          dataAnimalView.outCageDate === null
            ? null
            : dataAnimalView.outCageDate.slice(0, 10)
        ),
        setSpecies(dataAnimalView.speciesName),
        setRarity(dataAnimalView.rarity);
      setFoodID(dataAnimalView.meals);
      setScheduleId(dataAnimalView.schedules);
      const path = dataAnimalView.animalImage;
      if (path != "") {
        const secondSlashIndex = path.indexOf("\\", path.indexOf("\\") + 1);
        const substring = path.substring(secondSlashIndex + 1);
        setAnimalImage(substring);
      } else {
        setAnimalImage("");
      }
    }
  }, [dataAnimalView]);

  useEffect(() => {
    const getMealNow = () => {
      return fetch(`https://localhost:44352/api/Animal`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getMealNow().then((items) => {
      if (mounted) {
        setListMealNow(
          items.filter((a) => a.animalId === dataAnimalView.animalId)
        );
      }
    });
    return () => (mounted = false);
  }, [dataAnimalView]);

  console.log(dataAnimalView);
  const date = new Date();
  useEffect(() => {
    const getZooTrainerList = () => {
      return fetch(`https://localhost:44352/api/User/users`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getZooTrainerList().then((items) => {
      if (mounted) {
        setListZooTrainer(items);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const getFoodList = () => {
      return fetch(`https://localhost:44352/api/Food`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getFoodList().then((items) => {
      if (mounted) {
        setListFoods(items);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const getScheduleList = () => {
      return fetch(`https://localhost:44352/api/Schedule`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getScheduleList().then((items) => {
      if (mounted) {
        setListSchedule(items);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const getCageList = () => {
      return fetch("https://localhost:44352/api/Cage").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getCageList().then((items) => {
      if (mounted) {
        setListCage(items);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const getTrainerOld = () => {
      return fetch(
        `https://localhost:44352/api/Animal/${animalID}/oldcages`
      ).then((data) => data.json());
    };
    let mounted = true;
    getTrainerOld().then((items) => {
      if (mounted) {
        setListCageOld(items);
      }
    });
    return () => (mounted = false);
  }, [animalID, showList, cageID]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:44352/api/Animal/${animalID}/oldtrainers`
      );
      const data = await response.json();
      setListTrainerOld(data);
    };

    if (animalID) {
      fetchData();
    }
  }, [animalID, showList, userID]);
  useEffect(() => {
    if (scheduleId) {
      // Lấy ids
      // const fIds = foodId.map(f => f.id);
      // // Lọc foods
      // const filteredFoods = listFoods.filter(food => {
      //   return fIds.includes(food.foodId);
      // }).map(food => {
      //   // Tìm fId object có id trùng với food.id
      //   const fId = fIds.find(f => f.id === food.foodId);

      //   // Trả về object mới có quantity là của fId
      //   return {
      //     ...food,
      //     quantity: foodId.quantity
      //   }
      // });
      const scheduleFilter = listSchedule
        .filter((schedule) => {
          return scheduleId.some(
            (sId) => sId.scheduleId === schedule.scheduleId
          );
        })
        .map((food) => {
          // Tìm fId object có id trùng với food.id
          const matchedFId = scheduleId.find(
            (fId) => fId.scheduleId === food.scheduleId
          );

          // Nếu không tìm thấy fId thì trả về food
          if (!matchedFId) {
            return food;
          }

          // Trả về object mới có quantity là của fId
          return {
            ...food,
            name: matchedFId.scheduleName,
            time: matchedFId.time,
            description: matchedFId.description,
            isDone: matchedFId.isDone,
          };
        });
      // Cập nhật state
      setListScheduleFilter(scheduleFilter);
      console.log(listScheduleFilter);
    }
  }, [listSchedule, scheduleId, dataAnimalView]);

  // useEffect(() => {
  //   if (foodId) {
  //     // Lấy ids
  //     // const fIds = foodId.map(f => f.id);
  //     // // Lọc foods
  //     // const filteredFoods = listFoods.filter(food => {
  //     //   return fIds.includes(food.foodId);
  //     // }).map(food => {
  //     //   // Tìm fId object có id trùng với food.id
  //     //   const fId = fIds.find(f => f.id === food.foodId);

  //     //   // Trả về object mới có quantity là của fId
  //     //   return {
  //     //     ...food,
  //     //     quantity: foodId.quantity
  //     //   }
  //     // });
  //     const foodFilter = listFoods
  //       .filter((food) => {
  //         return foodId.foodMealDtos.some((fId) => fId.foodId === food.foodId);
  //       })
  //       .map((food) => {
  //         // Tìm fId object có id trùng với food.id
  //         const matchedFId = foodId.find((fId) => fId.foodId === food.foodId);

  //         // Nếu không tìm thấy fId thì trả về food
  //         if (!matchedFId) {
  //           return food;
  //         }

  //         // Trả về object mới có quantity là của fId
  //         return {
  //           ...food,
  //           startEat: matchedFId.startEat,
  //           endEat: matchedFId.endEat,
  //         };
  //       });
  //     // Cập nhật state
  //     setListFoodsFilter(foodFilter);
  //     console.log(foodFilter);
  //   }
  // }, [listFoods, foodId]);

  const handleButton = () => {
    setShowList(!showList);
  };
  // Danh sách users
  const users = listZooTrainer;
  // Danh sách userId trong animalTrainers
  const animalTrainers = userID;
  // Lọc ra các user có id trùng với animalTrainers
  // const trainers = users.filter(user => {
  //   return animalTrainers.some(trainer => {
  //     return trainer.userId === user.userId;
  //   })
  // });
  const trainers = users.filter((user) => user.userId === userID);
  const cages = listCage.filter((cage) => cage.cId === cageID);
  //   useEffect(() => {
  //   const getCageList = () => {
  //     return fetch(`https://localhost:44352/api/Cage/CageId?${cageID}`).then((data) =>
  //       data.json()
  //     );
  //   };
  //   let mounted = true;
  //   getCageList().then((items) => {
  //     if (mounted) {
  //       setListCage(items);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);
  // console.log(listCage)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(dataAnimalView);
  };

  return (
    <>
      <MDBModal show={show} onHide={handleClose}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header text-white d-flex justify-content-center"
              style={{ background: "cadetblue" }}
            >
              <MDBModalTitle style={{ fontSize: "xx-large" }}>
                Animal Information
              </MDBModalTitle>
              {/* <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-container-1">
                <Form noValidate onSubmit={handleFormSubmit}>
                  <div className="form-content">
                    <div className="form">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="mb-3 mt-3"
                      >
                        {animalImage != "" && (
                          <>
                            <div className="mb-3" style={{ width: "50%" }}>
                              <div>
                                <img
                                  className="rounded"
                                  width={390}
                                  style={{ width: "100%", height: "226px" }}
                                  src={"/" + animalImage}
                                ></img>
                              </div>
                              {/* <MDBCol lg="4" md="12" className="mb-4">
                              <img
                                src={"/" + animalImage}
                                className="img-fluid rounded"
                                style={{ width: "100%" }}
                                alt="#"
                              />
                            </MDBCol> */}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="label-info">
                        <label>Animal Information Basic</label>
                      </div>
                      <div className="mb-3 Animal_Infomation">
                        <div
                          className="mb-3 mt-3"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Name:
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {name}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Birthday
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {birthday}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Health Check
                          </label>
                          <MDBCardText className="text-muted ms-4">
                            {healthCheck}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Description
                          </label>
                          <MDBCardText
                            className="text-muted ms-4"
                            style={{ textAlign: "justify" }}
                          >
                            {description}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Region:
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {region}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Species:
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {species}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Gender:
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {gender === true ? "Male" : "Female"}
                          </MDBCardText>
                        </div>
                        <div
                          className="mb-3 mt-4"
                          style={{ width: "100%", display: "flex" }}
                        >
                          <label
                            className="form-label"
                            style={{
                              verticalAlign: "middle",
                              color: "#813528",
                              fontWeight: "bolder",
                            }}
                          >
                            Rarity:
                          </label>
                          <MDBCardText className="text-muted ms-3">
                            {rarity === true ? "Rarity" : "None"}
                          </MDBCardText>
                        </div>
                      </div>
                      <div className="label-info">
                        <label>Cage Information</label>
                      </div>
                      <div
                        className="mb-3 Cage_Infomation"
                        style={{ paddingRight: "25px" }}
                      >
                        <div style={{ textAlign: "end", marginTop: "10px" }}>
                          <Button
                            variant="primary"
                            onClick={handleButton}
                            style={{ background: "teal", border: "none" }}
                          >
                            More Old List
                          </Button>
                        </div>
                        <div>
                          {/* here */}
                          {showList && (
                            <div className="list" style={{ marginTop: "10px" }}>
                              <Table striped bordered hover>
                                <thead>
                                  <tr style={{ textAlign: "center" }}>
                                    <th>ID</th>
                                    <th>Cage Name</th>
                                    <th>Animal Entry Cage</th>
                                    <th>Animal Out Cage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listCageOld &&
                                    listCageOld.length > 0 &&
                                    listCageOld.map((value) => {
                                      return (
                                        <tr style={{ textAlign: "center" }}>
                                          <td>{value.cId}</td>
                                          <td>{value.name}</td>
                                          <td>
                                            {value.entryCageDate === null
                                              ? null
                                              : value.entryCageDate.slice(
                                                  0,
                                                  10
                                                )}
                                          </td>
                                          <td>
                                            {value.outCageDate === null
                                              ? null
                                              : value.outCageDate.slice(0, 10)}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  {listCageOld.length === 0 && (
                                    <tr style={{ textAlign: "center" }}>
                                      <td colSpan={4}>Empty List</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Cage for Animal
                          </label>
                          <Table striped bordered hover>
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>ID</th>
                                <th>Cage Name</th>
                                <th>Max Capacity</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cages &&
                                cages.length > 0 &&
                                cages.map((value) => {
                                  return (
                                    <tr style={{ textAlign: "center" }}>
                                      <td>{value.cId}</td>
                                      <td>{value.name}</td>
                                      <td>{value.maxCapacity}</td>
                                      <td>{value.animalQuantity}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div
                            className="mb-3 mt-4"
                            style={{ width: "33%", display: "flex" }}
                          >
                            <label
                              className="form-label"
                              style={{ color: "#813528", fontWeight: "bolder" }}
                            >
                              Entry Cage Date:
                            </label>
                            <MDBCardText className="text-muted ms-3">
                              {entryCage}
                            </MDBCardText>
                          </div>
                          {outCage && (
                            <div className="mb-3" style={{ width: "40%" }}>
                              <label className="form-label">Out Cage</label>
                              <Form.Control
                                type="date"
                                id="outCage"
                                aria-describedby="inputGroupPrepend"
                                name="outCage"
                                disabled
                                value={outCage}
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
                          )}
                        </div>
                      </div>
                      <div className="label-info">
                        <label>ZooTrainer Information</label>
                      </div>
                      <div
                        className="ZooTrainer-Information mb-3"
                        style={{ paddingRight: "25px" }}
                      >
                        <div style={{ textAlign: "end", marginTop: "10px" }}>
                          <Button
                            style={{ background: "teal", border: "none" }}
                            variant="primary"
                            onClick={() => setShowListTrainer(!showListTrainer)}
                          >
                            More Old List
                          </Button>
                        </div>
                        <div>
                          {showListTrainer && (
                            <div className="list" style={{ marginTop: "10px" }}>
                              <Table striped bordered hover>
                                <thead>
                                  <tr style={{ textAlign: "center" }}>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>StartDate</th>
                                    <th>EndDate</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listTrainerOld &&
                                    listTrainerOld.length > 0 &&
                                    listTrainerOld.map((value) => {
                                      return (
                                        <tr style={{ textAlign: "center" }}>
                                          <td>{value.userId}</td>
                                          <td>{value.userName}</td>
                                          <td>
                                            {value.startDate === null
                                              ? "Empty"
                                              : value.startTrainDate.slice(
                                                  0,
                                                  10
                                                )}
                                          </td>
                                          <td>
                                            {value.endDate === null
                                              ? "Empty"
                                              : value.endTrainDate.slice(0, 10)}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  {listTrainerOld.length === 0 && (
                                    <tr style={{ textAlign: "center" }}>
                                      <td colSpan={5}>Empty List</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        </div>

                        <div className="mb-2">
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            ZooTrainer for Animal
                          </label>
                          <Table striped bordered hover>
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>Training Animal</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {trainers &&
                                trainers.length > 0 &&
                                trainers.map((value) => {
                                  return (
                                    <tr style={{ textAlign: "center" }}>
                                      <td>{value.userId}</td>
                                      <td>
                                        {value.firstname + " " + value.lastname}
                                      </td>
                                      <td>{value.phone}</td>
                                      <td>{value.countAnimal}</td>
                                      <td>
                                        {value.status === true ? (
                                          <div
                                            style={{
                                              background: "#008800",
                                              borderRadius: "50px",
                                              textAlign: "center",
                                              color: "white",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Working
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              background: "red",
                                              borderRadius: "50px",
                                              textAlign: "center",
                                              color: "white",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            End Work
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div
                            className="mb-3 mt-4"
                            style={{ width: "33%", display: "flex" }}
                          >
                            <label
                              className="form-label"
                              style={{ color: "#813528", fontWeight: "bolder" }}
                            >
                              Start Training Date:
                            </label>
                            <MDBCardText className="text-muted ms-3">
                              {startTrain}
                            </MDBCardText>
                          </div>
                          {endTraining && (
                            <div className="mb-3" style={{ width: "40%" }}>
                              <label className="form-label">End Training</label>
                              <Form.Control
                                id="endTraining"
                                type="date"
                                aria-describedby="inputGroupPrepend"
                                name="endTraining"
                                disabled
                                value={endTraining}
                                onChange={(event) =>
                                  setName(event.target.value)
                                }
                                // isInvalid={
                                //   formik.errors.first_name &&
                                //   formik.touched.first_name
                                // }
                              />
                              {/* <Form.Control.Feedback type="invalid">
                            {formik.errors.first_name}
                          </Form.Control.Feedback> */}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="label-info">
                        <label>Meal Information</label>
                      </div>
                      <div className="Food-Information mb-3">
                        <div className="mb-3" style={{ paddingRight: "25px" }}>
                          <div style={{ textAlign: "end", marginTop: "10px" }}>
                            <Button
                              variant="primary"
                              onClick={handleButton}
                              style={{ background: "teal", border: "none" }}
                            >
                              Total Meal List
                            </Button>
                          </div>
                          <div>
                            {/* here */}
                            {showList && (
                              <div
                                className="list"
                                style={{ marginTop: "10px" }}
                              >
                                <Table striped bordered hover>
                                  <thead>
                                    <tr style={{ textAlign: "center" }}>
                                      <th>Meal's Name</th>
                                      <th>Food Name</th>
                                      <th>Amount</th>
                                      <th>Unit</th>
                                      <th>Start Eat</th>
                                      <th>End Eat</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {foodId &&
                                      foodId.length > 0 &&
                                      foodId.map((value) => {
                                        return (
                                          <tr
                                            style={{
                                              textAlign: "center",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            <td>{value.mealName}</td>
                                            <td>
                                              {value.foodMealDtos &&
                                                value.foodMealDtos.length > 0 &&
                                                value.foodMealDtos.map(
                                                  (value2) => {
                                                    return (
                                                      <div>{value2.fName}</div>
                                                    );
                                                  }
                                                )}
                                            </td>
                                            <td>
                                              {value.foodMealDtos &&
                                                value.foodMealDtos.length > 0 &&
                                                value.foodMealDtos.map(
                                                  (value2) => {
                                                    return (
                                                      <div>
                                                        {value2.quantity}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </td>
                                            <td>
                                              {value.foodMealDtos &&
                                                value.foodMealDtos.length > 0 &&
                                                value.foodMealDtos.map(
                                                  (value2) => {
                                                    return (
                                                      <div>{value2.unit}</div>
                                                    );
                                                  }
                                                )}
                                            </td>
                                            <td>
                                              <div>
                                                {value.startEat.slice(0, 10)}
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                {value.endEat.slice(0, 10)}
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    {foodId.length === 0 && (
                                      <tr style={{ textAlign: "center" }}>
                                        <td colSpan={4}>Empty List</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}
                          </div>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Meal For Animal Now
                          </label>
                          <Table striped bordered hover>
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>Meal's Name</th>
                                <th>Food Name</th>
                                <th>Amount</th>
                                <th>Unit</th>
                                <th>Start Eat</th>
                                <th>End Eat</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listMealNow &&
                                listMealNow.length > 0 &&
                                listMealNow.map((value) => {
                                  return (
                                    <tr
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <td>{value.mealName}</td>
                                      <td>
                                        {value.foodMealDtos &&
                                          value.foodMealDtos.length > 0 &&
                                          value.foodMealDtos.map((value2) => {
                                            return <div>{value2.fName}</div>;
                                          })}
                                      </td>
                                      <td>
                                        {value.foodMealDtos &&
                                          value.foodMealDtos.length > 0 &&
                                          value.foodMealDtos.map((value2) => {
                                            return <div>{value2.quantity}</div>;
                                          })}
                                      </td>
                                      <td>
                                        {value.foodMealDtos &&
                                          value.foodMealDtos.length > 0 &&
                                          value.foodMealDtos.map((value2) => {
                                            return <div>{value2.unit}</div>;
                                          })}
                                      </td>
                                      <td>
                                        <div>{value.startEat.slice(0, 10)}</div>
                                      </td>
                                      <td>
                                        <div>{value.endEat.slice(0, 10)}</div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {listMealNow.length <= 0 && (
                                <tr>
                                  <td
                                    colSpan="6"
                                    style={{ textAlign: "center" }}
                                  >
                                    Empty
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>

                      <div className="label-info">
                        <label>Schedule Information</label>
                      </div>
                      <div className="Food-Information">
                        <div className="mb-3" style={{ paddingRight: "25px" }}>
                          <label
                            className="form-label"
                            style={{ color: "#813528", fontWeight: "bolder" }}
                          >
                            Schedule For Animal
                          </label>
                          <Table striped bordered hover>
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Have Eat ?</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listScheduleFilter &&
                                listScheduleFilter.length > 0 &&
                                listScheduleFilter.map((value) => {
                                  return (
                                    <tr style={{ textAlign: "center" }}>
                                      <td>{value.scheduleId}</td>
                                      <td>{value.scheduleName}</td>
                                      <td>{value.time}</td>
                                      <td>{value.description}</td>
                                      <td>
                                        {value.isDone === true ? (
                                          <div
                                            style={{
                                              background: "#008800",
                                              borderRadius: "50px",
                                              textAlign: "center",
                                              color: "white",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Already Eat
                                          </div>
                                        ) : (
                                          <span>Not Yet</span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              {listScheduleFilter.length <= 0 && (
                                <tr style={{ textAlign: "center" }}>
                                  <td colSpan="5">Empty</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>

                      <div
                        className="btn-footer"
                        style={{ marginTop: "20px", marginRight: "0px" }}
                      >
                        <div
                          style={{
                            background: "gainsboro",
                          }}
                        >
                          <Button
                            variant="secondary"
                            onClick={handleClose}
                            active
                            style={{ width: "100px", backgroundColor: "red" }}
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
            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

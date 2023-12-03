import * as React from "react";
import { useState, useEffect } from "react";
import AddAnimal from "../Animal/AddAnimalPage";
import Button from "@mui/material/Button";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/css/dashboard.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Image } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditAnimal from "../Animal/EditAnimalPage";
import ViewAnimal from "../Animal/ViewAnimalPage";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import YourComponent from "../Animal/AnimalFoodTest";
import EditAnimalByZooTrainer from "../Animal/EditAnimalByZooTrainer";
import { MDBTypography } from "mdb-react-ui-kit";
import PetsIcon from "@mui/icons-material/Pets";
import moment from "moment";
import { toast } from "react-toastify";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function ScheduleAnimalNotFeeding() {
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listAnimal, setListAnimal] = useState([]);
  const [listFood, setListFood] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [profileZooTrainer, setProfileZooTrainer] = useState({});
  const [listAnimalFilter, setListAnimalFilter] = useState([]);
  const [animalFilter, setAnimalFilter] = useState([]);
  const [aID, setAID] = useState("");
  const [edit, setEdit] = useState(false);

  async function resetSchedule() {
    try {
      await fetch(`https://localhost:44352/api/Schedule/ResetSchedule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error resetting schedule");
    }
  }
  useEffect(() => {
    const getTrainerList = () => {
      const emailInfo = localStorage.getItem("email");
      return fetch(`https://localhost:44352/api/User/users/${emailInfo}`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getTrainerList().then((items) => {
      if (mounted) {
        setProfileZooTrainer(items.userId);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    const getList = () => {
      return fetch("https://localhost:44352/api/Animal/allMeal").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListAnimal(items);
      }
    });
    return () => (mounted = false);
  }, [edit]);

  useEffect(() => {
    if (profileZooTrainer.length > 0) {
      setAID(profileZooTrainer);
    }
  }, [profileZooTrainer]);

  function getPeriod(hour) {
    if (hour >= 6 && hour < 12) {
      return "morning";
    }
    if (hour >= 12 && hour < 18) {
      return "afternoon";
    }
    if (hour >= 18 || hour < 6) {
      return "evening";
    }
  }
  function parseTime(time) {
    // Chuyển thời gian sang đối tượng Date
    const [hours] = time.split(":");
    const hour = parseInt(hours);
    if (hour >= 6 && hour < 12) {
      return "morning";
    }
    if (hour >= 12 && hour < 18) {
      return "afternoon";
    }
    if (hour >= 18 || hour < 6) {
      return "evening";
    }
  }
  // Lấy thời gian hiện tại
  const now = new Date();
  // const testNow = new Date(now)
  // console.log(testNow.getHours());
  // Xác định khung giờ hiện tại
  const currentPeriod = getPeriod(now.getHours());
  useEffect(() => {
    const list = listAnimal.filter((animal) => animal.userId === aID);
    const currentPeriod = getPeriod(now.getHours());
    const filteredAnimals = list.filter((animal) => {
      return animal.schedules.some((schedule) => {
        const schedulePeriod = parseTime(schedule.time);
        return (
          schedulePeriod === currentPeriod &&
          schedule.scheduleName != "Breakfast" &&
          schedule.scheduleName != "Lunch" &&
          schedule.scheduleName != "Dinner"
        );
      });
    });
    setListAnimalFilter(filteredAnimals);
  }, [listAnimal,aID,edit]);
  
  const handleClick = () => {
    setShowmodalAdd(true);
    setAnchorEl(null);
  };
  const handleClick2 = () => {
    setShowmodalFoodAnimal(true);
    setAnchorEl(null);
    // window.location.href = setAnchorEl(null);
  };
  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setShowmodalFoodAnimal(false);
    setShowmodalEdit(false);
    setShowmodalAdd(false);
    setShowmodalView(false);
    setShowmodalFood(false);
    setAnchorEl(null);
  };

  const handleEditUser = async (item, value) => {
    // setDataUserEdit(item);
    console.log(value);
    console.log(item);
    const feedAnimal = item.animalId;
    const scheduleId = value.scheduleId;
    const response = await fetch(
      `https://localhost:44352/api/Food/animalId?animalId=${feedAnimal}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response2 = await fetch(
      `https://localhost:44352/api/Schedule/UpdateSchedule?animalId=${feedAnimal}&scheduleId=${scheduleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok && response2.ok) {
      console.log("Success");
      toast.success("Feed successfully");
        // window.location.reload();
        setEdit(!edit)
    } else {
      toast.error("Error");
    }
  };

  const handleEditUser2 = async (item) => {
    // setDataUserEdit(item);
    console.log(item);
    const animalId = item.animalId;
    const response = await fetch(
      `https://localhost:44352/api/Schedule/UpdateScheduleHealth?animalId=${animalId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("Success");
      toast.success("Take care successfully");
        // window.location.reload();
        setEdit(!edit);
    } else {
      toast.error("Error");
    }
  };
  const handleReset = () => {
    resetSchedule();
    if (resetSchedule) {
      toast.success("Reset Success");
        // window.location.reload();
        setEditMode(!edit);
    } else {
      toast.error("Error");
    }
  };
  const handleViewUser = (item) => {
    // setDataUserEdit(item);
    const animal = item;
    setDataAnimalView(animal);
    setShowmodalView(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let count = 0;
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="table-container">
      <div className="table-component">
        <div
          className="my-3 add-new"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* <Image
            width={90}
            src="https://img.freepik.com/premium-vector/zoo-logo-design-vector-illustration_742779-149.jpg?w=2000"
          ></Image> */}
          <MDBTypography tag="h2" color="secondary" noteColor="secondary">
            <i> Animal Schedule Chart</i>
          </MDBTypography>
        </div>
        <div className="mb-4" style={{ textAlign: "end" }}>
          <Button
            onClick={() => {
              handleReset();
            }}
            variant="outlined"
            style={{
              padding: 0,
              backgroundColor: "green",
              color: "white",
              width: "90px",
              height: "35px",
              marginRight: "15px",
            }}
          >
            <RestartAltIcon /> Reset
          </Button>
        </div>
        <div className="table-content">
          <MDBTable>
            <MDBTableHead
              dark
            // style={{
            //   borderTop: "white",
            //   borderRight: "black",
            //   borderLeft: "black",
            //   borderBottom: "black",
            // }}
            >
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  ID
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  ANIMAL
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Name
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  TIME OF DAY
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  ACTION
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {listAnimalFilter &&
                listAnimalFilter.length > 0 &&
                listAnimalFilter.map((items, index) => {
                  return (
                    <tr
                      style={{
                        height: "70px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontWeight: "500",
                      }}
                    >
                      <th scope="row">{items.animalId}</th>
                      <td>{items.name}</td>
                      <td style={{ width: "105px" }}>
                        {items.schedules &&
                          items.schedules.map((value) => {
                            const schedulePeriod = parseTime(value.time);
                            const currentPeriod = getPeriod(now.getHours());
                            if (
                              schedulePeriod === currentPeriod &&
                              value.scheduleName != "Breakfast" &&
                              value.scheduleName != "Lunch" &&
                              value.scheduleName != "Dinner"
                            ) {
                              return (
                                <div>
                                  <span>{value.scheduleName}</span>
                                </div>
                              );
                            }
                          })}
                      </td>
                      <td>
                        {items.schedules &&
                          items.schedules.map((value) => {
                            const schedulePeriod = parseTime(value.time);
                            const currentPeriod = getPeriod(now.getHours());
                            if (
                              schedulePeriod === currentPeriod &&
                              value.scheduleName != "Breakfast" &&
                              value.scheduleName != "Lunch" &&
                              value.scheduleName != "Dinner"
                            ) {
                              return (
                                <div>
                                  <span style={{ marginTop: "20px" }}>
                                    {value.time}
                                  </span>
                                </div>
                              );
                            }
                          })}
                      </td>
                      <td style={{ width: "208px", verticalAlign: "middle" }}>
                        {items.schedules &&
                          items.schedules.map((value) => {
                            const schedulePeriod = parseTime(value.time);
                            const currentPeriod = getPeriod(now.getHours());
                            {
                              value.status;
                            }
                            if (
                              schedulePeriod === currentPeriod &&
                              value.isDone === false &&
                              value.scheduleName != "Breakfast" &&
                              value.scheduleName != "Lunch" &&
                              value.scheduleName != "Dinner" &&
                              value.scheduleName === "Train"
                            ) {
                              return (
                                <Button
                                  onClick={() => {
                                    handleEditUser(items, value);
                                  }}
                                  variant="text"
                                  style={{
                                    padding: 0,
                                    backgroundColor: "gray",
                                    color: "white",
                                    width: "84px",
                                  }}
                                >
                                  Not Yet
                                </Button>
                              );
                            } else if (
                              schedulePeriod === currentPeriod &&
                              value.isDone === false &&
                              value.scheduleName != "Breakfast" &&
                              value.scheduleName != "Lunch" &&
                              value.scheduleName != "Dinner" &&
                              value.scheduleName != "Train"
                            ) {
                              return (
                                <Button
                                  onClick={() => {
                                    handleEditUser2(items);
                                  }}
                                  variant="text"
                                  style={{
                                    padding: 0,
                                    backgroundColor: "gray",
                                    color: "white",
                                    width: "84px",
                                  }}
                                >
                                  Not Yet
                                </Button>
                              );
                            }
                          })}
                        {items.schedules &&
                          items.schedules.map((value) => {
                            const schedulePeriod = parseTime(value.time);
                            const currentPeriod = getPeriod(now.getHours());
                            if (
                              schedulePeriod === currentPeriod &&
                              value.isDone === true &&
                              value.scheduleName != "Breakfast" &&
                              value.scheduleName != "Lunch" &&
                              value.scheduleName != "Dinner" &&
                              value.scheduleName === "Train"
                            ) {
                              return (
                                <Button
                                  variant="text"
                                  disabled
                                  style={{
                                    padding: 0,
                                    backgroundColor: "green",
                                    color: "white",
                                    width: "84px",
                                    marginRight: "15px",
                                  }}
                                >
                                  Done
                                </Button>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  );
                })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
      <AddAnimal show={showModalAdd} handleClose={handleClose} />
      <EditAnimalByZooTrainer
        show={showModalEdit}
        handleClose={handleClose}
        dataAnimalEdit={dataAnimalEdit}
      />
      <ViewAnimal
        show={showModalView}
        handleClose={handleClose}
        dataAnimalView={dataAnimalView}
      />
      {/* <AddAnimalFood show={showModalFoodAnimal} handleClose={handleClose} /> */}
      <YourComponent
        show={showModalFoodAnimal}
        handleClose={handleClose}
      ></YourComponent>
    </div>
  );
}

export default ScheduleAnimalNotFeeding;

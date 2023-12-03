import * as React from "react";
import { useState, useEffect } from "react";
import AddAnimal from "./AddAnimalPage";
import Button from "@mui/material/Button";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/css/dashboard.css";
import Table from "react-bootstrap/Table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditAnimal from "./EditAnimalPage";
import ViewAnimal from "./ViewAnimalPage";
import AddAnimalFood from "./AnimalFoodPage";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import YourComponent from "./AnimalFoodTest";
import EditAnimalByZooTrainer from "./EditAnimalByZooTrainer";
import ScheduleAnimal from "./ScheduleAnimal";
function TableAnimalDetail() {
  const emailInfo = localStorage.getItem("email");
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listAnimal, setListAnimal] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [profileZooTrainer, setProfileZooTrainer] = useState({});
  const [animalFilter, setAnimalFilter] = useState([]);
  const [aID, setAID] = useState("");
  useEffect(() => {
    const getTrainerList = () => {
      return fetch("https://localhost:44352/api/User/users").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getTrainerList().then((items) => {
      if (mounted) {
        setProfileZooTrainer(items.filter((user) => user.email === emailInfo));
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
  }, []);

  useEffect(() => {
    if (profileZooTrainer.length > 0) {
      setAID(profileZooTrainer[0].userId);
    }
  }, [profileZooTrainer]);

  const list = listAnimal.filter((animal) => animal.userId === aID);


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

  const handleEditUser = (item) => {
    // setDataUserEdit(item);
    console.log(item);
    const animal = item;
    setDataAnimalEdit(animal);
    setShowmodalEdit(true);
  };
  const handleViewUser = (item) => {
    // setDataUserEdit(item);
    const animal = item;
    setDataAnimalView(animal);
    setShowmodalView(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
    // const email = localStorage.getItem('email');
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const getUsers = () => {
  //       return fetch(
  //         `https://localhost:44352/api/User/users/${email}`
  //       ).then((data) => data.json());
  //     };
  //     let mounted = true;
  //     getUsers().then((items) => {
  //       if (mounted) {
  //         setCurrentUser(items);
  //       }
  //     });
  //     return () => (mounted = false);
  //   }

  //   checkUser();

  //   const interval = setInterval(checkUser, 2000);

  //   return () => clearInterval(interval);

  // }, [currentUser.status])
  // if (!currentUser.status) {
  //   navigate('/login')
  // };
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Animal</b>
          </span>
          <div className="search-container">
            {/* toggleShow */}
            <div className="search-content">
              <input type="text" className="form-control" />
              <Button variant="contained">
                <SearchIcon />
              </Button>
            </div>
            <div>
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick2}
              >
                <PlusOutlined></PlusOutlined>More Schedule
              </Button>
            </div>
          </div>
        </div>
        <div className="table-content">
          <Table size="100px" hover striped bordered>
            <thead className="table-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th style={{ textAlign: "center" }}>Gender</th>
                <th style={{ textAlign: "center" }}>Region</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "middle", textAlign: "center" }}>
              {list &&
                list.length > 0 &&
                list.map((items, index) => {
                  return (
                    <tr key={`animal-${index}`}>
                      <td width={140}>
                        {" "}
                        <img
                          className="rounded"
                          style={{ width: "100%" }}
                          src={
                            "/" +
                            items.animalImage.substring(
                              items.animalImage.indexOf(
                                "\\",
                                items.animalImage.indexOf("\\") + 1
                              ) + 1
                            )
                          }
                        ></img>
                      </td>
                      <td width={100}>{items.animalId}</td>
                      <td width={160}>{items.name}</td>
                      <td width={320} style={{ textAlign: "justify" }}>
                        {items.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {items.sex === true ? "Male" : "Female"}
                      </td>
                      <td width={160} style={{ textAlign: "center" }}>
                        {items.region}
                      </td>
                      <td width={280} style={{ textAlign: "center" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewUser(items);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditUser(items);
                          }}
                          variant="text"
                          style={{ padding: 0 }}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
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
      {/* <YourComponent
        show={showModalFoodAnimal}
        handleClose={handleClose}
      ></YourComponent> */}
      <ScheduleAnimal
        show={showModalFoodAnimal}
        handleClose={handleClose}
      ></ScheduleAnimal>
    </div>
  );
}

export default TableAnimalDetail;

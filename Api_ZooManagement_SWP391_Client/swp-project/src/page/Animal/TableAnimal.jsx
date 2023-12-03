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
import { Pagination } from "antd";
import axios from "axios";
import ScheduleAnimal from "./ScheduleAnimal";
import _ from "lodash";
import { debounce } from "lodash";
import DeleteAnimal from "./DeleteAnimal";
import { ListGroup, Form } from "react-bootstrap";
import AddMeal from "../Meal/AddMeal";

function TableAnimal() {
  const role = localStorage.getItem("role");
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [testShow, setTestShow] = useState(true);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [showModalMeal, setShowModalMeal] = useState(false);
  const [listAnimal, setListAnimal] = useState([]);
  const [listSpecies, setListSpecies] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalDelete, setDataAnimalDelete] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listFilter, setA] = useState("All");
  useEffect(() => {
    const getList = () => {
      return fetch(
        `https://localhost:44352/api/Animal/page/${currentPage}`
      ).then((data) => data.json());
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListAnimal(items.animals);
        setTotalPages(items.pages);
      }
    });
    return () => (mounted = false);
  }, [showModalEdit === false, currentPage]);
  useEffect(() => {
    const getSpeciesList = () => {
      return fetch("https://localhost:44352/api/AnimalSpecies").then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getSpeciesList().then((items) => {
      if (mounted) {
        setListSpecies(items);
      }
    });
    return () => (mounted = false);
  }, []);
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  const handleClick = () => {
    setShowmodalAdd(true);
    setAnchorEl(null);
  };

  const handleClick2 = () => {
    setShowmodalFoodAnimal(true);
    setAnchorEl(null);
    // window.location.href = setAnchorEl(null);
  };
  const handleClick3 = () => {
    setShowModalMeal(true);
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
    setShowmodalDelete(false);
    setShowModalMeal(false);
    setAnchorEl(null);
  };
  const handleEditUser = (item) => {
    // setDataUserEdit(item);
    console.log(item);
    const animal = item;
    setDataAnimalEdit(animal);
    setShowmodalEdit(true);
  };

  const handleDeleteAnimal = async (item) => {
    console.log(item);
    const animal = item;
    setDataAnimalDelete(animal);
    setShowmodalDelete(true);
  };

  const handleViewUser = (item) => {
    // setDataUserEdit(item);
    const animal = item;
    setDataAnimalView(animal);
    setShowmodalView(true);
  };
  const handleFilterChange = (item) => {
    console.log(item.target.value);
    setA(item.target.value);
    let term = item.target.value;
    if (term != "All") {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Animal/page/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListAnimal(items.animals.filter((a) => a.speciesName === term));
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    } else {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Animal/page/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListAnimal(items.animals);
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    }
  };
  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      setTestShow(false);
      const getList = () => {
        return fetch(`https://localhost:44352/api/Animal/allMeal`).then((data) =>
          data.json()
        );
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListAnimal(
            items.filter((a) =>
              a.name.toUpperCase().includes(term.toUpperCase())
            )
          );
          // setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
      // setListAnimal(
      //   listAnimal.filter((a) =>
      //     a.name.toUpperCase().includes(term.toUpperCase())
      //   )
      // );
    } else if (term === "") {
      setTestShow(true);
      const list = listFilter;
      console.log(list);
      if (list != "All") {
        const getList = () => {
          return fetch(
            `https://localhost:44352/api/Animal/page/${currentPage}`
          ).then((data) => data.json());
        };
        let mounted = true;
        getList().then((items) => {
          if (mounted) {
            setListAnimal(items.animals.filter((a) => a.speciesName === list));
            setTotalPages(items.pages);
          }
        });
        return () => (mounted = false);
      } else {
        const getList = () => {
          return fetch(
            `https://localhost:44352/api/Animal/page/${currentPage}`
          ).then((data) => data.json());
        };
        let mounted = true;
        getList().then((items) => {
          if (mounted) {
            setListAnimal(items.animals);
            setTotalPages(items.pages);
          }
        });
        return () => (mounted = false);
      }
    }
  }, 400);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Animal</b>
            <Form.Select
              // value={values.species}
              // onBlur={handleBlur}
              className="mt-3"
              onChange={(e) => {
                handleFilterChange(e);
              }}
            >
              <option value={null}>All</option>
              {/* Render các option từ API */}
              {listSpecies.map((option) => (
                <option key={option.speciesName} value={option.speciesName}>
                  <div style={{ height: "50px" }}>{option.speciesName}</div>
                </option>
              ))}
            </Form.Select>
          </span>
          <div className="search-container" style={{ paddingTop: "50px" }}>
            {/* toggleShow */}
            <div className="search-content" style={{ height: "40px" }}>
              <input
                type="text"
                onChange={handleSearch}
                className="form-control"
              />
              <Button variant="contained">
                <SearchIcon />
              </Button>
            </div>
            {role != "ADMIN" && (
              <div>
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClickPop}
                >
                  <PlusOutlined></PlusOutlined> Create Animal
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    <div className="btn-header" style={{ width: "185px" }}>
                      <div
                        className="mb-3 mt-1"
                        style={{ background: "aliceblue" }}
                      >
                        <Button variant="outlined" onClick={handleClick}>
                          Add New Animal
                        </Button>
                      </div>
                      <div
                        className="mb-3 mt-1"
                        style={{ background: "aliceblue" }}
                      >
                        <Button variant="outlined" onClick={handleClick2}>
                          Add New Schedule
                        </Button>
                      </div>
                      <div
                        className="mb-3 mt-1"
                        style={{ background: "aliceblue" }}
                      >
                        <Button variant="outlined" onClick={handleClick3}>
                          Add New Meal
                        </Button>
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
            )}
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
              {listAnimal &&
                listAnimal.length > 0 &&
                listAnimal.map((items, index) => {
                  return (
                    <tr key={`animal-${index}`}>
                      <td width={140} height={130}>
                        {" "}
                        <img
                          className="rounded"
                          style={{ width: "100%", maxHeight: "95px" }}
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
                      <td width={180}>{items.name}</td>
                      <td width={320} style={{ textAlign: "justify" }}>
                        {items.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {items.sex === true ? "Male" : "Female"}
                      </td>
                      <td width={185} style={{ textAlign: "center" }}>
                        {items.region}
                      </td>
                      <td width={370} style={{ textAlign: "center" }}>
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
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleDeleteAnimal(items);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {testShow && (
            <div className="pagination-container">
              <Pagination
                onChange={onShowSizeChange}
                defaultCurrent={currentPage}
                defaultPageSize={10}
                total={totalPages * 10}
              />
            </div>
          )}
        </div>
      </div>
      <AddAnimal show={showModalAdd} handleClose={handleClose} />
      <EditAnimal
        show={showModalEdit}
        handleClose={handleClose}
        dataAnimalEdit={dataAnimalEdit}
      />
      <ViewAnimal
        show={showModalView}
        handleClose={handleClose}
        dataAnimalView={dataAnimalView}
      />
      <DeleteAnimal
        show={showModalDelete}
        handleClose={handleClose}
        dataAnimalDelete={dataAnimalDelete}
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
      <AddMeal show={showModalMeal} handleClose={handleClose}></AddMeal>
    </div>
  );
}

export default TableAnimal;

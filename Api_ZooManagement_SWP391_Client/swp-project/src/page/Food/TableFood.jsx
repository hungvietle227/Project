import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/css/dashboard.css";
import Table from "react-bootstrap/Table";
import { MDBListGroup, MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddFood from "./AddFood";
import EditFood from "./EditFood";
import ViewFood from "./ViewFood";
import { debounce } from "lodash";
import { Pagination } from "antd";

function TableFood() {
  const role = localStorage.getItem("role");
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listFood, setListFood] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [dataFoodEdit, setDataFoodEdit] = useState({});
  const [dataFoodView, setDataFoodView] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodNotifications, setFoodNotifications] = useState([]);
  useEffect(() => {
    const getList = () => {
      return fetch(
        `https://localhost:44352/api/Food/pages/${currentPage}`
      ).then((data) => data.json());
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListFood(items.foods);
        setTotalPages(items.pages);
      }
    });
    return () => (mounted = false);
  }, [showModalEdit, showModalAdd, currentPage]);
  const handleClick = () => {
    setShowmodalAdd(true);
  };
  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const list = [];
    listFood.map((food) => {
      if (food.quantity < 500) {
        list.push(food);
      }
      setFoodNotifications(list);
    });
  }, [listFood]);
  console.log(foodNotifications);
  //   const handleClick = () => {
  //     setShowmodalAdd(true);
  //     setAnchorEl(null);
  //   };
  //   const handleClick2 = () => {
  //     setShowmodalFoodAnimal(true);
  //     setAnchorEl(null);
  //   };
  //   const handleClickPop = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  const handleClose = () => {
    setShowmodalFoodAnimal(false);
    setShowmodalEdit(false);
    setShowmodalAdd(false);
    setShowmodalView(false);
    setShowmodalFood(false);
    setAnchorEl(null);
  };
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  const handleEditFood = (item) => {
    // setDataUserEdit(item);
    const food = item;
    setDataFoodEdit(food);
    setShowmodalEdit(true);
  };
  const handleViewFood = (item) => {
    const food = item;
    setDataFoodView(food);
    setShowmodalView(true);
  };
  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Food/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListFood(
            items.foods.filter((food) =>
              food.fName.toUpperCase().includes(term.toUpperCase())
            )
          );
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    } else {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Food/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListFood(items.foods);
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    }
  }, 350);
  //   const handleViewUser = (item) => {
  //     // setDataUserEdit(item);
  //     const animal = item;
  //     setDataAnimalView(animal);
  //     setShowmodalView(true);
  //   };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Food</b>
            <Button
              variant="contained"
              onClick={handleClickPop}
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                backgroundColor: "#d9eef7",
                fontWeight: "bolder",
                color: "#000080",
              }}
            >
              Notification
              <MDBBadge
                className="ms-2"
                color="danger"
                style={{ fontSize: "small" }}
              >
                {foodNotifications.length}
              </MDBBadge>
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
              {foodNotifications &&
                foodNotifications.map((value) => {
                  return (
                    <div key={value.foodId}>
                      <MDBListGroup
                        style={{ minWidth: "22rem", display: "table" }}
                        light
                      >
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-muted">
                              <b>Food ID: </b>
                              {value.foodId}
                            </div>
                            <div className="text-muted">
                              <b>Food Name: </b>
                              {value.fName}
                            </div>
                            <div className="text-muted">
                              <b>Quantity: </b>
                              {value.quantity}
                            </div>
                          </div>
                          <MDBBadge
                            className="ms-2"
                            color="warning"
                            style={{ fontSize: "medium" }}
                          >
                            Warning
                          </MDBBadge>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </div>
                  );
                })}
            </Popover>
          </span>
          <div className="search-container">
            {/* toggleShow */}
            <div className="search-content">
              <input
                type="text"
                onChange={handleSearch}
                className="form-control"
              />
              <Button variant="contained">
                <SearchIcon />
              </Button>
            </div>
            {role && role === "STAFF" && (
              <div>
                <Button variant="contained" onClick={handleClick}>
                  <PlusOutlined />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="table-content">
          <Table size="100px" hover striped bordered style={{verticalAlign: "middle", textAlign: "center"}}>
            <thead className="table-dark">
              <tr>
                <th>Food ID</th>
                <th>Food Name</th>
                <th>Food Quantity</th>
                <th>Unit</th>
                <th>Category</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {listFood &&
                listFood.length > 0 &&
                listFood.map((items, index) => {
                  return (
                    <tr key={`food-${index}`}>
                      <td>{items.foodId}</td>
                      <td>{items.fName}</td>
                      <td>{items.quantity}</td>
                      <td>{items.unit}</td>
                      <td>{items.categoryName}</td>
                      <td style={{ width: "240px", textAlign: "center" }}>
                        {role && role === "ZOOTRAINER" && (
                          <Button
                            variant="text"
                            style={{ padding: 0 }}
                            onClick={() => {
                              handleViewFood(items);
                            }}
                          >
                            <VisibilityIcon />
                          </Button>
                        )}
                        {role && role === "STAFF" && (
                          <Button
                            variant="text"
                            style={{ padding: 0, textAlign: "center" }}
                            onClick={() => {
                              handleViewFood(items);
                            }}
                          >
                            <VisibilityIcon />
                          </Button>
                        )}
                        {role && role === "STAFF" && (
                          <Button
                            onClick={() => {
                              handleEditFood(items);
                            }}
                            variant="text"
                            style={{ padding: 0 }}
                          >
                            <EditIcon />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="pagination-container">
            <Pagination
              onChange={onShowSizeChange}
              defaultCurrent={currentPage}
              defaultPageSize={10}
              total={totalPages * 10}
            />
          </div>
        </div>
      </div>
      <AddFood show={showModalAdd} handleClose={handleClose} />
      <EditFood
        show={showModalEdit}
        handleClose={handleClose}
        dataFoodEdit={dataFoodEdit}
      />
      <ViewFood
        show={showModalView}
        handleClose={handleClose}
        dataFoodView={dataFoodView}
      />
      {/* <AddAnimal show={showModalAdd} handleClose={handleClose} />
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
      <AddAnimalFood show={showModalFoodAnimal} handleClose={handleClose} /> */}
    </div>
  );
}
export default TableFood;

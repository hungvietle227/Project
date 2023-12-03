import { BellFilled, MailOutlined } from "@ant-design/icons";
import React from "react";

import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Avatar, Layout, Menu, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { MDBListGroup, MDBListGroupItem, MDBBadge } from "mdb-react-ui-kit";
import "../../assets/css/dashboard.css";

function AppHeader({ OpenSidebar }) {
  const role = localStorage.getItem("role");
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const [listFood, setListFood] = useState([]);
  const [foodNotifications, setFoodNotifications] = useState([]);
  const [scheduleNotifications, setScheduleNotifications] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const userName = localStorage.getItem("name");
  const [aID, setAID] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [listAnimal, setListAnimal] = useState([]);
  const emailInfo = localStorage.getItem("email");
  const [profileZooTrainer, setProfileZooTrainer] = useState({});
  const [listAnimalFilter, setListAnimalFilter] = useState([]);

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
    const ZooProfileTest = profileZooTrainer;
    if (ZooProfileTest.length > 0) {
      setAID(ZooProfileTest[0].userId);
    }
  }, [profileZooTrainer]);

  useEffect(() => {
    const getList = () => {
      return fetch("https://localhost:44352/api/Animal").then((data) =>
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
    const now = new Date();
    const list = listAnimal.filter((animal) => animal.userId === aID);
    const currentPeriod = getPeriod(now.getHours());
    const filteredAnimals = list.filter((animal) => {
      return animal.schedules.some((schedule) => {
        const schedulePeriod = parseTime(schedule.time);
        return schedulePeriod === currentPeriod && schedule.isDone === false;
      });
    });
    setListAnimalFilter(filteredAnimals);
  }, [listAnimal]);
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
    console.log(hour);
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

  const nativigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("dataUser");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    nativigate("/");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const clickEdit = localStorage.getItem("click");
  useEffect(() => {
    const getList = () => {
      return fetch(`https://localhost:44352/api/Food`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListFood(items);
      }
    });
    return () => (mounted = false);
  }, [clickEdit]);
  useEffect(() => {
    const list = [];
    listFood.map((food) => {
      if (food.quantity < 500) {
        list.push(food);
      }
      setFoodNotifications(list);
    });
  }, [listFood, clickEdit]);
  useEffect(() => {
    const list = [];
    listFood.map((food) => {
      if (food.quantity < 100) {
        list.push(food);
      }
      setScheduleNotifications(list);
    });
  }, [listFood]);
  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    nativigate("/staff/food");
    setAnchorEl(null);
    if (role === "ZOOTRAINER") {
      nativigate("/ZooTrainer/feed");
      setAnchorEl(null);
    }
  };
  const handleChange = () => {
    if (role === "STAFF") {
      nativigate("/staff/profile");
    } else if (role === "ZOOTRAINER") {
      nativigate("/ZooTrainer/profile");
    }
  };
  return (
    <div className="AppHeader">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <Image width={90} src="/logo.png"></Image>
      {/* <Typography.Title style={{ marginBottom: "0", fontSize: "30px" }}>
          {role + " " + "Manager"}
        </Typography.Title> */}

      <Space>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{ marginRight: "10px", color: "black" }}
          />
          <span
            style={{ marginRight: "20px", cursor: "pointer" }}
            onClick={handleChange}
          >
            {userName && userName != null
              ? `${userName + " ( " + role + " )"}`
              : "User Name"}
          </span>
          {showLogout && (
            <span
              style={{
                marginLeft: "8px",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              LOG OUT
            </span>
          )}
        </div>
        {role === "STAFF" && (
          <>
            <Badge count={foodNotifications.length}>
              <BellFilled
                style={{ fontSize: 24 }}
                onClick={handleClickPop}
              ></BellFilled>
            </Badge>
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
                            Warning Food
                          </MDBBadge>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </div>
                  );
                })}
              <div style={{ textAlign: "center" }} onClick={handleClick}>
                <Button>View Problem</Button>
              </div>
            </Popover>
          </>
        )}
        {role === "ZOOTRAINER" && (
          <>
            <Badge count={listAnimalFilter.length}>
              <BellFilled
                style={{ fontSize: 24 }}
                onClick={handleClickPop}
              ></BellFilled>
            </Badge>
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
              {listAnimalFilter &&
                listAnimalFilter.map((value) => {
                  return (
                    <div key={value.animalId}>
                      <MDBListGroup
                        style={{ minWidth: "22rem", display: "table" }}
                        light
                      >
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-muted">
                              <b>ID: </b>
                              {value.animalId}
                            </div>
                            <div className="text-muted">
                              <b>Name: </b>
                              {value.name}
                            </div>
                            <div className="text-muted">
                              <b>Schedule: </b>
                              {value.schedules &&
                                value.schedules.map((value) => {
                                  const now = new Date();
                                  const schedulePeriod = parseTime(value.time);
                                  const currentPeriod = getPeriod(
                                    now.getHours()
                                  );
                                  if (
                                    schedulePeriod === currentPeriod &&
                                    value.isDone === false
                                  ) {
                                    return (
                                      <div className="text-muted">
                                        {value.scheduleName +
                                          " - " +
                                          value.time}
                                      </div>
                                    );
                                  }
                                })}
                              {console.log(value.schedules)}
                            </div>
                          </div>
                          <MDBBadge
                            className="ms-2"
                            color="warning"
                            style={{ fontSize: "medium" }}
                          >
                            Schedule
                          </MDBBadge>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </div>
                  );
                })}
              <div style={{ textAlign: "center" }} onClick={handleClick}>
                <Button>View Problem</Button>
              </div>
            </Popover>
          </>
        )}
      </Space>
    </div>
  );
}
export default AppHeader;

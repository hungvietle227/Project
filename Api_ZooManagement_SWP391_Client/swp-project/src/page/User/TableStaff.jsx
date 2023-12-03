import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Avatar from "@mui/material/Avatar";
import "../../assets/css/dashboard.css";
import { Pagination } from "antd";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPaginate from "react-paginate";
import { redirect, useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ViewUser from "./ViewUser";
import EditPage from "./EditPage";
import _ from "lodash";
import { debounce } from "lodash";
import DeleteUser from "./DeleteUser";
function TableStaff() {
  useEffect(() => {
    if (localStorage.getItem("isAdded") === "true") {
      // show success msg
      toast.success("Added Successfully");
      localStorage.removeItem("isAdded");
    }
  }, []);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserView, setDataUserView] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [showModalDelete, setShowmodalDelete] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getUsers = () => {
      return fetch(
        `https://localhost:44352/api/User/trainers/pages/${currentPage}`
      ).then((data) => data.json());
    };
    let mounted = true;
    getUsers().then((items) => {
      if (mounted) {
        setUsers(items.users);
        setTotalPages(items.pages);
      }
    });
    return () => (mounted = false);
  }, [currentPage, showModalEdit]);
  const handleEditUser = (item) => {
    console.log(item);
    const user = item;
    setDataUserEdit(user);
    setShowmodalEdit(true);
  };
  const handleViewUser = (item) => {
    const user = item;
    setDataUserView(user);
    setShowmodalView(true);
  };
  const handleClose = () => {
    setShowmodalEdit(false);
    setShowmodalView(false);
    setShowmodalDelete(false);
  };
  const handleDeleteUser = (item) => {
    const user = item;
    setDataUserDelete(user);
    setShowmodalDelete(true);
  };
  // const email = localStorage.getItem("email");
  // const zooTrainerList = users.filter((user) => user.role === 3);
  // const getList = () => {
  //   return fetch("https://localhost:44352/api/User/users").then((data) =>
  //     data.json()
  //   );
  // };
  // // dùng API real
  // useEffect(() => {
  //   let mounted = true;
  //   getList().then((items) => {
  //     if (mounted) {
  //       setListUsers(items);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);
  const [optSmModal, setOptSmModal] = useState(false);
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const toggleShow = () => setOptSmModal(!optSmModal);
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/staff/add");
  };
  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      const getUsers = () => {
        return fetch(
          `https://localhost:44352/api/User/trainers/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getUsers().then((items) => {
        if (mounted) {
          setUsers(
            items.users.filter(
              (a) =>
                a.firstname.toUpperCase().includes(term.toUpperCase()) ||
                a.lastname.toUpperCase().includes(term.toUpperCase())
            )
          );
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    } else {
      const getUsers = () => {
        return fetch(
          `https://localhost:44352/api/User/trainers/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getUsers().then((items) => {
        if (mounted) {
          setUsers(items.users);
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    }
  }, 350);

  useEffect(() => {
    const checkUser = async () => {
      const email = localStorage.getItem('email');
      const getUsers = () => {
        return fetch(
          `https://localhost:44352/api/User/users/${email}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getUsers().then((items) => {
        if (mounted) {
          setCurrentUser(items);
        }
      });
      return () => (mounted = false);
    }

    checkUser();

    const interval = setInterval(checkUser, 2000);

    return () => clearInterval(interval);

  }, [currentUser.status])

  if (currentUser.status === false) {
    const confirmLogout = async () => {
      if (await confirm("You have been kicked by admin, to know more information please ask your admin")) {
        navigate('/login');
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
      }
    }
    confirmLogout();
  };
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Employees</b>
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
            <div>
              <Button variant="contained" onClick={handleClick}>
                <PlusOutlined />
              </Button>
            </div>
          </div>
        </div>
        <div className="table-content">
          <Table
            size="100px"
            hover
            striped
            bordered
            style={{ verticalAlign: "middle" }}
          >
            <thead className="table-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Name</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((item, index) => {
                  return (
                    <tr
                      key={`user-${index}`}
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      <td width={130}>
                        {" "}
                        <img
                          className="rounded"
                          style={{ width: "100%" }}
                          src={
                            "/" +
                            item.userImage.substring(
                              item.userImage.indexOf(
                                "\\",
                                item.userImage.indexOf("\\") + 1
                              ) + 1
                            )
                          }
                        ></img>
                      </td>
                      <td>{item.userId}</td>
                      <td>{item.email}</td>
                      <td>{item.role === 2 ? "Staff" : "ZooTrainer"}</td>
                      <td>{item.firstname + " " + item.lastname}</td>
                      <td style={{ width: "17rem", textAlign: "center" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewUser(item);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditUser(item);
                          }}
                          variant="text"
                          style={{ padding: 0 }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteUser(item);
                          }}
                          variant="text"
                          style={{ padding: 0 }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {totalPages > 0 && (
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
      <EditPage
        show={showModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
      />
      <ViewUser
        show={showModalView}
        handleClose={handleClose}
        dataUserView={dataUserView}
      />
      <DeleteUser
        show={showModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
      />
    </div>
  );
}
export default TableStaff;

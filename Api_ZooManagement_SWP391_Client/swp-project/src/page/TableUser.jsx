import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Avatar from "@mui/material/Avatar";
import "../assets/css/dashboard.css";
import { Pagination } from "antd";
import ReactPaginate from "react-paginate";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAdd from "./User/ModalAdd";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
import axios from "axios";
import AddPage from "./User/AddPage";
import EditPage from "./User/EditPage";
import { toast, ToastContainer } from "react-toastify";
import ViewUser from "./User/ViewUser";
import _ from "lodash";
import { debounce } from "lodash";
import DeleteUser from "./User/DeleteUser";


function TableUser() {
  // const [isAdded, setIsAdded] = useState(
  //   localStorage.getItem("isAdded") === "true"
  // );
  useEffect(() => {
    if (localStorage.getItem("isAdded") === "true") {
      // show success msg
      toast.success("Added Successfully");
      localStorage.removeItem("isAdded");
    }
  }, []);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserView, setDataUserView] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getUsers = () => {
      return fetch(
        `https://localhost:44352/api/User/staffs/pages/${currentPage}`
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const fetchAllUser = () => {
  //   return axios.get("https://reqres.in/api/users?page=2");
  //   // return axios.get("https://localhost:44352/api/User/users");
  // };
  const handlePageClick = () => { };
  const handleEditUser = (item) => {
    // setDataUserEdit(item);
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
  //dùng API để Test
  // useEffect(() => {
  //   //call API
  //   getUsers();
  // }, []);
  // const getUsers = async () => {
  //   let res = await fetchAllUser();
  //   if (res && res.data && res.data.data) {
  //     setListUsers(res.data.data);
  //   }
  // };

  const [optSmModal, setOptSmModal] = useState(false);
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const toggleShow = () => setOptSmModal(!optSmModal);
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setCurrentPage(current);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/add");
  };
  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(users);
      cloneListUser = cloneListUser.filter(
        (a) => a.firstname.includes(term) || a.lastname.includes(term)
      );
      setUsers(cloneListUser);
    } else {
      const getUsers = () => {
        return fetch(
          `https://localhost:44352/api/User/staffs/pages/${currentPage}`
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


  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Users</b>
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
          <Table size="100px" hover
            striped
            bordered
            style={{ verticalAlign: "middle", textAlign: "center" }}>
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>First name</th>
                <th>Last name</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((item, index) => {
                  return (
                    <tr key={`user-${index}`}>
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
                      <td width={115}>{item.firstname}</td>
                      <td width={150}>{item.lastname}</td>
                      <td width={360}>
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
              {/* <tr>
                <td>Leuleu</td>
                <td>Haha</td>
                <td>Huhu</td>
                <td>Hihi</td>
                <td>Leuleu</td>
                <td style={{ width: "13rem" }}>
                  <Button variant="text" style={{ padding: 0 }}>
                    <VisibilityIcon />
                  </Button>
                  <Button variant="text" style={{ padding: 0 }}>
                    <EditIcon />
                  </Button>
                  <Button variant="text" style={{ padding: 0 }}>
                    <DeleteIcon />
                  </Button>
                </td>
              </tr> */}
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
export default TableUser;

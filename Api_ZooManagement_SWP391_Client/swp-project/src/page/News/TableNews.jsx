import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DashOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/css/dashboard.css";
import Table from "react-bootstrap/Table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ViewNews from "./ViewNews";
import EditNews from "./EditNews";
import AddNews from "./AddNews";
import DeleteNews from "./DeleteNews";
import { Pagination } from "antd";

function TableNews() {
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listNews, setListNews] = useState([]);
  const [user, setUser] = useState({});
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [dataNewsEdit, setDataNewsEdit] = useState({});
  const [dataNewsView, setDataNewsView] = useState({});
  const [dataNewsDelete, setDataNewsDelete] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const email = localStorage.getItem('email');
  
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  useEffect(() => {
    const getUser = () => {
      return fetch(`https://localhost:44352/api/User/users/${email}`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getUser().then((items) => {
      if (mounted) {
        setUser(items.userId);
      }
    });
    return () => (mounted = false);
  }, [email]);
  console.log(user);
  useEffect(() => {
    const getList = () => {
      return fetch(`https://localhost:44352/api/News/${user}/pages/${currentPage}`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListNews(items.news.filter(item => item.status === true));
        setCurrentPage(items.currentPage)
      }
    });
    return () => (mounted = false);
  }, [showModalEdit, showModalAdd,user]);
  const handleClick = () => {
    setShowmodalAdd(true);
  };

  const a = listNews.sort((a, b) =>{
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  })
  console.log(a);
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
    setShowmodalDelete(false);
    setAnchorEl(null);
  };

  const handleEditNews = (item) => {
    // setDataUserEdit(item);
    const food = item;
    setDataNewsEdit(food);
    setShowmodalEdit(true);
  };
  const handleViewNews = (item) => {
    const food = item;
    setDataNewsView(food);
    setShowmodalView(true);
  };
  const handleDeleteNews = async (item) => {
    const news = item;
    setDataNewsDelete(news);
    setShowmodalDelete(true);
    // const id = item.newsId;
    // const response = await fetch(`https://localhost:44352/api/News/${id}`, {
    //   method: "DELETE",
    // });
    // if (response.ok) {
    //   console.log("Success");
    //   window.location.reload();
    // }
  }
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
            <b>View News</b>
          </span>
          <div className="search-container">
            {/* toggleShow */}
            <div className="search-content">
              <input type="email" className="form-control" />
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
          <Table size="100px" hover  bordered style={{textAlign: "center", verticalAlign: "middle"}}>
            <thead className="table-dark">
              <tr>
                <th>News ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>ReleaseDate</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {listNews &&
                listNews.length > 0 &&
                listNews.map((items, index) => {
                  return (
                    <tr key={`food-${index}`}>
                      <td>{items.newsId}</td>
                      <td>{items.newsTitle}</td>
                      <td>{items.authorName}</td>
                      <td>{items.releaseDate.slice(0, 10)}</td>
                      <td>
                        {items.checked === true ? (
                          <div
                            style={{
                              background: "#008800",
                              borderRadius: "50px",
                              textAlign: "center",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            Approve
                          </div>
                        ) : (
                          <div
                            style={{
                              background: "#FFBC00",
                              borderRadius: "50px",
                              textAlign: "center",
                              color: "indigo",
                              fontWeight: "bold",
                            }}
                          >
                            Pending
                          </div>
                        )}
                      </td>
                      <td style={{ width: "208px",textAlign: "center" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewNews(items);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        {items.checked === true && (
                        <Button
                          onClick={() => {
                            handleEditNews(items);
                          }}
                          variant="text"
                          style={{ padding: 0 }}
                        >
                          <EditIcon />
                        </Button>
                        )}
                        {items.checked === false && (
                        <Button
                          onClick={() => {
                            handleDeleteNews(items);
                          }}
                          variant="text"
                          style={{ padding: 0 }}>
                          <DeleteIcon />
                        </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {listNews.length < 0  && (
                  <tr>
                    <td colSpan={6}>No news</td>
                  </tr>
                )}
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
      <AddNews show={showModalAdd} handleClose={handleClose} />
      <EditNews
        show={showModalEdit}
        handleClose={handleClose}
        dataNewsEdit={dataNewsEdit}
      />
      <ViewNews
        show={showModalView}
        handleClose={handleClose}
        dataNewsView={dataNewsView}
      />
      <DeleteNews
        show={showModalDelete}
        handleClose={handleClose}
        dataNewsDelete={dataNewsDelete}
      />
    </div>
  );
}
export default TableNews;

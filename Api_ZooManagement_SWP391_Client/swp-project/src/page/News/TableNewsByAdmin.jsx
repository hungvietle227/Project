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

function TableNewsByAdmin() {
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalDelete, setShowmodalDelete] = useState(false);

  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listNews, setListNews] = useState([]);
  const [listAvailableNews, setListAvailableNews] = useState([]);
  const [listDenyNews, setListDenyNews] = useState([]);

  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [dataNewsDelete, setDataNewsDelete] = useState({});
  const [dataNewsEdit, setDataNewsEdit] = useState({});
  const [dataNewsView, setDataNewsView] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState(1);
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  const getList = () => {
    return fetch("https://localhost:44352/api/News").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListNews(
          items === null ? null : items.filter((item) => item.status === true)
        );
      }
    });
    return () => (mounted = false);
  }, []);

  const getAvailableNews = () => {
    return fetch("https://localhost:44352/api/News/accepted").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getAvailableNews().then((items) => {
      if (mounted) {
        setListAvailableNews(items === null ? null : items);
      }
    });
    return () => (mounted = false);
  }, []);

  const getDenyNews = () => {
    return fetch("https://localhost:44352/api/News/denied").then((data) =>
      data.json()
    );
  };
  useEffect(() => {
    let mounted = true;
    getDenyNews().then((items) => {
      if (mounted) {
        setListDenyNews(items === null ? null : items);
      }
    });
    return () => (mounted = false);
  }, []);

  const handleClick = () => {
    setShowmodalAdd(true);
  };

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

  const handleAcceptNews = async (item) => {
    // setDataUserEdit(item);
    console.log(item);
    // setDataNewsEdit(food);
    // setShowmodalEdit(true);
    const id = item.newsId;
    const news = {
      newsId: item.newsId,
      releaseDate: item.releaseDate,
      newsTitle: item.newsTitle,
      newsContent: item.newsContent,
      newsImage: item.newsImage,
      status: true,
      checked: true,
    };
    console.log(news);
    const response = await fetch(`https://localhost:44352/api/News/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    });
    if (response.ok) {
      console.log("Success");
      // localStorage.setItem("isAdded", true);
      // handleClose()
      window.location.reload();
    }
  };
  const handleDenyNews = (item) => {
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
  };

  const handleViewNews = (item) => {
    const food = item;
    setDataNewsView(food);
    setShowmodalView(true);
  };
  const handleShowNews = (value) => {
    // setShowAvailableList(!showAvailableList);
    // setShowRequestList(false);
    setCurrentList(value);
  };

  const a = listNews.sort((a, b) =>{
    return new Date(b.releaseDate) - new Date(a.releaseDate)
  })
  const b = listAvailableNews.sort((a,b) =>{
    return new Date(b.releaseDate) - new Date(a.releaseDate)
  })
  const c = listDenyNews.sort((a,b) =>{
    return new Date(b.releaseDate) - new Date(a.releaseDate)
  })

  //  const handleShowNewsRequest = () => {
  //     setShowRequestList(!showRequestList);
  //     setShowAvailableList(false);
  // };
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
            <br />
            <Button
              variant="contained"
              onClick={() => handleShowNews(1)}
              style={{
                marginTop: "20px",
                marginRight: "20px",
                backgroundColor: "aquamarine",
                fontWeight: "bolder",
                color: "#000080",
              }}
            >
              All
            </Button>
            <Button
              variant="contained"
              onClick={() => handleShowNews(2)}
              style={{
                marginTop: "20px",
                marginRight: "20px",
                backgroundColor: "#d9eef7",
                fontWeight: "bolder",
                color: "#000080",
              }}
            >
              News Now
            </Button>
            <Button
              variant="contained"
              onClick={() => handleShowNews(3)}
              style={{
                marginTop: "20px",
                backgroundColor: "#D8DADF",
                fontWeight: "bolder",
                color: "black",
              }}
            >
              <div>Request ( </div>
              <div style={{ color: "red", fontWeight: "bolder" }}>
                {" "}
                {listDenyNews.length}
              </div>
              )
            </Button>
          </span>
        </div>
        <div className="table-content">
          <Table size="100px" hover
            striped
            bordered
            style={{ verticalAlign: "middle", textAlign: "center" }}>
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
              {currentList === 1 &&
                a &&
                a.length > 0 &&
                a.map((items, index) => {
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
                      <td style={{ width: "250px", textAlign: "center" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewNews(items);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            handleDenyNews(items);
                          }}
                          variant="text"
                          style={{
                            padding: 0,
                            width: "84px",
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              {currentList === 2 &&
                listAvailableNews &&
                listAvailableNews.length > 0 &&
                listAvailableNews.map((items, index) => {
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
                      <td style={{ width: "165px" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewNews(items);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          variant="text"
                          style={{
                            padding: 0,
                            // backgroundColor: "red",
                            // color: "white",
                            width: "84px",
                          }}
                          onClick={() => {
                            handleDenyNews(items);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              {currentList === 3 &&
                listDenyNews &&
                listDenyNews.length > 0 &&
                listDenyNews.map((items, index) => {
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
                      <td style={{ width: "280px" }}>
                        <Button
                          variant="text"
                          style={{ padding: 0 }}
                          onClick={() => {
                            handleViewNews(items);
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            handleAcceptNews(items);
                          }}
                          variant="text"
                          style={{
                            padding: 0,
                            backgroundColor: "green",
                            color: "white",
                            width: "84px",
                            marginRight: "15px",
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => {
                            handleDenyNews(items);
                          }}
                          variant="text"
                          style={{
                            padding: 0,
                            backgroundColor: "red",
                            color: "white",
                            width: "84px",
                          }}
                        >
                          Deny
                        </Button>
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
export default TableNewsByAdmin;

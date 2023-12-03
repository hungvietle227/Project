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
import { Pagination } from "antd";

function OrderTable() {
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [dataFoodEdit, setDataFoodEdit] = useState({});
  const [dataFoodView, setDataFoodView] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  useEffect(() => {
    const getList = () => {
      return fetch(`https://localhost:44352/api/Order/pages/${currentPage}`).then((data) =>
        data.json()
      );
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListOrder(items.orders);
        setTotalPages(items.pages);
      }
    });
    return () => (mounted = false);
  }, [currentPage]);
  console.log(listOrder);
  const editDay = (dayNews) => {
    const releaseDate = new Date(dayNews);
    const day = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1; // Cộng thêm 1 vào tháng
    const year = releaseDate.getFullYear();
    const formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  };
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
    setShowmodalView(false);
  };
  const handleViewFood = (item) => {
    const food = item;
    setDataFoodView(food);
    setShowmodalView(true);
  };
  //   const handleViewUser = (item) => {
  //     // setDataUserEdit(item);
  //     const animal = item;
  //     setDataAnimalView(animal);
  //     setShowmodalView(true);
  //   };
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Order</b>
          </span>
          <div className="search-container">
            {/* toggleShow */}
            <div className="search-content">
              <input type="email" className="form-control" />
              <Button variant="contained">
                <SearchIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="table-content">
          <Table size="100px" hover>
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Total Price</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              {listOrder &&
                listOrder.length > 0 &&
                listOrder.map((items, index) => {
                  return (
                    <tr key={`food-${index}`}>
                      <td>{items.email}</td>
                      <td>{items.fullName}</td>
                      <td>{items.phoneNumber}</td>
                      <td>{items.totalPrice}</td>
                      <td>{editDay(items.startDate)}</td>
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
      {/* <ViewFood
        show={showModalView}
        handleClose={handleClose}
        dataFoodView={dataFoodView}
      /> */}
    </div>
  );
}
export default OrderTable;

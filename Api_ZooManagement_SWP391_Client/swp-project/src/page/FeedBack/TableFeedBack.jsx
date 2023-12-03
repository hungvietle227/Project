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
function TableFeedBack() {
    const [showModalAdd, setShowmodalAdd] = useState(false);
    const [showModalEdit, setShowmodalEdit] = useState(false);
    const [showModalView, setShowmodalView] = useState(false);
    const [showModalFodd, setShowmodalFood] = useState(false);
    const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
    const [listFeedBack, setListFeedBack] = useState([]);
    const [dataAnimalEdit, setDataAnimalEdit] = useState({});
    const [dataAnimalView, setDataAnimalView] = useState({});
    const [dataFoodEdit, setDataFoodEdit] = useState({});
    const [dataFoodView, setDataFoodView] = useState({});

    const getList = () => {
        return fetch("https://localhost:44352/api/Review").then((data) =>
            data.json()
        );
    };
    useEffect(() => {
        let mounted = true;
        getList().then((items) => {
            if (mounted) {
                setListFeedBack(items);
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
                        <b>View FeedBack</b>
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
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listFeedBack &&
                                listFeedBack.length > 0 &&
                                listFeedBack.map((items, index) => {
                                    return (
                                        <tr key={`feedback-${index}`}>
                                            <td>{items.reviewId}</td>
                                            <td>{items.email}</td>
                                            <td>{items.completeName}</td>
                                            <td>{items.message}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
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
export default TableFeedBack;

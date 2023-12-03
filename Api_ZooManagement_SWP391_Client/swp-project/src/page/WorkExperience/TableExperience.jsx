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
import { Pagination } from "antd";
import { debounce } from "lodash";
import AddExperience from "./AddExperience";

function TableExperience() {
  const role = localStorage.getItem("role");
  const [showModalAdd, setShowmodalAdd] = useState(false);
  const [showModalEdit, setShowmodalEdit] = useState(false);
  const [showModalView, setShowmodalView] = useState(false);
  const [showModalFodd, setShowmodalFood] = useState(false);
  const [showModalFoodAnimal, setShowmodalFoodAnimal] = useState(false);
  const [listExperience, setListExperience] = useState([]);
  const [dataAnimalEdit, setDataAnimalEdit] = useState({});
  const [dataAnimalView, setDataAnimalView] = useState({});
  const [dataCageEdit, setDataCageEdit] = useState({});
  const [dataCageView, setDataCageView] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const onShowSizeChange = (current) => {
    console.log(current);
    setCurrentPage(current);
  };
  useEffect(() => {
    const getList = () => {
      return fetch(
        `https://localhost:44352/api/Experience/pages/${currentPage}`
      ).then((data) => data.json());
    };
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setListExperience(items.experiences);
        setTotalPages(items.pages);
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
    setAnchorEl(null);
  };

  const handleEditArea = (item) => {
    // setDataUserEdit(item);
    const cage = item;
    setDataCageEdit(cage);
    setShowmodalEdit(true);
  };
  const handleViewArea = (item) => {
    const cage = item;
    setDataCageView(cage);
    setShowmodalView(true);
  };
  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    let term = e.target.value;
    if (term) {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Experience/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListExperience(
            items.experiences.filter((item) =>
              item.position.toUpperCase().includes(term.toUpperCase())
            )
          );
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    } else {
      const getList = () => {
        return fetch(
          `https://localhost:44352/api/Experience/pages/${currentPage}`
        ).then((data) => data.json());
      };
      let mounted = true;
      getList().then((items) => {
        if (mounted) {
          setListExperience(items.experiences);
          setTotalPages(items.pages);
        }
      });
      return () => (mounted = false);
    }
  }, 350);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="table-container">
      <div className="table-component">
        <div className="my-3 add-new">
          <span>
            <b>View Experience</b>
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
          <Table size="100px" hover>
            <thead className="table-dark">
              <tr>
                <th>Species ID</th>
                <th>Name</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {listExperience &&
                listExperience.length > 0 &&
                listExperience.map((items, index) => {
                  return (
                    <tr key={`experience-${index}`}>
                      <td>{items.experienceId}</td>
                      <td>{items.position}</td>
                      <td style={{ width: "220px" }}>
                        {role && role === "STAFF" && (
                          <Button
                            variant="text"
                            style={{ padding: 0, textAlign: "center" }}
                            onClick={() => {
                              handleViewArea(items);
                            }}
                          >
                            <VisibilityIcon />
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
      <AddExperience show={showModalAdd} handleClose={handleClose} />
      {/*
            <ViewFood
                show={showModalView}
                handleClose={handleClose}
                dataFoodView={dataCageView}
            /> */}
    </div>
  );
}
export default TableExperience;

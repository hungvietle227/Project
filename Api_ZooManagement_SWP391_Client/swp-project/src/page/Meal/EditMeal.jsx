import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import DeleteIcon from "@mui/icons-material/Delete";
import { MDBIcon } from "mdb-react-ui-kit";

import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";

export default function EditMeal(pros) {
    const [staticModal, setStaticModal] = useState(false);
    const { show, handleClose, dataFoodEdit } = pros;
    const role = localStorage.getItem("role");
    const [mealName, setMealName] = useState("");
    const [mealId, setMealId] = useState("");
    const [listFood, setListFood] = useState([]);
    const [selectedFoodIds, setSelectedFoodIds] = useState([]);
    const [isNew2, setIsNew2] = useState(false);
    const [isValidAmount, setIsValidAmount] = useState(true);

    const [options, setOptions] = useState([]);
    const getList = () => {
        return fetch("https://localhost:44352/api/Food").then((data) =>
            data.json()
        );
    };
    useEffect(() => {
        let mounted = true;
        getList().then((items) => {
            if (mounted) {
                setOptions(items);
            }
        });
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (show) {
            setMealName(dataFoodEdit.mealName);
            setMealId(dataFoodEdit.mealId);
            setListFood(dataFoodEdit.foodMealDtos);
        }
    }, [dataFoodEdit]);

    useEffect(() => {
        const array = [];
        const scheduleIds1 = listFood.map((schedule) => schedule.foodId);
        array.push(scheduleIds1);
        console.log(array);
        setSelectedFoodIds(scheduleIds1);
    }, [dataFoodEdit, listFood]);

    const handleFoodSelect = (e, index) => {
        // setSelectedFoodId(e.target.value);
        console.log(e.target.value);
        // Lấy ra food object từ options
        const selectedFoodId = e.target.value;
        // setSelectedFoodIds((prevSelectedFoodIds) => [
        //   ...prevSelectedFoodIds,
        //   selectedFoodId,
        // ]);
        setSelectedFoodIds([...selectedFoodIds, e.target.value]);
        console.log(selectedFoodIds);

        const selectedFood = options.find((o) => o.foodId === e.target.value);
        console.log(selectedFood.foodId);
        console.log(e.target.value);
        console.log(index);
        // Cập nhật lại cho food hiện tại
        const currentFood = listFood[index];
        currentFood.foodId = selectedFood.foodId;
        console.log(currentFood);
        setListFood([...listFood]);
    };
    const handleSave = () => {
        console.log("haha");
    };
    const handleAdd2 = () => {
        setIsNew2(true);
        // Thêm mới object vào cuối mảng
        setListFood([
            ...listFood,
            {
                foodId: "",
                quantity: "",
                unit: "",
            },
        ]);
    };
    const removeField = (index) => {
        setListFood(listFood.filter((_, i) => i !== index));
    };
    const handleFoodChange = (id, event) => {
        validateAmountFood(event.target.value);
        const newFood = listFood.map((food) => {
            if (food.foodId === id) {
                food.quantity = Number(event.target.value);
            }
            return food;
        });
        setListFood(newFood);
    };
    const handleUnitChange = (id, event) => {
        const newSchedule = listFood.map((food) => {
            if (food.foodId === id) {
                food.unit = event.target.value;
            }
            return food;
        });
        setListFood(newSchedule);
    };

    const validateAmountFood = (value) => {
        const amout = Number(value);
        if (!isNaN(amout) && amout >= 1) {
            setIsValidAmount(true);
        } else {
            setIsValidAmount(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const food = {
            mealId: mealId,
            foodMeals: listFood,
        };
        console.log(food);
        if (isValidAmount === false) {
            toast.success("Quantity must be > 0");
            return;
        }
        const response = await fetch(`https://localhost:44352/api/Meal/${mealId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(food),
        });
        if (response.ok) {
            console.log("Success");
            // localStorage.setItem("isAdded", true);
            // handleClose()
            //window.location.href = '/staff/food'
            // handleClose();
            // navigate("/staff/1")
            toast.success("Update Success");
            setTimeout(() => {
                window.location.reload();
            }, 1300);
        } else {
            toast.error("Update Failure");
        }
    };
    return (
        <>
            <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
                <MDBModalDialog size="lg">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={handleClose}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="form-container-1">
                                <div className="form-header">
                                    <p className="fw-bold fs-2">Edit Meal</p>
                                </div>
                                <Form noValidate onSubmit={handleFormSubmit}>
                                    <div className="form-content">
                                        <div className="form">
                                            <div className="mb-3">
                                                <label className="form-label">Meal Name</label>
                                                <Form.Control
                                                    type="text"
                                                    style={{ height: "56px" }}
                                                    disabled
                                                    id="mealName"
                                                    placeholder="mealName"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="mealName"
                                                    value={mealName}
                                                    onChange={(e) => setMealName(e.target.value)}
                                                />
                                            </div>
                                            {listFood.length > 0 && (
                                                <div className="mb-3 Schedule-Information">
                                                    <div className="mb-1">
                                                        {listFood &&
                                                            listFood.map((food, index) => (
                                                                <div
                                                                    key={food.foodId}
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        width: "95%",
                                                                    }}
                                                                >

                                                                    <div style={{ width: "30%" }}>
                                                                        <label className="form-label">
                                                                            Edit Food For Animal
                                                                        </label>
                                                                        <Form.Control
                                                                            as="select"
                                                                            style={{
                                                                                width: "95%",
                                                                                marginRight: "20px",
                                                                            }}
                                                                            value={food.foodId}
                                                                            onChange={
                                                                                isNew2
                                                                                    ? (e) => handleFoodSelect(e, index)
                                                                                    : null
                                                                            }
                                                                            placeholder="Chọn món ăn"
                                                                        >
                                                                            <option value="">Choose Food</option>
                                                                            {/* Render các option từ API */}
                                                                            {options.map((option) => (
                                                                                <option
                                                                                    key={option.foodId}
                                                                                    value={option.foodId}
                                                                                    disabled={selectedFoodIds.includes(
                                                                                        option.foodId
                                                                                    )}
                                                                                >
                                                                                    {option.fName}
                                                                                </option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                    <div style={{ width: "30%" }}>
                                                                        <label className="form-label">
                                                                            Edit Quantity
                                                                        </label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            className="mb-3"
                                                                            aria-describedby="inputGroupPrepend"
                                                                            style={{ width: "90%" }}
                                                                            value={food.quantity}
                                                                            onChange={(e) =>
                                                                                handleFoodChange(food.foodId, e)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: "30%" }}>
                                                                        <label className="form-label">
                                                                            Edit Unit
                                                                        </label>
                                                                        <Form.Select
                                                                            value={food.unit}
                                                                            style={{
                                                                                width: "80%",
                                                                                marginBottom: "30px",
                                                                            }}
                                                                            onChange={(e) =>
                                                                                handleUnitChange(food.foodId, e)
                                                                            }
                                                                        >
                                                                            <option value="">Choose Unit</option>
                                                                            <option value="Kg">Kg</option>
                                                                            <option value="L">L</option>
                                                                        </Form.Select>
                                                                    </div>
                                                                    <div style={{ paddingTop: "40px" }}>
                                                                        <button onClick={() => removeField(index)}>
                                                                            <DeleteIcon />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        {listFood.length &&
                                                            listFood.length < options.length && (
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <Button onClick={handleAdd2}>Add</Button>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div style={{ textAlign: "end" }}>
                                                        <Button
                                                            type="submit"
                                                            variant="text"
                                                            style={{ padding: 0, marginRight: "24px" }}
                                                        >
                                                            <MDBIcon fas icon="edit" size="2x" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                            <MDBModalFooter>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleClose}
                                                    active
                                                    style={{
                                                        width: "80px",
                                                        marginRight: "20px",
                                                        background: "gainsboro",
                                                    }}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    style={{ background: "blue", color: "white" }}
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        handleSave();
                                                    }}
                                                    active
                                                >
                                                    Edit Food
                                                </Button>
                                            </MDBModalFooter>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

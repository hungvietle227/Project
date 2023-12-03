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
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { DatePicker, Radio, Select, Space } from "antd";
import { South } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCage(pros) {
    const [staticModal, setStaticModal] = useState(false);
    const { show, handleClose } = pros;
    const [listArea, setListArea] = useState([]);
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("haha");
    };
    useEffect(() => {
        const getAreaList = () => {
            return fetch("https://localhost:44352/api/Area").then((data) =>
                data.json()
            );
        };
        let mounted = true;
        getAreaList().then((items) => {
            if (mounted) {
                setListArea(items);
            }
        });
        return () => (mounted = false);
    }, []);
    const submitForm = async (values) => {
        console.log(values);
        console.log(formik.errors);
        const areaId = values.areaId;
        const cage = {
            name: values.name,
            maxCapacity: values.maxCapacity,
        };
        const url = `https://localhost:44352/api/Cage?areaId=${areaId}`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cage),
        };
        const response = await fetch(url, request);
        if (response.ok) {
            console.log("Success");
            toast.success("Create Successful");
            setTimeout(() => {
                window.location.reload();
            }, [1300])
        } else {
            toast.error("Create Error");
        }
    };
    const formik = useFormik({
        initialValues: {
            areaId: "",
            name: "",
            maxCapacity: "",
            animalQuantity: "",
        },
        onSubmit: (values) => {
            submitForm(values);
        },
    });
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
                                    <p className="fw-bold fs-2">Add Cage</p>
                                </div>
                                <Form noValidate onSubmit={formik.handleSubmit}>
                                    <div className="form-content">
                                        <div className="form">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Choose Area for Animal
                                                </label>
                                                <Form.Select
                                                    size="lg"
                                                    id="areaId"
                                                    name="areaId"
                                                    placeholder="Chọn món ăn"
                                                    style={{ width: "100%" }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                // isInvalid={errors.userId && touched.userId}
                                                >
                                                    <option value={null}>Choose Area</option>
                                                    {/* Render các option từ API */}
                                                    {listArea.map((option) => (
                                                        <option
                                                            key={option.areaId}
                                                            value={option.areaId}
                                                        >
                                                            <div style={{ height: "50px" }}>
                                                                {option.areaId} - Area Name :{" "}
                                                                {option.areaName} - Description :{" "}
                                                                {option.description}
                                                            </div>
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {/* <Form.Control.Feedback type="invalid">
                                                    {errors.userId}
                                                </Form.Control.Feedback> */}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Enter Name</label>
                                                <Form.Control
                                                    type="text"
                                                    style={{ width: "100%", height: "50px" }}
                                                    id="name"
                                                    placeholder="Name"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                // isInvalid={
                                                //     formik.errors.category && formik.touched.category
                                                // }
                                                />
                                                {/* <Form.Control.Feedback type="invalid">
                                                    {formik.errors.category}
                                                </Form.Control.Feedback> */}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Enter Max Capacity</label>
                                                <Form.Control
                                                    type="Number"
                                                    id="maxCapacity"
                                                    placeholder="Max Capacity"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="maxCapacity"
                                                    style={{ width: "100%", height: "50px" }}
                                                    value={formik.values.maxCapacity}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                // isInvalid={
                                                //     formik.errors.quantity && formik.touched.quantity
                                                // }
                                                />
                                                {/* <Form.Control.Feedback type="invalid">
                                                    {formik.errors.quantity}
                                                </Form.Control.Feedback> */}
                                            </div>
                                            <MDBModalFooter style={{ paddingRight: "0px" }}>
                                                <Button
                                                    style={{ background: "blue", color: "white", marginRight: "20px" }}
                                                    variant="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        handleSave();
                                                    }}
                                                    active
                                                >
                                                    Create New Cage
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleClose}
                                                    active
                                                    style={{
                                                        width: "80px",
                                                        background: "red",
                                                        color: "white",
                                                    }}
                                                >
                                                    Close
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

import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import EditProfile from "./EditProfile";
import Button from "@mui/material/Button";
import { Space, Avatar } from "antd";

export default function PersonalProfile() {
    const role = localStorage.getItem('role');
    const emailInfo = localStorage.getItem("email");
    const [showModalEdit, setShowmodalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [staffProfile, setStaffProfile] = useState([]);
    const [Profile, setProfile] = useState([]);
    const handleClose = () => {
        setShowmodalEdit(false);
    };
    const handleEditNews = (item) => {
        setDataUserEdit(item);
        setShowmodalEdit(true);
      };
    // dùng API real
    useEffect(() => {
        const getList = () => {
            return fetch("https://localhost:44352/api/User/users").then((data) =>
                data.json()
            );
        };
        let mounted = true;
        getList().then((items) => {
            if (mounted) {
                setStaffProfile(items.filter((user) => user.email === emailInfo));
            }
        });
        return () => (mounted = false);
    }, []);
    console.log(staffProfile);
    useEffect(() => {
        setProfile(staffProfile.filter((user) => user.email === emailInfo));
    }, []);
    return (
        <>
            {staffProfile &&
                staffProfile.length > 0 &&
                staffProfile.map((item, index) => {
                    return (
                        <MDBContainer className="py-5">
                            <MDBRow className="justify-content-center align-items-center h-100">
                                <MDBCol lg="6" className="mb-4 mb-lg-0" style={{ width: "80%" }}>
                                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                        <MDBRow className="g-0">
                                            <MDBCol md="4" className="gradient-custom text-center text-white"
                                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem',background: "linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))" }}>
                                                {role === "STAFF" && (
                                                    <Space wrap size={100} className="pt-5">
                                                        <Avatar
                                                            shape="square"
                                                            size={200}
                                                            icon={
                                                                <svg
                                                                    width="200px"
                                                                    height="200px"
                                                                    viewBox="0 0 1024 1024"
                                                                    class="icon"
                                                                    version="1.1"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M512 789.333333l-106.666667-128v-128h213.333334v128z"
                                                                        fill="#FF9800"
                                                                    />
                                                                    <path
                                                                        d="M704 405.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                                                                        fill="#FFA726"
                                                                    />
                                                                    <path
                                                                        d="M320 405.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                                                                        fill="#FFA726"
                                                                    />
                                                                    <path
                                                                        d="M704 277.333333c0-162.133333-384-106.666667-384 0v149.333334c0 106.666667 85.333333 192 192 192s192-85.333333 192-192v-149.333334z"
                                                                        fill="#FFB74D"
                                                                    />
                                                                    <path
                                                                        d="M512 85.333333c-130.133333 0-213.333333 104.533333-213.333333 234.666667v49.066667l42.666666 36.266666v-106.666666l256-85.333334 85.333334 85.333334v106.666666l42.666666-36.266666V320c0-85.333333-21.333333-170.666667-128-192l-21.333333-42.666667h-64z"
                                                                        fill="#FF5722"
                                                                    />
                                                                    <path
                                                                        d="M597.333333 405.333333m-21.333333 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
                                                                        fill="#784719"
                                                                    />
                                                                    <path
                                                                        d="M426.666667 405.333333m-21.333334 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
                                                                        fill="#784719"
                                                                    />
                                                                    <path
                                                                        d="M618.666667 661.333333l-106.666667 21.333334-106.666667-21.333334S170.666667 704 170.666667 938.666667h682.666666c0-234.666667-234.666667-277.333333-234.666666-277.333334z"
                                                                        fill="#CFD8DC"
                                                                    />
                                                                    <path
                                                                        d="M490.666667 746.666667l-21.333334 192h85.333334l-21.333334-192 21.333334-21.333334-42.666667-42.666666-42.666667 42.666666z"
                                                                        fill="#3F51B5"
                                                                    />
                                                                </svg>
                                                            }
                                                        />
                                                    </Space>
                                                )}
                                                {role === "ZOOTRAINER" && (
                                                    <Space wrap size={100} className="pt-5">
                                                    <Avatar
                                                      shape="square"
                                                      size={200}
                                                      icon={
                                                        <svg
                                                          fill="#000000"
                                                          height="200px"
                                                          width="200px"
                                                          version="1.1"
                                                          id="Capa_1"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                                          viewBox="0 0 494.707 494.707"
                                                          xml:space="preserve"
                                                        >
                                                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                          <g
                                                            id="SVGRepo_tracerCarrier"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          ></g>
                                                          <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <g>
                                                              {" "}
                                                              <path d="M159.84,104.773c6.779,9.392,16.999,16,30.401,19.63c4.763,1.29,9.548,1.905,14.262,1.905 c24.048,0,46.136-16.035,52.718-40.334c3.745-13.827,2.386-26.789-3.999-38.599c2.153-1.685,3.616-3.612,4.44-5.816 c2.793-7.476-2.967-15.188-7.544-20.339C236.814,6.249,218.74-1.085,198.137,0.13c-13.093,0.772-31.493,6.682-43.873,20.955 c-9.953,11.475-14.266,26.109-12.821,43.496C143.487,89.155,157.159,102.397,159.84,104.773z M249.017,83.753 c-1.004,3.707-2.442,7.182-4.234,10.395l-11.17-3.025c-4.691-1.271-9.598-0.639-13.814,1.78c-4.216,2.419-7.238,6.335-8.509,11.027 l-1.413,5.217c-0.614,2.266,0.725,4.6,2.991,5.213c0.372,0.101,0.746,0.149,1.114,0.149c1.872,0,3.587-1.247,4.1-3.14l1.413-5.217 c0.677-2.501,2.288-4.588,4.535-5.877c2.246-1.29,4.861-1.627,7.361-0.949l8.24,2.232c-1.893,2.22-3.986,4.241-6.241,6.049 l-6.117-1.657c-2.268-0.618-4.6,0.726-5.213,2.991c-0.487,1.797,0.267,3.623,1.725,4.613c-9.48,4.374-20.481,5.582-31.32,2.645 c-10.191-2.761-18.161-7.422-23.749-13.879c5.552-7.235,4.862-20.382,4.625-23.338c-0.105-1.316-0.816-2.509-1.924-3.227 c-3.13-2.03-4.577-5.815-3.6-9.42c1.009-3.724,4.403-6.325,8.254-6.325c0.752,0,1.508,0.101,2.245,0.301 c4.556,1.234,7.258,5.944,6.024,10.499l-4.966,18.332c-0.614,2.266,0.725,4.6,2.991,5.213l11.938,3.234 c2.162,0.587,4.404-0.604,5.13-2.721c0.5-1.454,0.767-3.348,1.136-5.968c2.087-14.811,6.042-30.835,26.685-33.517 c7.669-0.996,13.751-2.327,18.451-4.055C251.131,61.283,252.222,71.923,249.017,83.753z M160.686,26.654 c10.649-12.278,26.587-17.369,37.951-18.039c1.331-0.079,2.666-0.118,3.968-0.118c16.479,0,30.328,6.181,41.16,18.371 c4.682,5.269,6.79,9.431,5.935,11.718c-0.627,1.678-4.176,5.853-23.542,8.369c-28.792,3.739-32.446,29.682-34.007,40.76 c-0.022,0.156-0.044,0.312-0.067,0.468l-3.396-0.92l3.854-14.23c2.459-9.079-2.926-18.466-12.005-20.926 c-1.462-0.396-2.965-0.597-4.468-0.597c-7.681,0-14.448,5.182-16.458,12.602c-1.745,6.44,0.395,13.172,5.355,17.413 c0.143,4.716-0.432,10.744-2.108,14.214c-4.146-4.708-11.566-15.287-12.944-31.863C148.666,48.857,152.29,36.333,160.686,26.654z"></path>{" "}
                                                              <path d="M219.888,174.734c-1.444-23.552-16.658-44.702-37.021-50.217l-7.27-1.969c-11.413-3.091-24.715-0.621-33.847,6.628 c-24.25,19.25-89.246,80.889-89.246,80.889c-10.178,9.243-10.939,25.043-1.696,35.222c4.478,4.93,10.607,7.822,17.26,8.143 c0.41,0.02,0.82,0.03,1.228,0.03c6.206,0,12.107-2.274,16.723-6.466l12.979-11.704l-13.151,48.551 c-0.295,1.088-0.145,2.249,0.416,3.226c0.561,0.978,1.487,1.693,2.575,1.987l22.212,6.017v167.297 c0,17.831,14.507,32.339,32.339,32.339c17.831,0,32.339-14.507,32.339-32.339V312.59l10.648,2.884 c0.366,0.099,0.739,0.148,1.111,0.148c0.77,0,1.533-0.21,2.203-0.616c0.994-0.603,1.698-1.586,1.948-2.722l15.71-71.492 l36.413,40.097c0.227,15.979,12.113,28.431,27.257,28.431c15.577,0,28.25-12.673,28.25-28.25c0-7.515-2.917-14.581-8.211-19.91 c-0.511-5.605-2.777-11.095-6.844-15.574L219.888,174.734z M276.672,277.207c-3.383,3.072-7.758,4.763-12.322,4.763h-0.001 c-5.164,0-10.116-2.191-13.584-6.011l-89.022-98.03c-6.798-7.487-6.239-19.108,1.247-25.907c3.382-3.072,7.758-4.763,12.323-4.763 c5.163,0,10.115,2.19,13.583,6.011l89.022,98.03C284.718,258.787,284.158,270.409,276.672,277.207z M80.315,240.691 c-6.707,6.09-17.123,5.59-23.215-1.118c-6.092-6.709-5.591-17.123,1.118-23.215l60.884-55.289L103.1,220.144L80.315,240.691z M143.388,486.207c-13.145,0-23.839-10.694-23.839-23.839v-11.835c0.709,0.531,1.581,0.857,2.535,0.857h45.063 c0.027,0,0.052-0.007,0.079-0.008v10.986C167.227,475.513,156.533,486.207,143.388,486.207z M167.227,422.978h-7.414 c-2.347,0-4.25,1.903-4.25,4.25c0,2.347,1.903,4.25,4.25,4.25h7.414v11.419c-0.027,0-0.052-0.008-0.079-0.008h-45.063 c-0.954,0-1.826,0.326-2.535,0.857V297.373l8.788,2.38v69.754c0,2.347,1.903,4.25,4.25,4.25c2.347,0,4.25-1.903,4.25-4.25v-67.452 l30.39,8.231V422.978z M192.83,267.251l-12.896-3.453c-2.265-0.605-4.598,0.74-5.205,3.006c-0.607,2.267,0.739,4.598,3.006,5.205 l13.269,3.552l-2.189,9.963l-53.002-14.338c-2.265-0.613-4.6,0.727-5.212,2.993c-0.613,2.266,0.727,4.6,2.993,5.212l53.396,14.444 l-2.696,12.268l-89.13-24.143l32.478-119.9c2.694-6.773,6.333-13.938,11.657-19.331c1.83-1.853,5.683-5.371,7.711-7.002 c7.041-5.664,16.251-7.715,26.366-4.976l7.27,1.969c13.386,3.626,24.379,15.697,28.788,30.517l-14.241-15.682 c-5.077-5.59-12.321-8.796-19.876-8.796c-6.682,0-13.087,2.476-18.038,6.971c-10.956,9.949-11.774,26.957-1.826,37.914 l44.89,49.432L192.83,267.251z M271.017,300.82c-7.965,0-14.616-5.136-17.383-12.589c3.349,1.458,6.994,2.239,10.715,2.239 c0.001,0,0,0,0.001,0c6.68,0,13.086-2.475,18.036-6.971c3.134-2.847,5.436-6.272,6.896-9.968c0.974,2.359,1.485,4.909,1.485,7.538 C290.767,291.96,281.907,300.82,271.017,300.82z"></path>{" "}
                                                              <path d="M447.325,383.469c-3.916-6.091-10.549-6.363-16.033-4.938c5.168-29.763-10.267-46.3-16.814-51.826 c1.751-2.538,3.284-5.264,4.57-8.145c3.738,1.796,7.417,2.722,10.858,2.722c3.25,0,6.291-0.811,8.971-2.45 c5.771-3.528,8.903-10.278,8.817-19.007c-0.078-7.932-2.841-16.747-7.78-24.821c-10.164-16.616-26.158-24.995-37.479-20.082 c-7.037-4.878-15.371-7.716-24.306-7.716c-8.935,0-17.268,2.838-24.305,7.716c-11.32-4.912-27.316,3.467-37.48,20.083 c-4.939,8.075-7.702,16.89-7.78,24.821c-0.086,8.729,3.046,15.479,8.816,19.007c2.681,1.64,5.72,2.451,8.972,2.451 c3.441,0,7.12-0.926,10.858-2.722c1.262,2.827,2.759,5.507,4.469,8.003c-6.448,5.201-22.805,21.712-17.47,52.106 c-5.576-1.573-12.497-1.479-16.533,4.799c-4.53,7.046-3.8,20.542,1.952,36.102c6.388,17.28,18.235,35.163,33.36,50.354 c0.314,0.315,0.672,0.551,1.045,0.747c1.533,6.573,2.503,10.658,2.542,10.822c0.456,1.915,2.167,3.267,4.135,3.267h18.392 c2.347,0,4.25-1.903,4.25-4.25v-1.917h8.777v1.917c0,2.347,1.903,4.25,4.25,4.25h18.391c1.968,0,3.679-1.352,4.135-3.267 c0.039-0.165,1.014-4.269,2.553-10.87c0.46-0.207,0.896-0.488,1.272-0.867c15.094-15.161,26.819-33.027,33.016-50.309 C451.285,403.999,451.875,390.548,447.325,383.469z M432.663,279.439c4.149,6.783,6.468,14.052,6.531,20.469 c0.032,3.255-0.543,9.099-4.752,11.672c-3.106,1.9-7.674,1.459-12.569-1.109c1.129-4.324,1.747-8.881,1.747-13.596 c0-13.535-4.99-25.817-13.059-34.785C417.197,262.7,426.01,268.563,432.663,279.439z M415.119,296.876 c0,22.702-16.594,41.171-36.991,41.171s-36.991-18.469-36.991-41.171s16.594-41.171,36.991-41.171S415.119,274.175,415.119,296.876 z M321.815,311.581c-4.208-2.573-4.783-8.417-4.751-11.672c0.063-6.417,2.382-13.686,6.531-20.469 c6.653-10.877,15.467-16.741,22.103-17.349c-8.07,8.968-13.06,21.25-13.06,34.786c0,4.714,0.618,9.272,1.747,13.596 C329.49,313.04,324.923,313.481,321.815,311.581z M314.826,388.066c2.695-4.195,10.915,0.37,11.044,0.442 c0.061,0.036,0.126,0.054,0.189,0.086c3.881,19.974,9.751,46.3,14.221,65.831C315.154,424.748,309.851,395.804,314.826,388.066z M373.351,470.094v-51.182h8.777v51.182H373.351z M401.407,476.261h-10.778v-61.598c0-2.347-1.903-4.25-4.25-4.25h-17.277 c-2.347,0-4.25,1.903-4.25,4.25v57.994c-0.225,0.517-0.352,1.087-0.352,1.688c0,0.601,0.127,1.17,0.352,1.688v0.229h-10.779 c-3.289-13.966-16.196-69.247-21.471-98.923c-0.055-0.309-0.091-0.606-0.141-0.912h10.288c2.347,0,4.25-1.903,4.25-4.25 s-1.903-4.25-4.25-4.25h-11c-0.021,0-0.04,0.006-0.061,0.006c-0.31-20.298,11.043-31.343,15.384-34.809 c8.137,8.317,19.058,13.424,31.056,13.424c11.933,0,22.801-5.05,30.924-13.286c5.139,4.396,18.373,18.49,13.825,44.077 C417.603,407.014,404.696,462.294,401.407,476.261z M415.17,454.551c4.493-19.63,10.413-46.175,14.302-66.224 c1.579-0.814,8.31-3.982,10.702-0.261C445.228,395.925,440.161,425.035,415.17,454.551z"></path>{" "}
                                                              <path d="M388.717,359.782H365.31c-2.347,0-4.25,1.903-4.25,4.25c0,2.347,1.903,4.25,4.25,4.25h23.407c2.347,0,4.25-1.903,4.25-4.25 C392.967,361.685,391.064,359.782,388.717,359.782z"></path>{" "}
                                                              <path d="M142.065,198.135c-2.234-0.728-4.63,0.494-5.357,2.725l-14,43c-0.727,2.232,0.493,4.63,2.725,5.357 c0.438,0.143,0.881,0.21,1.317,0.21c1.79,0,3.456-1.141,4.04-2.935l14-43C145.517,201.26,144.297,198.862,142.065,198.135z"></path>{" "}
                                                            </g>{" "}
                                                          </g>
                                                        </svg>
                                                      }
                                                    />
                                                  </Space>
                                                )}
                                                <MDBCardText className="pt-4" style={{color: "white", fontSize: "large"}}>{role === "STAFF" ? "Staff" : "Zoo Trainer"} Manager</MDBCardText>
                                            </MDBCol>
                                            <MDBCol md="8">
                                                <MDBCardBody className="p-4">
                                                    <MDBTypography tag="h6" style={{ fontSize: "20px" }}>Information</MDBTypography>
                                                    <hr className="mt-0 mb-4" />
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>User ID</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].userId}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Phone</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].phone}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="pt-3">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Full Name</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].firstname} {staffProfile[0].lastname}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Email</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].email}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="pt-3">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Address</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].firstname} {staffProfile[0].address}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Start Date</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].startDate.slice(0,10)}</MDBCardText>

                                                        </MDBCol>
                                                    </MDBRow>


                                                    <MDBTypography tag="h6" style={{ fontSize: "20px" }}>Job</MDBTypography>
                                                    <hr className="mt-0 mb-4" />
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Role</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].role == 2 ? "Staff" : "Zoo Trainer"}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Gender</MDBTypography>
                                                            <MDBCardText className="text-muted">{staffProfile[0].gender == true ? "Male" : "Female"}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className="pt-3">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Status</MDBTypography>
                                                            {staffProfile[0].status == true &&
                                                                <MDBCardText className="text-muted" style={{ color: "green" }}>On Working</MDBCardText>
                                                            }
                                                            {staffProfile[0].status == false &&
                                                                <MDBCardText className="text-muted" style={{ color: "red" }}>Quit Job</MDBCardText>
                                                            }
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Rating</MDBTypography>
                                                            <MDBCardText className="text-muted"><ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: '#1B7B2C' }}>
                                                                <li>
                                                                    <MDBIcon fas icon="star fa-xs" />
                                                                </li>
                                                                <li>
                                                                    <MDBIcon fas icon="star fa-xs" />
                                                                </li>
                                                                <li>
                                                                    <MDBIcon fas icon="star fa-xs" />
                                                                </li>
                                                                <li>
                                                                    <MDBIcon fas icon="star fa-xs" />
                                                                </li>
                                                                <li>
                                                                    <MDBIcon fas icon="star fa-xs" />
                                                                </li>
                                                            </ul></MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCardBody>
                                                <div className="btn-footer mb-4">
                                                    <Button
                                                        onClick={() => {
                                                            handleEditNews(item);
                                                        }}
                                                        variant="text"
                                                        style={{ padding: 0 }}
                                                    >
                                                        <MDBIcon fas icon="user-edit" size="2x" />
                                                    </Button>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    );
                })}
            <EditProfile
                show={showModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
            />

        </>
    );
}
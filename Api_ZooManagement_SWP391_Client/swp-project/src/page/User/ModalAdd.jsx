import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import "../../assets/css/dashboard.css";
export default function ModalAdd({ optSmModal, toggleShow, setOptSmModal }) {
  const [Name, setName] = useState("");

  const [Job, setJob] = useState("");

  return (
    <>
      {/* <MDBBtn onClick={toggleShow}>Small modal</MDBBtn> */}
      <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add new user</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="row mb-4">
                  <div className="mb-3 row-content">
                    <label className="form-label">Enter Name</label>
                    <input
                      type="email"
                      className="form-control"
                      value={Name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3 row-content">
                    <label className="form-label">Enter Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={Job}
                      onChange={(event) => {
                        setJob(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={Job}
                    onChange={(event) => {
                      setJob(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={Job}
                    onChange={(event) => {
                      setJob(event.target.value);
                    }}
                  />
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

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
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

export default function DeleteUser(pros) {
  const { show, handleClose, dataUserDelete } = pros;

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (show) {
        setUserId(dataUserDelete.userId);
        setUserName(dataUserDelete.firstname + " " + dataUserDelete.lastname);
        setEmail(dataUserDelete.email);
    }
  }, [dataUserDelete]);
  // console.log(dataUserDelete);
  const handleSave = () => {
    console.log("haha");
  };
  const handleDeleteUser = async () => {
    try {
      console.log(userId);
      const request = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://localhost:44352/api/User/${userId}`,
        request
      );
      if (response.ok) {
        console.log("Success");
        window.location.reload();
      }else{
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} onHide={handleClose}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader
              className="modal-header text-white d-flex justify-content-center"
              style={{ background: "#DC4C64" }}
            >
              <MDBModalTitle style={{ textAlign: "center" }}>
                Are you sure ?
              </MDBModalTitle>
              {/* <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody style={{ height: "90px" }}>
              <div style={{ verticalAlign: "middle" }} className="form-content">
                <div style={{ fontSize: "large", fontWeight: "bolder" }}>
                  Delete User: {" " + userName}{" "}
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter tag="section">
              <div className="btn-footer">
                <div
                  style={{
                    marginRight: "20px",
                    background: "gainsboro",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    active
                    class="btn btn-danger"
                    style={{ width: "80px" }}
                  >
                    Close
                  </Button>
                </div>
                <div>
                  <Button
                    variant="primary"
                    class="btn btn-outline-danger"
                    type="submit"
                    onClick={handleDeleteUser}
                    data-mdb-dismiss="modal"
                    active
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

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

export default function DeleteAnimal(pros) {
  const { show, handleClose, dataAnimalDelete } = pros;

  const [animalId, setAnimalId] = useState("");
  const [animalName, setAnimalName] = useState("");
  useEffect(() => {
    if (show) {
      setAnimalId(dataAnimalDelete.animalId);
      setAnimalName(dataAnimalDelete.name);
    }
  }, [dataAnimalDelete]);
  console.log(dataAnimalDelete);
  const handleSave = () => {
    console.log("haha");
  };
  const handleDeleteAnimal = async () => {
    try {
      console.log(animalId);
      const request = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://localhost:44352/api/Animal/${animalId}`,
        request
      );
      if (response.ok) {
        console.log("Success");
        window.location.reload();
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
                  Delete Animal: {" " + animalName}{" "}
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
                    onClick={handleDeleteAnimal}
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

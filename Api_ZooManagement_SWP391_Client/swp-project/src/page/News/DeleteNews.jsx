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

export default function DeleteNews(pros) {
  const { show, handleClose, dataNewsDelete } = pros;

  const [newsId, setNewsId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  useEffect(() => {
    if (show) {
      setNewsId(dataNewsDelete.newsId);
      setNewsTitle(dataNewsDelete.newsTitle);
    }
  }, [dataNewsDelete]);
  console.log(dataNewsDelete);
  const handleSave = () => {
    console.log("haha");
  };
  const handleDeleteNews = async () => {
    try {
      const id = newsId;
      const response = await fetch(`https://localhost:44352/api/News/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Success");
        window.location.reload();
      } else {
        toast.error("Error deleting");
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
                  Delete News: {" " + newsTitle}{" "}
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter tag="section">
              <div className="btn-footer">
                <div>
                  <Button
                    variant="primary"
                    class="btn btn-outline-danger"
                    type="submit"
                    onClick={handleDeleteNews}
                    data-mdb-dismiss="modal"
                    style={{
                      marginRight: "20px",
                    }}
                    active
                  >
                    Delete
                  </Button>
                </div>
                <div
                  style={{
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
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

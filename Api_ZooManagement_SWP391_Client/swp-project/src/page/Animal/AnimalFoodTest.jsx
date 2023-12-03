import { useState, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import { South } from "@mui/icons-material";
import { Button, FormControl } from "react-bootstrap";
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
import "../../assets/css/dashboard.css";
import { useNavigate } from "react-router-dom";
function YourComponent(pros) {
  const { show, handleClose } = pros;
  const navigate = useNavigate()
  const [options, setOptions] = useState([]);
  const [fields, setFields] = useState([
    {
      id: "",
      quantity: "",
    },
  ]);
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
  const [selectedFoodIds, setSelectedFoodIds] = useState([]);
  const addField = () => {
    setFields([...fields, { id: "", quantity: "" }]);
  };
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (value) => {
    // console.log(value)
    setSelectedValues((prev) => [...prev, value]);
  };
  const handleFoodSelect = (event, field, form) => {
    const selectedFoodId = event.target.value;
    setSelectedFoodIds((prevSelectedFoodIds) => [
      ...prevSelectedFoodIds,
      selectedFoodId,
    ]);
    form.setFieldValue(field.name, selectedFoodId);
  };
  const submitForm = async (values) => {
   

    const animalFood = {
      animalId: values.animalId,
      foods: values.fields
    }
    console.log(animalFood);
    const url = "https://localhost:44352/api/AnimalFood";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalFood),
    };
    // request.body = JSON.stringify(animal)
    const response = await fetch(url, request);
    if (response.ok) {
      console.log("Success");
      // navigate("/staff/2")
      // window.location.reload();
      // window.location.href("/staff/1");
      
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
              <Formik
                initialValues={{ animalId: "", fields }}
                onSubmit={(values) => {
                  submitForm(values);
                }}
              >
                {({ values, handleChange, handleBlur}) => (
                  <Form>
                    <div className="mb-5" style={{ textAlign: "center" }}>
                      <label className="form-label">Enter Animal ID</label>
                      <FormControl
                        type="text"
                        id="animalId"
                        name="animalId"
                        value={values.animalId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {fields.map((field, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        className="mb-3"
                      >
                        <Field
                          name={`fields[${index}].id`}
                          // as="select"
                          // onChange={(e) => handleChange(e.target.value)}
                        >
                          {({ field, form }) => (
                            <FormControl
                              as="select"
                              {...field}
                              placeholder="Chọn món ăn"
                              style={{ width: "45%" }}
                              onChange={(event) =>
                                handleFoodSelect(event, field, form)
                              }
                            >
                              <option value="">Chọn món ăn</option>
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
                            </FormControl>
                          )}
                        </Field>
                        <Field
                          name={`fields[${index}].quantity`}
                          component="input"
                          style={{ width: "45%" }}
                          className="control-field"
                        />
                        {/* <button onClick={() => removeField(index)}>
                          Remove
                        </button> */}
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button onClick={addField}>Add</Button>
                      <Button type="submit">Submit</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default YourComponent;

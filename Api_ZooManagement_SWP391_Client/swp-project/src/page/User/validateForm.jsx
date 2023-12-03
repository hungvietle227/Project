import * as yup from "yup";

const regex = /^(\d{1,5}\s)?[a-zA-Z0-9\s-]+(\.[a-zA-Z]+)?$/;
export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  firstname: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(10, "Name cannot be more than 50 characters")
    .matches(
      /^[a-zA-Z\s-.']+(\d*)$/,
      "Name can only contain letters, dashes, periods, and apostrophes"
    ),
  // .matches(/\s+/, "Name cannot contain only spaces"),
  lastname: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters")
    .matches(
      /^[a-zA-Z\s-.']+(\d*)$/,
      "Name can only contain letters, dashes, periods, and apostrophes"
    ),
  // .matches(/^([a-zA-Z-.']+\s*?)+[a-zA-Z-.']+$/, "Name cannot contain only spaces"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone must be at least 10 digits")
    .max(11, "Phone must be at most 10 digits")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Phone start with 0"
    ),
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(50, "Address must be not more than 50 characters")
    .required("Please enter Address"),
  //   company: yup.string().required("Company name is required").min(3),
  sex: yup.string(),
});

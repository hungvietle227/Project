import * as yup from "yup";
import moment from "moment";
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateFormat = "YYYY/MM/DD";
function isValidDate(date, format) {
    return moment(date, format).isValid()
}
export const validationArea = yup.object().shape({
    areaName: yup
        .string()
        .required("Name is required")
        .max(1, "Area cannot be more than 1 characters")
        .matches(
            /^[a-zA-Z\s-.']+(\d*)$/,
            "AreaName can only contain letters, dashes, periods, and apostrophes"
        ),
    description: yup
        .string()
        .required("Description is required")
        .min(2, "Description must be at least 2 characters")
        .max(1000, "Name cannot be more than 50 characters")
});

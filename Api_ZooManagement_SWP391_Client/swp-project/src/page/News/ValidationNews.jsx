import * as yup from "yup";
import moment from "moment";
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateFormat = "YYYY/MM/DD";
function isValidDate(date, format) {
    return moment(date, format).isValid()
}
export const validationNews = yup.object().shape({
    newsTitle: yup
        .string()
        .required("News Title is required")
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title cannot be more than 100 characters")
        .matches(
            /^[a-zA-Z\s-.']+(\d*)$/,
            "Title can only contain letters, dashes, periods, and apostrophes"
        ),
    newsContent: yup
        .string()
        .required("News Content is required")
        .min(2, "Content must be at least 2 characters")
        .matches(
            /^[a-zA-Z\s-.']+(\d*)$/,
            "Content can only contain letters, dashes, periods, and apostrophes"
        ),
    newsImage: yup
        .string()
        .required("Image is required")
});

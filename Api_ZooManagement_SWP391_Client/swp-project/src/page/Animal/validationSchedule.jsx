import * as yup from "yup";
import moment from "moment";
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateFormat = "YYYY/MM/DD";
function isValidDate(date, format) {
    return moment(date, format).isValid();
}
export const validationSchedule = yup.object().shape({
    animalId: yup
        .string()
        .required("animalId is required")
        .notOneOf(["Choose AnimalId"], "AnimalID cannot be Choose Anima;"),
    fields: yup.array().of(
        yup.object().shape({
            scheduleId: yup.string().required("Please choose foood"),
            time: yup.string().required("Please enter description of food"),
            description: yup.string().required("Please enter amount of food").min(2, "Description must be at least 2 characters")
        })
    )
});

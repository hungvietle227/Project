import * as yup from "yup";
import moment from "moment";
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateFormat = "YYYY/MM/DD";
function isValidDate(date, format) {
  return moment(date, format).isValid();
}
export const schemaAnimal = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters")
    .matches(
      /^[a-zA-Z\s-.']+(\d*)$/,
      "Name can contain letters, spaces, dashes, periods, apostrophes and numbers"
    ),
  // animalId: yup
  //   .string()
  //   .required("AnimeID is required")
  //   .matches(/^[a-zA-Z]\d{4}$/, "Need format form"),
  cageId: yup
    .string()
    .required("CageID is required")
    .notOneOf(["Choose Cage"], "Please choose Cage"),
  userId: yup
    .string()
    .required("ZooTrainerID is required")
    .notOneOf(["Choose ZooTrainer"], "Please choose ZooTrainer"),
  species: yup
    .string()
    .required("Species is required")
    .notOneOf(["Choose Species"], "Please choose Species"),
  description: yup
    .string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters")
    .max(2000, "Description cannot be more than 50 characters"),
  // .matches(
  //   /^[a-zA-Z-.']+$/,
  //   "description can only contain letters, dashes, periods, and apostrophes"
  // ),
  // .matches(
  //   /^[a-zA-Z-.']+$/,
  //   "Region can only contain letters, dashes, periods, and apostrophes"
  // ),
  // healthCheck: yup
  //   .string()
  //   .required("healthCheck is required")
  //   .min(2, "Description must be at least 2 characters"),

  // .matches(
  //   /^[a-zA-Z-.']+$/,
  //   "healthCheck can only contain letters, dashes, periods, and apostrophes"
  // ),
  // species: yup
  //   .string()
  //   .required("Species is required")
  //   .min(2, "Species must be at least 2 characters")
  //   .max(50, "Species cannot be more than 50 characters")
  //   .matches(
  //     /^[a-zA-Z-.']+$/,
  //     "Species can only contain letters, dashes, periods, and apostrophes"
  //   ),
  // birthday: yup
  //   .string()
  //   .required(),
  birthday: yup
    .string()
    .required("Vui lòng nhập ngày")
    .test({
      name: "start-date-valid",
      message: "Birthday must be before Day Now",
      test: function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value);

        return selectedDate <= currentDate;
      },
    }),
  // entryCageDate: yup.string().required("Choose cage date"),
  // entryCageDate: yup
  //   .string()
  //   .required("Vui lòng nhập ngày")
  //   .test({
  //     name: "start-date-valid",
  //     message: "Date must be before Date Now",
  //     test: function (value) {
  //       const date = new Date(value);
  //       return date <= new Date();
  //     },
  //   }),
  // startTrainDate: yup.string().required("Choose date to train animal"),

  // startTrainDate: yup
  //   .string()
  //   .required("Vui lòng nhập ngày")
  //   .test({
  //     name: "start-date-valid",
  //     message: "Date must be after Entry Cage Date",
  //     test: function (value) {
  //       const currentDate = new Date();
  //       const entryCageDate = new Date(this.parent.entryCageDate);
  //       const selectedDate = new Date(value);

  //       return selectedDate <= currentDate && selectedDate >= entryCageDate;
  //     },
  //   }),

  // entryDate: yup.string().required(),
  // image: yup.mixed().required('Please choose the image')
  fields: yup.array().of(
    yup.object().shape({
      //mealId: yup.string().required("Please choose meal"),
      startEat: yup
        .string()
        .required("Vui lòng nhập ngày bắt đầu ăn")
        .test({
          name: "date-after",
          message: "Ngày bắt đầu ăn phải sau ngày vào lồng",
          test: function (value) {
            // const entryCageDate = this.options.context.entryCageDate; // Lấy giá trị của trường entryCageDate từ context
            // const entry = new Date(entryCageDate)
            const selectedDate = new Date(value);
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            return moment(value).isAfter(currentDate); // Sử dụng moment.js hoặc thư viện tương tự để so sánh ngày
            //return selectedDate >= currentDate;
          },
        }),
      endEat: yup
        .string()
        .required("Vui lòng nhập ngày kết thúc ăn")
        .test({
          name: "date-after-startEat",
          message: "Ngày kết thúc ăn phải sau ngày bắt đầu ăn",
          test: function (value) {
            const startEat = this.parent.startEat;
            const baby = new Date(startEat);
            const selected = new Date(value);
            return selected >= baby;
          },
        }),
    })
  ),
});

import * as Yup from "yup";

export const TodoSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  color: Yup.string().required("Color is required"),
});

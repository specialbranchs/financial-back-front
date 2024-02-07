
import * as Yup from "yup";
import { GallaryDataItem } from "../../typings/formData";

export const validationSchema = Yup.object().shape({
    id: Yup.number().test(
      "selection",
      "id is Required",
      (number) => number !== 0
    ),
    event: Yup.string().required("ইভেন্টের নাম লিখুন"),
    picture: Yup.array().min(1, 'ফাইল বাছাই করুন')
   
  });

  export const initialValues: GallaryDataItem = {
    event: '',
    id: 1,
    picture: []
  };
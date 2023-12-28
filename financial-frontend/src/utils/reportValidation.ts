
import * as Yup from "yup";
import { ReportType } from "../../typings/formData";

export const validationSchema = Yup.object().shape({
    id: Yup.number().test(
      "selection",
      "id is Required",
      (number) => number !== 0
    ),
    doron:Yup.string().test(
        "selection",
        "ধরণ বাছাই করুন",
        (val)=>val!=='ধরণ বাছাই করুন'
    ),
    title: Yup.string().required("শিরোনাম লিখুন"),
    body: Yup.string().required("রিপোর্ট লিখুন"),
    picture: Yup.array().min(1, 'ফাইল বাছাই করুন'),
   
  });

  export const initialValues: ReportType = {
    doron: 'ধরণ বাছাই করুন',
    title: '',
    body: '',
    id: 1,
    picture: []
  };
import { Container, Typography, TextField,Grid,Link } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import '../css/auth.css'
import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { SignInData, SignUpData } from "../../../../typings/formData";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../../state/actions";
import LoadingButton from "@mui/lab/LoadingButton";
const Register = (props: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
    confirmPassword:Yup.string()
    .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
    .required("Password is required")
  });

  const initialValues: SignUpData = {
    email: "",
    password: "",
    confirmPassword:""
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values)
    },
  });

  return (
    <Container className="App" component="main" maxWidth="xs">
      <header className="App-header">
        <div className="bg-color">
          <Typography component="h1" color={"gold"} variant="h4">
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="loginBtn">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="loginBtn">
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                className=""
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="loginBtn">
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                className=""
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                }
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </div>
            <div className="loginBtn">
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                SUMBIT
              </LoadingButton>
            </div>
            <Grid >
            <Grid item xs>
                <Link  variant="body2">
                  {"  or  "}
                </Link>
              </Grid>
              <Grid item>
                <Link  variant="body1">
                  {"Already have an account?"} {" "}
                  <NavLink to={'/'}>
                     Sign In
                  </NavLink>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </header>
    </Container>
  );
};

export default Register;

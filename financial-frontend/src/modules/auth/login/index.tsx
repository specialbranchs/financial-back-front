import { Container, Typography, TextField, Grid, Link, Box, Avatar } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import '../css/auth.css'
import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { SignInData } from "../../../../typings/formData";

import { useDispatch } from "react-redux";
import actions from "../../../state/actions";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink } from "react-router-dom";
import api from "../../../api";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import assets from "../../../assets";
const Login = (props: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
  });

  const initialValues: SignInData = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      api.auth
        .signInRequest$(values)
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (user) => {

            dispatch(actions.user.saveUser(user))
            setLoading(false)
          },
          error: (error: any) => {
            // console.log(error)
            setLoading(false)
          }
        });
    },
  });

  return (
    <Container >
      <header className="App-header">

        <div className="bg-color">
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <Avatar src={assets.images.logo} sx={{ height: 200, width: 200}} />
          </Box>
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
              <LoadingButton
                loading={loading}
                // loadingPosition="start"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                SUMBIT
              </LoadingButton>
            </div>
            {/* <Grid >
              <Grid item xs>
                <Link  variant="body2">
                  {"  or  "}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? "}
                  <NavLink to={'/register'}>
                  Sign Up
                  </NavLink>
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
      </header>
    </Container>
  );
};

export default Login;

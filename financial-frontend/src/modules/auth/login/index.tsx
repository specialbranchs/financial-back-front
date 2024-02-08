import {
  Container,
  Typography,
  TextField,
  Grid,
  Link,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../css/auth.css";
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
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = (props: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, seterror] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
      seterror("");
      api.auth
        .signInRequest$(values)
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (user) => {
            formik.resetForm();
            dispatch(actions.user.saveUser(user));
            seterror("");
            setLoading(false);
          },
          error: (error: any) => {
            seterror(error?.response?.data?.detail);
            setLoading(false);
          },
        });
    },
  });
  // console.log(formik.values)
  return (
    <Container>
      <header className="App-header">
        <div className="bg-color">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar src={assets.images.logo} sx={{ height: 200, width: 200 }} />
          </Box>
          <Box>
            <Typography color={'red'}>{error}</Typography>
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
                autoComplete="off"
              />
            </div>
            <div className="loginBtn">
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                className=""
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

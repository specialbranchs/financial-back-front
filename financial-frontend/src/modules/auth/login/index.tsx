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
  useTheme,
  Button,
  Paper,
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
import { sxStyle } from "../../pages/search/editsearch/PersonDetails";
import { User } from "../../../../typings/structures";

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
          next: async (userRs) => {
            const { data, token } = userRs;
            console.log(userRs)
            if (data) {
              const user: User = {
                id: data.id,
                refresh: token,
                access: token,
                email: data.email,
                name: data.name,
                is_superuser: data.is_superuser,
                is_adminuser: data.is_admin,
                is_staff: data.is_staff,
              };
              formik.resetForm();
              dispatch(actions.user.saveUser(user));
              seterror("");
            } else {
              seterror("User Not Found");
            }

            setLoading(false);
          },
          error: (error: any) => {
            seterror("User Not Found");
            setLoading(false);
          },
        });
    },
  });

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          margin: 10,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={assets.images.logo} sx={{ height: 200, width: 200 }} />
        </Box>
        <Box>
          <Typography color={"red"} sx={sxStyle}>
            {error}
          </Typography>
        </Box>
        <form
          style={{ flexDirection: "column", display: "flex", width: "40%" }}
          onSubmit={formik.handleSubmit}
        >
          <FormControl sx={{ marginTop: 5, ...sxStyle }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              sx={sxStyle}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="off"
            />
          </FormControl>
          <FormControl sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              className=""
              sx={sxStyle}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
          </FormControl>
          <LoadingButton
            loading={loading}
            // loadingPosition="start"
            // sx={{ marginTop: 3 }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ ...sxStyle, mt: 3 }}
          >
            Sumbit
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

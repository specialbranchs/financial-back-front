import { Container, Typography, TextField, Grid, FormControl, FormGroup, FormControlLabel, Switch, Toolbar } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { PASSWORD_MIN_LENGTH } from "../../../utils/config";
import { SignUpData, UploadUserData } from "../../../../typings/formData";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
type Props={
    Submiting:any
}
const AddUserScreen = ({Submiting}: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().required("Email is Required"),
        password: Yup.string()
            .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
            .required("Password is required"),
        is_admin: Yup.boolean(),
        is_staff: Yup.boolean()
    });
    const initialValues: UploadUserData = {
        name: '',
        email: '',
        password: '',
        is_admin: true,
        is_staff: true
    }
    const formik = useFormik({
        // enableReinitialize,
        initialValues,
        validationSchema,
        onSubmit: (values) => {
             Submiting(values)
        }
    })

    

    return (
        <Toolbar sx={{
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
            backgroundColor: 'white',
            padding: 2
        }}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }} >
                    <TextField
                        fullWidth
                        size='small'
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }}>
                    <TextField
                        fullWidth
                        size='small'
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </FormControl>

                <FormControl fullWidth variant="standard" sx={{ mr: 1, my: 1 }}>
                    <TextField
                        fullWidth
                        size='small'
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </FormControl>
                <FormGroup sx={{ my: 1 }}>
                    <FormControlLabel
                        control={<Switch
                            value={formik.values.is_admin}
                            defaultChecked
                            onChange={(e: any) => {
                                if (e.target.checked) {
                                    formik.setFieldValue('is_admin', e.target.checked)
                                    formik.setFieldValue('is_staff', e.target.checked)
                                } else {
                                    formik.setFieldValue('is_admin', e.target.checked)
                                    formik.setFieldValue('is_staff', true)
                                }

                            }}
                            size="small" />}
                        label="Admin" />

                </FormGroup>


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
            </form>

        </Toolbar>
    );
};

export default AddUserScreen;

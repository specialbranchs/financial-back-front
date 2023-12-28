import React, { useState } from 'react'
import useDoronList from '../../../../hooks/useDoron'
import { ReportDataItem } from '../../../../../typings/formData'
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BootstrapInput, { Item, StyledTextarea, VisuallyHiddenInput } from '../../../../utils/textFieldStyle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoadingButton } from '@mui/lab';
import api from '../../../../api';
import { doOnSubscribe } from '../../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from '../../../../utils/reportValidation';

const primry = {
    doron: 'ধরণ বাছাই করুন',
    title: '',
    body: '',
    id: 1,
    picture: []
}
const AddReportScreen = () => {
    const [loading, setLoading] = useState(false);
    
    const { designations } = useDoronList()
    const [reportData, setReportData] = React.useState<ReportDataItem>(primry)

    const formik = useFormik({
        initialValues,
        validationSchema,
        // validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            console.log(values);
            setLoading(true)
            api.report
                .setReport$(values)
                .pipe(
                    doOnSubscribe(() => setLoading(true)),
                    finalize(() => setLoading(false))
                )
                .subscribe({
                    next: async (report) => {
                       
                       formik.resetForm()
                        setLoading(false)
                        alert('submit successfully')
                    },
                    error: (error: any) => {
                        // console.log(error)
                        setLoading(false)
                    }
                });
        }

    })
    const selectChange = (e: SelectChangeEvent) => {
       
        formik.setFieldValue('doron', e.target.value)
    };
    const dataHandler = (e: { target: { value: any; id: any }; }) => {
      
        formik.setFieldValue(e.target.id, e.target.value)
    }
    const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const pic = e.target.files
            let picArr = []
            for (let i = 0; i < pic.length; i++) {
                picArr.push(pic[i])
            }

           
            formik.setFieldValue('picture', [...picArr, ...reportData.picture])
        }
    }
    const DelFile = (name: string) => {
        const pic = reportData.picture
        let picArr = []
        for (let i = 0; i < pic.length; i++) {
            if (pic[i].name !== name)
                picArr.push(pic[i])
        }

       
        formik.setFieldValue('picture', picArr)
    }
    
   
    // console.log('formik', formik.values)

    return (

        <form onSubmit={formik.handleSubmit}>

            <Grid container spacing={2} sx={{
                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
                padding: 2
            }}>


                <Grid item xs={12}>


                    <FormControl >
                        <FormLabel>
                            ক্যাটাগরি বাছাই
                        </FormLabel>
                        <Select
                            id="doron"
                            value={formik.values.doron + ''}
                            label=""
                            sx={{
                                width: '100%',
                                height: 30,
                                fontSize: 14,
                                backgroundColor: 'white'
                            }}
                            onChange={selectChange}
                            error={Boolean(formik.errors.doron) && Boolean(formik.touched.doron
                            )}

                        >{
                                designations.map(value => (
                                    <MenuItem value={value.title}>{value.title}</MenuItem>
                                ))
                            }

                        </Select>
                        {
                            formik.errors.doron &&
                            <FormHelperText sx={{ color: 'red' }} >
                                {formik.errors.doron}
                            </FormHelperText>
                        }
                    </FormControl>


                </Grid>
                <Grid item xs={12}>

                    <FormControl
                        id="title"
                        size="sm"
                        color="primary">
                        <FormLabel>
                            শিরোনাম
                        </FormLabel>
                        <Input
                            id="title"
                            placeholder='শিরোনাম'
                            type="text"
                            autoComplete="on"
                            autoFocus
                            value={formik.values.title}
                            error={Boolean(formik.errors.title) && Boolean(formik.touched.title
                            )}
                            onChange={dataHandler}
                            variant="outlined" />
                        {
                               formik.errors.title &&
                               <FormHelperText sx={{ color: 'red' }} >
                                   {formik.errors.title}
                               </FormHelperText>
                        }
                    </FormControl>

                </Grid>
                <Grid item xs={12}>


                    <FormControl
                        id="body"
                        size="sm"
                        color="primary"
                    >
                        <FormLabel>
                            রিপোর্ট
                        </FormLabel>
                        <Textarea
                            placeholder={'লিখুন'}
                            onChange={dataHandler}
                            // sx={{ fontWeight:'100' }}
                            error={Boolean(formik.errors.body) && Boolean(formik.touched.body
                            )}
                            minRows={2}
                            value={formik.values.body}


                        />

                    </FormControl>
                    {
                          formik.errors.body &&
                          <FormHelperText sx={{ color: 'red',marginTop: 1 }} >
                              {formik.errors.body}
                          </FormHelperText>
                    }
                </Grid>
                <Grid item xs={12}>

                    <Toolbar variant='dense' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                            সংযুক্তি
                        </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            href="#file-upload"
                        >
                            Upload files
                            <VisuallyHiddenInput type="file" onChange={fileChange} multiple />
                        </Button>

                    </Toolbar>
                    {
                          formik.errors.picture &&
                          <FormHelperText sx={{ color: 'red' }} >
                           ফাইল বাছাই করুন
                          </FormHelperText>
                    }

                </Grid>
                {

                    formik.values.picture.map(value => (
                        <Grid item xs={12}>
                            <Toolbar
                                sx={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottom: 1,
                                    borderColor: 'grayText'

                                }}>
                                <Box>
                                    <Typography>
                                        {value.name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button onClick={() => DelFile(value.name)}>
                                        <DeleteOutlineIcon sx={{ color: 'red' }} />
                                    </Button>
                                </Box>
                            </Toolbar>
                        </Grid>
                    ))
                }
                <Grid item xs={12}>

                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        color="secondary"
                        variant="contained"
                        // onClick={formik.handleSubmit}
                        type='submit'

                    >
                        SUBMIT REPORT
                    </LoadingButton>


                </Grid>

            </Grid>

        </form>



    )
}

export default AddReportScreen

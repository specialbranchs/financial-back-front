import React, { useState } from 'react'
import useDoronList from '../../../../hooks/useDoron'
import { ReportDataItem } from '../../../../../typings/formData'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BootstrapInput, { Item, StyledTextarea, VisuallyHiddenInput } from '../../../../utils/textFieldStyle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoadingButton } from '@mui/lab';
import api from '../../../../api';
import { doOnSubscribe } from '../../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
const primry = {
    doron: 'ধরণ বাছাই করুন',
    title: '',
    body: '',
    id: 1,
    picture: []
}
const AddReportScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const { designations } = useDoronList()
    const [reportData, setReportData] = React.useState<ReportDataItem>(primry)

    const selectChange = (e: SelectChangeEvent) => {
        setReportData({
            ...reportData,
            doron: e.target.value
        })
    };
    const dataHandler = (e: { target: { value: any; id: any }; }) => {

        setReportData({
            ...reportData,
            [e.target.id]: e.target.value
        })
    }
    const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const pic = e.target.files
            let picArr = []
            for (let i = 0; i < pic.length; i++) {
                picArr.push(pic[i])
            }

            setReportData({
                ...reportData,
                picture: [...picArr, ...reportData.picture]
            })
        }
    }
    const DelFile = (name: string) => {
        const pic = reportData.picture
        let picArr = []
        for (let i = 0; i < pic.length; i++) {
            if (pic[i].name !== name)
                picArr.push(pic[i])
        }

        setReportData({
            ...reportData,
            picture: picArr
        })
    }
    const Submit = () => {
        const { doron, title, body, picture } = reportData
        if (doron === 'ধরণ বাছাই করুন') {
            setError('ধরণ বাছাই করুন')
            return
        } else if (title === '') {
            setError('শিরোনাম বাছাই করুন')
            return
        } else if (body === '') {
            setError('রিপোর্ট বাছাই করুন')
            return
        } else if (picture.length === 0) {
            setError('অন্তত একটি ফাইল বাছাই করুন')
            return
        }
        setLoading(true)
        api.report
            .setReport$(reportData)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (report) => {
                    // console.log('user', report)
                    setReportData(primry)
                    setError('সফল ভাবে রিপোর্টতি জমা হয়েছে')
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    // console.log(reportData)

    return (
        
            <Grid container spacing={2} sx={{
                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
                padding:2
            }}>
                <Grid item xs={12}>
                    
                        <Toolbar variant='dense' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>
                                ক্যাটাগরি বাছাই
                            </Typography>
                            <FormControl >

                                <Select

                                    id="doron"
                                    value={reportData?.doron + ''}
                                    label=""
                                    sx={{
                                        width: 380,
                                        height: 30,
                                        fontSize: 14,
                                        backgroundColor: 'white'
                                    }}
                                    onChange={selectChange}

                                >{
                                        designations.map(value => (
                                            <MenuItem value={value.title}>{value.title}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>

                        </Toolbar>
                    

                </Grid>
                <Grid item xs={12}>
                    
                        <Toolbar variant='dense' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>
                                শিরোনাম
                            </Typography>
                            <FormControl variant="standard" >
                                <BootstrapInput
                                    placeholder='শিরোনাম'
                                    sx={{
                                        input: {

                                            "&::placeholder": {    // <----- Add this.
                                                opacity: .7,
                                            },
                                        },

                                    }}
                                    value={reportData.title}
                                    onChange={dataHandler}
                                    id="title" />
                            </FormControl>


                        </Toolbar>
                    
                </Grid>
                <Grid item xs={12}>
                    <Toolbar variant='dense' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                            রিপোর্ট
                        </Typography>

                        <StyledTextarea
                            aria-label="minimum height"
                            minRows={3}
                            maxRows={7}
                            id="body"
                            value={reportData.body}
                            onChange={dataHandler}
                            placeholder=" রিপোর্ট"

                        />
                    </Toolbar>
                    
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
                    
                </Grid>
                {

                    reportData.picture.map(value => (
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
                    <Toolbar
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                        }}>
                        <LoadingButton
                            loading={loading}
                            loadingPosition="start"
                            color="secondary"
                            variant="contained"
                            onClick={() => Submit()}
                        >
                            SUBMIT REPORT
                        </LoadingButton>
                        <Typography color={'red'}>
                            {error}
                        </Typography>

                    </Toolbar>
                </Grid>

            </Grid>


        


    )
}

export default AddReportScreen

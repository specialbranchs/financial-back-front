import { Box,  FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SearchInResponseData } from '../../../../api/search'
import { Designation } from '../../../../../typings/structures'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import LoadingButton from '@mui/lab/LoadingButton'
import api from '../../../../api'
import { doOnSubscribe } from '../../../../utils/rxjs.utils'
import { finalize } from 'rxjs/operators'
import useChildDoronList from '../../../../hooks/useChildDoron'
import { Button } from '@mui/joy'
type props = {
    person: SearchInResponseData,
    podokList: Designation[];
    reRender:any;
}
export type PodokType = {
    podok: string;
    child: string;
    podokdate: string;
    id: number;
}
export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,

};

const EditPodokDetails = ({ person, podokList ,reRender}: props) => {
    const [modalfull, setmodalfull] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState('')
    const [searchData, setSearchData] = useState<PodokType>({
        id: person.id,
        podok: '0',
        child: '0',
        podokdate: ''
    })
    const { designations } = useChildDoronList(parseInt(searchData.podok))
    const handleOpen = () => setmodalfull(true);
    const handleClose = () => setmodalfull(false);
    const selectChange = (e: SelectChangeEvent) => {
        setSearchData({
            ...searchData,
            podok: e.target.value
        })
    };
    const childSelectChange = (e: SelectChangeEvent) => {
        setSearchData({
            ...searchData,
            child: e.target.value
        })
    };
    const submit = () => {

        if (searchData.podok === '0' || parseInt(searchData.podok) === 0) {
            seterror('পদক বাছাই করুন')
            return
        } else if (searchData.podokdate === '') {
            seterror('পদক গ্রহণের সাল পুরন করুন')
            return
        }
        seterror('')
        api.common.
            setDesignations(searchData)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (podok) => {
                    console.log('user', podok)
                    seterror('সফল ভাবে যুক্ত হয়েছে')
                    reRender()
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    return (
        <Toolbar sx={{ borderColor: 'GrayText', borderWidth: 1 }}>
            <Button onClick={handleOpen} variant="soft" sx={{ fontWeight: '100' }} size='sm'>পদকের নাম সম্পাদনা</Button>

            <Modal
                sx={{ overflow: 'auto' }}

                open={modalfull}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose} variant="soft" sx={{ fontWeight: '100' }} size='sm'>CLOSE</Button>
                    <Toolbar sx={{
                        flexDirection: 'column',
                        boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
                        padding: '6px'
                    }}>
                         <Typography component={'h6'} sx={{ color: 'red' }}>
                            {error}
                        </Typography>
                        <Box m={1}>

                            <FormControl sx={{ m: 1, minWidth: 260 }}>
                                <InputLabel id="podok">ক্যাটাগরি</InputLabel>
                                <Select
                                    labelId="podok"
                                    id="podok"
                                    value={searchData.podok}
                                    label="পদক"
                                    onChange={selectChange}
                                >{
                                        podokList.map(value => (
                                            <MenuItem value={value.id}>{value.title}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Box>
                        <Box m={1}>

                            <FormControl sx={{ m: 1, minWidth: 260 }}>
                                <InputLabel id="podok">উপ-ক্যাটাগরি</InputLabel>
                                <Select
                                    labelId="podok"
                                    id="podok"
                                    value={searchData.child}
                                    label="পদক"
                                    onChange={childSelectChange}


                                >{
                                        designations.map(value => (
                                            <MenuItem value={value.id}>{value.title}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Box>


                        <Box m={1}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker
                                    label=" গ্রহণের সাল"
                                    onChange={(newValue: Dayjs | null) => {
                                        if (newValue) {
                                            setSearchData({
                                                ...searchData,
                                                podokdate: new Date(newValue.add(1, 'day').toDate()).toISOString().slice(0, 10)
                                            })
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>


                        <LoadingButton

                            loading={loading}
                            loadingPosition="start"
                            color="primary"
                            variant="contained"
                            onClick={() => submit()}
                        >
                            UPDATE
                        </LoadingButton>
                       
                    </Toolbar>

                </Box>
            </Modal>
        </Toolbar>
    )
}

export default EditPodokDetails;

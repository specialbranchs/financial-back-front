import { Box, FormControl, MenuItem, Select, Toolbar, SelectChangeEvent, InputLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import api from '../../../api';
import { doOnSubscribe } from '../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import LoadingButton from '@mui/lab/LoadingButton';
import { SearchInResponseData } from '../../../api/search';
import PersonTable from './personTable';
import useDesignation from '../../../hooks/useCatagoris';
import BootstrapInput from '../../../utils/textFieldStyle';
import useChildDoronList from '../../../hooks/useChildDoron';
//import * as types from '../../../../typings/formData';

type searchDataType = {
    name: string;
    fatherName: string;
    tinNumber: string;
    nid: string;
    podok: number;
    child: number;
    podokpost: string;
    start: string | null;
    end: string | null;

}




const PersonScreen = () => {
    const [loading, setLoading] = useState(false);
    const [personList, setpersonList] = useState<SearchInResponseData[]>([])
    const { designations } = useDesignation()

    const [searchData, setSearchData] = React.useState<searchDataType>({
        name: '',
        fatherName: '',
        tinNumber: '',
        podok: 0,
        child: 0,
        podokpost: '',
        nid: '',
        start: null,
        end: null
    })
    const data = useChildDoronList(searchData.podok)
    const childlist = data.designations

    const selectChange = (e: SelectChangeEvent) => {
        setSearchData({
            ...searchData,
            podok: parseInt(e.target.value)
        })
    };
    const selectChildChange = (e: SelectChangeEvent) => {
        setSearchData({
            ...searchData,
            child: parseInt(e.target.value)
        })
    };
    const dataHandler = (e: { target: { value: any; id: any }; }) => {
        console.log(e.target.value)
        setSearchData({
            ...searchData,
            [e.target.id]: e.target.value
        })
    }

    const submit = () => {
        api.
            search.
            searchPersonLis$(searchData)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (person) => {
                    // console.log('user',person)
                    setpersonList(person)
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
   

    const personInitData = () => {
        api.
            search.
            LoadInitPersonList$()
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (person) => {
                    // console.log('user',person)
                    setpersonList(person)
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    useEffect(() => {
        personInitData()
    }, [])
    const refreshBtn=()=>{
        if(searchData.name==='' && searchData.fatherName==='' && searchData.tinNumber==='' && searchData.podok===0 && searchData.child===0 && searchData.podokpost==='' && searchData.nid==='' && searchData.start===null && searchData.end===null){
            personInitData()
        }else{
            submit()
        }
    }
    return (
        <>
            <Toolbar variant='dense' sx={{
                flexWrap: 'wrap',
                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
                backgroundColor: 'white',
                padding: 2
            }}>
                <FormControl variant="standard" >
                    <BootstrapInput
                        placeholder='নাম'
                        sx={{ width: 200, marginRight: 2 }}
                        value={searchData.name}
                        onChange={dataHandler}
                        id="name" />
                </FormControl>

                <FormControl variant="standard">
                    <BootstrapInput
                        placeholder='বাবার নাম'
                        value={searchData.fatherName}
                        onChange={dataHandler}
                        sx={{ width: 200, marginRight: 2 }}
                        id="fatherName" />
                </FormControl>

                <FormControl variant="standard">
                    <BootstrapInput
                        placeholder="এনআইডি"
                        value={searchData.nid}
                        onChange={dataHandler}
                        id="nid"
                        sx={{ width: 200, marginRight: 2 }}
                    />
                </FormControl>
                <FormControl variant="standard" >
                    <BootstrapInput
                        placeholder="টিন নাম্বার"
                        value={searchData.tinNumber}
                        onChange={dataHandler}
                        id="tinNumber"
                        sx={{ width: 200, marginRight: 2 }}
                    />
                </FormControl>

                <FormControl>
                    <InputLabel id="podok">ক্যাটাগরি</InputLabel>
                    <Select
                        labelId="podok"
                        id="podok"
                        value={searchData.podok + ''}
                        label="পদক"

                        sx={{
                            width: 180,
                            height: 40,
                            fontSize: 14,
                            marginRight: 2,
                            fontWeight: '100',
                            color: "GrayText"
                        }}
                        onChange={selectChange}>
                        {
                            designations.map(value => (
                                <MenuItem key={value.id} value={value.id}>{value.title}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="podok">উপ-ক্যাটাগরি</InputLabel>
                    <Select
                        labelId="podok"
                        id="podok"
                        value={searchData.child + ''}
                        label="পদক"

                        sx={{
                            width: 180,
                            height: 40,
                            fontSize: 14,
                            marginRight: 2,
                            fontWeight: '100',
                            color: "GrayText"
                        }}
                        onChange={selectChildChange}>
                        {
                            childlist.map(value => (
                                <MenuItem key={value.id} value={value.id}>{value.title}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
                <Box my={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DatePicker
                            label="start date"
                            sx={{ width: 200, marginRight: 2 }}
                            slotProps={{ textField: { size: 'small', } }}
                            onChange={(newValue: Dayjs | null) => {
                                if (newValue) {
                                    setSearchData({
                                        ...searchData,
                                        start: new Date(newValue.add(1, 'day').toDate()).toISOString().slice(0, 10)
                                    })
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box mx={1} my={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DatePicker
                            label="end date"
                            sx={{ width: 200, marginRight: 2 }}
                            slotProps={{ textField: { size: 'small' } }}
                            onChange={(newValue: Dayjs | null) => {
                                if (newValue) {
                                    setSearchData({
                                        ...searchData,
                                        end: new Date(newValue.add(1, 'day').toDate()).toISOString().slice(0, 10)
                                    })
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <LoadingButton
                    loading={loading}
                    // loadingPosition="start"
                    color="primary"
                    sx={{ marginY: 2 }}
                    variant="contained"
                    onClick={() => submit()}
                >
                    SEARCH
                </LoadingButton>
            </Toolbar>

            {
                personList.length == 0 ?
                    <Toolbar variant='dense' sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: '10%'
                    }}>
                        <Typography>
                            Data not found
                        </Typography>
                    </Toolbar> :
                    <PersonTable personlist={personList} podokList={designations} reRender={refreshBtn} />
            }
        </>
    )
}

export default PersonScreen



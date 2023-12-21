
import { Box, Button, SelectChangeEvent, Toolbar } from '@mui/material'
import React, { useCallback, useState } from 'react'

import InfoScreen from './info';
import PersonalScreen from './personal';
import ProfessionalScreen from './professional';
import PoliticalScreen from './political';
import MamlaScreen from './mamla';
import EvaluationScreen from './evaluation';
import { PersonFormData, ShowDataType } from '../../../../../typings/formData';
import { PersonInitialData, showData } from '../../../../utils/personUtils';
import { Typography } from '@mui/joy';
import { LoadingButton } from '@mui/lab';
import { produce } from 'immer';
import { Dayjs } from 'dayjs';
import api from '../../../../api';
import { doOnSubscribe } from '../../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';

type Props = {
    state: number;
    keyData: PersonFormData;
    updateIds:any
    reRender:any
}
const AddPerson = ({ state, keyData,updateIds ,reRender}: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState('')
    const [show, setShow] = React.useState<ShowDataType[]>(showData)
    const [count, setcount] = useState(1)
    const [personData, setpersonData] = useState<PersonFormData>(keyData)
    const [nidtin,setnidtin]=useState({nid:false,tin:false})
    const selectChange = (e: any, newValue: number) => {
        //console.log(e, newValue)
        setpersonData({
            ...personData,
            podok: newValue
        })
        seterror('')
    };
    const childSelectChange = (e: any, newValue: number) => {
       // console.log(e, newValue)
        setpersonData({
            ...personData,
            child: newValue
        })
        seterror('')
    };
    const dataHandler = (e: { target: { value: any; id: any }; }) => {
        setpersonData({
            ...personData,
            [e.target.id]: e.target.value
        })
        seterror('')
    }
    const dateChange = (newValue: Dayjs | null) => {
      //  console.log(newValue)
        if (newValue) {
            setpersonData({
                ...personData,
                podokdate: new Date(newValue.add(1, 'day').toDate()).toISOString().slice(0, 10)
            })
        }
        seterror('')
    }
    const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const pic = e.target.files[0]
            setpersonData({
                ...personData,
                picture: pic
            })
        }
    }
    const Submit = () => {
        if (personData.podok === 0) {
            seterror('ক্যাটাগরি বাছাই করুন')
            return
        }
        if (nidtin.nid === true) {
            seterror('অন্য এনআইডি বাছাই করুন')
            return
        }
        if (nidtin.tin === true) {
            seterror('অন্য টিন বাছাই করুন')
            return
        }
       
        api.search.addPerson$(personData)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (res) => {
                    // console.log('user', res)
                    setpersonData(PersonInitialData)
                    seterror('সফল ভাবে আপলোড হয়েছে')
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    const handleToggle = useCallback((id: number, state: string) => {
        const len = show.length
        setShow(
            produce((draft) => {
                let todo: any = draft.find((todo) => todo.id === id);
                todo.display = 'none';
                if (state === 'prev' && id === 1) {
                    let prevtodo: any = draft.find((todo) => todo.id === len);
                    prevtodo.display = 'block';
                    setcount(len)
                } else if (state === 'prev' && id != 1) {
                    let prevtodo: any = draft.find((todo) => todo.id === id - 1);
                    prevtodo.display = 'block';
                    setcount(id - 1)
                }

                if (state === 'next' && id === len) {
                    let prevtodo: any = draft.find((todo) => todo.id === 1);
                    prevtodo.display = 'block';
                    setcount(1)
                } else if (state === 'next' && id != len) {
                    let prevtodo: any = draft.find((todo) => todo.id === id + 1);
                    prevtodo.display = 'block';
                    setcount(id + 1)
                }

            })
        );
    }, []);
    const Update = () => {
         api.search
         .updatePerson$(personData,updateIds)
         .pipe(
            doOnSubscribe(() => setLoading(true)),
            finalize(() => setLoading(false))
        )
        .subscribe({
            next: async (res) => {
                // console.log('user', res)
               // setpersonData(PersonInitialData)
                reRender()
                seterror('সফল ভাবে আপডেট হয়েছে')
                setLoading(false)
            },
            error: (error: any) => {
                // console.log(error)
                setLoading(false)
            }
        });
    }
//    console.log('data', personData)
    return (
        <>
            <Toolbar sx={{ justifyContent: 'space-around' }}>
                <Button onClick={() => { handleToggle(count, 'prev') }} variant="outlined" disabled={false}>
                    Prev
                </Button>
                <Button onClick={() => { handleToggle(count, 'next') }} variant="outlined" >
                    Next
                </Button>
            </Toolbar>

            <Toolbar sx={{ backgroundColor: 'white', padding: 2, flexDirection: 'column', alignItems: 'flex-start',maxHeight:400,overflowY:'auto' }}>

                <Box sx={{ display: show[0].display }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[0]?.title}</Typography>
                    </Box>
                    <InfoScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        fileChange={fileChange}
                        dateChange={dateChange}
                        data={personData}
                        state={state}
                        childSelectChange={childSelectChange}
                        setnidtin={setnidtin}

                    />

                </Box>
                <Box sx={{ display: show[1].display }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[1]?.title}</Typography>
                    </Box>
                    <PersonalScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        data={personData}
                    />
                </Box>
                <Box sx={{ display: show[2].display }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[2]?.title}</Typography>
                    </Box>
                    <ProfessionalScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        data={personData}
                    />
                </Box>
                <Box sx={{ display: show[3].display }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[3]?.title}</Typography>
                    </Box>
                    <PoliticalScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        data={personData}
                    />
                </Box>
                <Box sx={{ display: show[4].display }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[4]?.title}</Typography>
                    </Box>
                    <MamlaScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        data={personData}
                    />
                </Box>
                <Box sx={{ display: show[5].display, width: '100%' }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography>{show[5]?.title}</Typography>
                    </Box>
                    <EvaluationScreen
                        TextAreaChange={dataHandler}
                        InputChange={dataHandler}
                        SelectChange={selectChange}
                        data={personData}
                    />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography color='danger'>{error}</Typography>
                    </Box>
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        color="secondary"
                        variant="contained"
                        onClick={() => state === 1 ? Submit() : Update()}
                    >
                        {state === 1 ? 'SUBMIT' : 'UPDATE'}
                    </LoadingButton>
                </Box>
            </Toolbar>

        </>
    )
}

export default AddPerson

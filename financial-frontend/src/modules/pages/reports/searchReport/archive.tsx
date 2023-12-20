import { Box, CircularProgress, TextField, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { ReportSearch } from '../../../../../typings/structures';
import api from '../../../../api';
import { doOnSubscribe } from '../../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import { ReportResponseData } from '../../../../api/report';
import ReportList from './ReportList';


//import * as types from '../../../../typings/formData';
type props = {
    catagory: string
}

const ArchiveReportScreen = ({ catagory }: props) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<ReportResponseData>([])
    const [item, setItem] = useState<ReportSearch>({
        title: '',
        catagory:''
    })

useEffect(()=>{
    setItem({
        ...item,
        catagory:catagory
    })
  
},[catagory])

useEffect(() => {
    submit()
}, [item.catagory])
    const dataHandler = (e: { target: { value: any; id: any }; }) => {
        setItem({
            ...item,
            title: e.target.value
        })
    }

    const submit = () => {
        if(item.catagory==='')
         return
        setLoading(true)
        api.
            report.
            searchReportList$(item)
            .pipe(
                doOnSubscribe(() => setLoading(true)),
                finalize(() => setLoading(false))
            )
            .subscribe({
                next: async (report) => {
                   // console.log('user', report)
                    setReport(report)
                    setLoading(false)
                },
                error: (error: any) => {
                    // console.log(error)
                    setLoading(false)
                }
            });
    }
    //console.log("podok list", designations)
  
    return (
        <>
            <Toolbar sx={{
                flexWrap: 'wrap',
                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
                backgroundColor:'white'
            }}>
                <Box m={1}>

                    <TextField
                        onChange={dataHandler}
                        value={item.title}
                        label={catagory}
                        id="keyword"
                        variant="outlined"
                        size="small"

                    />

                </Box>


                <LoadingButton
                    loading={loading}
                   // loadingPosition="start"
                    color="primary"
                    variant="contained"
                    onClick={() => submit()}
                >
                    SEARCH
                </LoadingButton>
            </Toolbar>
            {
                loading && <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <CircularProgress />
                    
                </Toolbar>
            }
            {
                report.length!==0 ?
                <ReportList report={report}/>:null
            }

        </>
    )
}

export default ArchiveReportScreen



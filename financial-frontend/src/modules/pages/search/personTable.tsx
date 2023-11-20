import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SearchInResponseData } from '../../../api/search';
import { TablePagination, Toolbar, Typography } from '@mui/material';
import PersonBtn from './editsearch/PersonDetails';
import PersonDetails from './editsearch/PersonDetails';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Button from '@mui/joy/Button';

import EditPodokDetails from './editsearch/EditPodok';
import EditPersonDetails from './editsearch/EditDetails';
import { Designation } from '../../../../typings/structures';
import { BACKEND_URL } from '../../../utils/config';
import useChildDoronList from '../../../hooks/useChildDoron';
import ChildScreen from './child';

const sxStyle = {
    fontSize: 14,
    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
}

type props = {
    personlist: SearchInResponseData[]
    podokList: Designation[]
    reRender: any
}
export default function PersonTable({ personlist, podokList, reRender }: props) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //    console.log('personlist',personlist)
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{
                    "& .MuiTableCell-root": {
                        border: '1px solid #f1f3f4'
                    }
                }} aria-label="spanning table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                বিস্তারিত
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            personlist
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((value, index) => (
                                    <>
                                        <TableRow>
                                            <TableCell rowSpan={7} align='center'>
                                                {
                                                    value.picture &&
                                                    <img src={`${BACKEND_URL}/${value.picture}`} width={150} height={150} />
                                                }
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{ height: '5px' }}>
                                            <TableCell sx={{
                                                fontSize: 12,
                                                fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                            }}>পদক</TableCell>
                                            <TableCell align="right">
                                                {
                                                    value.person_Podok.map((item: any) => (
                                                        <Typography
                                                            sx={{
                                                                fontSize: 12,
                                                                fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                                            }}
                                                        >{item.podok?.title}{"["}{item.podokdate.slice(0, 4)}{"]\n"}<ChildScreen id={item.podok.id} child={item.child} /></Typography>
                                                    ))
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={sxStyle}>নাম/ডাক নাম</TableCell>
                                            <TableCell align="right" sx={sxStyle}>{value.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={sxStyle}>পিতার নাম</TableCell>
                                            <TableCell align="right" sx={sxStyle}>{value.fatherName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={sxStyle}>মাতার নাম</TableCell>
                                            <TableCell align="right" sx={sxStyle}>{value.motherName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={sxStyle}>জাতীয় পরিচয়পত্র</TableCell>
                                            <TableCell align="right" sx={sxStyle}>{value.nid}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={sxStyle}>টিআইএন নম্বর</TableCell>
                                            <TableCell align="right" sx={sxStyle}>{value.tinNumber}</TableCell>
                                        </TableRow>
                                        <Toolbar>
                                            <PersonDetails person={value} />
                                            <EditPersonDetails person={value} reRender={reRender} />
                                            <EditPodokDetails person={value} podokList={podokList} reRender={reRender} />
                                        </Toolbar>
                                        <TableRow>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 15, 100, 500]}
                component="div"
                count={personlist.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

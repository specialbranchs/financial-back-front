import { Box, Modal, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SearchInResponseData } from '../../../../api/search'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BACKEND_URL } from '../../../../utils/config';
import { Button } from '@mui/joy';
import ChildScreen from '../child';
const sxStyle = {
    fontSize: 14,
    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
   
}
type props = {
    person: SearchInResponseData
}
const style = {
    position: 'fixed',
    top: '10%',
    left: '10%',
    width: '70%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,


};

const PersonDetails = ({ person }: props) => {
    const [modalfull, setmodalfull] = React.useState<boolean>(false)
    const handleOpen = () => setmodalfull(true);
    const handleClose = () => setmodalfull(false);
    // console.log('persondetails', person)
    return (
        <Toolbar sx={{ borderColor: 'GrayText', borderWidth: 1 }}>

            <Button onClick={handleOpen} variant="soft" size="sm" sx={{ fontWeight: '100' }}>
                বিস্তারিত
            </Button>
            <Modal
                sx={{ overflow: 'scroll' }}

                open={modalfull}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose} variant="soft" sx={{ fontWeight: '100' }}>CLOSE</Button>
                    <TableContainer component={Paper} sx={{
                        maxHeight: 400,
                        overflowY: 'scroll'
                    }}>
                        <Table aria-label="spanning table" size='small'
                            sx={{
                                "& .MuiTableCell-root": {
                                    border: '1px solid #f1f3f4'
                                },

                            }}
                            stickyHeader
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        বিস্তারিত
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <TableRow >
                                    <TableCell align='center' colSpan={3}>
                                        {
                                            person.picture &&
                                            <img src={`${BACKEND_URL}/${person.picture}`} width={150} height={150} />
                                        }
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell sx={{
                                        fontSize: 12,
                                      
                                        fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                    }}>পদক</TableCell>
                                    <TableCell align="left">
                                        {
                                            person.person_Podok.map((item: any) => (
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                                    }}
                                                >{item.podok?.title}{"["}{item.podokdate.slice(0, 4)}{"]"}<ChildScreen id={item.podok.id} child={item.child} /></Typography>
                                            ))
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>নাম/ডাক নাম</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.name}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell sx={sxStyle}>পিতার নাম</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.fatherName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>মাতার নাম</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.motherName} </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>জাতীয় পরিচয়পত্র</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.nid}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>টিআইএন নম্বর</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.tinNumber}</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell sx={sxStyle}>স্থায়ী ঠিকানা</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].parmentAdd} </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>বর্তমান ঠিকানা</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].presentAdd}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>জন্ম তারিখ</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].dateOfBirth}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={sxStyle}>জন্মস্থান</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].birthPlace}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>উচ্চতা</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].height}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>দেহ রং</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].bodyColor}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>সনাক্ত করন</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].clue}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>ধর্ম</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].religion}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>টেলিফোন/মোবাইল নম্বর</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].mobile}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>পাসপোর্ট নম্বর ও ইস্যুর তারিখ</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].passport}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>শিক্ষাগত যোগ্যতা</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].education}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>পারিবারিক বৃত্তান্ত</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].family}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>পেশাগত বৃত্তান্ত ( বর্তমানে কোন বেসরকারী , স্বায়ত্বশাসিত/আধ-সরকারী/ ব্যবসায়িক প্রতিষ্ঠানে অথবা কোন সরকারী /আধা-সরকারী সামরিক বাহিনীর কর্মকর্তা হলে উল্লেখ পূর্বক বিবরন )</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.professional[0].profession}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>বাৎসরিক আয়</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.professional[0].income}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>ব্যবসায়িক প্রতিষ্ঠান (প্রযোজ্য ক্ষেত্রে ব্যবসা প্রতিষ্ঠানের নাম ,পদবী ,অবস্থান ও প্রকৃতি উল্লেখ )</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.professional[0].business}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>রাজনৈতিক বিবরন ( ঐতিহাসিক কোন জাতীয় আন্দোলনে জড়িত থাকলে / কোন রাজনৈতিক কর্মকান্ডে জড়িত থাকলে তার বিবরন )</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.political[0].politicalInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>মামলার বিবরন (সাজাপ্রাপ্ত কিনা ? / সাজাপ্রাপ্ত হলে পাঁচ বৎসর অতিক্রান্ত হয়েছে কিনা ?)</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].mamlaInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>চরমপান্থি , জঙ্গীবাদ , রাষ্ট্রদ্রোহীবা নাশকতামূলক কর্মকান্ডে জড়িত থাকলে তার বিবরন</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].sabotageInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>আটকাদেশ থাকলে তার বিবরন</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].arrestOrder}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>গ্রেফতার সম্পর্কিত তথ্য</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].arrestInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>সম্পদের বিবরন</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.personal[0].wealth}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>শিল্প , সাহিত্য , অর্থনীতিতে ও অন্যান্য অবদানের ক্ষেত্রে বিষেশ অবদানের জন্য স্বীকৃতি / রাষ্ট্রীয় স্বীকৃতি</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.professional[0].contribution}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>নির্বাচন সংক্রান্ত তথ্যাবলী (অতীতের স্থানীয় সরকার /ছাত্র সংসদ /জাতীয় সংসদ প্রভৃতি নির্বাচনে নির্বাচিত হয়ে থাকলে পদবী ,সন উল্লেখ পূর্বক)</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.political[0].electionInfo}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={sxStyle}>দুর্নীতি সংক্রান্ত তথ্যাদি</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].corruptionInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>থানা / ডিএসবির রেকর্ড</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].thanaRecord}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>স্থানীয় প্রভাব</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.mamla[0].influential}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={sxStyle}>বিবিধ|মতামত</TableCell>
                                    <TableCell align="left" sx={sxStyle}>{person.evaluation[0].evaluation}</TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </Toolbar>
    )
}

export default PersonDetails;

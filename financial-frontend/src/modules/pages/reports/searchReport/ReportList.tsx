import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
// import Typography from '@mui/joy/Typography';
import { Typography } from '@mui/material';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { ReportResponseData } from '../../../../api/report'
import { Box, Modal, Toolbar } from '@mui/material';
import { style } from '../../search/editsearch/EditDetails';
import React, { useState } from 'react';
import { BACKEND_URL } from '../../../../utils/config';
import TextAreaPropsForReport from './TextAreaForList';
import FileViewerScreen from '../../../../components/file-viewer';
import api from '../../../../api';
import { doOnSubscribe } from '../../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
type props = {
    report: ReportResponseData
}
const ReportList = ({ report }: props): any => {
    const [fileShow, setFileshow] = useState<boolean>(false)
    const [fileStatus, setfileStatus] = useState<any>({
        file: '',
        type: ''
    })
    const [modalfull, setmodalfull] = React.useState<boolean>(false)
    const handleOpen = () => setmodalfull(true);
    const handleClose = () => setmodalfull(false);
    const [modalItem, setModalItem] = React.useState({ title: '', body: '' })

    const download = (url: string) => {
        const type=url.split('.').pop()
        var filename = url.replace(/^.*[\\/]/, '')
        api.catagory
            .downloadFile(BACKEND_URL+url)
            .pipe(
                doOnSubscribe(() => { }),
                finalize(() => { })
            )
            .subscribe({
                next: async (file) => {
                    const url=window.URL.createObjectURL(new Blob([file]))
                    const link=document.createElement('a')
                    link.href=url
                    link.setAttribute('download',filename)
                    document.body.appendChild(link)
                    link.click()

                },
                error: (error: any) => {
                    // console.log(error)

                }
            });
    }
    return (
        <>
            {
                report.map(item => (
                    <Card variant="solid" key={item.id} sx={{ my: 1, backgroundColor: 'white' }}>
                        <CardContent orientation="horizontal">
                            <CardContent>
                                <Typography sx={{
                                    fontSize: 18,
                                    color: 'GrayText',
                                    fontWeight: 'bold',

                                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(",")
                                }}>{item.title}</Typography>
                                <Typography paragraph={false} sx={{
                                    fontSize: 14,
                                    color: 'GrayText',
                                    padding: '2px',
                                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                    marginBottom: 2
                                }}>{item.body.slice(0, 200)}</Typography>
                                {

                                    item.user_report.map(value => (
                                        <Toolbar
                                            variant='dense'
                                            key={value.id}
                                            sx={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'whitesmoke',
                                                borderRadius: 3,
                                            }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontSize: 12,
                                                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                                                    textDecoration: 'underline',
                                                    color: 'GrayText'

                                                }}>
                                                    {value.picture.replace(/^.*(\\|\/|\:)/, '').slice(-60)}
                                                </Typography>
                                            </Box>
                                            <Box >
                                                <Button onClick={() => {
                                                    setFileshow(true)
                                                    setfileStatus({
                                                        file: BACKEND_URL + value.picture,
                                                        type: value.picture.split('.').pop()
                                                    })
                                                }} size='sm' variant="soft" >
                                                    <AirplayOutlinedIcon color='error' />
                                                </Button>

                                                <a onClick={() => {
                                                    download(value.picture)
                                                }} target="_blank" rel="noreferrer">
                                                    <Button size='sm' sx={{ marginLeft: 5 }} variant="soft">
                                                        <DownloadOutlinedIcon sx={{ color: 'red' }} />
                                                    </Button>
                                                </a>
                                            </Box>

                                        </Toolbar>
                                    ))
                                }
                            </CardContent>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                setmodalfull(true)
                                setModalItem({
                                    title: item.title,
                                    body: item.body
                                })
                            }} variant="soft" size="sm" sx={{ fontWeight: '100' }}>
                                বিস্তারিত
                            </Button>
                            {/* <Button variant="solid" size="sm" sx={{ fontWeight: '100' }} >
                                ডাউনলোড
                            </Button> */}
                        </CardActions>
                    </Card>

                ))
            }
            <Modal
                sx={{ overflow: 'auto' }}

                open={modalfull}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose} variant="soft">CLOSE</Button>


                    <Card variant="solid" sx={{ my: 1, backgroundColor: 'white' }}>
                        <CardContent orientation="horizontal">
                            <CardContent sx={{ overflowY: 'scroll', maxHeight: 400 }}>
                                <Typography sx={{
                                    fontSize: 18,
                                    color: '#0a355f',
                                    fontWeight: 'bold',

                                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(",")
                                }}>{modalItem.title}</Typography>

                                <TextAreaPropsForReport
                                    value={modalItem.body}
                                    id='123'
                                    placeholder='hello'
                                    error={false}
                                    TextAreaChange={() => { }}
                                    label=''
                                />

                            </CardContent>
                        </CardContent>

                    </Card>
                </Box>
            </Modal>

            <Modal
                sx={{ overflow: 'auto' }}

                open={fileShow}
                onClose={() => setFileshow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={() => setFileshow(false)} variant="soft">CLOSE</Button>


                    <Card variant="solid" sx={{ my: 1 }}>
                        <CardContent orientation="horizontal">
                            <CardContent sx={{ overflowY: 'scroll', minHeight: 300, maxHeight: 400 }}>
                                <FileViewerScreen
                                    type={fileStatus.type}
                                    file={fileStatus.file}
                                />
                            </CardContent>
                        </CardContent>

                    </Card>
                </Box>
            </Modal>
        </>
    );
}

export default ReportList

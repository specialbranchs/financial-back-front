import { Box, Modal, Toolbar } from '@mui/material'
import React from 'react'
import { SearchInResponseData } from '../../../../api/search'
import AddPerson from '../../person/add';
import { PersonInitialData, conVToPerType } from '../../../../utils/personUtils';
import { PersonFormData } from '../../../../../typings/formData';
import { Button } from '@mui/joy';
type props = {
    person: SearchInResponseData
    reRender: any
}
export const style = {
    position: 'fixed',
    top: '10%',
    left: '10%',
    width: '70%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    // overflow:'auto'

};

const EditPersonDetails = ({ person, reRender }: props) => {
    const [modalfull, setmodalfull] = React.useState<boolean>(false)
    const handleOpen = () => setmodalfull(true);
    const handleClose = () => setmodalfull(false);
    //console.log('person', person)
    const updateInitData = conVToPerType(person)
    return (
        <Toolbar sx={{ borderColor: 'GrayText', borderWidth: 1 }}>
            <Button onClick={handleOpen} variant="soft" sx={{ fontWeight: '100' }} size='sm'>সম্পাদনা</Button>

            <Modal
                sx={{ overflow: 'auto' }}

                open={modalfull}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose} variant="soft" sx={{ fontWeight: '100' }} size='sm'>CLOSE</Button>

                    <AddPerson reRender={reRender} state={2} keyData={updateInitData} updateIds={person} />
                </Box>
            </Modal>
        </Toolbar>
    )
}

export default EditPersonDetails;

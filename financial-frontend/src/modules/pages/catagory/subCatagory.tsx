import React from 'react'
import useChildDoronList from '../../../hooks/useChildDoron'
import { Chip } from '@mui/material'
type Props = {
    id: number;
    text:string
}
const SubCatagory = ({ id }: Props) => {
    const { designations } = useChildDoronList(id)
    return (<>
        {
            designations.slice(1, designations.length).map(value => (
                <Chip size='small' sx={{ mr: 1 }} label={value.title} />
                
            ))

        }
    </>

    )
}

export default SubCatagory

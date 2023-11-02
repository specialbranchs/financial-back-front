import React from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Chip from '@mui/joy/Chip';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useDesignation from '../../../../hooks/useCatagoris';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import FormControl from '@mui/joy/FormControl';


type Props = {
    id: string;
    placeholder: string;
    SelectChange: any;
    error: boolean;
    label: string;
    value: string;
}
const SelectProps = ({ value, id, placeholder, SelectChange, label, error }: Props) => {
    const { designations } = useDesignation()
    return (
        <FormControl
            id={id}
            size="sm"
            error={error}
            color="primary">
            <Select
                placeholder="ক্যাটাগরি বাছাই করুন"
                startDecorator={<CardGiftcardOutlinedIcon />}
                onChange={SelectChange}
                value={value}
                slotProps={{
                    listbox: {
                        sx: {
                            zIndex: 3001
                        },
                    },
                }}
            >{
                    designations.map(item => (
                        <Option key={item.id} value={item.id}>{item.title}</Option>
                    ))
                }

            </Select>
        </FormControl>
    )
}

export default SelectProps

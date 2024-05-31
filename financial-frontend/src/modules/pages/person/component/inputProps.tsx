import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { sxStyle } from '../../search/editsearch/PersonDetails';
type Props = {
    id: string;
    placeholder: string;
    InputChange: any;
    error: boolean;
    label: string;
    value: string;
    
}
const InputProps = ({ id, placeholder, InputChange, error, label, value }: Props) => {
    return (
        <FormControl
            id={id}
            size="sm"
            color="primary">
            <FormLabel sx={sxStyle}>
                {label}
            </FormLabel>
            <Input
                id={id}
                placeholder={placeholder}
                type="text"
                autoComplete="on"
                sx={sxStyle}
                autoFocus
                value={value}
                error={error}
                onChange={InputChange}
                variant="outlined" />
            {
                error &&
                <FormHelperText sx={{color:'red',fontFamily:sxStyle.fontFamily}} >
                    Already exists
                </FormHelperText>
            }
        </FormControl>
    )
}

export default InputProps

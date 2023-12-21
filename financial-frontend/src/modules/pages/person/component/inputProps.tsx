import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
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
            <FormLabel>
                {label}
            </FormLabel>
            <Input
                id={id}
                placeholder={placeholder}
                type="text"
                autoComplete="on"
                autoFocus
                value={value}
                error={error}
                onChange={InputChange}
                variant="outlined" />
            {
                error &&
                <FormHelperText sx={{color:'red'}} >
                    Already exists
                </FormHelperText>
            }
        </FormControl>
    )
}

export default InputProps

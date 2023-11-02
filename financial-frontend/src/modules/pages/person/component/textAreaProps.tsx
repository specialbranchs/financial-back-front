import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
type Props={
    id:string;
    placeholder:string;
    TextAreaChange:any;
    error:boolean;
    label:string;
    value:string;
}
const TextAreaProps = ({value,id,placeholder,TextAreaChange,error,label}:Props) => {
    return (
        <FormControl
            id={id}
            size="sm"
            color="primary"
            >
            <FormLabel>
                {label}
            </FormLabel>
            <Textarea
                placeholder={'লিখুন'}
                onChange={TextAreaChange}
               // sx={{ fontWeight:'100' }}
                error={error}
                minRows={2}
                value={value}
            
               // sx={{ mb: 1 }}
            />
        </FormControl>
    )
}

export default TextAreaProps

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import useDesignation from '../../../../hooks/useCatagoris';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import FormControl from '@mui/joy/FormControl';
import useChildDoronList from '../../../../hooks/useChildDoron';


type Props = {
    id: string;
    placeholder: string;
    SelectChange: any;
    error: boolean;
    label: string;
    value: string;
}
const ChildSelectProps = ({ value, id, placeholder, SelectChange, label, error }: Props) => {
    const { designations } = useChildDoronList(parseInt(label))
    console.log('values',label)
    return (
        <FormControl
            id={id}
            size="sm"
            error={error}
            color="primary">
            <Select
                placeholder="উপ-ক্যাটাগরি বাছাই করুন"
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

export default ChildSelectProps;

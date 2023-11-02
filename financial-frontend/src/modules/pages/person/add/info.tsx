
import { Button, Grid, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SelectProps from '../component/selectProps';
import DatePickerProps from '../component/datePickerProps';
import { VisuallyHiddenInput } from '../../../../utils/textFieldStyle';
import InputProps from '../component/inputProps';
import { FATHERNAME, MOTHERNAME, NAME, NC, NID, PODOK, TINNUMBER } from '../../../../utils/config';
import { PersonFormData } from '../../../../../typings/formData';
import ChildSelectProps from '../component/childSeclectProps';
type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    fileChange: any;
    dateChange: any;
    data: PersonFormData,
    state: number;
    childSelectChange:any
}
const InfoScreen = ({childSelectChange, InputChange, SelectChange, fileChange, dateChange, data, state }: Props) => {
    return (
        <>

            <Grid container spacing={2}>
                {state === 1 && <Grid item xs={4}>

                    <SelectProps
                        id={PODOK}
                        placeholder={NC.podok}
                        label='125'
                        value={data.podok as any}
                        SelectChange={SelectChange}
                        error={data.podok === 0 ? true : false}
                    />

                </Grid>
                }
                {state === 1 && <Grid item xs={4}>

                    <ChildSelectProps
                        id={PODOK}
                        placeholder={NC.podok}
                        label={data.podok as any}
                        value={data.child as any}
                        SelectChange={childSelectChange}
                        error={false}
                    />

                </Grid>
                }
                {state === 1 && <Grid item xs={4}>

                    <DatePickerProps
                        dateChange={dateChange}
                        value={data.podokdate}
                    />

                </Grid>
                }
                <Grid item xs={6}>

                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        href="#file-upload"
                    >
                        Upload a Picture
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={fileChange} />
                    </Button>

                </Grid>
                <Grid item xs={6}>

                    <Typography >
                        {data.picture?.name}
                    </Typography>

                </Grid>
                <Grid item xs={4}>
                    <InputProps
                        id={NAME}
                        placeholder={NC.name}
                        label={NC.name}
                        InputChange={InputChange}
                        error={false}
                        value={data.name}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputProps
                        id={MOTHERNAME}
                        placeholder={NC.motherName}
                        label={NC.motherName}
                        InputChange={InputChange}
                        error={false}
                        value={data.motherName}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputProps
                        id={FATHERNAME}
                        placeholder={NC.fatherName}
                        label={NC.fatherName}
                        InputChange={InputChange}
                        error={false}
                        value={data.fatherName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputProps
                        id={NID}
                        placeholder={NC.nid}
                        label={NC.nid}
                        InputChange={InputChange}
                        error={false}
                        value={data.nid}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputProps
                        id={TINNUMBER}
                        placeholder={NC.tinNumber}
                        label={NC.tinNumber}
                        InputChange={InputChange}
                        error={false}
                        value={data.tinNumber}
                    />
                </Grid>
            </Grid>



        </>
    )
}

export default InfoScreen

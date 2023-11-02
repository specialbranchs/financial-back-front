import { Grid } from '@mui/material'
import { ARRESTINFO, ARRESTORDER, CORRUPTIONINFO, ELECTIONINFO, INFLUENTIAL, MAMLAINFO, NC, POLITICALINFO, SABOTAGEINFO, THANARECORD } from '../../../../utils/config';
import TextAreaProps from '../component/textAreaProps';
import InputProps from '../component/inputProps';
import { PersonFormData } from '../../../../../typings/formData';

type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    data: PersonFormData
}
const MamlaScreen = ({data, TextAreaChange, InputChange, SelectChange }: Props) => {
    return (
        <Grid container spacing={2}>
            
            <Grid item xs={12}>
                <TextAreaProps
                    id={MAMLAINFO}
                    placeholder={NC.mamlaInfo}
                    label={NC.mamlaInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.mamlaInfo}
                />
            </Grid>
            <Grid item xs={12}>
                <TextAreaProps
                    id={SABOTAGEINFO}
                    placeholder={NC.sabotageInfo}
                    label={NC.sabotageInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.sabotageInfo}
                />
            </Grid>
            <Grid item xs={12}>
                <TextAreaProps
                    id={ARRESTORDER}
                    placeholder={NC.arrestOrder}
                    label={NC.arrestOrder}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.arrestOrder}
                />
            </Grid>
            <Grid item xs={12}>
                <TextAreaProps
                    id={ARRESTINFO}
                    placeholder={NC.arrestInfo}
                    label={NC.arrestInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.arrestInfo}
                />
            </Grid>
            <Grid item xs={12}>
                <TextAreaProps
                    id={CORRUPTIONINFO}
                    placeholder={NC.corruptionInfo}
                    label={NC.corruptionInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.corruptionInfo}
                />
            </Grid>
            <Grid item xs={12}>
                <TextAreaProps
                    id={THANARECORD}
                    placeholder={NC.thanaRecord}
                    label={NC.thanaRecord}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.thanaRecord}
                />
            </Grid>
            <Grid item xs={10}>
                <InputProps
                    id={INFLUENTIAL}
                    placeholder={NC.influential}
                    label={NC.influential}
                    InputChange={InputChange}
                    error={false}
                    value={data.influential}
                />
            </Grid>
        </Grid>
    )
}

export default MamlaScreen

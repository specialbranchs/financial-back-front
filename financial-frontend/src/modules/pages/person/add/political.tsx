import { Grid } from '@mui/material'
import { BUSINESS, CONTRIBUTION, ELECTIONINFO, NC, POLITICALINFO } from '../../../../utils/config';
import TextAreaProps from '../component/textAreaProps';
import { PersonFormData } from '../../../../../typings/formData';

type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    data: PersonFormData
}
const PoliticalScreen = ({ data,TextAreaChange, InputChange, SelectChange }: Props) => {
    return (
        <Grid container spacing={2}>
            
            <Grid item xs={8}>
                <TextAreaProps
                    id={POLITICALINFO}
                    placeholder={NC.politicalInfo}
                    label={NC.politicalInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.politicalInfo}
                />
            </Grid>
            <Grid item xs={8}>
                <TextAreaProps
                    id={ELECTIONINFO}
                    placeholder={NC.electionInfo}
                    label={NC.electionInfo}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.electionInfo}
                />
            </Grid>
        </Grid>
    )
}

export default PoliticalScreen

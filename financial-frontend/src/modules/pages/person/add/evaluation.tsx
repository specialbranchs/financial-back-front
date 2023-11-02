import { Grid } from '@mui/material'
import { ELECTIONINFO, EVALUATION, NC, POLITICALINFO } from '../../../../utils/config';
import TextAreaProps from '../component/textAreaProps';
import { PersonFormData } from '../../../../../typings/formData';
import sizeConfigs from '../../../../configs/sizeConfigs';

type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    data:PersonFormData
}
const EvaluationScreen = ({data, TextAreaChange, InputChange, SelectChange }: Props) => {
    return (
        <Grid container spacing={2} >
            
            <Grid item xs={12} >
                <TextAreaProps
                    id={EVALUATION}
                    placeholder={NC.evaluation}
                    label={NC.evaluation}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.evaluation}
                />
            </Grid>
           
        </Grid>
    )
}

export default EvaluationScreen

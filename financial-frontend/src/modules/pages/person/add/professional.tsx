import { Grid } from '@mui/material'
import React from 'react'
import InputProps from '../component/inputProps'
import { BUSINESS, CONTRIBUTION, INCOME, NC, PROFESSION } from '../../../../utils/config';
import TextAreaProps from '../component/textAreaProps';
import { PersonFormData } from '../../../../../typings/formData';

type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    data: PersonFormData
}
const ProfessionalScreen = ({ data,TextAreaChange, InputChange, SelectChange }: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <InputProps
                    id={PROFESSION}
                    placeholder={NC.profession}
                    label={NC.profession}
                    InputChange={InputChange}
                    error={false}
                    value={data.profession}
                />
            </Grid>
            <Grid item xs={6}>
                <InputProps
                    id={INCOME}
                    placeholder={NC.income}
                    label={NC.income}
                    InputChange={InputChange}
                    error={false}
                    value={data.income}
                />
            </Grid>
            <Grid item xs={8}>
                <TextAreaProps
                    id={BUSINESS}
                    placeholder={NC.business}
                    label={NC.business}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.business}
                />
            </Grid>
            <Grid item xs={8}>
                <TextAreaProps
                    id={CONTRIBUTION}
                    placeholder={NC.contribution}
                    label={NC.contribution}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.contribution}
                />
            </Grid>
        </Grid>
    )
}

export default ProfessionalScreen

import { Grid } from '@mui/material';
import React from 'react'
import InputProps from '../component/inputProps';
import { BIRTHPLACE, BODYCOLOR, CLUE, DATEOFBIRTH, EDUCATION, FAMILY, HEIGHT, MOBILE, NC, PARMENTADD, PASSPORT, PRESENTADD, RELIGION, WEALTH } from '../../../../utils/config';
import TextAreaProps from '../component/textAreaProps';
import { PersonFormData } from '../../../../../typings/formData';
type Props = {
    TextAreaChange: any;
    InputChange: any;
    SelectChange: any;
    data: PersonFormData
}
const PersonalScreen = ({data, TextAreaChange, InputChange, SelectChange }: Props) => {
    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <TextAreaProps
                    id={PARMENTADD}
                    placeholder={NC.parmentAdd}
                    label={NC.parmentAdd}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.parmentAdd}
                />
            </Grid>
            <Grid item xs={6}>
                <TextAreaProps
                    id={PRESENTADD}
                    placeholder={NC.presentAdd}
                    label={NC.presentAdd}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.presentAdd}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={BIRTHPLACE}
                    placeholder={NC.birthPlace}
                    label={NC.birthPlace}
                    InputChange={InputChange}
                    error={false}
                    value={data.birthPlace}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={DATEOFBIRTH}
                    placeholder={NC.dateOfBirth}
                    label={NC.dateOfBirth}
                    InputChange={InputChange}
                    error={false}
                    value={data.dateOfBirth}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={HEIGHT}
                    placeholder={NC.height}
                    label={NC.height}
                    InputChange={InputChange}
                    error={false}
                    value={data.height}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={BODYCOLOR}
                    placeholder={NC.bodyColor}
                    label={NC.bodyColor}
                    InputChange={InputChange}
                    error={false}
                    value={data.bodyColor}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={CLUE}
                    placeholder={NC.clue}
                    label={NC.clue}
                    InputChange={InputChange}
                    error={false}
                    value={data.clue}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={RELIGION}
                    placeholder={NC.religion}
                    label={NC.religion}
                    InputChange={InputChange}
                    error={false}
                    value={data.religion}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={MOBILE}
                    placeholder={NC.mobile}
                    label={NC.mobile}
                    InputChange={InputChange}
                    error={false}
                    value={data.mobile}
                />
            </Grid>
            <Grid item xs={4}>
                <InputProps
                    id={PASSPORT}
                    placeholder={NC.passport}
                    label={NC.passport}
                    InputChange={InputChange}
                    error={false}
                    value={data.passport}
                />
            </Grid>

           
            <Grid item xs={6}>
                <TextAreaProps
                    id={EDUCATION}
                    placeholder={NC.education}
                    label={NC.education}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.education}
                />
            </Grid>
            <Grid item xs={6}>
                <TextAreaProps
                    id={FAMILY}
                    placeholder={NC.family}
                    label={NC.family}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.family}
                />
            </Grid>
            <Grid item xs={6}>
                <TextAreaProps
                    id={WEALTH}
                    placeholder={NC.wealth}
                    label={NC.wealth}
                    TextAreaChange={TextAreaChange}
                    error={false}
                    value={data.wealth}
                />
            </Grid>
        </Grid>
    )
}

export default PersonalScreen

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersonFormData, SearchDataItem } from "../../../typings/formData";
import client from '../client';
import { ARRESTINFO, ARRESTORDER, BIRTHPLACE, BODYCOLOR, BUSINESS, CLUE, CONTRIBUTION, CORRUPTIONINFO, DATEOFBIRTH, EDUCATION, ELECTIONINFO, EVALUATION, FAMILY, HEIGHT, INCOME, INFLUENTIAL, MAMLAINFO, MOBILE, PARMENTADD, PASSPORT, PODOK, PODOKDATE, POLITICALINFO, PRESENTADD, PROFESSION, RELIGION, SABOTAGEINFO, THANARECORD, WEALTH } from '../../utils/config';

const searchPersonLis$ = (data: SearchDataItem): Observable<any> => client
  .post<SearchInResponseData>('person', {
    ...data
  })
  .pipe(
    map((response) => {
      // console.log('res',response.data)
      const data = response.data
      return data;
    })
  );

const LoadInitPersonList$ = (): Observable<any> => client
  .get<SearchInResponseData>('person')
  .pipe(
    map((response) => {
      // console.log('res',response.data)
      const data = response.data
      return data;
    })
  );

const addPerson$ = (data: PersonFormData): Observable<any> => client
  .post<any>('personAdd', makeFormData(data), {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .pipe(
    map(response => {
      const data = response.data
      // console.log('response', response)
      return data
    })
  )

const updatePerson$ = (data: PersonFormData, personIds: any): Observable<any> => client
  .put<any>('personAdd', makeUpdateForm(data, personIds), {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .pipe(
    map(response => {
      const data = response.data
      // console.log('response', response)
      return data
    })
  )

const existTin = (tin: string): Observable<any> => client
  .post<any>('tin', {
    tinNumber: tin
  })
  .pipe(
    map((response) => {
      // console.log('res',response.data)
      const data = response.data
      return data;
    })
  );

const existNid = (nid: string): Observable<any> => client
  .post<any>('nid', {
    nid: nid
  })
  .pipe(
    map((response) => {
      // console.log('res',response.data)
      const data = response.data
      return data;
    })
  );
export default { searchPersonLis$, addPerson$, updatePerson$, LoadInitPersonList$, existNid, existTin }




export type SearchInResponseData = {
  id: number;
  name: string;
  fatherName: string;
  motherName: string;
  nid: string;
  tinNumber: string;
  picture: string | null;
  evaluation: [
    {
      id: number;
      evaluation: string;
    }]
  ,
  personal: [{
    id: number;
    parmentAdd: string;
    presentAdd: string;
    birthPlace: string;
    dateOfBirth: string;
    height: string;
    bodyColor: string;
    clue: string;
    religion: string;
    mobile: string;
    passport: string;
    education: string;
    family: string;
    wealth: string;
  }]
  ,
  professional: [
    {
      id: number;
      profession: string;
      income: string;
      business: string;
      contribution: string;
    }]
  ,
  political: [{
    id: number;
    politicalInfo: string;
    electionInfo: string;
  }],
  mamla: [
    {
      id: number;
      mamlaInfo: string;
      sabotageInfo: string;
      arrestOrder: string;
      arrestInfo: string;
      corruptionInfo: string;
      thanaRecord: string;
      influential: string;


    }],
  person_Podok: [
    {
      id: number;
      podok: number;
      child: number;
      podokdate: string;
    }]


}


const makeFormData = (data: PersonFormData) => {
  const { podok, podokdate, name, picture, child
    , fatherName
    , motherName
    , nid
    , tinNumber
    , parmentAdd
    , presentAdd
    , birthPlace
    , dateOfBirth
    , height
    , bodyColor
    , clue
    , religion
    , mobile
    , passport
    , education
    , family
    , wealth

    , profession
    , income
    , business
    , contribution

    , politicalInfo
    , electionInfo

    , mamlaInfo
    , sabotageInfo
    , arrestOrder
    , arrestInfo

    , corruptionInfo
    , thanaRecord
    , influential

    , evaluation
  } = data


  let formData = new FormData();
  let file = picture as any
  if (file)
    formData.append('picture', file);
  else
    formData.append('picture', file);

  formData.append(PODOK, podok.toString());
  formData.append('child', child.toString())
  formData.append(PODOKDATE, podokdate)
  formData.append('name', name);
  formData.append('fatherName', fatherName);
  formData.append('motherName', motherName);
  formData.append('nid', nid);
  formData.append('tinNumber', tinNumber);
  //console.log('formdata',formData.getAll('nid'));


  formData.append(PARMENTADD, parmentAdd)
  formData.append(PRESENTADD, presentAdd)
  formData.append(BIRTHPLACE, birthPlace)
  formData.append(DATEOFBIRTH, dateOfBirth)

  formData.append(HEIGHT, height,)
  formData.append(BODYCOLOR, bodyColor)

  formData.append(CLUE, clue)
  formData.append(RELIGION, religion)

  formData.append(MOBILE, mobile)
  formData.append(PASSPORT, passport)

  formData.append(EDUCATION, education)
  formData.append(FAMILY, family)

  formData.append(WEALTH, wealth)
  formData.append(PROFESSION, profession)

  formData.append(INCOME, income)
  formData.append(BUSINESS, business)

  formData.append(CONTRIBUTION, contribution)
  formData.append(POLITICALINFO, politicalInfo)

  formData.append(ELECTIONINFO, electionInfo)
  formData.append(MAMLAINFO, mamlaInfo)

  formData.append(SABOTAGEINFO, sabotageInfo,)
  formData.append(ARRESTORDER, arrestOrder)

  formData.append(ARRESTINFO, arrestInfo)
  formData.append(CORRUPTIONINFO, corruptionInfo,)

  formData.append(THANARECORD, thanaRecord,)
  formData.append(INFLUENTIAL, influential)

  formData.append(EVALUATION, evaluation)

  return formData
}

const makeUpdateForm = (person: PersonFormData, data: any) => {

  let formData = makeFormData(person)
  formData.append('id', data.id)
  formData.append('evaluationId', data.evaluation[0]?.id)
  formData.append('mamlaId', data.mamla[0]?.id)
  formData.append('personalId', data.personal[0]?.id)
  formData.append('politicalId', data.political[0]?.id)
  formData.append('professionalId', data.professional[0]?.id)
  return formData
}
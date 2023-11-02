import { PersonFormData, ShowDataType } from "../../typings/formData";
import { SearchInResponseData } from "../api/search";

export let showData: ShowDataType[] = [
    {
        title: 'ব্যক্তিগত তথ্য',
        display: 'block',
        id: 1,
    },
    {
        title: 'সাধারণ তথ্য',
        display: 'none',
        id: 2
    }, {
        title: 'পেশাগত তথ্য',
        display: 'none',
        id: 3,
    }, {
        title: 'পলিটিকাল তথ্য',
        display: 'none',
        id: 4,
    }, {
        title: 'মামলাগত তথ্য',
        display: 'none',
        id: 5,
    }, {
        title: 'মতামত',
        display: 'none',
        id: 6
    }

]

export let PersonInitialData: PersonFormData = {
    podok: 0,
    child:0,
    podokdate: new Date().toISOString().slice(0, 10),
    name: '',
    fatherName: '',
    motherName: '',
    nid: '',
    tinNumber: '',
    picture: null,

    parmentAdd: '',
    presentAdd: '',
    birthPlace: '',
    dateOfBirth: '',
    height: '',
    bodyColor: '',
    clue: '',
    religion: '',
    mobile: '',
    passport: '',
    education: '',
    family: '',
    wealth: '',
    profession: '',
    income: '',
    business: '',
    contribution: '',
    politicalInfo: '',
    electionInfo: '',
    mamlaInfo: '',
    sabotageInfo: '',
    arrestOrder: '',
    arrestInfo: '',
    corruptionInfo: '',
    thanaRecord: '',
    influential: '',
    evaluation: '',
}

export const conVToPerType = (person: SearchInResponseData) => {
    const perInitData: PersonFormData = {
        podok: 0,
        child:0,
        podokdate: new Date().toISOString().slice(0, 10),
        name: person.name,
        fatherName: person.fatherName,
        motherName: person.motherName,
        nid: person.nid,
        tinNumber: person.tinNumber,
        picture: null,

        parmentAdd: person.personal[0].parmentAdd,
        presentAdd: person.personal[0].presentAdd,
        birthPlace: person.personal[0].birthPlace,
        dateOfBirth: person.personal[0].dateOfBirth,
        height: person.personal[0].height,
        bodyColor: person.personal[0].bodyColor,
        clue: person.personal[0].clue,
        religion: person.personal[0].religion,
        mobile: person.personal[0].mobile,
        passport: person.personal[0].passport,
        education: person.personal[0].education,
        family: person.personal[0].family,
        wealth: person.personal[0].wealth,
        profession: person.professional[0].profession,
        income: person.professional[0].income,
        business: person.professional[0].business,
        contribution: person.professional[0].contribution,
        politicalInfo: person.political[0].politicalInfo,
        electionInfo: person.political[0].electionInfo,
        mamlaInfo: person.mamla[0].mamlaInfo,
        sabotageInfo:  person.mamla[0].sabotageInfo,
        arrestOrder:  person.mamla[0].arrestOrder,
        arrestInfo:  person.mamla[0].arrestInfo,
        corruptionInfo:  person.mamla[0].corruptionInfo,
        thanaRecord:  person.mamla[0].thanaRecord,
        influential:  person.mamla[0].influential,
        evaluation: person.evaluation[0].evaluation,
    }
    return perInitData
}
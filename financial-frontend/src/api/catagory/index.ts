import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import client from '../client';
import { ReportSearch } from '../../../typings/structures';
import { SearchInResponseData } from '../search';
import { ReportDataItem } from '../../../typings/formData';
export type CatagoryResponseData = {
    mess: string;
    del: boolean;
    id: number;

}
const setCatagory$ = (title: string): Observable<CatagoryResponseData> => client
    .post<CatagoryResponseData>('podok_get', {
        title: title
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );

const delCatagory$ = (id: number): Observable<CatagoryResponseData> => client
    .put<CatagoryResponseData>('podok_get', {
        id: id
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );


const addSubCatagory$ = (id: number, title: string): Observable<any> => client
    .post<any>('add_subcatagory', {
        id: id,
        title: title
    })
    .pipe(
        map((response) => {
            console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
const downloadFile = (url:string): Observable<any> => client
    .get<any>(url,{
        responseType:'arraybuffer'
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data
            return responseData;
        })
    );
export default { setCatagory$, delCatagory$, addSubCatagory$, downloadFile }



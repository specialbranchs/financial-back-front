import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import client from '../client';
import { ReportSearch } from '../../../typings/structures';
import { GallaryDataItem, ReportDataItem } from '../../../typings/formData';
export type gallaryResponseData = {
    id: number;
    event: string;
    created:string;
    photo_gallary: Array<{
        id: number;
        picture: string;
    }>;
}[]
const searchGallaryList$ = (event:string): Observable<gallaryResponseData> => client
    .post<gallaryResponseData>('gallary_get', {
        event:event
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data
            const gallaryList: gallaryResponseData = responseData.map((report) => ({
                id: report.id,
                event: report.event,
                created:report.created,
                photo_gallary: report.photo_gallary
            }));
            return gallaryList;
        })
    );
export const makeFormData = (data: GallaryDataItem) => {
    const file = data.picture

    let formData = new FormData();

    file.forEach(element => {
        formData.append('uploaded_file', element)
        //  console.log(element)
    });

    formData.append('event', data.event)
   

    return formData
}

const setGallary$ = (data: GallaryDataItem): Observable<GallaryDataItem> => client
    .post<GallaryDataItem>('gallary_add', makeFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );


export default { searchGallaryList$,setGallary$ }



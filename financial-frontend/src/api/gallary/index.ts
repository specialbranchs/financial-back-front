import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import client from "../client";
import { ReportSearch } from "../../../typings/structures";
import { GallaryDataItem, ReportDataItem } from "../../../typings/formData";
import { store } from "../../state";
import actions from "../../state/actions";
export type gallaryResponseData = {
  id: number;
  event: string;
  created: string;
  photo_gallary: Array<{
    id: number;
    picture: string;
  }>;
}[];

export type gallaryTitleResponseData = {
  id: number;
  event: string;
  created: string;
};

const searchGallaryList$ = (event: string): Observable<gallaryResponseData> =>
  client
    .post<gallaryResponseData>("gallary_get", {
      event: event,
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
        const gallaryList: gallaryResponseData = responseData.map((report) => ({
          id: report.id,
          event: report.event,
          created: report.created,
          photo_gallary: report.photo_gallary,
        }));
        return gallaryList;
      })
    );

const setGallaryEventName = (
  eventName: string
): Observable<gallaryTitleResponseData> =>
  client
    .post<gallaryTitleResponseData>("add-event", {
      event: eventName,
    })
    .pipe(
      map((response) => {
        const responseData = response.data;
        return responseData;
      })
    );
export const makeFormData = (data: GallaryDataItem) => {
  const file = data.picture;
  let formData = new FormData();
  file.forEach((element) => {
    formData.append("uploaded_file", element);
    //  console.log(element)
  });
  formData.append("event", data.event);
  return formData;
};

const setGallary$ = (
  data: any,
  setprogress: any
): Observable<GallaryDataItem> =>
  client
    .post<GallaryDataItem>("gallary_add", data, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: ({ progress, loaded, total }) => {
        if (!total) return 0;
        const progressCompleted = loaded / total;
        console.log("progress", progressCompleted);
        setprogress(progressCompleted);
      },
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;

        return responseData;
      })
    );
const uploadFileOnebyOne = (files: any) => {

  if (files.length) {
    files.forEach(async (file: any) => {
      const formPayload = new FormData();
      formPayload.append("uploaded_file", file.file);
      formPayload.append('id',file.relationId)

      try {
        client.post<any>("single_gallary_Add", formPayload, {
          cancelToken: file.cancelSource.token,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;

            if (total) {
              const percentageProgress = Math.floor((loaded / total) * 100);
              console.log('progress',percentageProgress)
              store.dispatch(
                actions.gallary.SaveUploadProgressFile({
                  id: file.id,
                  progress: percentageProgress,
                })
              );
            }
          },
        })
      } catch (error) {}
    });
  }
 
};

export default { searchGallaryList$, setGallary$, setGallaryEventName,uploadFileOnebyOne };

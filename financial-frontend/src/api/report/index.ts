import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import client from "../client";
import { ReportSearch } from "../../../typings/structures";
import { ReportDataItem } from "../../../typings/formData";
import { store } from "../../state";
import actions from "../../state/actions";
export type ReportResponseData = {
  id: number;
  title: string;
  body: string;
  user_report: Array<{
    id: number;
    picture: string;
  }>;
}[];
const searchReportList$ = (
  data: ReportSearch
): Observable<ReportResponseData> =>
  client
    .post<ReportResponseData>("report_get", {
      ...data,
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
        const reports: ReportResponseData = responseData.map((report) => ({
          id: report.id,
          title: report.title,
          body: report.body,
          user_report: report.user_report,
        }));
        return reports;
      })
    );

const setReportbody$ = (data: any): Observable<ReportDataItem> =>
  client.post<ReportDataItem>("reportbodyAdd", data).pipe(
    map((response) => {
      const responseData = response.data;
      return responseData;
    })
  );

const genReport$ = (): Observable<any> =>
  client.get<any>("generate_report").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const setreportFile = (files: any) => {
  if (files.length) {
    files.forEach(async (file: any) => {
      const formPayload = new FormData();
      formPayload.append("uploaded_file", file.file);
      formPayload.append("id", file.relationId);

      try {
        client.post<any>("reportfileAdd", formPayload, {
          cancelToken: file.cancelSource.token,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;

            if (total) {
              const percentageProgress = Math.floor((loaded / total) * 100);
              console.log("progress", percentageProgress);
              store.dispatch(
                actions.gallary.SaveUploadProgressFile({
                  id: file.id,
                  progress: percentageProgress,
                })
              );
            }
          },
        });
      } catch (error) {}
    });
  }
};

const deleteReportFile = (id: number): Observable<any> => {
  return client
    .post<any>("deleteFile", {
      id: id,
    })
    .pipe(
      map((response) => {
        const responseData = response.data;
        return responseData;
      })
    );
};

export default {
  searchReportList$,
  setReportbody$,
  genReport$,
  setreportFile,
  deleteReportFile,
};

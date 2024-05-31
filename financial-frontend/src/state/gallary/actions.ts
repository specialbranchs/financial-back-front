import * as Types from "./actionTypes";
import {
  gallaryProgressData,
  gallaryUploadData,
} from "../../../typings/formData";

const SaveUploadFile = (
  fileData: gallaryUploadData
): Types.SaveUploadFileAction => ({
  type: Types.SET_UPLOAD_FILE,
  payload: fileData,
});

const SaveUploadProgressFile = (
  progressData: gallaryProgressData
): Types.SaveUploadProgressFileAction => ({
  type: Types.SET_UPLOAD_PROGRESS,
  payload: progressData,
});

const SuccessUploadFile = (id: number): Types.SuccessUploadFileAction => ({
  type: Types.SUCCESS_UPLOAD_FILE,
  payload: id,
});
const FailureUploadFile = (id: number): Types.FailureUploadFileAction => ({
  type: Types.FAILURE_UPLOAD_FILE,
  payload: id,
});
const retryUploadFile = (id: number): Types.retryUploadFileAction => ({
  type: Types.RETRY_UPLOAD_FILE,
  payload: id,
});
const resetUploadFile = (): Types.resetUploadFileAction => ({
  type: Types.RESET_UPLOAD_FILE,
});
export default {
  SaveUploadFile,
  SaveUploadProgressFile,
  SuccessUploadFile,
  FailureUploadFile,
  retryUploadFile,
  resetUploadFile,
};

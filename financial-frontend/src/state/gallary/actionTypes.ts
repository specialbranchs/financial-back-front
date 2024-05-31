import {
  gallaryProgressData,
  gallaryUploadData,
} from "../../../typings/formData";

export const SET_UPLOAD_FILE = "SET_UPLOAD_FILE";
export const SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS";
export const SUCCESS_UPLOAD_FILE = "SUCCESS_UPLOAD_FILE";
export const FAILURE_UPLOAD_FILE = "FAILURE_UPLOAD_FILE";
export const RETRY_UPLOAD_FILE = "RETRY_UPLOAD_FILE";
export const RESET_UPLOAD_FILE = "RESET_UPLOAD_FILE";

export interface SaveUploadFileAction {
  type: typeof SET_UPLOAD_FILE;
  payload: gallaryUploadData;
}

export interface SaveUploadProgressFileAction {
  type: typeof SET_UPLOAD_PROGRESS;
  payload: gallaryProgressData;
}
export interface SuccessUploadFileAction {
  type: typeof SUCCESS_UPLOAD_FILE;
  payload: number;
}

export interface FailureUploadFileAction {
  type: typeof FAILURE_UPLOAD_FILE;
  payload: number;
}

export interface retryUploadFileAction {
  type: typeof RETRY_UPLOAD_FILE;
  payload: number;
}

export interface resetUploadFileAction {
  type: typeof RESET_UPLOAD_FILE;
}

export type gallaryStateActionTypes =
  | SaveUploadFileAction
  | SaveUploadProgressFileAction
  | SuccessUploadFileAction
  | FailureUploadFileAction
  | resetUploadFileAction
  | retryUploadFileAction;

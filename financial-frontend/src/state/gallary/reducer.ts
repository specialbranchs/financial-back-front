import { produce } from "immer";

import * as Types from "./actionTypes";

import axios from "axios";
import { STATUS_UPLOAD } from "../../utils/constants";
import { modifyFiles } from "./modifyFiles";

export type State = {
  fileProgress: any | {};
};

export const initialState: State = {
  fileProgress: {},
};

export default (
  state: State = initialState,
  action: Types.gallaryStateActionTypes
) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.RESET_UPLOAD_FILE:
        return initialState;
      case Types.SET_UPLOAD_FILE:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            ...modifyFiles(state.fileProgress, action.payload),
          },
        };

      case Types.SET_UPLOAD_PROGRESS:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [action.payload.id]: {
              ...state.fileProgress[action.payload.id],
              progress: action.payload.progress,
            },
          },
        };

      case Types.SUCCESS_UPLOAD_FILE:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [action.payload]: {
              ...state.fileProgress[action.payload],
              status: STATUS_UPLOAD.success,
            },
          },
        };

      case Types.FAILURE_UPLOAD_FILE:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [action.payload]: {
              ...state.fileProgress[action.payload],
              status: STATUS_UPLOAD.failed,
              progress: 0,
            },
          },
        };

      case Types.RETRY_UPLOAD_FILE:
        const CancelToken = axios.CancelToken;
        const cancelSource = CancelToken.source();

        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [action.payload]: {
              ...state.fileProgress[action.payload],
              status: STATUS_UPLOAD.uploading,
              progress: 0,
              cancelSource,
            },
          },
        };
    }
  });

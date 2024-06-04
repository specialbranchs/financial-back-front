import { DoronType } from "../../../typings/formData";

export const SAVE_DORON = 'SAVE_DORON';
export const REMOVE_DORON = 'REMOVE_DORON';

export interface SaveDoronTypeAction {
  type: typeof SAVE_DORON;
  payload: DoronType[];
}

export interface RemoveDoronTypeAction {
  type: typeof REMOVE_DORON;
}

export type DoronTypeActionTypes = SaveDoronTypeAction | RemoveDoronTypeAction;

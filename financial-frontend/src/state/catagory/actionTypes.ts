import { CatagoryType } from "../../../typings/formData";

export const SAVE_CATAGORY = 'SAVE_CATAGORY';
export const REMOVE_CATAGORY = 'REMOVE_CATAGORY';

export interface SaveCatagoryTypeAction {
  type: typeof SAVE_CATAGORY;
  payload: CatagoryType[];
}

export interface RemoveCatagoryTypeAction {
  type: typeof REMOVE_CATAGORY;
}

export type CatagoryTypeActionTypes = SaveCatagoryTypeAction | RemoveCatagoryTypeAction;

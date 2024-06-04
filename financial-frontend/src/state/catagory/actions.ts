
import * as Types from './actionTypes';
import { CatagoryType } from '../../../typings/formData';

const saveCatagoryType = (catagories: CatagoryType[]): Types.SaveCatagoryTypeAction => ({
  type: Types.SAVE_CATAGORY,
  payload: catagories
});

const removeCatagoryType = (): Types.RemoveCatagoryTypeAction => ({
  type: Types.REMOVE_CATAGORY
});

export default { saveCatagoryType, removeCatagoryType };
